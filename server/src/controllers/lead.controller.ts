import { Response } from 'express';
import { Lead, LeadDocument, LeadStatus, LeadSource } from '../models/lead.model';
import { AuthRequest } from '../middleware/auth.middleware';
import { createLeadSchema, updateLeadSchema, querySchema } from '../validations/lead.validation';
import { sendSuccess, sendError } from '../utils/apiResponse';

interface LeadFilter {
  status?: LeadStatus;
  source?: LeadSource;
  $or?: Array<{
    name?: { $regex: string; $options: string };
    email?: { $regex: string; $options: string };
  }>;
}

export const getLeads = async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const { page, limit, status, source, search, sort } = parsed.data;
  const filter: LeadFilter = {};

  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;
  const sortOrder = sort === 'latest' ? -1 : 1;

  const [leads, total] = await Promise.all([
    Lead.find(filter)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit)
      .populate('createdBy', 'name email')
      .lean(),
    Lead.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(total / limit);
  sendSuccess(res, leads, 'Leads fetched', 200, {
    total, page, limit, totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  });
};

export const getLead = async (req: AuthRequest, res: Response): Promise<void> => {
  const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
  if (!lead) { sendError(res, 'Lead not found', 404); return; }
  sendSuccess(res, lead);
};

export const createLead = async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = createLeadSchema.safeParse(req.body);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const lead = await Lead.create({ ...parsed.data, createdBy: req.user!.id });
  sendSuccess(res, lead, 'Lead created', 201);
};

export const updateLead = async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = updateLeadSchema.safeParse(req.body);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const lead = await Lead.findByIdAndUpdate(req.params.id, parsed.data, { new: true, runValidators: true });
  if (!lead) { sendError(res, 'Lead not found', 404); return; }
  sendSuccess(res, lead, 'Lead updated');
};

export const deleteLead = async (req: AuthRequest, res: Response): Promise<void> => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) { sendError(res, 'Lead not found', 404); return; }
  sendSuccess(res, null, 'Lead deleted');
};

export const exportCSV = async (req: AuthRequest, res: Response): Promise<void> => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) { sendError(res, parsed.error.issues[0].message); return; }

  const { status, source, search, sort } = parsed.data;
  const filter: LeadFilter = {};

  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) filter.$or = [
    { name: { $regex: search, $options: 'i' } },
    { email: { $regex: search, $options: 'i' } },
  ];

  const leads = await Lead.find(filter).sort({ createdAt: sort === 'latest' ? -1 : 1 }).lean();

  const header = 'Name,Email,Status,Source,Created At';
  const rows = leads.map(l =>
    `"${l.name}","${l.email}","${l.status}","${l.source}","${l.createdAt.toISOString()}"`
  );

  const date = new Date().toISOString().split('T')[0];
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', `attachment; filename=leads-${date}.csv`);
  res.send([header, ...rows].join('\n'));
};

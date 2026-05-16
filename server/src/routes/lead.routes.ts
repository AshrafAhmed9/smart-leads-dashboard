import { Router } from 'express';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { getLeads, getLead, createLead, updateLead, deleteLead, exportCSV } from '../controllers/lead.controller';

const router = Router();

router.use(authenticate);

router.get('/export/csv', requireRole('admin'), exportCSV);
router.get('/', getLeads);
router.get('/:id', getLead);
router.post('/', createLead);
router.patch('/:id', updateLead);
router.delete('/:id', requireRole('admin'), deleteLead);

export default router;

import { Lead, UserRole } from '../../types';
import { Badge } from '../ui/Badge';
import { formatDate } from '../../utils/formatDate';

interface Props {
  leads: Lead[];
  userRole: UserRole;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

export const LeadTable = ({ leads, userRole, onEdit, onDelete }: Props) => {
  if (leads.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <p className="text-lg font-medium">No leads found</p>
        <p className="text-sm mt-1">Try adjusting your filters or create a new lead.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Email', 'Status', 'Source', 'Created At', 'Actions'].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map(lead => (
            <tr key={lead._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 text-sm font-medium text-gray-900">{lead.name}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
              <td className="px-4 py-3"><Badge status={lead.status} /></td>
              <td className="px-4 py-3 text-sm text-gray-600">{lead.source}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{formatDate(lead.createdAt)}</td>
              <td className="px-4 py-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    className="text-xs px-3 py-1 rounded border border-indigo-300 text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >Edit</button>
                  {userRole === 'admin' && (
                    <button
                      onClick={() => onDelete(lead)}
                      className="text-xs px-3 py-1 rounded border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
                    >Delete</button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

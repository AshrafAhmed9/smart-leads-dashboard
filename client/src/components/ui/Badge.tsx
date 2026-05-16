import { LeadStatus } from '../../types';
import { STATUS_BADGE } from '../../utils/constants';

export const Badge = ({ status }: { status: LeadStatus }) => (
  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_BADGE[status]}`}>
    {status}
  </span>
);

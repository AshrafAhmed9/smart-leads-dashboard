import { LeadFilters as FiltersType } from '../../types';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../../utils/constants';

interface Props {
  filters: FiltersType;
  onChange: (f: Partial<FiltersType>) => void;
}

export const LeadFilters = ({ filters, onChange }: Props) => (
  <div className="flex flex-wrap gap-3 p-4 bg-white rounded-xl border border-gray-200">
    <input
      type="text"
      placeholder="Search by name or email..."
      value={filters.search}
      onChange={e => onChange({ search: e.target.value, page: 1 })}
      className="flex-1 min-w-48 rounded-lg border-gray-300 text-sm"
    />
    <select
      value={filters.status}
      onChange={e => onChange({ status: e.target.value as FiltersType['status'], page: 1 })}
      className="rounded-lg border-gray-300 text-sm"
    >
      <option value="">All Statuses</option>
      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
    <select
      value={filters.source}
      onChange={e => onChange({ source: e.target.value as FiltersType['source'], page: 1 })}
      className="rounded-lg border-gray-300 text-sm"
    >
      <option value="">All Sources</option>
      {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
    </select>
    <select
      value={filters.sort}
      onChange={e => onChange({ sort: e.target.value as 'latest' | 'oldest', page: 1 })}
      className="rounded-lg border-gray-300 text-sm"
    >
      <option value="latest">Latest</option>
      <option value="oldest">Oldest</option>
    </select>
    <button
      onClick={() => onChange({ status: '', source: '', search: '', sort: 'latest', page: 1 })}
      className="text-sm text-indigo-600 hover:underline"
    >Clear</button>
  </div>
);

import { PaginationMeta } from '../../types';

interface Props {
  meta: PaginationMeta;
  onPageChange: (p: number) => void;
}

export const Pagination = ({ meta, onPageChange }: Props) => (
  <div className="flex items-center justify-between py-3 text-sm text-gray-600">
    <span>
      {(meta.page - 1) * meta.limit + 1}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total} leads
    </span>
    <div className="flex gap-2">
      <button
        onClick={() => onPageChange(meta.page - 1)}
        disabled={!meta.hasPrev}
        className="rounded border px-3 py-1 disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >Prev</button>
      <span className="px-2 py-1">{meta.page} / {meta.totalPages}</span>
      <button
        onClick={() => onPageChange(meta.page + 1)}
        disabled={!meta.hasNext}
        className="rounded border px-3 py-1 disabled:opacity-40 hover:bg-gray-50 transition-colors"
      >Next</button>
    </div>
  </div>
);

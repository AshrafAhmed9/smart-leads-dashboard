import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from '../hooks/useLeads';
import { useDebounce } from '../hooks/useDebounce';
import { LeadFilters as FiltersType, Lead } from '../types';
import { Navbar } from '../components/layout/Navbar';
import { LeadFilters } from '../components/leads/LeadFilters';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadForm } from '../components/leads/LeadForm';
import { DeleteConfirmModal } from '../components/leads/DeleteConfirmModal';
import { Modal } from '../components/ui/Modal';
import { Pagination } from '../components/ui/Pagination';
import { TableSkeleton } from '../components/ui/TableSkeleton';
import { exportCSVApi } from '../api/leads';
import toast from 'react-hot-toast';

const defaultFilters: FiltersType = {
  status: '', source: '', search: '', sort: 'latest', page: 1,
};

const LeadsPage = () => {
  const { user } = useAuth();
  const [filters, setFilters] = useState<FiltersType>(defaultFilters);
  const [createOpen, setCreateOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | null>(null);
  const [deleteLead, setDeleteLead] = useState<Lead | null>(null);

  const debouncedSearch = useDebounce(filters.search, 400);
  const queryFilters = { ...filters, search: debouncedSearch };

  const { data, isLoading, error } = useLeads(queryFilters);
  const createMutation = useCreateLead(() => setCreateOpen(false));
  const updateMutation = useUpdateLead(() => setEditLead(null));
  const deleteMutation = useDeleteLead(() => setDeleteLead(null));

  const updateFilters = (partial: Partial<FiltersType>) =>
    setFilters(prev => ({ ...prev, ...partial }));

  const handleExport = async () => {
    try {
      const blob = await exportCSVApi({
        status: filters.status,
        source: filters.source,
        search: debouncedSearch,
        sort: filters.sort,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your sales leads</p>
          </div>
          <div className="flex gap-3">
            {user?.role === 'admin' && (
              <button
                onClick={handleExport}
                className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >Export CSV</button>
            )}
            <button
              onClick={() => setCreateOpen(true)}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-colors"
            >+ Add Lead</button>
          </div>
        </div>

        <div className="mb-4">
          <LeadFilters filters={filters} onChange={updateFilters} />
        </div>

        {isLoading ? (
          <TableSkeleton />
        ) : error ? (
          <div className="text-center py-16 text-red-500">
            <p>Something went wrong. Please try again.</p>
          </div>
        ) : (
          <>
            <LeadTable
              leads={data?.data ?? []}
              userRole={user?.role ?? 'sales'}
              onEdit={setEditLead}
              onDelete={setDeleteLead}
            />
            {data?.meta && (
              <Pagination
                meta={data.meta}
                onPageChange={page => updateFilters({ page })}
              />
            )}
          </>
        )}
      </main>

      <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add Lead">
        <LeadForm
          onSubmit={data => createMutation.mutate(data)}
          isPending={createMutation.isPending}
          submitLabel="Create Lead"
        />
      </Modal>

      <Modal isOpen={!!editLead} onClose={() => setEditLead(null)} title="Edit Lead">
        {editLead && (
          <LeadForm
            defaultValues={editLead}
            onSubmit={data => updateMutation.mutate({ id: editLead._id, data })}
            isPending={updateMutation.isPending}
            submitLabel="Update Lead"
          />
        )}
      </Modal>

      <DeleteConfirmModal
        isOpen={!!deleteLead}
        onClose={() => setDeleteLead(null)}
        onConfirm={() => deleteLead && deleteMutation.mutate(deleteLead._id)}
        isPending={deleteMutation.isPending}
        leadName={deleteLead?.name ?? ''}
      />
    </div>
  );
};

export default LeadsPage;

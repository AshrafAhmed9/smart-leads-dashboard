import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchLeads, createLeadApi, updateLeadApi, deleteLeadApi } from '../api/leads';
import { LeadFilters } from '../types';
import toast from 'react-hot-toast';

export const useLeads = (filters: LeadFilters) =>
  useQuery({
    queryKey: ['leads', filters],
    queryFn: () => fetchLeads(filters),
    placeholderData: (prev) => prev,
  });

export const useCreateLead = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createLeadApi,
    onSuccess: () => {
      onSuccess?.();
      qc.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead created!');
    },
    onError: () => toast.error('Failed to create lead'),
  });
};

export const useUpdateLead = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Parameters<typeof updateLeadApi>[1] }) =>
      updateLeadApi(id, data),
    onSuccess: () => {
      onSuccess?.();
      qc.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead updated!');
    },
    onError: () => toast.error('Failed to update lead'),
  });
};

export const useDeleteLead = (onSuccess?: () => void) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteLeadApi,
    onSuccess: () => {
      onSuccess?.();
      qc.invalidateQueries({ queryKey: ['leads'] });
      toast.success('Lead deleted!');
    },
    onError: () => toast.error('Failed to delete lead'),
  });
};

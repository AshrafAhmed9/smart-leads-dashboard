import api from './axios';
import { ApiResponse, Lead, LeadFilters } from '../types';

export const fetchLeads = (filters: LeadFilters) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== '')
  );
  return api.get<ApiResponse<Lead[]>>('/leads', { params }).then(r => r.data);
};

export const fetchLead = (id: string) =>
  api.get<ApiResponse<Lead>>(`/leads/${id}`).then(r => r.data);

export const createLeadApi = (body: Pick<Lead, 'name' | 'email' | 'status' | 'source'>) =>
  api.post<ApiResponse<Lead>>('/leads', body).then(r => r.data);

export const updateLeadApi = (id: string, body: Partial<Pick<Lead, 'name' | 'email' | 'status' | 'source'>>) =>
  api.patch<ApiResponse<Lead>>(`/leads/${id}`, body).then(r => r.data);

export const deleteLeadApi = (id: string) =>
  api.delete<ApiResponse<null>>(`/leads/${id}`).then(r => r.data);

export const exportCSVApi = (filters: Omit<LeadFilters, 'page'>) => {
  const params = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== '')
  );
  return api.get('/leads/export/csv', { params, responseType: 'blob' }).then(r => r.data as Blob);
};

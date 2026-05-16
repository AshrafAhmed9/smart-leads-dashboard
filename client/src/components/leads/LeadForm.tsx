import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { STATUS_OPTIONS, SOURCE_OPTIONS } from '../../utils/constants';

const schema = z.object({
  name:   z.string().min(2, 'Name must be at least 2 characters'),
  email:  z.string().email('Invalid email'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

type FormData = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<FormData>;
  onSubmit: (data: FormData) => void;
  isPending: boolean;
  submitLabel?: string;
}

export const LeadForm = ({ defaultValues, onSubmit, isPending, submitLabel = 'Save' }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { status: 'New', source: 'Website', ...defaultValues },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input {...register('name')} className="w-full rounded-lg border-gray-300 text-sm" />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input {...register('email')} type="email" className="w-full rounded-lg border-gray-300 text-sm" />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select {...register('status')} className="w-full rounded-lg border-gray-300 text-sm">
            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
          <select {...register('source')} className="w-full rounded-lg border-gray-300 text-sm">
            {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium disabled:opacity-60 transition-colors"
      >
        {isPending ? 'Saving...' : submitLabel}
      </button>
    </form>
  );
};

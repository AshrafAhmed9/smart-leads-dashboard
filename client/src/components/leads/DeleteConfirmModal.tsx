import { Modal } from '../ui/Modal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending: boolean;
  leadName: string;
}

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, isPending, leadName }: Props) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Delete Lead">
    <p className="text-gray-600 mb-6">
      Are you sure you want to delete <strong>{leadName}</strong>? This cannot be undone.
    </p>
    <div className="flex gap-3 justify-end">
      <button
        onClick={onClose}
        className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors text-sm"
      >Cancel</button>
      <button
        onClick={onConfirm}
        disabled={isPending}
        className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-60 transition-colors text-sm"
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </button>
    </div>
  </Modal>
);

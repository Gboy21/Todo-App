import { Dialog } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../services/api";

interface DeleteModalProps {
  isOpen: boolean;
  close: () => void;
  onConfirm: () => void;
}

const DeleteModal = ({ isOpen, close, onConfirm }: DeleteModalProps) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: onConfirm,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      close();
    },
  });

  return (
    <Dialog open={isOpen} onClose={close} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
          <Dialog.Title className="text-lg font-medium mb-4">
            Confirm Delete
          </Dialog.Title>
          <p className="mb-6">Are you sure you want to delete this task?</p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={close}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              onClick={() => mutation.mutate()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default DeleteModal;
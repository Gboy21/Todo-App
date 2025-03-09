import { useState } from 'react';
import { Task } from '../types/task';
import EditTaskForm from './EditTaskForm';
import DeleteModal from './DeleteModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask, deleteTask } from '../services/api';

const TaskItem = ({ task }: { task: Task }) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const queryClient = useQueryClient();

  const statusMutation = useMutation({
    mutationFn: (newStatus: string) => updateTask(task.id, { status: newStatus }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-medium">{task.title}</h3>
          <p className="text-gray-600 mt-1">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <select
            value={task.status}
            onChange={(e) => statusMutation.mutate(e.target.value)}
            className={`px-2 py-1 rounded text-sm ${
              task.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : task.status === 'in-progress'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <EditTaskForm 
        task={task}
        isOpen={isEditOpen}
        close={() => setIsEditOpen(false)}
      />
      
      <DeleteModal
  isOpen={isDeleteOpen}
  close={() => setIsDeleteOpen(false)}
  onConfirm={async () => {
    await deleteTask(task.id);
  }}
/>
    </div>
  );
};

export default TaskItem;
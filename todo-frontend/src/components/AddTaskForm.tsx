import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '../services/api';
import { useForm } from 'react-hook-form';
import { Task } from '../types/task';

const AddTaskForm = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm<Omit<Task, 'id' | 'createdAt'>>();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      reset();
    },
  });

  return (
    <form 
      onSubmit={handleSubmit((data) => mutation.mutate(data))}
      className="mb-6 p-4 bg-gray-50 rounded-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          {...register('title', { required: true })}
          placeholder="Task title"
          className="p-2 border rounded"
        />
        <select
          {...register('status')}
          className="p-2 border rounded"
          defaultValue="pending"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <textarea
          {...register('description')}
          placeholder="Task description"
          className="p-2 border rounded md:col-span-2"
          rows={3}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 md:col-span-2"
        >
          Add Task
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
import { useQuery } from '@tanstack/react-query';
import { fetchTasks } from '../services/api';
import TaskItem from './TaskItem';
import { Task } from '../types/task';

const TaskList = () => {
  const { data: tasks, isLoading, isError } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching tasks</div>;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Tasks</h2>
      <div className="space-y-4">
        {tasks?.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
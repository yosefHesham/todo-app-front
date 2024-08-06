import { Task } from "@/redux/taskSlice";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }: { tasks: Task[] }) => {
  return (
    <section className="flex flex-col gap-2">
      {!(tasks.length || !tasks) && (
        <p className="text-center text-red-400 mt-7">
          Add tasks from the button above
        </p>
      )}

      {tasks?.map((task) => (
        <TaskItem
          _id={task._id}
          description={task.description}
          toTime={task.toTime}
          fromTime={task.fromTime}
        />
      ))}
    </section>
  );
};

export default TaskList;

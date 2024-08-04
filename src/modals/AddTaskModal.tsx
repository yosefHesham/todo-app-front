import TaskForm from "@/components/TaskForm";

const AddTaskModal = () => {
  return (
    <section className="bg-black bg-opacity-35 absolute flex justify-center items-center">
      <section className="rounded-md shadow-md bg-white">
        <TaskForm />
      </section>
    </section>
  );
};

export default AddTaskModal;

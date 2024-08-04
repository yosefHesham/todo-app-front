import TaskForm from "@/components/TaskForm";

const AddTaskModal = () => {
  return (
    <section className="bg-black bg-opacity-35 z-50 h-screen w-full absolute inset-0  flex justify-center items-center">
      <section className="rounded-xl p-8 shadow-md bg-white">
        <TaskForm />
      </section>
    </section>
  );
};

export default AddTaskModal;

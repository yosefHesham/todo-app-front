import TaskForm, { TaskUpdate } from "@/components/TaskForm";

interface IProps {
  toUpdate?: TaskUpdate | undefined;
  hideDialog: () => void;
}

const AddTaskModal = ({ toUpdate, hideDialog }: IProps) => {
  return (
    <section
      className="bg-black bg-opacity-35 z-50 h-screen w-full absolute inset-0  flex justify-center items-center"
      onClick={hideDialog}
    >
      <section
        className="rounded-xl p-8 shadow-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <TaskForm hideDialog={hideDialog} toUpdate={toUpdate} />
      </section>
    </section>
  );
};

export default AddTaskModal;

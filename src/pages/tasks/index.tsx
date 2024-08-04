import PrimaryButton from "@/components/PrimaryButton";
import AddTaskModal from "@/modals/AddTaskModal";
import { useState } from "react";

const TaskPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => {
    setShowModal(!showModal);
  };
  return (
    <main className="bg-white p-4 w-full relative">
      <section className=" w-full md:w-5/6 bg-gray-200  shadow-lg rounded-xl mx-auto p-4">
        <p className="text-semibold">Today</p>

        <div className="flex gap-5 text-center justify-evenly items-center bg-white rounded-md shadow-md mt-5   p-7">
          <div>
            <p className="text-red-500 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>
          <div>
            <p className="text-red-500 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>
          <div>
            <p className="text-red-500 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>

          <PrimaryButton
            buttonText=" + Add Task"
            handleClick={handleModal}
            classes="border border-red-500 text-red-500 rounded-md p-3"
          />
        </div>
        <p> tasks</p>
      </section>

      {showModal && <AddTaskModal />}
    </main>
  );
};

export default TaskPage;

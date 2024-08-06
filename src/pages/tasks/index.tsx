import PrimaryButton from "@/components/PrimaryButton";
import AddTaskModal from "@/modals/AddTaskModal";
import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTasksAsync, getSummaryAsync } from "@/redux/taskSlice";

const TaskPage = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasksAsync());
    }
  }, [status, dispatch]);
  const summary = useSelector((state: RootState) => state.tasks.summary);
  const handleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    dispatch(getSummaryAsync(new Date().toString()));
  }, [tasks]);
  return (
    <main className="bg-white p-4 w-full relative">
      <section className=" w-full md:w-5/6 bg-gray-200  shadow-lg rounded-xl mx-auto p-4">
        <p className="text-semibold">Today</p>

        <div className="flex gap-5 text-center justify-evenly items-center bg-white rounded-md shadow-md mt-5   p-7">
          <div>
            <p className="text-red-500 text-xl font-bold">
              {summary.numOfTasks.toFixed(0)}
            </p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>
          <div>
            <p className="text-red-500 text-xl font-bold">
              {summary.totalDuration.toFixed(2)}
            </p>
            <p className="text-gray-500 font-light text-xs">Total Hours</p>
          </div>
          <div>
            <p className="text-red-500 text-xl font-bold">
              {summary.remainingHours.toFixed(2)}
            </p>
            <p className="text-gray-500 font-light text-xs">Hours Remaining</p>
          </div>

          <PrimaryButton
            buttonText=" + Add Task"
            handleClick={handleModal}
            isDisabled={summary.totalDuration.toFixed(0) >= "8"}
            classes="border border-red-500 text-red-500 rounded-md p-3"
          />
        </div>
        <p className="font-bold my-5"> Tasks</p>
        <TaskList tasks={tasks} />
      </section>

      {showModal && (
        <AddTaskModal hideDialog={() => setShowModal(!showModal)} />
      )}
    </main>
  );
};

export default TaskPage;

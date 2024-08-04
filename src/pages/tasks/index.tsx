import PrimaryButton from "@/components/Button";

const TaskPage = () => {
  return (
    <main className="bg-white p-4 w-full">
      <section className=" w-full md:w-5/6 bg-slate-400 shadow-lg rounded-xl p-4">
        <p className="text-semibold">Today</p>

        <div className="flex gap-5 justify-evenly bg-white rounded-md shadow-md">
          <div>
            <p className="text-red-700 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>
          <div>
            <p className="text-red-700 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>
          <div>
            <p className="text-red-700 text-xl font-bold">0</p>
            <p className="text-gray-500 font-light text-xs">Tasks</p>
          </div>

          <PrimaryButton
            buttonText=" + Add Task"
            classes="border border-red-500 text-red-500 rounded-md p-3"
          />
        </div>
      </section>

      <p> tasks</p>
    </main>
  );
};

export default TaskPage;

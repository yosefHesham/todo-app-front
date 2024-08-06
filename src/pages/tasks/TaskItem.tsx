import editIcon from "../../assets/edit.png";
import deleteIcon from "../../assets/delete.png";
import { format } from "date-fns";
import { useState } from "react";
import AddTaskModal from "@/modals/AddTaskModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteTaskAsync } from "@/redux/taskSlice";
import toast from "react-hot-toast";
interface IProps {
  description: string;
  toTime: Date;
  fromTime: Date;
  _id: string;
}
const TaskItem = ({ description, toTime, _id, fromTime }: IProps) => {
  const dueDate = format(toTime, "HH:mm");

  const dispatch = useDispatch<AppDispatch>();

  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex items-center  justify-between w-full rounded-sm bg-white shadow-md p-4">
      <div>
        <p className="font-bold">{description}</p>
        <p className="text-red-400 font-light">
          Due: <span className="text-gray-500">{dueDate}</span>
        </p>
      </div>

      <div className="flex gap-5 items-center">
        <img
          src={editIcon}
          alt="edit-icon"
          className="size-6 cursor-pointer"
          onClick={() => setShowModal(!showModal)}
        />
        <img
          src={deleteIcon}
          alt="delete-icon"
          className="siz-6 cursor-pointer"
          onClick={() => {
            dispatch(deleteTaskAsync(_id));
            toast("Task has been removed");
          }}
        />
      </div>
      {showModal && (
        <AddTaskModal
          toUpdate={{ toTime, fromTime, description, id: _id }}
          hideDialog={() => setShowModal(!showModal)}
        />
      )}
    </div>
  );
};

export default TaskItem;

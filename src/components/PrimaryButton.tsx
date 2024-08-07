import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface IProps {
  classes: string;
  buttonText: string;
  handleClick: () => void;
  isDisabled?: boolean;
  type?: "button" | "submit" | "reset";
}
const PrimaryButton = ({
  classes,
  buttonText,
  handleClick,
  type = "button",
  isDisabled = false,
}: IProps) => {
  return (
    <Button
      type={type}
      className={`${classes} transition-all duration-300 hover:shadow-xl hover:bg-red-500 hover:text-white ${
        isDisabled ? "bg-gray-300    border-gray-100" : ""
      }`}
      onClick={() => {
        if (isDisabled) {
          toast("Maximum Duration Exceeded (8Hrs)");
        } else {
          handleClick();
        }
      }}
    >
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;

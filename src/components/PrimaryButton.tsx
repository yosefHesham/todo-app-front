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
      className={`${classes} ${
        isDisabled ? "bg-gray-300  text-gray-600 border-gray-100" : ""
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

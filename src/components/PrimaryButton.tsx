import { Button } from "./ui/button";

interface IProps {
  classes: string;
  buttonText: string;
  handleClick: () => void;
  type?: "button" | "submit" | "reset";
}
const PrimaryButton = ({
  classes,
  buttonText,
  handleClick,
  type = "button",
}: IProps) => {
  return (
    <Button type={type} className={classes} onClick={handleClick}>
      {buttonText}
    </Button>
  );
};

export default PrimaryButton;

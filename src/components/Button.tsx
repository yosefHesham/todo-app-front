import { Button } from "./ui/button";

interface IProps {
  classes: string;
  buttonText: string;
}
const PrimaryButton = ({ classes, buttonText }: IProps) => {
  return <Button className={classes}>{buttonText}</Button>;
};

export default PrimaryButton;

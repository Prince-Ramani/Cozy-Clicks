import { useNavigate } from "react-router-dom";

interface PrimaryButtonProps {
  buttonTitle: string;
  path: string;
}
const PrimaryButton = ({ buttonTitle, path }: PrimaryButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-primary text-primary-foreground rounded-2xl p-2 font-semibold px-4 hover:text-primary-foreground/70 hover:bg-primary/70 cursor-pointer active:bg-accent active:text-accent-foreground transition-colors duration-150"
      onClick={() => navigate(path)}
    >
      {buttonTitle}
    </button>
  );
};
export default PrimaryButton;

import { cn } from "@/lib/utils";

type variant = "primary" | "secondary" | "destructive";

interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
  variant?: variant;
  className?: string;
}

const Button = ({
  text,
  variant = "primary",
  className,
  ...rest
}: ButtonProps) => {
  const baseStyle =
    "w-full py-2 rounded-xl cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-allfocus:outline-none md:text-lg";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary/90 active:bg-secondary/80",
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} {...rest}>
      {text}
    </button>
  );
};

export default Button;

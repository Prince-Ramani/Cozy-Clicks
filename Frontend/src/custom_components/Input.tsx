import { cn } from "@/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  label: string;
  className?: string;
  labelClassName?: string;
}

const Input = ({ label, className, labelClassName, ...rest }: InputProps) => {
  return (
    <div className="flex flex-col gap-2 md:gap-2.5 justify-center ">
      {label && (
        <div className={cn("px-1 text-lg md:text-xl", labelClassName)}>
          {label}
        </div>
      )}
      <input
        className={cn(
          "bg-input text-foreground border-border placeholder:text-muted-foreground px-2 py-3  text-base md:text-xl h-10 w-full rounded-xl focus:ring-1 focus:ring-ring focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed",
          className,
        )}
        {...rest}
      />
    </div>
  );
};

export default Input;

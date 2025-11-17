import { cn } from "@/lib/utils";

const Loading = ({ className }: { className?: string | undefined }) => {
  return (
    <div className={cn(`bg-white rounded-xl p-2`, className)}>
      <div className=" border-4 rounded-full size-10 animate-spin border-black border-t-blue-600" />
    </div>
  );
};

export default Loading;

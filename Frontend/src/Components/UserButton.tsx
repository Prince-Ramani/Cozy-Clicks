import { useAuthUser } from "@/context/userContextProvider";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { HelpCircle, Settings, User } from "lucide-react";

const UserButton = () => {
  const { authUser } = useAuthUser();
  const pfp =
    "https://images.unsplash.com/photo-1761872936185-4ece7c1128ab?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470";
  if (!authUser) return;
  return (
    <Drawer direction="right">
      <DrawerTrigger className="size-8 rounded-full">
        <button className="rounded-full hover:opacity-90 size-8 cursor-pointer transition-opacity duration-300">
          <img className="rounded-full size-8 object-cover" src={pfp}></img>
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu Bar</DrawerTitle>
        </DrawerHeader>
        <div className="p-2 pb-4 px-4 flex gap-5 items-center">
          <img
            src={pfp}
            className="size-12 md:size-20 rounded-full object-cover"
          />
          <div className="flex flex-col gap-0.5 text-muted-foreground ">
            <span>{authUser.username}</span>
            <span className="text-sm">{authUser.email}</span>
          </div>
        </div>
        <DrawerFooter>
          <button>Submit</button>
          <DrawerClose>
            <button>Cancel</button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UserButton;

import Loading from "@/Components/Loading";
import { useAuthUser } from "@/context/userContextProvider";
import type { FetchError } from "@/lib/utils/fetcher";
import { getProfileInfo } from "@/services/userServices";
import type { GetProfileInfoInterface } from "@/types/userTypes";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import img1 from "../assets/1.jpg";
import LinksDisplayer from "@/Components/LinksDisplayer";

const Profile = () => {
  const { authUser } = useAuthUser();
  const { profileID } = useParams();

  const isEnabled = !!authUser && !!profileID;

  const { data, isLoading, isError, error } = useQuery<
    GetProfileInfoInterface,
    Error
  >({
    queryKey: ["profileInfo", profileID],
    queryFn: () => getProfileInfo(profileID),
    enabled: !!authUser && !!profileID,
  });
  console.log(data);

  useEffect(() => {
    if (isError) {
      const fetchErr = error as FetchError;
      const errorMessage = fetchErr?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  }, [isError, data, error]);

  if (!isEnabled) return null;

  if (isLoading || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <Loading className="bg-transparent" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center flex-col">
      {/*Banner*/}
      <div className="rounded-lg cursor-pointer w-full md:w-[90%] p-2">
        <img
          src={img1 || data?.profileBanner}
          className="w-full h-52 rounded-lg object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-3 relative bottom-16  z-50">
        <img
          src={authUser.profilePicture}
          className="size-33 border-2 rounded-full border-primary bg-primary "
        />
        <div className="md:text-lg font-semibold">{authUser.username}</div>
        <button className="bg-primary text-primary-foreground rounded-xl p-1 md:p-2 font-semibold px-3 md:px-4 hover:text-primary-foreground/70 hover:bg-primary/70 cursor-pointer active:bg-accent active:text-accent-foreground  disabled:bg-accent/60 disabled:text-accent-foreground/60 transition-colors duration-150">
          Follow
        </button>
        <LinksDisplayer links={data.links} />
        <div className="flex justify-center items-center gap-4 text-muted-foreground text-xs sm:text-sm md:text-base p-1 text-center">
          <div className="cursor-pointer hover:text-muted-foreground/70 transition-opacity duration-150 active:text-accent-foreground">
            Followers : <span className="font-semibold">{data?.followers}</span>
          </div>
          <div className="border-r h-6 " />

          <div className="cursor-pointer hover:text-muted-foreground/70 transition-opacity duration-150 active:text-accent-foreground">
            Following : <span className="font-semibold">{data?.following}</span>
          </div>

          <div className="border-r h-6 " />

          <div className="cursor-pointer hover:text-muted-foreground/70 transition-opacity duration-150 active:text-accent-foreground">
            Total Views : <span className="font-semibold">{data?.views}</span>
          </div>
        </div>
        <div>
          <div>Gallery</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

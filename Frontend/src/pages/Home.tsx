import type { FetchError } from "@/lib/utils/fetcher";
import { logoutAPI } from "@/services/userServices";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    refetch: Logout,
    data,
    isError,
    error,
  } = useQuery({
    queryKey: ["logout"],
    queryFn: logoutAPI,
    enabled: false,
  });

  useEffect(() => {
    if (isError) {
      const fetchErr = error as FetchError;
      const errorMessage = fetchErr?.message || "Something went wrong";
      toast.error(errorMessage);
    }

    if (!!data && typeof data === "object" && "message" in data) {
      toast.success(data.message);
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
      navigate("/login");
    }
  }, [data, isError, error]);

  return (
    <div>
      <button onClick={() => Logout()}>Logout</button>
    </div>
  );
};

export default Home;

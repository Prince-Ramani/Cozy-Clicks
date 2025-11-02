import { Eye, EyeOff } from "lucide-react";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.png";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import type { FetchError } from "@/lib/utils/fetcher";

import { signinAPI } from "@/services/userServices";
import { validateEmailFormmate } from "@/lib/utils/validators";

import Loading from "@/Components/Loading";

const Signin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [eyeOn, setEyeOn] = useState<boolean>(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const images = [img6, img1, img2, img3, img4, img5];

  const [bgImage] = useState(() => {
    const rand = Math.floor(Math.random() * images.length);
    return images[rand];
  });

  const {
    mutate: signinMutate,
    data,
    error,
    isError,
    isPending,
  } = useMutation({
    mutationFn: () =>
      signinAPI({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      }),
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
  }, [isError, data, error]);

  const handleSubmit = () => {
    const isValidEmail = validateEmailFormmate(info.email);
    if (!isValidEmail.isValid && "message" in isValidEmail) {
      toast.error(isValidEmail.message);
      return;
    }

    if (!info.password || info.password.trim().length === 0) {
      toast.error("Password required.");
      return;
    }

    signinMutate();
  };

  return (
    <div
      className={`flex relative justify-center items-center  min-h-screen w-full p-2 `}
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      {isPending ? (
        <div className="absolute z-10">
          <Loading />{" "}
        </div>
      ) : (
        ""
      )}
      <div
        className={`flex flex-col rounded-xl bg-white py-3 pb-6 2xl:py-6 2xl:pb-10 max-w-lg m-2 w-full justify-center items-center ${isPending ? "opacity-60 pointer-events-none" : "opacity-95"} `}
      >
        <header className="font-bold flex flex-col gap-1 text-2xl sm:text-2xl xl:text-3xl py-2 w-full px-5 md:px-9 ">
          <h1 className="text-blue-700">Sign in</h1>
          <h1 className="text-base sm:text-xl xl-text-2xl">
            Welcome Back to Cozy-Clicks
          </h1>
        </header>
        <main className="w-full px-5  md:px-9 ">
          <div className=" flex flex-col gap-1.5 min-w-full   ">
            {/* Email */}
            <div className="flex group flex-col justify-center hover:text-gray-500 gap-1 ">
              <label
                htmlFor="email"
                className="group group-focus-within:text-blue-700 text-sm sm:text-lg"
              >
                Email:{" "}
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className=" border border-black rounded-sm p-1 xl:text-lg @3xl:text-2xl group focus-within:outline-none focus-within:text-blue-700 group-hover:border-gray-500 focus-within:border-blue-700"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                value={info.email}
              />
            </div>

            {/* Password */}
            <div className="flex  group flex-col justify-center hover:text-gray-500 gap-1 ">
              <label
                htmlFor="password"
                className="group group-focus-within:text-blue-700 text-sm sm:text-lg"
              >
                Password:{" "}
              </label>
              <div className="w-full  items-center flex relative  group">
                <input
                  type={`${eyeOn ? "text" : "password"}`}
                  name="password"
                  id="password"
                  className=" border border-black w-full rounded-sm p-1 xl:text-lg @3xl:text-2xl group focus-within:outline-none focus-within:text-blue-700 group-hover:border-gray-500 focus-within:border-blue-700  pr-10"
                  onChange={(e) =>
                    setInfo((prev) => ({ ...prev, password: e.target.value }))
                  }
                  value={info.password}
                />
                {eyeOn ? (
                  <Eye
                    className="cursor-pointer  hover:text-black hover:bg-blue-100/70 p-1 rounded-full size-7 active:bg-green-300/70  absolute right-1.5 group  group-focus-within:text-blue-700"
                    onClick={() => setEyeOn(false)}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer  hover:text-black hover:bg-blue-100/70 p-1 rounded-full size-7 active:bg-green-300/70  absolute right-1.5 group group-focus-within:text-blue-700 "
                    onClick={() => setEyeOn(true)}
                  />
                )}
              </div>
            </div>
            <button
              className="bg-blue-400 text-white mt-3 p-2 focus-within:outline-2 focus-within:outline-black rounded-sm md:hover:opacity-80 active:bg-green-600 transition-colors cursor-pointer text-sm sm:text-base"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Signing in" : "Sign in"}
            </button>
            <a
              href="/signup"
              className="group hover:text-gray-600 text-xs sm:text-base"
            >
              Don't have an account?{" "}
              <span className="text-blue-700 group-hover:text-blue-700/70 underline group">
                Sign up
              </span>
            </a>
            <button
              className="bg-slate-300 text-black  p-2 focus-within:outline-2 focus-within:outline-black rounded-sm md:hover:opacity-80 active:bg-slate-600 transition-colors cursor-pointer text-sm sm:text-base"
              onClick={() => navigate("/signup")}
              disabled={isPending}
            >
              Sign up
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signin;

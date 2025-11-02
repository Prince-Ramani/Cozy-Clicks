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
  const [eyeOn, setEyeOn] = useState(false);
  const [info, setInfo] = useState({ email: "", password: "" });

  const images = [img6, img1, img2, img3, img4, img5];
  const [bgImage] = useState(
    () => images[Math.floor(Math.random() * images.length)],
  );

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      }),
  });

  useEffect(() => {
    if (isError) {
      const fetchErr = error as FetchError;
      toast.error(fetchErr?.message || "Something went wrong");
    }

    if (data && typeof data === "object" && "message" in data) {
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

    if (!info.password.trim()) {
      toast.error("Password required.");
      return;
    }

    signinMutate();
  };

  return (
    <div
      className="flex relative justify-center items-center min-h-screen w-full p-2"
      style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover" }}
    >
      {isPending && (
        <div className="absolute z-10">
          <Loading />
        </div>
      )}

      <div
        className={`flex flex-col rounded-xl bg-card py-3 pb-6 2xl:py-6 2xl:pb-10 max-w-lg m-2 w-full justify-center items-center ${
          isPending ? "opacity-60 pointer-events-none" : "opacity-100"
        }`}
      >
        <header className="font-bold flex flex-col gap-1 text-2xl sm:text-2xl xl:text-3xl py-2 w-full px-5 md:px-9">
          <h1 className="text-primary">Sign in</h1>
          <h1 className="text-base sm:text-xl xl-text-2xl text-muted-foreground">
            Welcome back to Cozy-Clicks
          </h1>
        </header>

        <main className="w-full px-5 md:px-9">
          <div className="flex flex-col gap-1.5 min-w-full">
            {/* Email */}
            <div className="flex flex-col group gap-1">
              <label
                htmlFor="email"
                className="text-sm sm:text-lg text-foreground group-focus-within:text-primary"
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="border border-border rounded-sm p-1 xl:text-lg bg-background text-foreground focus:outline-none focus:border-primary"
                onChange={(e) =>
                  setInfo((prev) => ({ ...prev, email: e.target.value }))
                }
                value={info.email}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col group gap-1">
              <label
                htmlFor="password"
                className="text-sm sm:text-lg text-foreground group-focus-within:text-primary"
              >
                Password:
              </label>
              <div className="w-full flex items-center relative group">
                <input
                  type={eyeOn ? "text" : "password"}
                  name="password"
                  id="password"
                  className="border border-border w-full rounded-sm p-1 xl:text-lg bg-background text-foreground focus:outline-none focus:border-primary pr-10"
                  onChange={(e) =>
                    setInfo((prev) => ({ ...prev, password: e.target.value }))
                  }
                  value={info.password}
                />
                {eyeOn ? (
                  <Eye
                    className="cursor-pointer hover:bg-accent p-1 rounded-full size-7 active:bg-accent/70 absolute right-1.5 text-muted-foreground"
                    onClick={() => setEyeOn(false)}
                  />
                ) : (
                  <EyeOff
                    className="cursor-pointer hover:bg-accent p-1 rounded-full size-7 active:bg-accent/70 absolute right-1.5 text-muted-foreground"
                    onClick={() => setEyeOn(true)}
                  />
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              className="bg-primary text-primary-foreground mt-3 p-2 rounded-sm hover:opacity-90 active:bg-primary/80 transition-colors text-sm sm:text-base"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </button>

            <a
              href="/signup"
              className="group text-xs sm:text-base text-muted-foreground hover:text-foreground"
            >
              Don’t have an account?{" "}
              <span className="text-primary underline group-hover:opacity-80">
                Sign up
              </span>
            </a>

            <button
              className="bg-secondary text-secondary-foreground p-2 rounded-sm hover:opacity-90 active:bg-secondary/80 transition-colors text-sm sm:text-base"
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

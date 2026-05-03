import Input from "@/custom_components/Input";
import butterLogo from "@/assets/butterfly-logo.png";
import Button from "@/custom_components/Button";

import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const username = form.username.trim();
    const email = form.email.trim();
    const password = form.password.trim();

    if (!username || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    toast.success("Form submitted successfully!");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-card text-card-foreground rounded-2xl p-10 w-[90%] max-w-xl flex flex-col gap-4 ">
        <div className="flex items-center gap-4 pb-2 justify-center">
          <img src={butterLogo} className="size-16 md:size-20" />
          <h1 className="text-3xl md:text-4xl">Sign Up</h1>
        </div>

        <div className=" flex flex-col gap-3 py-2">
          <Input
            name="username"
            label="Username"
            value={form.username}
            onChange={handleChange}
            type="text"
          />
          <Input
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            type="email"
          />
          <Input
            name="password"
            label="Password"
            value={form.password}
            onChange={handleChange}
            type="password"
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button text="Sing Up" onClick={handleSubmit} />
          <div className="sm:text-lg">Already have an account?</div>
          <Button
            text="Sign In"
            onClick={() => navigate("/signin")}
            variant="secondary"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;

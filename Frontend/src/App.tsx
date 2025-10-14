import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { useAuthUser } from "./context/userContextProvider";

import type { UserGetMe } from "./types/userTypes";
import { getMe } from "./services/userServices";

import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";

function App() {
  const { authUser, setAuthUser } = useAuthUser();
  const { data } = useQuery<UserGetMe, Error>({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: !authUser,
  });

  useEffect(() => {
    if (
      !!data &&
      data !== undefined &&
      typeof data === "object" &&
      "_id" in data
    )
      setAuthUser(data);
  }, [data, setAuthUser]);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/signup"
            element={authUser !== null ? <Navigate to="/home" /> : <Signup />}
          />
          <Route
            path="/login"
            element={authUser !== null ? <Navigate to="/home" /> : <Signin />}
          />

          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

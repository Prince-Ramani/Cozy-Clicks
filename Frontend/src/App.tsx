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
import Layout from "./layouts/MainLayout/MainLayout";
import Home from "./pages/Home";
import Ideas from "./pages/Ideas";
import { ThemeProvider } from "./Components/theme-provider";
import Profile from "./pages/Profile";

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
    ) {
      setAuthUser(data);
    } else if (authUser !== null) {
      setAuthUser(null);
    }
  }, [data, setAuthUser, authUser]);

  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
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

            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="ideas" element={<Ideas />} />

              <Route path="profile/:profileID" element={<Profile />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;

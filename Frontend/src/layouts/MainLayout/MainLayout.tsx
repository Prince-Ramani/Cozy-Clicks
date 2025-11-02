import { Outlet } from "react-router-dom";
import Header from "./MainHeader";
const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

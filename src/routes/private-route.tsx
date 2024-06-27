import useAuthStore from "@/store/auth";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { user, token } = useAuthStore();

  return user && token ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default PrivateRoute;

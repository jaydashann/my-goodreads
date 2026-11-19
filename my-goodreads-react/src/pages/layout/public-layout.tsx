import { Navigate, Outlet } from "react-router-dom";
import LoaderBox from "../../components/loader-box";
import useGetUserProfile from "../../hooks/auth/useGetUserProfile";

export default function PublicLayout() {
  const { data, isLoading } = useGetUserProfile();
  if (isLoading) {
    return <LoaderBox isVisible />;
  }

  if (data) {
    return <Navigate to={data} />;
  }

  return <Outlet />;
}

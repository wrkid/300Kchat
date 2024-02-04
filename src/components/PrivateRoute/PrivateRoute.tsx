import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/types/authTypes";

interface IProp {
  children?: ReactNode
}

const PrivateRoute: React.FC<IProp> = ({children}) => {
  const { isAuth, loading } = useSelector((state: RootState) => state.auth);

  if (isAuth) {
    return children;
  }

  if ( loading ) return null;

  return <Navigate to="/login"/>;
}

export default PrivateRoute;
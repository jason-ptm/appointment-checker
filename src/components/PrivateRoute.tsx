import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "../context/useContenxt";

interface PrivateRouteProps {
  children: ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { state, dispatch } = useContext();
  const { accessToken } = state.data;
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const validateUserToken = async () => {
      setIsValid(!!accessToken);
    };

    validateUserToken();
  }, [accessToken, dispatch]);

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

export default LoginPage;

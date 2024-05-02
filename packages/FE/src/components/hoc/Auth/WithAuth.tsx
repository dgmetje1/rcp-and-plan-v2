import { memo, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "@/context/Auth/AuthContext";

import { Api } from "@/lib/api";
import { useGetAccount } from "@/queries/users";

const withAuth = (Component: React.FC) => {
  return memo(props => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [isUserLogged, setIsUserLogged] = useState(false);
    const { data: account, isLoading: isAccountLoading } =
      useGetAccount(isUserLogged);

    useEffect(() => {
      if (isAuthenticated && !isLoading) {
        getAccessTokenSilently().then(token => {
          Api.setAccessToken(token);
          setIsUserLogged(true);
        });
      } else if (!isLoading) {
        Api.clearAccessToken();
        setIsUserLogged(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading]);

    const contextValue = useMemo(
      () => ({ account, isAccountLoading }),
      [account, isAccountLoading],
    );
    return (
      <AuthContext.Provider value={contextValue}>
        <Component {...props} />
      </AuthContext.Provider>
    );
  });
};

export default withAuth;

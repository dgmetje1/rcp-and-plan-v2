import { memo, Suspense, useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AuthContext from "@/context/Auth/AuthContext";

import Loader from "@/components/common/Loader";
import { Api } from "@/lib/api";
import { useGetAccount } from "@/queries/users";
import { Navigate } from "@tanstack/react-router";

const withAuth = (Component: React.FC) => {
  return memo(props => {
    const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [{ accessToken, isAccessTokenLoading }, setAccessTokenInfo] = useState({
      accessToken: "",
      isAccessTokenLoading: false,
    });

    const { data: account, isLoading: isAccountLoading } = useGetAccount(!!accessToken && !isAccessTokenLoading);

    useEffect(() => {
      if (isAuthenticated && !isLoading) {
        setAccessTokenInfo(oldValue => ({
          ...oldValue,
          isAccessTokenLoading: true,
        }));
        getAccessTokenSilently().then(accessToken => {
          Api.setAccessToken(accessToken);
          setAccessTokenInfo({ accessToken, isAccessTokenLoading: false });
        });
      } else if (!isLoading) {
        Api.clearAccessToken();
        setAccessTokenInfo({ accessToken: "", isAccessTokenLoading: false });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, isLoading]);

    const contextValue = useMemo(
      () => ({ account, isAccountLoading, accessToken, isAccessTokenLoading }),
      [accessToken, account, isAccessTokenLoading, isAccountLoading],
    );

    if (isLoading || isAccountLoading) return <Loader />;
    if (accessToken && !account) return <Navigate to="register" />;
    return (
      <AuthContext.Provider value={contextValue}>
        <Suspense fallback={<Loader />}>
          <Component {...props} />
        </Suspense>
      </AuthContext.Provider>
    );
  });
};

export default withAuth;

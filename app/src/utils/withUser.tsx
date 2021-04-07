import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@context/auth.context';
import { useUser } from '@hooks/useAuth';
import Loader from '@components/Elements/Loader';

const withUser = <P extends Record<string, unknown>>(
  Component: React.ComponentType<P>,
  redirect = ''
) => {
  return (props: P) => {
    const [isLoading, setISloading] = useState(true);
    const { isAuthenticated, setAuth } = useAuth();
    const router = useRouter();
    const { user, loadUser } = useUser();

    useEffect(() => {
      if (!isAuthenticated) {
        const onLoad = async () => {
          if (!isAuthenticated) {
            await loadUser();
            setISloading(false);
          }
        };
        onLoad();
      } else {
        setISloading(false);
      }
    }, []);

    useEffect(() => {
      if (user) {
        setAuth(user);
      }
    }, [user]);

    if (redirect && !isAuthenticated && !isLoading) {
      router.push(redirect);
    }

    if (isLoading) {
      return <Loader block />;
    }

    return <Component {...props} />;
  };
};

export default withUser;

import { useRouter } from 'next/router';
import { useToast } from '@context/toast.context';
import withUser from '@utils/withUser';
import { useEffect } from 'react';

const Index = () => {
  const router = useRouter();
  const { setToast } = useToast();

  useEffect(() => {
    const { query } = router;
    if (query.message && query.message === 'account-deleted') {
      setToast({ message: 'Your account has been deleted successfully.' });
    }
  }, []);
  return <div>hello</div>;
};

export default withUser(Index);

import { useRouter } from 'next/router';
import withUser from '@utils/withUser';

const Items = () => {
  const router = useRouter();
  return <h1>{router.query.id}</h1>;
};

export default withUser(Items);

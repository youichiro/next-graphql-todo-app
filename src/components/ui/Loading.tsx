import { Center, Spinner } from '@chakra-ui/react';

const Loading: React.FC = () => {
  return (
    <Center my='32px'>
      <Spinner />
    </Center>
  );
};

export default Loading;

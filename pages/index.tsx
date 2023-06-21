import type { GetServerSideProps, NextPage } from "next";

// eslint-disable-next-line react/function-component-definition
const HomePage: NextPage = () => null;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/docs",
      permanent: true,
    },
  };
};

export default HomePage;

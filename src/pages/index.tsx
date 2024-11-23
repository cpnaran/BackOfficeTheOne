import { GetServerSideProps } from "next";

export default function IndexPage() {
  return <div />;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

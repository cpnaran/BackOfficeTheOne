import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, []);

  return null;
};

export default NotFound;

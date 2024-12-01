

import  { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { FIRST_PAGE } from "../share/sideBar/sideBar.utils";
import { RootState, useAppDispatch} from "@/redux/store";
import session from "@/utils/session";
import { includePaths } from "./layout.utils";
// import { setLayout } from "@/redux/slices/layout/layoutSlice";

export const useLayout = () => {
   const router = useRouter();  
  const header = useSelector((state: RootState) => state.layout.header);
  const footer = useSelector((state: RootState) => state.layout.footer);
  const sidebar = useSelector((state: RootState) => state.layout.sidebar);
  const error = useSelector((state:RootState) => state.error)
  const { pathname, asPath,locale, query } = router;

   const token =useSelector((state: RootState) => state.login.token);
  const dispatch = useAppDispatch();
    


  useEffect(() => {
  const savedUser = session.getKeyStorage("user");
    if (savedUser) {
      if (pathname === "/login") {
        router.replace({ pathname: "/dashboard" });
      }
    } else {
      console.log("No user data found in sessionStorage.");
      if (!includePaths.includes(pathname)) {
        router.replace({ pathname: "/login" });
      }
    }
  }, [dispatch, pathname]);



   useEffect(() => {
    if (
      error &&
      error.code &&
      error.code === "UNAUTHORIZED" 
      
    ) {
        router.replace({ pathname: "/login" });
    }
  }, [error, dispatch]);

  return {
    header,
    footer,
    pathname,
    asPath,
    locale,
    query,
    sidebar 
  };
};

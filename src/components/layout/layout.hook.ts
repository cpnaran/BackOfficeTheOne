

import  { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { FIRST_PAGE } from "../share/sideBar/sideBar.utils";
import { RootState} from "@/redux/store";
import session from "@/utils/session";
// import { setLayout } from "@/redux/slices/layout/layoutSlice";

export const useLayout = () => {
   const router = useRouter();  
  const header = useSelector((state: RootState) => state.layout.header);
  const footer = useSelector((state: RootState) => state.layout.footer);
  const sidebar = useSelector((state: RootState) => state.layout.sidebar);
  const { pathname, asPath,locale, query } = router;
   const savedUser = session.getKeyStorage("user");
   const token =useSelector((state: RootState) => state.login.token);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
   
  //   router.push({ pathname: "/login" });


  
  // }, []);
   useEffect(() => {
    if (savedUser) {
      // ถ้ามี savedUser เปลี่ยนเส้นทางไปที่หน้าแดชบอร์ด
      router.push("/dashboard");
    } else {
      // ถ้าไม่มี savedUser เปลี่ยนเส้นทางไปที่หน้าล็อกอิน
      router.push("/login");
    } 
  }, [savedUser]);

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

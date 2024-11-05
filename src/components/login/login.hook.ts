import { setLayout } from "@/redux/slices/layout/layoutSlice";
import { RootState, useAppDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { LoginFormKeysProps } from "./login.types";
import { login } from "@/redux/slices/login/loginActions";
import { request } from "https";
import { LoginRequest } from "@/redux/types/loginSlice.types";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
export const useLoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
 const loading = useSelector((state: RootState) => state.login.loading);
  useEffect(() => {
    dispatch(
      setLayout({ header: false, main: true, footer: true, sidebar: false })
    );
  }, [dispatch]);

  const handleSubmit = (value: LoginFormKeysProps) => {
    const request: LoginRequest = {
      username: value.username,
      password: value.password,
    };
    dispatch(login(request, (e) => {
      if(e === false) {
        toast.error("เกิดข้อผิดพลาด กรุณากรอกข้อมูลใหม่", {
            position: "top-right", // You can change position as needed
            autoClose: 5000, // Auto close after 5 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
      }else {
       router.push("/dashboard");
      }
    }));
  };
  return { handleSubmit,loading };
};

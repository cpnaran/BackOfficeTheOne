import { DrawertypeProps } from "./drawer.type";
import { LIST_MENU } from "../sideBar/sideBar.utils";
import { IoIosArrowForward } from "react-icons/io";
import { useDrawer } from "./drawer.hook";
import { Drawer } from "antd";
import styles from "./drawer.module.css";
import Image from "next/image";
import session from "@/utils/session";
const DrawerContainer = ({ open, onClose }: DrawertypeProps) => {
  const { navigation, router } = useDrawer();

  return (
    <Drawer
      placement={"left"}
      open={open}
      key={"left"}
      maskClosable={true} // Enable close on outside click
      onClose={onClose}
      closeIcon={
        <IoIosArrowForward
          style={{
            color: "#ffffff",
            fontSize: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
          onClick={onClose}
        /> // เปลี่ยนสีของไอคอนปิด
      }
      width={200}
      style={{ backgroundColor: "#0f141c" }}
    >
      <div className={styles.nav}>
        <div
          style={{
            width: "100%",
            position: "relative",
            justifyContent: "center",
            display: "flex",
            paddingTop: "24px",
          }}
        >
          <Image
            src={"/images/logo_one.png"}
            width={150}
            height={150}
            alt={""}
          />
        </div>
        {LIST_MENU.map((e, i) => (
          <div
            key={i}
            className={styles.button}
            onClick={() => {
              navigation(e.path);
              onClose();
            }}
          >
            {e.name}
          </div>
        ))}
        <div
          className={styles.button}
          onClick={() => {
            session.clearLogout();
            router.push("/login");
          }}
        >
          Logout
        </div>
      </div>
    </Drawer>
  );
};

export default DrawerContainer;

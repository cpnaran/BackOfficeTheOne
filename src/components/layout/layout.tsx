import { LayoutContainerProps } from "./layout.types";
import styles from "./layout.module.css";
import { useLayout } from "./layout.hook";
import SidebarMain from "../share/sideBar";
import Header from "../share/header/header";
const Layout: React.FC<LayoutContainerProps> = ({ children }) => {
  const { asPath, pathname, sidebar, header } = useLayout();
  return (
    <div className={styles.container}>
      <main>
        {sidebar && (
          <div className={styles.sidebar}>
            <SidebarMain asPath={asPath} pathname={pathname} />
          </div>
        )}
        <div
          className={
            pathname == "/login" ? styles.contentLogin : styles.content
          }
        >
          {header && <Header />}
          {children}
        </div>
      </main>
      {/* <MainFooter /> */}
    </div>
  );
};

export default Layout;

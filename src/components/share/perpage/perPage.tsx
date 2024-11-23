import styles from "./perPage.module.css";

import { usePerPage } from "./perPage.hooks";
import { PerPageProps } from "./perPage.types";
import SvgIcon from "../svgIcon/svgIcon";

const PerPage = ({ perPage, handleClick }: PerPageProps) => {
  const { isOpen, toggleDropdown } = usePerPage();

  return (
    <div
      className={styles.container}
      onMouseEnter={() => toggleDropdown(true)}
      onMouseLeave={() => toggleDropdown(false)}
    >
      <p>แสดง {perPage} รายการ</p>
      <SvgIcon
        icon={"navbarChevronDown"}
        width={16}
        height={16}
        className={styles.arrow}
        // className={
        //   orderBy === "asc" ? styles.arrow : cx(styles.arrow, styles.rotation)
        // }
      />
      {isOpen && (
        <div className={styles.wrapper}>
          <ul className={styles.dropdown}>
            {/* <li
              onClick={() => {
                handleClick(1);
                toggleDropdown(false);
              }}
            >
              1
            </li>
            <li
              onClick={() => {
                handleClick(2);
                toggleDropdown(false);
              }}
            >
              2
            </li> */}
            <li
              onClick={() => {
                handleClick(10);
                toggleDropdown(false);
              }}
            >
              10
            </li>
            <li
              onClick={() => {
                handleClick(25);
                toggleDropdown(false);
              }}
            >
              25
            </li>
            <li
              onClick={() => {
                handleClick(50);
                toggleDropdown(false);
              }}
            >
              50
            </li>
            <li
              onClick={() => {
                handleClick(100);
                toggleDropdown(false);
              }}
            >
              100
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default PerPage;

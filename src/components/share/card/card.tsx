import { itemCardProps } from "./card.types";
import styles from "./card.module.css";
import cx from "classnames";
const Card = ({ item, className }: itemCardProps) => {
  return (
    <div className={cx(styles.container, className)}>
      <div className={styles.content}>
        <div className={styles.displayTop}>
        <span className={styles.title}>{item.title}</span>
        <div>
        <div className={styles.iconDiv}>
        {item.icons}
        </div>
        </div>
        </div>
        <div className={styles.hr_line}></div>
        </div>
        <span className={styles.number}>{item.total} </span>
        <span className={styles.detail}></span>
      </div>
  );
};




export default Card;

import { format } from "date-fns";
import { MockData } from "../types/data";
import styles from "./ProductItem.module.css";

export default function ProductItem({ ...rest }: MockData) {
  const { productName, price, boughtDate } = rest;

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h3 className={styles.title}>{productName}</h3>
        <span className={styles.date}>
          {format(new Date(boughtDate), "yyyy-MM-dd hh:mm")}
        </span>
      </div>
      <span className={styles.price}>$ {price}</span>
    </div>
  );
}

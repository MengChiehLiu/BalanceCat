/* eslint-disable react/destructuring-assignment */
import { format } from "date-fns";
import styles from "@/styles/assetsOverview/assetsbar.module.scss";
// test2
export default function AssetsBar({ asset }) {
  const formattedDate = format(new Date(asset.timestamp), "yyyy/MM/dd");
  return (
    <div className={styles.wrapper}>
      <p className={styles.name}>{asset.subject.name}</p>
      <p>{formattedDate}</p>
      <p>$ {asset.initial_value.toLocaleString()}</p>
      <p>$ {asset.book_value.toLocaleString()}</p>
      <p>$ {(asset.initial_value - asset.book_value).toLocaleString()}</p>
      <button type="submit">details</button>
    </div>
  );
}

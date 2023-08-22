import Image from "next/image";
import Link from "next/link";
import styles from "../styles/navbar.module.scss";

export default function NavBar() {
  return (
    <div className={styles.wrapper}>
      {/* <div /> */}
      <div className={styles.leftBar}>
        <Image src="/cat.png" width={50} height={50} className={styles.image} />

        <Link href="/" className={` ${styles.title}`}>
          Balance Cat
        </Link>
        <Link href="/userpage" className={styles.link}>
          個人頁面
        </Link>
        <Link href="/balancesheet" className={styles.link}>
          資產負債表
        </Link>
        <Link href="/incomestatement" className={styles.link}>
          綜合損益表
        </Link>
        <Link href="/balancesheet" className={styles.link}>
          support
        </Link>
      </div>
      <div className={styles.rightBar}>
        <button type="submit">Sign In</button>
        <button type="submit" className={styles.freeTrial}>
          Start free trial
        </button>
      </div>
    </div>
  );
}

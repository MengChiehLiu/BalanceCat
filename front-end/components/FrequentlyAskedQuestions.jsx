import Image from "next/image";
import { useState } from "react";
import styles from "../styles/frequentlyaskedquestions.module.scss";

export default function FrequentlyAskedQuestions() {
  const [about, setAbout] = useState(false);
  const [AR, setAR] = useState(false);
  const [depreciation, setDepreciation] = useState(false);
  const [BS, setBS] = useState(false);
  const [PL, setPL] = useState(false);
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>常見問題一覽</p>
      <div className={styles.blueBox}>
        <div className={styles.bar}>
          <p>關於</p>
          {about ? (
            <Image
              src="/up_vector.png"
              height={16}
              width={16}
              onClick={() => setAbout(!about)}
            />
          ) : (
            <Image
              src="/vector.png"
              height={16}
              width={16}
              onClick={() => setAbout(!about)}
            />
          )}
        </div>
        <hr />
        {about && (
          <p>
            這是一個用會計學的方式來記帳的網站，我們的目標是採「應計基礎」來衡量損益依照權利或責任發生與否來決定收入與費用的歸屬期間。我希望通過我的記帳網站，可以幫助更多的人建立起更健康的財務習慣，更明智地管理金錢。請隨時來訪，體驗一下這個簡單而強大的財務工具吧！
          </p>
        )}

        <div className={styles.bar}>
          <p>什麼是應收帳款？</p>
          {AR ? (
            <Image
              src="/up_vector.png"
              height={16}
              width={16}
              onClick={() => setAR(!AR)}
            />
          ) : (
            <Image
              src="/vector.png"
              height={16}
              width={16}
              onClick={() => setAR(!AR)}
            />
          )}
        </div>
        <hr />
        {AR && (
          <p>
            應收帳款是指公司出售商品或提供服務給客戶，但客戶還沒有支付相應款項的金額。簡單來說，它是公司等待從客戶那裡收取的錢，通常是由於商品銷售或服務提供而產生的。這個金額被視為公司的應收款項，因為客戶有義務在之後的一定時間內支付。
          </p>
        )}

        <div className={styles.bar}>
          <p>什麼是折舊？</p>
          {depreciation ? (
            <Image
              src="/up_vector.png"
              height={16}
              width={16}
              onClick={() => setDepreciation(!depreciation)}
            />
          ) : (
            <Image
              src="/vector.png"
              height={16}
              width={16}
              onClick={() => setDepreciation(!depreciation)}
            />
          )}
        </div>
        <hr />
        {depreciation && (
          <p>
            折舊是一種會計上的概念，它用來表示長期資產（如設備、機器、車輛等）隨著時間的過去和使用而價值逐漸減少的情況。簡單地說，折舊是資產價值減少的方式，就像是物品因為長時間的使用而損耗或磨損。折舊費用的紀錄可以使財務報表更加準確地反映公司或個人的資產價值，而不是只考慮初始成本。
          </p>
        )}

        <div className={styles.bar}>
          <p>什麼是資產負債表？</p>
          {BS ? (
            <Image
              src="/up_vector.png"
              height={16}
              width={16}
              onClick={() => {
                setBS(!BS);
              }}
            />
          ) : (
            <Image
              src="/vector.png"
              height={16}
              width={16}
              onClick={() => {
                setBS(!BS);
              }}
            />
          )}
        </div>
        <hr />
        {BS && (
          <p>
            資產負債表是一份會計報表，它提供了一個關於一個人或公司財務狀況的快速概述。這份報表主要分為兩個主要部分：資產和負債。
          </p>
        )}

        <div className={styles.bar}>
          <p>什麼是綜合損益表？</p>
          {PL ? (
            <Image
              src="/up_vector.png"
              height={16}
              width={16}
              onClick={() => setPL(!PL)}
            />
          ) : (
            <Image
              src="/vector.png"
              height={16}
              width={16}
              onClick={() => setPL(!PL)}
            />
          )}
        </div>
        <hr />
        {PL && (
          <p>
            綜合損益表是一份會計報表，它顯示了一家公司或一個人在一定時間內（通常是一年）的綜合收入和支出情況。
          </p>
        )}
      </div>
    </div>
  );
}

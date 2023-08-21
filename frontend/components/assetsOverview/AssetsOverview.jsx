// import Image from "next/image";
import { useState } from "react";
import Image from "next/image";
import LiabilityBar from "@/components/assetsOverview/LiabilityBar";
import assets from "@/mockdata/getNonExpired";
import styles from "@/styles/assetsOverview/overview.module.scss";
import AssetsBar from "./AssetsBar";

export default function AssetsOverview() {
  const [assetButton, setAssetButton] = useState(true);
  const [liabilityButton, setLiabilityButton] = useState(false);
  const [arButton, setARButton] = useState(false);
  const [apButton, setAPButton] = useState(false);
  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>資產概況</p>
      <div className={styles.buttons}>
        <button
          type="submit"
          className={assetButton && styles.blueButton}
          onClick={() => {
            setAssetButton(true);
            setLiabilityButton(false);
            setARButton(false);
            setAPButton(false);
          }}
        >
          資產
        </button>
        <button
          type="submit"
          className={liabilityButton && styles.blueButton}
          onClick={() => {
            setAssetButton(false);
            setLiabilityButton(true);
            setARButton(false);
            setAPButton(false);
          }}
        >
          負債
        </button>
        <button
          type="submit"
          className={arButton && styles.blueButton}
          onClick={() => {
            setAssetButton(false);
            setLiabilityButton(false);
            setARButton(true);
            setAPButton(false);
          }}
        >
          應收
        </button>
        <button
          type="submit"
          className={apButton && styles.blueButton}
          onClick={() => {
            setAssetButton(false);
            setLiabilityButton(false);
            setARButton(false);
            setAPButton(true);
          }}
        >
          應付
        </button>
      </div>
      <hr />
      {assetButton && (
        <div className={styles.table}>
          <div className={styles.titleBar}>
            <p className={styles.name}>物品名稱</p>
            <p>購買日期</p>
            <p>購買金額</p>
            <p>物品現值</p>
            <p>累計折舊</p>
            <button type="submit" id={styles.none}>
              更多細節
            </button>
          </div>
          <hr />
          {assets.map((asset) => (
            <div key={asset.id}>
              <AssetsBar asset={asset} />
              <hr />
            </div>
          ))}
          {assets.map.length <= 5 && (
            <div className={styles.catBar}>
              <Image
                src="/starcat.png"
                width={100}
                height={100}
                alt="cat"
                className={styles.cat}
              />
              <div className={styles.dialog}>
                <span className={styles.text}>
                  最近比較少記帳喵？要多多記帳喔喵嗚嗚嗚～
                </span>
                <Image
                  src="/Container.svg"
                  width={30}
                  height={30}
                  alt="dialog"
                  className={styles.leg}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {liabilityButton && (
        <div className={styles.table}>
          <div className={styles.titleBar}>
            <p className={styles.name}>物品名稱</p>
            <p>購買日期</p>
            <p>初始金額</p>
            <p>剩於負債</p>
            <p>累計還款</p>
            <button type="submit" id={styles.none}>
              更多細節
            </button>
          </div>
          <hr />
          {assets.map((liability) => (
            <div key={liability.id}>
              <LiabilityBar liability={liability} />
              <hr />
            </div>
          ))}
          {assets.map.length <= 5 && (
            <div className={styles.catBar}>
              <Image
                src="/starcat.png"
                width={100}
                height={100}
                alt="cat"
                className={styles.cat}
              />
              <div className={styles.dialog}>
                <span className={styles.text}>
                  最近比較少記帳喵？要多多記帳喔喵嗚嗚嗚～
                </span>
                <Image
                  src="/Container.svg"
                  width={30}
                  height={30}
                  alt="dialog"
                  className={styles.leg}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {arButton && (
        <div className={styles.table}>
          <div className={styles.titleBar}>
            <p className={styles.name}>物品名稱</p>
            <p>購買日期</p>
            <p>初始金額</p>
            <p>未收取欠款</p>
            <p>已收取欠款金額</p>
            <button type="submit" id={styles.none}>
              更多細節
            </button>
          </div>
          <hr />
          {assets.map((asset) => (
            <div key={asset.id}>
              <AssetsBar asset={asset} />
              <hr />
            </div>
          ))}
          {assets.map.length <= 5 && (
            <div className={styles.catBar}>
              <Image
                src="/starcat.png"
                width={100}
                height={100}
                alt="cat"
                className={styles.cat}
              />
              <div className={styles.dialog}>
                <span className={styles.text}>
                  最近比較少記帳喵？要多多記帳喔喵嗚嗚嗚～
                </span>
                <Image
                  src="/Container.svg"
                  width={30}
                  height={30}
                  alt="dialog"
                  className={styles.leg}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {apButton && (
        <div className={styles.table}>
          <div className={styles.titleBar}>
            <p className={styles.name}>物品名稱</p>
            <p>購買日期</p>
            <p>初始金額</p>
            <p>剩於欠款</p>
            <p>累計還款</p>
            <button type="submit" id={styles.none}>
              更多細節
            </button>
          </div>
          <hr />
          {assets.map((liability) => (
            <div key={liability.id}>
              <LiabilityBar liability={liability} />
              <hr />
            </div>
          ))}
          {assets.map.length <= 5 && (
            <div className={styles.catBar}>
              <Image
                src="/starcat.png"
                width={100}
                height={100}
                alt="cat"
                className={styles.cat}
              />
              <div className={styles.dialog}>
                <span className={styles.text}>
                  最近比較少記帳喵？要多多記帳喔喵嗚嗚嗚～
                </span>
                <Image
                  src="/Container.svg"
                  width={30}
                  height={30}
                  alt="dialog"
                  className={styles.leg}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

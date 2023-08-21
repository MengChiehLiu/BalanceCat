// import { Inter } from "next/font/google";
import React, { useState } from "react";
import styles from "../../styles/accountsbox.module.scss";
import SelectAccount from "./SelectAccount";
import SelectAdd from "./SelectAdd";

// const inter = Inter({
//   weight: "400",
//   subsets: ["latin"],
// });

export default function AccountsBox({ isDebit, addBox }) {
  const [isDescriptionVisible, setDescriptionVisible] = useState(false);
  return (
    <div
      className={styles.container}
      style={{ background: isDebit ? "#7af98e" : "#CCE8FE" }}
    >
      <div className={styles.content}>
        <div className={styles.accountSelectBox}>
          <div className={styles.icon}>
            <p>$</p>
          </div>

          <SelectAccount />
        </div>
        <label htmlFor="amoutInput" className={styles.amoutInput}>
          <input type="text" id="amoutInput" />
        </label>

        <label
          htmlFor="descriptionInput"
          className={styles.descriptionInput}
          style={{ display: isDescriptionVisible ? "block" : "none" }}
        >
          <p>註解</p>
          <textarea type="text" id="descriptionInput" />
        </label>
        {/* <div
          className={styles.circle}
          role="button"
          aria-label="add the input box"
          tabIndex={0}
          onClick={() => setDescriptionVisible(!isDescriptionVisible)}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              setDescriptionVisible(!isDescriptionVisible);
            }
          }}
          style={{
            backgroundImage: isDescriptionVisible
              ? "url('/minus.png')"
              : "url('/add.png')",
          }}
        /> */}
        <SelectAdd
          isDebit={isDebit}
          addBox={addBox}
          isDescriptionVisible={isDescriptionVisible}
          setDescriptionVisible={setDescriptionVisible}
        />
      </div>
    </div>
  );
}

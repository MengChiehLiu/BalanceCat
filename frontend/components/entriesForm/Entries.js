import Button from "@mui/material/Button";
import React, { useState } from "react";
import AccountsBox from "./AccountsBox";
import DateSelector from "../DateSelector";
import styles from "../../styles/entries.module.scss";

export default function Entries() {
  const [debitBoxes, setDebitBoxes] = useState([]);
  const [creditBoxes, setCreditBoxes] = useState([]);

  function addNewDebitBox() {
    setDebitBoxes((prevBoxes) => [
      ...prevBoxes,
      <AccountsBox
        key={prevBoxes.length}
        isDebit
        addBox={() => addNewDebitBox()}
      />,
    ]);
  }
  function addNewCreditBox() {
    setCreditBoxes((prevBoxes) => [
      ...prevBoxes,
      <AccountsBox key={prevBoxes.length} addBox={() => addNewCreditBox()} />,
    ]);
  }
  return (
    <div className={styles.container}>
      <DateSelector />
      <div className={styles.accountboxs}>
        <div className={styles.debitboxs}>
          <AccountsBox isDebit addBox={() => addNewDebitBox()} />

          {debitBoxes}
        </div>
        <div className={styles.creditboxs}>
          <AccountsBox isDebit={false} addBox={() => addNewCreditBox()} />
          {creditBoxes}
        </div>
      </div>
      <Button variant="contained" className={styles.btn}>
        提交
      </Button>
    </div>
  );
}

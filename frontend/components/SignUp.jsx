import { Button } from "@mui/material";
import useSWRMutation from "swr/mutation";
import { useState } from "react";
import swal from "sweetalert";
import styles from "@/styles/signup.module.scss";
import PwdInput from "./PwdInput";
import InputBox from "./InputBox";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function sendRequest(url, { arg }) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  })
    .then((response) => response)
    .then((data) => [data, data.json()])

    .catch((error) => {
      console.error("Error:", error);
    });
}

export default function SignUp({ setIsLogIn }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // eslint-disable-next-line no-unused-vars
  const { trigger, isMutating } = useSWRMutation(
    `${API_URL}users/signup`,
    sendRequest,
  );

  const handleSignUp = () => {
    // Here you can call your POST API with the collected data
    console.log(email, username, password, confirmPassword);
    trigger({ name: username, email, password }).then(async (data) => {
      const response = data[0];
      // const userData = await data[1]; //it would it you the user data(token user_id and provider which now is native)
      if (response.status === 403) {
        swal("Error", "Email Already Exists", "error");
      }
      if (response.status === 400) {
        swal("Error", "Client Error Response", "error");
      }
      if (response.status === 500) {
        swal(
          "Error",
          "Something's wrong. Please try again later or notify our engineering team",
          "info",
        );
      }
      if (response.status === 200) {
        setIsLogIn(true);
      }
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title_container}>
        <p className={styles.circle} />
        <p className={styles.title}>Balance Cat</p>
      </div>

      <p className={styles.free}>START FOR FREE</p>
      <div className={styles.sentence}>
        <p className={styles.new}>Create new account</p>
        <p className={styles.period}>.</p>
      </div>
      <div className={styles.member_login}>
        <p className={styles.member}>Already A Member?</p>
        <p
          className={styles.login}
          onClick={() => {
            setIsLogIn(true);
          }}
          aria-hidden="true"
        >
          Log In
        </p>
      </div>
      <div className={styles.inputs}>
        <InputBox isEmail email={email} setEmail={setEmail} />
        <InputBox isUsername username={username} setUsername={setUsername} />
        <PwdInput password={password} setPassword={setPassword} />
        <PwdInput
          confirm
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
        />
        <br />
        <Button
          onClick={handleSignUp}
          variant="contained"
          sx={{
            width: "20ch",
            backgroundColor: "#4481f4",
            borderRadius: "15px",
          }}
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}

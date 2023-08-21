import { Button } from "@mui/material";
import useSWRMutation from "swr/mutation";
import swal from "sweetalert";
import cookieCutter from "cookie-cutter";
import { useRouter } from "next/router";
import { useState } from "react";
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
      // eslint-disable-next-line no-console
      console.error("Error:", error);
    });
}

export default function SignIn({ setIsLogIn }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // eslint-disable-next-line no-unused-vars
  const { trigger, isMutating } = useSWRMutation(
    `${API_URL}users/signin`,
    sendRequest,
  );

  const handleSignIn = () => {
    // Here you can call your POST API with the collected data
    trigger({ email, password }).then(async (data) => {
      const response = data[0];
      const userData = await data[1];
      if (response.status === 403) {
        swal(
          "Error",
          "Wrong Password, User Not Found, Wrong provider",
          "error",
        );
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
        // setIsLoginPage(true);
        router.push("/");

        // Cookies.set('token', userData.data.access_token, { secure: true, httpOnly: true });

        cookieCutter.set("id", userData.data.user.id);
        cookieCutter.set("token", userData.data.access_token);
        cookieCutter.set("username", userData.data.user.name);
      }
    });
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.title_container}>
        <p className={styles.circle} />
        <p className={styles.title}>Balance Cat</p>
      </div>

      <p className={styles.free}>CONTINUE YOUT JOURNEY</p>
      <div className={styles.sentence}>
        <p className={styles.new}>Member Sign In</p>
        <p className={styles.period}>.</p>
      </div>
      <div className={styles.member_login}>
        <p className={styles.member}>Not A Member?</p>
        <p
          className={styles.login}
          onClick={() => {
            setIsLogIn(false);
          }}
          aria-hidden="true"
        >
          Sign Up
        </p>
      </div>
      <div className={styles.inputs}>
        <br />
        <InputBox isEmail email={email} setEmail={setEmail} />
        <br />
        <PwdInput password={password} setPassword={setPassword} />
        <br />
        <Button
          onClick={handleSignIn}
          variant="contained"
          sx={{
            fontWeight: "600",
            width: "20ch",
            backgroundColor: "#4481f4",
            borderRadius: "15px",
          }}
        >
          SIGN IN
        </Button>
      </div>
    </div>
  );
}

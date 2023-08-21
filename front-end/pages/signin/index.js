import { useState } from "react";
import Image from "next/image";
import Cookies from "cookies";
import SignUp from "@/components/SignUp";
import CardTemplate from "@/components/cardTemplate/CardTemplate";
import styles from "@/styles/loginpage.module.scss";
import SignIn from "@/components/SignIn";
import Sun from "@/components/Sun";

export default function LogInPage() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const handleModeChange = () => {
    setOpacity(0);
    setTimeout(() => {
      setIsLogIn(!isLogIn);
      setOpacity(1);
    }, 300);
  };
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0f0f15",
      }}
    >
      <Sun />
      <CardTemplate
        // backgroundStyle={{
        //   background: "linear-gradient(180deg, #0d0221 0%, #090630 100%)",
        // }}
        style={{
          width: "70vw",
          background: "linear-gradient(to bottom right, #fff, #acb5c2)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
          display: "flex",
          justifyContent: "space-between",
          border: "none",
        }}
      >
        <div className={styles.wrapper} style={{ opacity }}>
          {isLogIn ? (
            <SignIn setIsLogIn={handleModeChange} />
          ) : (
            <SignUp setIsLogIn={handleModeChange} />
          )}
        </div>
        <Image
          src="/newastro.png"
          alt="astro pic "
          width={400}
          height={400}
          style={{ alignSelf: "flex-end" }}
        />
      </CardTemplate>
    </div>
  );
}

export const getServerSideProps = ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token") || null;

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
    },
  };
};

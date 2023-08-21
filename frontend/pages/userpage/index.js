import Avatar from "@mui/material/Avatar";
import React from "react";
// import YearPicker from "@/components/YearPicker";
import Cookies from "cookies";
import CardTemplate from "@/components/cardTemplate/CardTemplate";
import DataCard from "@/components/userpage/DataCard";
import SideBar from "@/components/SideBar";
import SwitchBar from "@/components/userpage/SwitchBar";
import PlanCard from "@/components/userpage/PlanCard";
import Sun from "@/components/Sun";
import styles from "../../styles/userpage.module.scss";

export default function UserPage({ token, userId, username }) {
  console.log(token);
  console.log(userId);
  console.log(username);
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
        style={{
          display: "flex",
          background: "linear-gradient(to bottom right, #fff, #acb5c2)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
          border: "none",
        }}
      >
        <SideBar />
        <div className={styles.container}>
          <div className={styles.topcontainer}>
            <div className={styles.personalinfo}>
              <div className={styles.name}>
                <Avatar
                  alt="Personal"
                  src="/pic.jpg"
                  sx={{ width: 56, height: 56 }}
                />
                <p style={{ fontSize: "20px" }}>Tony，歡迎回來</p>
              </div>
              <PlanCard />
            </div>
            <div style={{ display: "flex", gap: "30px" }}>
              <DataCard
                isDebitCard
                // color="linear-gradient(to bottom, #d0eed7, #e0f8fc)"
                color="#fffcf7"
              />
              <DataCard
                color="#e6f0f2"
                // color="linear-gradient(to bottom, #e3f2ff, #dbe9ff)"
              />
            </div>
          </div>
          <div
            style={{
              borderRadius: "20px",
              backgroundColor: "#fff",
              // width: "95%",
              margin: "0px 30px 30px",
              boxShadow: "0 0 10px rgb(0,0,0,0.2)",
            }}
          >
            <SwitchBar />
          </div>
        </div>
      </CardTemplate>
    </div>
  );
}

export const getServerSideProps = ({ req, res }) => {
  const cookies = new Cookies(req, res);
  const token = cookies.get("token");
  const userId = cookies.get("id");
  const username = cookies.get("username") || null;

  if (!token) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: {
      token,
      userId,
      username,
    },
  };
};

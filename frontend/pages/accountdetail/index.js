import { Handjet, DotGothic16 } from "next/font/google";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Cookies from "cookies";
import SubjectDetail from "@/components/SubjectDetial";
// import DatePicker from "@/components/DatePicker";
import DateRangePickerValue from "@/components/DatePicker";
import CardTemplate from "@/components/cardTemplate/CardTemplate";
import SideBar from "@/components/SideBar";
import styles from "./detail.module.scss";

const dot = DotGothic16({
  weight: "400",
  // subsets: ["cyrillic"],
  subsets: ["latin"],
});
const handjet = Handjet({
  weight: "400",
  subsets: ["latin"],
});
export default function DetailPage({ token, userId, username }) {
  console.log(token);
  console.log(userId);
  console.log(username);
  return (
    <CardTemplate
      backgroundStyle={{
        background: "linear-gradient(180deg, #0d0221 0%, #090630 100%)",
      }}
      style={{
        display: "flex",
        gap: "15%",
        background: "linear-gradient(to bottom right, #fff, #acb5c2)",
        boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
        border: "none",
      }}
    >
      <SideBar />
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <div className={styles.title_calender}>
            <div className={styles.titles}>
              <p className={`${dot.className} ${styles.title}`}>現金</p>
              <p className={`${handjet.className} ${styles.subtitle}`}>cash</p>
            </div>
            <div className={styles.calender}>
              <DateRangePickerValue />
            </div>
          </div>
          <SubjectDetail />
        </div>
      </div>
    </CardTemplate>
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

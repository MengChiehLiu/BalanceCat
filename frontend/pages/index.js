// import { useState, useEffect } from "react";
// import { useSpring, animated } from "@react-spring/web";
// import Image from "next/image";
// import { Silkscreen } from "next/font/google";
// import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
// import AssetsOverview from "@/components/assetsOverview/AssetsOverview";
// import Entries from "@/components/entriesForm/Entries";
// import Footer from "@/components/Footer";
// import styles from "@/styles/home.module.scss";
// import CardTemplate from "@/components/cardTemplate/CardTemplate";
// import SideBar from "@/components/SideBar";
// import Sun from "@/components/Sun";

// const silk = Silkscreen({
//   weight: ["400"],
//   subsets: ["latin"],
// });

// export default function Home() {
//   const [activeCard, setActiveCard] = useState(0);

//   const animation = useSpring({
//     opacity: 1,
//     transform: "translate3d(0,0px,0)",
//     from: { opacity: 0, transform: "translate3d(0,40px,0)" },
//     reset: true,
//   });

//   useEffect(() => {
//     const handleScroll = () => {
//       const { scrollY, innerHeight } = window;
//       const newActiveCard = Math.floor(scrollY / innerHeight);
//       setActiveCard(newActiveCard);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div
//       style={{
//         width: "100vw",
//         height: "100vh",
//         backgroundColor: "#0f0f15",
//       }}
//     >
//       <Sun />
//       <div className={styles.wrapper}>
//         {[0, 1, 2].map((item, index) => (
//           <div key={index} style={{ height: "100vh", width: "100%" }}>
//             {item === activeCard ? (
//               <animated.div style={animation}>
//                 {item === 0 && (
//                   <div
//                     style={{
//                       width: "100vw",
//                       height: "100vh",
//                       backgroundColor: "#0f0f15",
//                     }}
//                   >
//                     <Sun />
//                     <CardTemplate
//                       style={{
//                         display: "flex",
//                         background:
//                           "linear-gradient(to bottom right, #fff, #acb5c2)",
//                         boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
//                         border: "none",
//                       }}
//                     >
//                       <SideBar />
//                       <div className={styles.box}>
//                         <div className={styles.title_entries}>
//                           <p className={`${silk.className} ${styles.title}`}>
//                             You always
//                           </p>
//                           <p className={`${silk.className} ${styles.title}`}>
//                             are winner
//                           </p>
//                           <Entries />
//                         </div>
//                       </div>
//                       <Image
//                         src="/astrocat.png"
//                         alt="cat pic"
//                         width={300}
//                         height={300}
//                         className={styles.cat}
//                         style={{
//                           borderRadius: "30%",
//                           transform: "translateX(-50%)",
//                           animation: "bounce 2s infinite",
//                         }}
//                       />
//                     </CardTemplate>
//                   </div>
//                 )}
//                 {item === 1 && (
//                   <div
//                     style={{
//                       width: "100vw",
//                       height: "100vh",
//                       backgroundColor: "#0f0f15",
//                     }}
//                   >
//                     <Sun />
//                     <CardTemplate
//                       style={{
//                         display: "flex",
//                         gap: "2rem",
//                         background:
//                           "linear-gradient(to bottom right, #fff, #acb5c2)",
//                         boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
//                         border: "none",
//                       }}
//                     >
//                       <SideBar />
//                       <AssetsOverview />
//                     </CardTemplate>
//                   </div>
//                 )}
//                 {item === 2 && (
//                   <div
//                     style={{
//                       width: "100vw",
//                       height: "100vh",
//                       backgroundColor: "#0f0f15",
//                     }}
//                   >
//                     <Sun />
//                     <CardTemplate
//                       style={{
//                         display: "flex",
//                         background:
//                           "linear-gradient(to bottom right, #fff, #acb5c2)",
//                         boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
//                         border: "none",
//                       }}
//                     >
//                       <SideBar />
//                       <div style={{ alignSelf: "center", width: "100%" }}>
//                         <FrequentlyAskedQuestions />
//                       </div>
//                     </CardTemplate>
//                   </div>
//                 )}
//               </animated.div>
//             ) : (
//               <div
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   backgroundColor: "#0f0f15",
//                   // backgroundColor: "red",
//                 }}
//               >
//                 <Sun />
//               </div>
//             )}
//           </div>
//         ))}
//         <Footer />
//       </div>
//     </div>
//   );
// }
// 上述是動畫
import Image from "next/image";
import { Silkscreen } from "next/font/google";
import Cookies from "cookies";
import FrequentlyAskedQuestions from "@/components/FrequentlyAskedQuestions";
import AssetsOverview from "@/components/assetsOverview/AssetsOverview";
import Entries from "@/components/entriesForm/Entries";
import Footer from "@/components/Footer";
import styles from "@/styles/home.module.scss";
import CardTemplate from "@/components/cardTemplate/CardTemplate";
import SideBar from "@/components/SideBar";

const silk = Silkscreen({
  weight: ["400"],
  subsets: ["latin"],
});

export default function Home({ token, userId, username }) {
  console.log(token);
  console.log(userId);
  console.log(username);
  return (
    <div className={styles.wrapper}>
      <CardTemplate
        backgroundStyle={{
          background: "linear-gradient(180deg, #0d0221 0%, #090630 100%)",
        }}
        style={{
          display: "flex",
          background: "linear-gradient(to bottom right, #fff, #acb5c2)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
          border: "none",
        }}
      >
        <SideBar />
        <div className={styles.box}>
          <div className={styles.title_entries}>
            <p className={`${silk.className} ${styles.title}`}>You always</p>
            <p className={`${silk.className} ${styles.title}`}>are winner</p>
            <Entries />
          </div>
        </div>
        <Image
          src="/astrocat.png"
          alt="cat pic"
          width={300}
          height={300}
          className={styles.cat}
          style={{
            borderRadius: "30%",
            // position: "absolute",
            // bottom: "20px",
            // left: "50%",
            transform: "translateX(-50%)",
            animation: "bounce 2s infinite",
          }}
        />
      </CardTemplate>
      <style>
        {`
          /* 定義彈跳動畫 */
          @keyframes bounce {
            0%,
            100% {
              transform: translateY(0); /* 初始和結束狀態為不移動 */
            }
            50% {
              transform: translateY(-20px); /* 中間狀態為向上移動 */
            }
          }
        `}
      </style>

      <CardTemplate
        backgroundStyle={{
          background: "linear-gradient(180deg, #0d0221 0%, #090630 100%)",
        }}
        style={{
          display: "flex",
          gap: "2rem",
          background: "linear-gradient(to bottom right, #fff, #acb5c2)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
          border: "none",
        }}
      >
        <SideBar />
        <AssetsOverview />
      </CardTemplate>

      <CardTemplate
        backgroundStyle={{
          background: "linear-gradient(180deg, #0d0221 0%, #090630 100%)",
        }}
        style={{
          display: "flex",
          background: "linear-gradient(to bottom right, #fff, #acb5c2)",
          boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
          border: "none",
        }}
      >
        <SideBar />
        <div style={{ alignSelf: "center", width: "100%" }}>
          <FrequentlyAskedQuestions />
        </div>
      </CardTemplate>
      <Footer />
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

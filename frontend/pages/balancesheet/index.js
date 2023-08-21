import Cookies from "cookies";
import Sheet from "@/components/Sheet";
// import NavBar from "@/components/NavBar";
import CardTemplate from "@/components/cardTemplate/CardTemplate";
import SideBar from "@/components/SideBar";

export default function BalanceSheetPage({ token, userId, username }) {
  console.log(token);
  console.log(userId);
  console.log(username);
  const data = [
    {
      name: "資產",
      subtitle: "Assets",
      value: 1000,
      lastMonthValue: 800,
      children: [
        {
          name: "流動資產",
          subtitle: "Current Assets",
          value: 1000,
          lastMonthValue: 800,
          children: [
            {
              name: "現金",
              subtitle: "Cash",
              value: 500,
              lastMonthValue: 900,
            },
            {
              name: "股票",
              subtitle: "Stock",
              value: 500,
              lastMonthValue: 900,
            },
            {
              name: "應收帳款",
              subtitle: "Accounts receivable",
              value: 500,
              lastMonthValue: 900,
            },
            {
              name: "其他",
              subtitle: "Others",
              value: 500,
              lastMonthValue: 900,
            },
          ],
        },
        {
          name: "非流動資產",
          subtitle: "Non-Current Assets",
          value: 1500,
          lastMonthValue: 900,
          children: [
            {
              name: "車子",
              subtitle: "Cars",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "房子",
              subtitle: "Houses",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "電子設備",
              subtitle: "3C",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "家電",
              subtitle: "Home Appliances",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "預付款",
              subtitle: "Prepayments",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "其他",
              subtitle: "Others",
              value: 1500,
              lastMonthValue: 900,
            },
          ],
        },
      ],
    },
    {
      name: "負債",
      subtitle: "Liabilities",
      value: 1000,
      lastMonthValue: 800,
      children: [
        {
          name: "流動負債",
          subtitle: "Current Liabilities",
          value: 500,
          lastMonthValue: 900,
          children: [
            {
              name: "信用卡",
              subtitle: "Credit Card",
              value: 500,
              lastMonthValue: 900,
            },
            {
              name: "應付帳款",
              subtitle: "Accounts Payable",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "其他",
              subtitle: "Others",
              value: 1500,
              lastMonthValue: 900,
            },
          ],
        },
        {
          name: "非流動負債",
          subtitle: "Non-Current Liabilities",
          value: 1000,
          lastMonthValue: 900,
          children: [
            {
              name: "分期付款",
              subtitle: "Installment",
              value: 1000,
              lastMonthValue: 900,
            },
            {
              name: "車貸",
              subtitle: "Car Loan",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "房貸",
              subtitle: "Mortgage",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "其他",
              subtitle: "Others",
              value: 1500,
              lastMonthValue: 900,
            },
          ],
        },
      ],
    },
  ];
  return (
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
      <Sheet data={data} />
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

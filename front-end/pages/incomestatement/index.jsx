import Cookies from "cookies";
import Sheet from "@/components/Sheet";
import SideBar from "@/components/SideBar";
import CardTemplate from "@/components/cardTemplate/CardTemplate";

export default function BalanceSheetPage({ token, userId, username }) {
  console.log(token);
  console.log(userId);
  console.log(username);
  const data = [
    {
      name: "收入",
      subtitle: "Income",
      value: 1000,
      lastMonthValue: 800,
      children: [
        {
          name: "經常性收入",
          subtitle: "Regular Income",
          value: 1000,
          lastMonthValue: 800,
          children: [
            {
              name: "薪資收入",
              subtitle: "Salary",
              value: 500,
              lastMonthValue: 900,
            },
            {
              name: "利息收入",
              subtitle: "Interest Income",
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
          name: "非經常性收入",
          subtitle: "Irregular Income",
          value: 1500,
          lastMonthValue: 900,
          children: [
            {
              name: "兼職收入",
              subtitle: "Part-time Income",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "中獎",
              subtitle: "Prize Winnings",
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
      name: "支出",
      subtitle: "Expenses",
      value: 1000,
      lastMonthValue: 800,
      children: [
        {
          name: "固定支出",
          subtitle: "Fixed Expenses",
          value: 500,
          lastMonthValue: 900,
          children: [
            { name: "食", subtitle: "Food", value: 500, lastMonthValue: 900 },
            {
              name: "衣",
              subtitle: "Clothing",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "住",
              subtitle: "Housing",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "孝親",
              subtitle: "Support Parents",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "折舊",
              subtitle: "Depreciation",
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
          name: "非固定支出",
          subtitle: "Variable Expenses",
          value: 1000,
          lastMonthValue: 900,
          children: [
            { name: "食", subtitle: "Food", value: 1000, lastMonthValue: 900 },
            {
              name: "衣",
              subtitle: "Clothing",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "住",
              subtitle: "Housing",
              value: 1500,
              lastMonthValue: 900,
            },
            {
              name: "孝親",
              subtitle: "Support Parents",
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
        boxShadow: "0 0 40px rgba(255, 255, 255, 1)",
        background: "linear-gradient(to bottom right, #fff, #acb5c2)",
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

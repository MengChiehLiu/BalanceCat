// 流動資產
import WavesIcon from "@mui/icons-material/Waves";
import CurrencyYenIcon from "@mui/icons-material/CurrencyYen";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SoapIcon from "@mui/icons-material/Soap";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
// 非流動資產
import VolcanoIcon from "@mui/icons-material/Volcano";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import EdgesensorLowIcon from "@mui/icons-material/EdgesensorLow";
import LocalLaundryServiceIcon from "@mui/icons-material/LocalLaundryService";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
// 流動負債
import CreditCardIcon from "@mui/icons-material/CreditCard";
import AddToHomeScreenIcon from "@mui/icons-material/AddToHomeScreen";
// 非流動負債
import ReceiptIcon from "@mui/icons-material/Receipt";
import CarCrashIcon from "@mui/icons-material/CarCrash";
import NoMeetingRoomIcon from "@mui/icons-material/NoMeetingRoom";
// 經常性
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import WorkIcon from "@mui/icons-material/Work";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// 非經常性
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import KebabDiningIcon from "@mui/icons-material/KebabDining";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import BedIcon from "@mui/icons-material/Bed";
import Face2Icon from "@mui/icons-material/Face2";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Label from "@mui/icons-material/Label";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import FaceIcon from "@mui/icons-material/Face";
import GmailTreeView from "@/components/GmailTreeView";
// import UploadButton from "@/components/UploadButton";

const assetsData = [
  {
    nodeId: "1",
    labelText: "流動資產",
    labelIcon: WavesIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "3",
        labelText: "現金",
        labelIcon: CurrencyYenIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "4",
        labelText: "股票",
        labelIcon: ShowChartIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "5",
        labelText: "應收帳款",
        labelIcon: SoapIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "6",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
  {
    nodeId: "2",
    labelText: "非流動資產",
    labelIcon: VolcanoIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "7",
        labelText: "車子",
        labelIcon: DirectionsCarIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "8",
        labelText: "房子",
        labelIcon: MapsHomeWorkIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "9",
        labelText: "電子設備",
        labelIcon: EdgesensorLowIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "10",
        labelText: "家電",
        labelIcon: LocalLaundryServiceIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "11",
        labelText: "預付款",
        labelIcon: PriceCheckIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "12",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
];
const assets = [
  {
    nodeId: "0",
    labelText: "資產", // 新增一個外層資產節點
    labelIcon: Label, // 設置相關圖示
    labelInfo: "300",
    children: assetsData, // 使用傳入的資料作為子節點
  },
];
const liabilityData = [
  {
    nodeId: "14",
    labelText: "流動負債",
    labelIcon: WavesIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "16",
        labelText: "信用卡",
        labelIcon: CreditCardIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "17",
        labelText: "應付帳款",
        labelIcon: AddToHomeScreenIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "18",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
  {
    nodeId: "15",
    labelText: "非流動負債",
    labelIcon: VolcanoIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "19",
        labelText: "分期付款",
        labelIcon: ReceiptIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "20",
        labelText: "車貸",
        labelIcon: CarCrashIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "21",
        labelText: "房貸",
        labelIcon: NoMeetingRoomIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "22",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
];
const liability = [
  {
    nodeId: "13",
    labelText: "負債", // 新增一個外層資產節點
    labelIcon: Label, // 設置相關圖示
    labelInfo: "300",
    children: liabilityData, // 使用傳入的資料作為子節點
  },
];
const incomeData = [
  {
    nodeId: "24",
    labelText: "經常性收入",
    labelIcon: AccessAlarmIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "26",
        labelText: "薪資收入",
        labelIcon: WorkIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "27",
        labelText: "利息收入",
        labelIcon: AccountBalanceIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "28",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
  {
    nodeId: "25",
    labelText: "非經常性收入",
    labelIcon: AlarmOffIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "29",
        labelText: "兼職收入",
        labelIcon: TwoWheelerIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "30",
        labelText: "中獎",
        labelIcon: EmojiEventsIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "31",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
];
const income = [
  {
    nodeId: "23",
    labelText: "收入", // 新增一個外層資產節點
    labelIcon: Label, // 設置相關圖示
    labelInfo: "300",
    children: incomeData, // 使用傳入的資料作為子節點
  },
];
const expensesData = [
  {
    nodeId: "33",
    labelText: "固定支出",
    labelIcon: AccessAlarmIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "35",
        labelText: "食",
        labelIcon: KebabDiningIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "36",
        labelText: "衣",
        labelIcon: CheckroomIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "37",
        labelText: "住",
        labelIcon: BedIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "38",
        labelText: "孝親",
        labelIcon: Face2Icon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "39",
        labelText: "折舊",
        labelIcon: ArrowCircleDownIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "40",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
  {
    nodeId: "34",
    labelText: "非固定支出",
    labelIcon: AlarmOffIcon,
    labelInfo: "90",
    children: [
      {
        nodeId: "41",
        labelText: "食",
        labelIcon: KebabDiningIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "42",
        labelText: "衣",
        labelIcon: CheckroomIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "43",
        labelText: "住",
        labelIcon: BedIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "44",
        labelText: "孝親",
        labelIcon: Face2Icon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
      {
        nodeId: "45",
        labelText: "其他",
        labelIcon: MoreHorizIcon,
        labelInfo: "90",
        color: "#1a73e8",
        bgColor: "#e8f0fe",
        colorForDarkMode: "#B8E7FB",
        bgColorForDarkMode: "#071318",
      },
    ],
  },
];
const expense = [
  {
    nodeId: "32",
    labelText: "支出", // 新增一個外層資產節點
    labelIcon: Label, // 設置相關圖示
    labelInfo: "300",
    children: expensesData, // 使用傳入的資料作為子節點
  },
];
const settings = [
  {
    nodeId: "-1",
    labelText: "設定目標",
    labelIcon: FlagIcon,
    children: [...assets, ...liability, ...income, ...expense],
  },
];
const personal = [
  {
    nodeId: "0",
    labelText: "個人資料設定",
    labelIcon: PersonIcon,
    children: [
      {
        nodeId: "1",
        labelText: "設定大頭貼",
        labelIcon: FaceIcon,
      },
    ],
  },
];

export default function Settings() {
  return (
    <>
      <GmailTreeView isPersonal data={personal} />
      <GmailTreeView isPersonal={false} data={settings} />
      {/* <UploadButton /> */}
    </>
  );
}

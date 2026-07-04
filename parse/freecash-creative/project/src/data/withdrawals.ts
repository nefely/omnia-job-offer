import type { Brand } from "./cashout";

export type WithdrawalStatus = "Pending" | "Completed" | "Rejected";

export interface Withdrawal {
  id: string;
  brand: Brand;
  type: string; // display name, e.g. "Paypal"
  reward: string; // "$ 3.75"
  email: string; // "-" when none
  txId: string; // "" when none
  date: string; // "191 days ago"
  status: WithdrawalStatus;
}

export const withdrawals: Withdrawal[] = [
  {
    id: "w1",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 23.50",
    email: "-",
    txId: "",
    date: "191 days ago",
    status: "Completed",
  },
  {
    id: "w2",
    brand: "visa",
    type: "Visa Prepaid",
    reward: "$ 84.30",
    email: "-",
    txId: "",
    date: "42 days ago",
    status: "Completed",
  },
  {
    id: "w3",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 34.50",
    email: "-",
    txId: "",
    date: "12 days ago",
    status: "Completed",
  },
  {
    id: "w4",
    brand: "bitcoin",
    type: "Bitcoin",
    reward: "$ 52.40",
    email: "-",
    txId: "",
    date: "9 days ago",
    status: "Completed",
  },
  {
    id: "w5",
    brand: "litecoin",
    type: "Litecoin",
    reward: "$ 71.90",
    email: "-",
    txId: "",
    date: "7 days ago",
    status: "Completed",
  },
  {
    id: "w6",
    brand: "visa",
    type: "Visa Prepaid",
    reward: "$ 38.75",
    email: "-",
    txId: "",
    date: "5 days ago",
    status: "Completed",
  },
  {
    id: "w7",
    brand: "dogecoin",
    type: "Dogecoin",
    reward: "$ 95.30",
    email: "-",
    txId: "",
    date: "3 days ago",
    status: "Completed",
  },
  {
    id: "w8",
    brand: "paypal",
    type: "Paypal",
    reward: "$ 44.10",
    email: "-",
    txId: "",
    date: "1 day ago",
    status: "Completed",
  },
];

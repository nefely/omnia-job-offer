import { Navigate, Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import Earn from "./screens/Earn";
import MyOffers from "./screens/MyOffers";
import Cashout from "./screens/Cashout";
import MyWithdrawals from "./screens/MyWithdrawals";
import Rewards from "./screens/Rewards";
import Profile from "./screens/Profile";

/**
 * App — route map for the WebView platform. Tabs render inside AppShell
 * (top bar + bottom nav). Earn is built; the rest are placeholders until
 * their designs arrive.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/earn" replace />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/my-offers" element={<MyOffers />} />
        <Route path="/cashout" element={<Cashout />} />
        <Route path="/withdrawals" element={<MyWithdrawals />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/rewards" element={<Rewards />} />
      </Route>
      <Route path="*" element={<Navigate to="/earn" replace />} />
    </Routes>
  );
}

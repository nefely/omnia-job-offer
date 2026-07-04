import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";
import TopBar from "./TopBar";
import "./AppShell.css";

/**
 * AppShell — the WebView frame. Caps width to a phone form-factor,
 * hosts the top balance bar, a scrollable content slot, and the
 * bottom tab navigation. Individual screens render into <Outlet/>.
 */
export default function AppShell() {
  return (
    <div className="app-shell">
      <div className="app-viewport">
        <TopBar />
        <main className="app-content">
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  );
}

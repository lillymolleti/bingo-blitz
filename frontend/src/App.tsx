import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef } from "react";
import Login from "./pages/Login"; // Assuming you have a Login component
import Root from "./Root";
import { customizedToast } from "../src/utils/toast"; // Assuming you have a utility function

export default function App() {
  const switchCountRef = useRef<number>(0);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        switchCountRef.current += 1;
        if (switchCountRef.current >= 3) {
          customizedToast({ type: "error", message: "⚠️ Test submitted due to multiple tab switches!" });
          // TODO: Add test submission logic here
        } else {
          customizedToast({ type: "warn", message: `⚠️ Tab switching is not allowed! (${switchCountRef.current}/3)` });
        }
      }
    };

    const handleBlur = () => {
      customizedToast({ type: "warn", message: "⚠️ Do not leave the test window!" });
    };

    const disableRightClick = (e: MouseEvent) => e.preventDefault();

    const disableDevTools = (e: KeyboardEvent) => {
      if (e.ctrlKey && ["u", "U", "s", "S", "i", "I", "j", "J", "c", "C", "v", "V"].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "F12") {
        e.preventDefault();
      }
    };

    const disableCopy = (e: ClipboardEvent) => {
      e.preventDefault();
      customizedToast({ type: "warn", message: "⚠️ Copying is not allowed!" });
    };

    const disablePaste = (e: ClipboardEvent) => {
      e.preventDefault();
      customizedToast({ type: "warn", message: "⚠️ Pasting is not allowed!" });
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);
    // document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableDevTools);
    document.addEventListener("copy", disableCopy);
    document.addEventListener("paste", disablePaste);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
      // document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableDevTools);
      document.removeEventListener("copy", disableCopy);
      document.removeEventListener("paste", disablePaste);
    };
  }, []);

  return (
    <RecoilRoot>
      <ToastContainer position="top-center" autoClose={3000} />
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export function Dashboard() {
  return <div>Dashboard</div>;
}

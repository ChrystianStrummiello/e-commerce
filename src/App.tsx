import { Outlet } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

export function App() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

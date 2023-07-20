import { Outlet } from "react-router-dom";
import "./App.module.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <>
      <RecoilRoot>
        <Header />
        <Outlet />
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;

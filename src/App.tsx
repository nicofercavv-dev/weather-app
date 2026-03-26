import { Outlet } from "react-router";
import "./App.css";
import Footer from "./presentation/components/footer/Footer";
import Header from "./presentation/components/header/Header";

function App() {
  return (
    <div className="template-container">
      <Header />
      <main data-testid="page-content-container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;

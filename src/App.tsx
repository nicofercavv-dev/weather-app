import { Outlet } from "react-router";
import Footer from "./presentation/components/footer/Footer";
import Header from "./presentation/components/header/Header";
import { PageContentContainer, TemplateContainer } from "./App.styles";

function App() {
  return (
    <TemplateContainer>
      <Header />
      <PageContentContainer data-testid="page-content-container">
        <Outlet />
      </PageContentContainer>
      <Footer />
    </TemplateContainer>
  );
}

export default App;

import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import HomePage from "./presentation/pages/home/HomePage.tsx";
import CadastrarPage from "./presentation/pages/cadastrar/CadastrarPage.tsx";
import ListarPage from "./presentation/pages/listar/ListarPage.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "cadastrar",
        element: <CadastrarPage />,
      },
      {
        path: "listar",
        element: <ListarPage />,
      },
    ],
  },
]);

import { Provider } from "react-redux";
import { Outlet } from "react-router";

import { store } from "./store/store";
import { DocumentLayout } from "./layout/DocumentLayout";
import { RootErrorBoundary } from "./layout/RootErrorBoundary";
import { rootLinks } from "./layout/rootLinks";
import "./app.css";

export const links = rootLinks;

export const Layout = DocumentLayout;

export default function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export const ErrorBoundary = RootErrorBoundary;

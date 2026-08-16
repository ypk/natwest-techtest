import { Outlet } from "react-router";

import { DocumentLayout } from "./layout/DocumentLayout";
import { RootErrorBoundary } from "./layout/RootErrorBoundary";
import { rootLinks } from "./layout/rootLinks";
import "./app.css";

export const links = rootLinks;

export const Layout = DocumentLayout;

export default function App() {
  return <Outlet />;
}

export const ErrorBoundary = RootErrorBoundary;

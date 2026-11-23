import { createRoot } from "react-dom/client";
import App from "./App";
import { getPagePath } from "./content";

createRoot(document.getElementById("root")!).render(
  <App path={getPagePath(window.location.pathname)} />,
);

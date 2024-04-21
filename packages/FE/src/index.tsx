import React from "react";
import ReactDOM from "react-dom/client";
import "@/i18n";

import Main from "./Main.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
);

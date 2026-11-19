import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { App } from "./App.tsx";
import "./index.css";
import ReactQueryProvider from "./provider/ReactQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactQueryProvider>
      <RouterProvider router={App} />
    </ReactQueryProvider>
  </StrictMode>,
);

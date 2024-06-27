import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@/globals.css";

import { Toaster } from "@/components/ui/toaster";
import Provider from "./components/provider.tsx";
// import AppContextProvider from "./contexts/app-context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./global.css";
import { SidebarProvider } from "./hooks/contexts/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

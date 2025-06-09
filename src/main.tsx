import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { App } from "./App.tsx";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider.tsx";
import { Toaster } from "sonner";
import { Login } from "./components/Login.tsx";
import { Home } from "./components/Home.tsx";
import { Checkout } from "./components/Checkout.tsx";
import { ProductDatail } from "./components/ProductDatail.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="product/:id" element={<ProductDatail />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </ThemeProvider>
  </React.StrictMode>
);

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import DonatePage from "./pages/DonatePage";
import ToastStack from "./components/ToastStack";
import type { ToastMessage } from "./types";
import { ToastContext } from "./toast-context";

function PageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const titles: Record<string, string> = {
      "/": "НИХУ-AI — AI-продукт, который делает НИХУ-AI",
      "/about": "О нас — НИХУ-AI",
      "/donate": "Поддержать НИХУ-AI",
    };
    const descriptions: Record<string, string> = {
      "/": "Сатирический AI-SaaS для генерации пользователей, выручки, отзывов и ощущения успеха.",
      "/about": "История компании, которая появилась раньше собственного продукта.",
      "/donate": "Поддержите развитие продукта, которому доверяют НИХУ-AI.",
    };
    document.title = titles[pathname] ?? titles["/"];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", descriptions[pathname] ?? descriptions["/"]);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const notify = useCallback((text: string) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, text }]);
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 4500);
  }, []);

  const toastContext = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={toastContext}>
      <PageMeta />
      <AnimatePresence mode="wait">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="*" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <ToastStack toasts={toasts} />
    </ToastContext.Provider>
  );
}

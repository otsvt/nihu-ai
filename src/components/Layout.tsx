import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { ArrowUpRight, Cookie, Menu, MessageCircle, Send, X } from "lucide-react";
import Footer from "./Footer";

const supportAnswers: Record<string, string> = {
  "Где мой продукт?": "Мы тоже пытаемся это выяснить.",
  "Почему MRR не настоящий?": "Зато график настоящий.",
  "Как отменить отсутствие подписки?": "Отсутствие подписки уже отменено.",
  "Позвать человека": "Единственный человек сейчас оплачивает API.",
};

function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  const homeLink = (hash: string) => (pathname === "/" ? hash : `/${hash}`);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/" aria-label="НИХУ-AI, на главную">
          НИХУ<span>-AI</span>
        </Link>
        <nav className="desktop-nav" aria-label="Основная навигация">
          <a href={homeLink("#features")}>Возможности</a>
          <a href={homeLink("#how")}>Как это работает</a>
          <a href={homeLink("#pricing")}>Тарифы</a>
          <NavLink to="/about">О нас</NavLink>
          <NavLink to="/donate">Донаты</NavLink>
        </nav>
        <a className="button button-small header-cta" href={homeLink("#generator")}>
          Запустить НИХУ-AI
          <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <button
          className="menu-button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Мобильная навигация"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
          >
            <a href={homeLink("#features")}>Возможности</a>
            <a href={homeLink("#how")}>Как это работает</a>
            <a href={homeLink("#pricing")}>Тарифы</a>
            <Link to="/about">О нас</Link>
            <Link to="/donate">Донаты</Link>
            <a className="button" href={homeLink("#generator")}>
              Запустить НИХУ-AI
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function CookieBanner() {
  const [visible, setVisible] = useState(() => localStorage.getItem("nihu-cookie-choice") === null);

  const choose = (choice: string) => {
    localStorage.setItem("nihu-cookie-choice", choice);
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          className="cookie-banner"
          aria-label="Настройки cookies"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 28 }}
        >
          <Cookie aria-hidden="true" />
          <div>
            <strong>Немного обязательной прозрачности</strong>
            <p>Мы используем cookies, чтобы увеличить количество активных пользователей.</p>
          </div>
          <div className="cookie-actions">
            <button className="button button-small" onClick={() => choose("yes")}>
              Монетизировать меня
            </button>
            <button className="text-button" onClick={() => choose("no")}>
              Отклонить реальность
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");

  return (
    <div className="support">
      <AnimatePresence>
        {open && (
          <motion.div
            className="support-panel"
            initial={{ opacity: 0, y: 18, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
          >
            <div className="support-head">
              <div>
                <span className="status-dot" />
                <strong>Поддержка НИХУ-AI</strong>
              </div>
              <button className="icon-button" aria-label="Закрыть чат" onClick={() => setOpen(false)}>
                <X size={18} />
              </button>
            </div>
            <div className="chat-message">Чем я могу вам не помочь?</div>
            <div className="quick-replies">
              {Object.keys(supportAnswers).map((question) => (
                <button key={question} onClick={() => setAnswer(supportAnswers[question])}>
                  {question}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              {answer && (
                <motion.div
                  className="chat-message answer"
                  key={answer}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className="support-button"
        aria-label={open ? "Закрыть поддержку" : "Открыть поддержку"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X /> : <MessageCircle />}
        {!open && <span>Вам не помогут</span>}
      </button>
    </div>
  );
}

export default function Layout() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к содержанию
      </a>
      <Header />
      <main id="main-content">
        <Outlet />
      </main>
      <Footer />
      <CookieBanner />
      <SupportChat />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Send className="sr-only" aria-hidden="true" />
    </>
  );
}

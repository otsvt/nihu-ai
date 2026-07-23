import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bot, BrainCircuit, CreditCard, Gauge, Palette, Rocket, Sparkles, UserRound } from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_ELAPSED_SECONDS = 14 * 60 * 60 + 32 * 60 + 8;
const COMPANY_START_STORAGE_KEY = "nihu-ai-company-started-at";

function getCompanyStartedAt() {
  const storedValue = Number(window.localStorage.getItem(COMPANY_START_STORAGE_KEY));

  if (Number.isFinite(storedValue) && storedValue > 0 && storedValue <= Date.now()) {
    return storedValue;
  }

  const startedAt = Date.now() - INITIAL_ELAPSED_SECONDS * 1000;
  window.localStorage.setItem(COMPANY_START_STORAGE_KEY, String(startedAt));
  return startedAt;
}

function formatElapsedTime(startedAt: number) {
  const totalSeconds = Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds].map((value) => String(value).padStart(2, "0")).join(":");
}
const values = [
  ["Хайп важнее смысла", "Если продукт никто не понимает, значит он просто слишком инновационный.", Sparkles],
  ["Метрики важнее пользователей", "Реальные люди могут уйти. Цифра на лендинге останется.", Gauge],
  ["Скорость важнее направления", "Главное быстро двигаться. Куда — определим после запуска.", Rocket],
  ["Градиенты важнее product-market fit", "С хорошим свечением отсутствие спроса почти незаметно.", Palette],
];

const team = [
  ["ОС", "Основатель", "Публикует результаты раньше, чем открывает аналитику.", UserRound],
  ["AI", "AI-сооснователь", "Соглашается со стратегией после правильно сформулированного запроса.", BrainCircuit],
  ["AI", "AI-разработчик", "Пишет код, который никто в команде не может объяснить.", Bot],
  ["AI", "AI-дизайнер", "Добавляет blur до тех пор, пока интерфейс не начинает выглядеть дорого.", Palette],
  ["AI", "AI-маркетолог", "Превращает одну регистрацию в международный запуск.", Sparkles],
  ["01", "Один уставший человек", "Единственный, у кого есть банковская карта.", CreditCard],
];

export default function AboutPage() {
  const [startedAt] = useState(getCompanyStartedAt);
  const [elapsedTime, setElapsedTime] = useState(() => formatElapsedTime(startedAt));

  useEffect(() => {
    const updateElapsedTime = () => setElapsedTime(formatElapsedTime(startedAt));
    const timer = window.setInterval(updateElapsedTime, 1000);

    updateElapsedTime();
    return () => window.clearInterval(timer);
  }, [startedAt]);
  return (
    <motion.div className="inner-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="inner-hero about-hero">
        <div className="inner-hero-copy">
          <span className="eyebrow">О компании / основана 14 минут назад</span>
          <h1>
            Мы создаём будущее, которого <em>НИХУ-AI</em> не просили
          </h1>
          <p>
            НИХУ-AI появился после того, как наш основатель увидел очередной пост о SaaS, созданном за два дня и уже
            обслуживающем десятки тысяч пользователей.
          </p>
        </div>
        <div className="founding-card">
          <span>Свидетельство о существовании</span>
          <strong>{elapsedTime}</strong>
          <p>Время с момента тщательного анализа рынка</p>
          <div>
            <span /> Компания вероятно существует
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="story-index">01</div>
        <div>
          <span className="eyebrow">История</span>
          <h2>Уверенный старт без лишней подготовки</h2>
        </div>
        <div className="story-copy">
          <p>
            Компания была основана 14 минут назад после тщательного анализа рынка, состоявшего из трёх постов в Threads
            и одного видео на YouTube.
          </p>
          <p>
            Мы заметили, что современному продукту необязательно иметь пользователей, ценность или рабочий функционал.
            Достаточно красивого лендинга, уверенного тона и графика, который идёт вверх.
          </p>
          <p>Так появился НИХУ-AI — платформа, которая создаёт впечатление, что что-то происходит.</p>
        </div>
      </section>

      <section className="section mission">
        <span className="eyebrow">Наша миссия</span>
        <blockquote>Сделать создание видимости бизнеса доступным каждому.</blockquote>
        <p>
          Что отличает нас от конкурентов? <strong>НИХУ-AI</strong>
        </p>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">Ценности</span>
          <h2>Принципы, которые заменяют нам стратегию</h2>
        </div>
        <div className="values-grid">
          {values.map(([title, text, Icon], index) => (
            <motion.article className="value-card" key={title as string} whileHover={{ y: -5 }}>
              <div>
                <Icon />
                <span>0{index + 1}</span>
              </div>
              <h3>{title as string}</h3>
              <p>{text as string}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section team-section" id="team">
        <div className="section-head">
          <span className="eyebrow">Команда</span>
          <h2>Команда, которой доверяют НИХУ-AI</h2>
          <p>Шесть специалистов. Одна банковская карта. Ноль лишних вопросов.</p>
        </div>
        <div className="team-grid">
          {team.map(([initials, name, text, Icon], index) => (
            <motion.article
              className="team-card"
              key={name as string}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="team-avatar">
                <span>{initials as string}</span>
                <Icon />
              </div>
              <h3>{name as string}</h3>
              <p>{text as string}</p>
              <small>{index === 5 ? "человек · на связи" : "нейросеть · вероятно на связи"}</small>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="section about-final">
        <p>За всё время существования компании нам доверили свои задачи</p>
        <strong>НИХУ-AI</strong>
        <Link className="button" to="/donate">
          Присоединиться к НИХУ-AI
        </Link>
      </section>
    </motion.div>
  );
}

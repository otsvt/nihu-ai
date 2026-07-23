import { useContext, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BarChart3,
  Bot,
  Check,
  ChevronDown,
  Clipboard,
  Copy,
  Layers3,
  MessageSquareQuote,
  MousePointer2,
  RefreshCw,
  Rocket,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  UserRoundPlus,
  WandSparkles,
  Zap,
} from "lucide-react";
import { ToastContext } from "../toast-context";
import { activityItems, formatNumber, generateMetrics } from "../lib";
import type { SuccessMetrics } from "../types";
import Modal from "../components/Modal";

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionHead({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <motion.div
      className="section-head"
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6 }}
    >
      <span className="eyebrow">{label}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </motion.div>
  );
}

function DashboardPreview() {
  const [users, setUsers] = useState(48291);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = window.setInterval(() => setUsers((value) => value + Math.floor(Math.random() * 11)), 2400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="dashboard-wrap"
      initial={{ opacity: 0, y: 32, rotateX: 4 }}
      animate={{ opacity: 1, y: 0, rotateX: tilt.y, rotateY: tilt.x }}
      transition={{ delay: 0.25, duration: 0.8 }}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 3,
          y: -((event.clientY - rect.top) / rect.height - 0.5) * 3,
        });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="dashboard-top">
        <div>
          <span className="dashboard-kicker">Центр доказательств</span>
          <strong>Сводка роста</strong>
        </div>
        <div className="live-status">
          <span />
          Система работает
        </div>
      </div>
      <div className="dashboard-metrics">
        <div>
          <span>MRR</span>
          <strong>₽3,8 млн</strong>
          <small>+340%</small>
        </div>
        <div>
          <span>Пользователи</span>
          <strong>{formatNumber(users)}</strong>
          <small>+4 283</small>
        </div>
        <div>
          <span>Конверсия</span>
          <strong>87,4%</strong>
          <small>Без проверки</small>
        </div>
      </div>
      <div className="chart-card">
        <div className="chart-labels">
          <span>Динамика выдуманного спроса</span>
          <span>₽4 млн</span>
        </div>
        <div className="bar-grid">
          {[18, 24, 31, 36, 51, 62, 78, 96].map((height, index) => (
            <motion.i
              key={height}
              initial={{ height: 0 }}
              animate={{ height: `${height}%` }}
              transition={{ duration: 0.7, delay: 0.7 + index * 0.08 }}
            />
          ))}
          <div className="chart-line">
            <span />
          </div>
        </div>
        <small>Рост основан на данных, которые мы только что придумали.</small>
      </div>
      <div className="event-row">
        <Activity size={16} aria-hidden="true" />
        <span>Деплой успешен. Продукт всё ещё отсутствует</span>
        <time>сейчас</time>
      </div>
      <div className="dashboard-stamp">
        <ShieldCheck size={15} />
        Данные подтверждены основателем
      </div>
    </motion.div>
  );
}

function Hero() {
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  return (
    <section
      className="hero"
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setGlow({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      style={
        {
          "--glow-x": `${glow.x}%`,
          "--glow-y": `${glow.y}%`,
        } as React.CSSProperties
      }
    >
      <div className="hero-grid">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="hero-badge">
            <Sparkles size={14} aria-hidden="true" />
            AI SaaS нового поколения
            <span>2026</span>
          </div>
          <h1>
            AI-продукт,
            <br />
            который делает <em>НИХУ-AI</em>
          </h1>
          <p className="hero-lead">
            Автоматизируем НИХУ-AI, масштабируем НИХУ-AI и помогаем вашему бизнесу достичь НИХУ-AI.
          </p>
          <div className="hero-actions">
            <a className="button" href="#generator">
              Попробовать НИХУ-AI
              <ArrowRight size={17} />
            </a>
            <a className="button button-ghost" href="#how">
              <MousePointer2 size={17} />
              Посмотреть, как НИХУ-AI работает
            </a>
          </div>
          <div className="hero-proof">
            <div className="avatar-stack" aria-hidden="true">
              <span>А</span>
              <span>М</span>
              <span>Е</span>
              <span>AI</span>
            </div>
            <p>
              Нам уже доверяют <strong>НИХУ-AI</strong>
            </p>
          </div>
        </motion.div>
        <DashboardPreview />
      </div>
      <div className="hero-orb" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}

function TrustedBy() {
  return (
    <section className="trust-strip" aria-label="Компании, которые нас выбирают">
      <p>Нас выбирают ведущие компании</p>
      <div className="marquee">
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {Array.from({ length: 16 }).map((_, index) => (
                <span key={`${group}-${index}`}>
                  НИХУ-AI <i>·</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <small>
        Нам доверяют <strong>НИХУ-AI</strong>
      </small>
    </section>
  );
}

const featureItems = [
  [
    UserRoundPlus,
    "Генерация пользователей",
    "Введите желаемое количество пользователей — система автоматически добавит их на лендинг.",
  ],
  [BarChart3, "Генерация выручки", "Создаёт красивый график MRR без необходимости что-либо продавать."],
  [MessageSquareQuote, "Генерация отзывов", "Пишет отзывы от людей, которых не существует, о функциях, которых нет."],
  [Clipboard, "Генерация постов", "Создаёт истории о том, как проект получил десятки тысяч пользователей за выходные."],
  [ShieldCheck, "Генерация доверия", "Автоматически добавляет фразу «Нам доверяют НИХУ-AI» во все подходящие места."],
  [Layers3, "Генерация продукта", "В разработке. Пока можно пользоваться лендингом."],
] as const;

function MetricsAndFeatures() {
  return (
    <>
      <section className="section metrics-section">
        <SectionHead label="Проверенные показатели" title="Результаты, которые говорят сами за себя" />
        <motion.div
          className="metrics-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
        >
          {["Активных пользователей", "Платных подписчиков", "Заработано за месяц", "Решено реальных проблем"].map(
            (label, index) => (
              <motion.article className="metric-card" key={label} variants={reveal}>
                <span>0{index + 1} / 04</span>
                <p>{label}</p>
                <strong>НИХУ-AI</strong>
              </motion.article>
            ),
          )}
        </motion.div>
        <p className="section-note">Данные подтверждены самим основателем.</p>
      </section>
      <section className="section" id="features">
        <SectionHead
          label="Возможности"
          title="Всё необходимое для продукта, которого ещё нет"
          text="НИХУ-AI берёт на себя цифры, отзывы, графики и уверенность. Вам остаётся только опубликовать пост."
        />
        <div className="feature-grid">
          {featureItems.map(([Icon, title, text], index) => (
            <motion.article
              className="feature-card"
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <div className="feature-icon">
                <Icon aria-hidden="true" />
              </div>
              <span className="feature-number">/ 0{index + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="feature-state">
                <span /> Доступно для НИХУ-AI пользователей
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}

function HowItWorks() {
  const steps = [
    ["Найдите чужую идею", "Желательно уже реализованную несколько раз."],
    ["Добавьте AI", "Можно просто отправить запрос в чужой API."],
    ["Сделайте красивый лендинг", "Opacity, blur, gradient, glow и карточки, которые немного выезжают при скролле."],
    ["Расскажите о результатах", "Продукт можно доделать и после публикации поста."],
  ];
  return (
    <section className="section how-section" id="how">
      <SectionHead label="Процесс" title="От идеи до выдуманного успеха за четыре шага" />
      <div className="steps">
        {steps.map(([title, text], index) => (
          <motion.article
            key={title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="step-index">{String(index + 1).padStart(2, "0")}</div>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
            <ArrowRight aria-hidden="true" />
          </motion.article>
        ))}
      </div>
      <p className="big-proof">
        В результате вас выбирают <strong>НИХУ-AI</strong>
      </p>
    </section>
  );
}

const stages = [
  "Анализируем отсутствие рынка...",
  "Придумываем пользователей...",
  "Увеличиваем MRR...",
  "Генерируем отзывы CEO...",
  "Подготавливаем пост в Threads...",
];

function SuccessGenerator() {
  const { notify } = useContext(ToastContext);
  const [project, setProject] = useState("");
  const [stage, setStage] = useState(-1);
  const [result, setResult] = useState<SuccessMetrics | null>(null);

  const run = () => {
    const source = project.trim() || "продукт, который делает НИХУ-AI";
    setResult(null);
    setStage(0);
    stages.forEach((_, index) => {
      window.setTimeout(() => setStage(index), index * 420);
    });
    window.setTimeout(
      () => {
        setStage(-1);
        setResult(generateMetrics(source));
      },
      stages.length * 420 + 250,
    );
  };

  const post = result
    ? `Я просто хотел проверить одну гипотезу — ${result.project}, а через ${result.buildTime} получил ${formatNumber(result.users)} пользователей из ${result.countries} стран. Всё сделал с помощью AI, без команды, бюджета и понимания того, что вообще происходит.`
    : "";

  const copy = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(
      `${post}\n${formatNumber(result.subscribers)} платных подписчиков · ₽${formatNumber(result.mrr)} MRR · Рост +${result.growth}%`,
    );
    notify("Готово. НИХУ-AI успешно сохранено.");
  };

  return (
    <section className="section generator-section" id="generator">
      <div className="generator-shell">
        <div className="generator-copy">
          <span className="eyebrow">Главная технология</span>
          <h2>Сгенерируйте успех своего стартапа</h2>
          <p>Опишите, что вы сегодня вайбкодите. Всё остальное мы придумаем сами.</p>
          <label htmlFor="project">Краткое описание будущего единорога</label>
          <div className="generator-input">
            <input
              id="project"
              value={project}
              onChange={(event) => setProject(event.target.value)}
              placeholder="Например: todo-приложение, которое переписывает задачи через AI"
              onKeyDown={(event) => {
                if (event.key === "Enter") run();
              }}
            />
            <button className="button" onClick={run} disabled={stage >= 0}>
              {stage >= 0 ? <RefreshCw className="spin" size={18} /> : <WandSparkles size={18} />}
              {stage >= 0 ? "Генерируем" : "Сгенерировать успех"}
            </button>
          </div>
          <p className="input-note">Без регистрации, проверки фактов и чувства ответственности.</p>
        </div>
        <div className="generator-output" aria-live="polite">
          <AnimatePresence mode="wait">
            {stage >= 0 && (
              <motion.div
                className="stage-panel"
                key="stage"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="orb-loader">
                  <Bot />
                </div>
                <div className="stage-list">
                  {stages.map((text, index) => (
                    <div className={index <= stage ? "done" : ""} key={text}>
                      {index < stage ? <Check size={16} /> : <span />}
                      {text}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            {result && (
              <motion.div
                className="result-card"
                key={result.users}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="result-head">
                  <div>
                    <span className="status-dot" /> Масштабирование завершено
                  </div>
                  <Rocket size={22} />
                </div>
                <h3>Ваш стартап успешно масштабирован</h3>
                <div className="result-metrics">
                  <strong>
                    {formatNumber(result.users)}
                    <span>пользователей</span>
                  </strong>
                  <strong>
                    ₽{formatNumber(result.mrr)}
                    <span>MRR</span>
                  </strong>
                  <strong>
                    +{result.growth}%<span>рост</span>
                  </strong>
                  <strong>
                    {result.countries}
                    <span>стран</span>
                  </strong>
                </div>
                <p className="generated-post">{post}</p>
                <div className="result-facts">
                  <span>{formatNumber(result.subscribers)} платных подписчиков</span>
                  <span>{result.codeLines} строк кода вручную</span>
                  <span>Создано за {result.buildTime}</span>
                </div>
                <div className="result-actions">
                  <button className="button button-small" onClick={copy}>
                    <Copy size={15} /> Скопировать результаты
                  </button>
                  <button className="button button-small button-ghost" onClick={run}>
                    <RefreshCw size={15} /> Сгенерировать ещё
                  </button>
                  <button className="text-button" onClick={() => notify("Публикация успешно опубликована нигде.")}>
                    <Send size={15} /> Опубликовать НИХУ-AI
                  </button>
                </div>
                <small>Все показатели реальны настолько же, насколько и ваш продукт.</small>
              </motion.div>
            )}
            {stage < 0 && !result && (
              <motion.div className="empty-output" key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="empty-orbit">
                  <Sparkles />
                </div>
                <strong>Ожидаем ввод</strong>
                <p>Здесь появится убедительный успех, который можно будет не проверять.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <p className="big-proof">
        Нам доверяют <strong>НИХУ-AI</strong>
      </p>
    </section>
  );
}

function ActivityFeed() {
  const [items, setItems] = useState(() =>
    activityItems.slice(0, 5).map((text, index) => ({
      id: `initial-${index}`,
      text,
    })),
  );

  useEffect(() => {
    let index = 5;
    const timer = window.setInterval(() => {
      const nextItem = {
        id: `activity-${index}`,
        text: activityItems[index % activityItems.length],
      };
      setItems((current) => [nextItem, ...current].slice(0, 5));
      index += 1;
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="section activity-section" id="activity">
      <SectionHead
        label="Прямая трансляция"
        title="Что происходит прямо сейчас"
        text="Лента обновляется быстрее, чем продукт."
      />
      <div className="activity-panel">
        <div className="activity-panel-head">
          <span>
            <Activity size={17} /> Глобальная активность
          </span>
          <span className="live-status">
            <i /> в реальном времени
          </span>
        </div>
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, index) => (
            <motion.div
              className="activity-item"
              key={item.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              layout="position"
            >
              <span className="activity-icon">{index % 2 ? <Zap /> : <TrendingUp />}</span>
              <div>
                <strong>{item.text}</strong>
                <small>Подтверждено независимым исследованием НИХУ-AI.</small>
              </div>
              <time>{index === 0 ? "сейчас" : `${index * 2} мин.`}</time>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}

const testimonials = [
  [
    "А",
    "Антон",
    "Серийный founder одного проекта",
    "Раньше нашим сервисом не пользовался никто. После подключения НИХУ-AI НИХУ-AI не изменилось, но теперь у нас есть график.",
  ],
  [
    "М",
    "Максим",
    "CEO, Founder, Visionary",
    "Я не понимал, какую проблему решает мой продукт. Теперь этого не понимают уже 40 тысяч пользователей.",
  ],
  [
    "Е",
    "Екатерина",
    "Руководитель AI-трансформации",
    "Мы заменили разработчиков искусственным интеллектом. Теперь пытаемся заменить искусственный интеллект разработчиками.",
  ],
];

function Testimonials() {
  return (
    <section className="section">
      <SectionHead label="Отзывы" title="Нам доверяют настоящие клиенты" text="НИХУ-AI" />
      <div className="testimonial-grid">
        {testimonials.map(([initials, name, role, quote]) => (
          <motion.figure className="quote-card" key={name} whileHover={{ y: -5 }}>
            <MessageSquareQuote aria-hidden="true" />
            <blockquote>«{quote}»</blockquote>
            <figcaption>
              <span>{initials}</span>
              <div>
                <strong>{name}</strong>
                <small>{role}</small>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}

const plans = [
  {
    name: "Начинающий",
    price: "Бесплатно",
    action: "Начать с НИХУ-AI",
    features: [
      "до 100 фейковых пользователей",
      "один неработающий AI-инструмент",
      "базовый градиент",
      "подпись «Сделано за вечер»",
      "один отзыв от знакомого",
    ],
  },
  {
    name: "Вайбкодер",
    price: "₽1 990",
    action: "Вайбкодить",
    featured: true,
    features: [
      "до миллиона пользователей на лендинге",
      "генерация MRR",
      "пять отзывов от CEO",
      "анимация появления каждого блока",
      "бейдж «Без единой строчки кода»",
      "один случайный Product Hunt badge",
    ],
  },
  {
    name: "Серийный фаундер",
    price: "₽19 990",
    action: "Масштабировать НИХУ-AI",
    features: [
      "неограниченное количество стартапов",
      "собственный логотип «Что-нибудь AI»",
      "автоматические посты в Threads",
      "статистика из случайных чисел",
      "персональное отсутствие поддержки",
      "возможность менять ARR вручную",
    ],
  },
];

function Pricing() {
  const [annual, setAnnual] = useState(false);
  const [modal, setModal] = useState(false);
  return (
    <section className="section" id="pricing">
      <SectionHead label="Тарифы" title="Выберите тариф, которому доверяют НИХУ-AI" />
      <div className="billing-switch" role="group" aria-label="Период оплаты">
        <button className={!annual ? "active" : ""} onClick={() => setAnnual(false)}>
          Ежемесячно
        </button>
        <button className={annual ? "active" : ""} onClick={() => setAnnual(true)}>
          Ежегодно
        </button>
        {annual && <span>Вы экономите НИХУ-AI</span>}
      </div>
      <div className="pricing-grid">
        {plans.map((plan) => {
          const numeric = Number(plan.price.replace(/\D/g, ""));
          const price = annual && numeric ? `₽${formatNumber(Math.round(numeric * 14.4))}` : plan.price;
          return (
            <article className={`price-card ${plan.featured ? "featured" : ""}`} key={plan.name}>
              {plan.featured && <span className="popular">Чаще всего выбирают НИХУ-AI</span>}
              <h3>{plan.name}</h3>
              <p>
                Для тех, кто {plan.featured ? "готов масштабировать впечатление" : "ещё выбирает оттенок градиента"}.
              </p>
              <strong className="price">{price}</strong>
              {numeric > 0 && <small>/ {annual ? "год" : "месяц"}</small>}
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <Check size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`button ${plan.featured ? "" : "button-ghost"}`} onClick={() => setModal(true)}>
                {plan.action}
              </button>
            </article>
          );
        })}
      </div>
      <AnimatePresence>
        {modal && (
          <Modal title="Оплата почти готова" onClose={() => setModal(false)}>
            <p>Осталось создать продукт, юридическое лицо, платёжную систему и смысл.</p>
            <button className="button modal-action" onClick={() => setModal(false)}>
              Понятно, продолжить вайбкодить
            </button>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}

const faq = [
  ["Что делает НИХУ-AI?", "НИХУ-AI."],
  ["Это настоящий AI-продукт?", "Настолько же настоящий, насколько цифры в постах о его запуске."],
  ["Нужна ли мне идея?", "Нет. Иногда идея даже мешает быстрее выйти на рынок."],
  ["Где хранятся мои данные?", "В красивой карточке на главной странице."],
  ["Можно ли отменить подписку?", "Конечно. Подписки пока тоже нет."],
  ["Кто использует НИХУ-AI?", "Нас выбирают НИХУ-AI."],
];

function FAQAndCTA() {
  const [open, setOpen] = useState(0);
  const [progress, setProgress] = useState(false);
  const { notify } = useContext(ToastContext);
  return (
    <>
      <section className="section faq-section" id="faq">
        <SectionHead label="Поддержка решений" title="Часто задаваемые вопросы" />
        <div className="faq-list">
          {faq.map(([question, answer], index) => (
            <div className="faq-item" key={question}>
              <button aria-expanded={open === index} onClick={() => setOpen(open === index ? -1 : index)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                {question}
                <ChevronDown className={open === index ? "rotate" : ""} />
              </button>
              <AnimatePresence initial={false}>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <p>{answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>
      <section className="section final-cta">
        <div className="cta-grid">
          <div>
            <span className="eyebrow">Можно начинать</span>
            <h2>Ваш первый миллион пользователей уже существует</h2>
            <p>Осталось только изменить цифру в интерфейсе.</p>
          </div>
          <button
            className="button cta-button"
            disabled={progress}
            onClick={() => {
              setProgress(true);
              window.setTimeout(() => {
                setProgress(false);
                notify("Готово. Ваш стартап вырос на 340%.");
              }, 1500);
            }}
          >
            {progress ? <RefreshCw className="spin" /> : <Rocket />}
            {progress ? "Масштабируем НИХУ-AI" : "Начать масштабировать НИХУ-AI"}
          </button>
        </div>
        <div className="cta-proof">
          Нас выбирают <strong>НИХУ-AI</strong>
        </div>
      </section>
    </>
  );
}

export default function HomePage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const inView = useInView(pageRef, { once: true });
  void inView;
  return (
    <motion.div ref={pageRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <MetricsAndFeatures />
      <SuccessGenerator />
      <ActivityFeed />
      <Testimonials />
      <Pricing />
      <FAQAndCTA />
    </motion.div>
  );
}

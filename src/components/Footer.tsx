import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link className="brand" to="/">
            НИХУ<span>-AI</span>
          </Link>
          <p>Продукт, которому доверяют НИХУ-AI.</p>
          <span className="proof-line">О нас говорят <strong>НИХУ-AI</strong></span>
        </div>
        <div>
          <strong>Продукт</strong>
          <a href="/#features">Возможности</a>
          <a href="/#how">Как это работает</a>
          <a href="/#pricing">Тарифы</a>
          <a href="/#activity">Статус: вероятно работает</a>
        </div>
        <div>
          <strong>Компания</strong>
          <Link to="/about">О нас</Link>
          <Link to="/about#team">Команда</Link>
          <Link to="/donate">Донаты</Link>
          <Link to="/about#team">Воображаемые вакансии</Link>
        </div>
        <div>
          <strong>Документы</strong>
          <a href="/#faq">Политика непонятности</a>
          <a href="/#faq">Условия отсутствия сервиса</a>
          <a href="/#faq">Ненастоящая безопасность</a>
          <a href="/#faq">SOC 2 когда-нибудь</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 НИХУ-AI. Все метрики выдуманы.</span>
        <span>Нас выбирают <strong>НИХУ-AI</strong></span>
      </div>
    </footer>
  )
}

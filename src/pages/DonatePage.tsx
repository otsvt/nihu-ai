import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleDollarSign, Paintbrush, PlugZap, Sparkles, TrendingUp, Users } from 'lucide-react'
import Modal from '../components/Modal'
import { formatNumber } from '../lib'

const donations = [
  [100, 'Добавим ещё один градиент.', 'Добавить градиент', Sparkles],
  [300, 'Увеличим количество пользователей на главной.', 'Увеличить пользователей', Users],
  [500, 'Нарисуем новый график роста.', 'Нарисовать рост', TrendingUp],
  [1000, 'Подключим ещё один AI API.', 'Подключить API', PlugZap],
  [5000, 'Начнём думать, что должен делать продукт.', 'Добавить смысл', Paintbrush],
] as const

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')
  const [total, setTotal] = useState(0)

  const close = () => {
    if (selected) setTotal((value) => value + selected)
    setSelected(null)
    setCustom('')
  }

  return (
    <motion.div className="inner-page donate-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <section className="inner-hero donate-hero">
        <div className="inner-hero-copy">
          <span className="eyebrow">Раунд НИХУ-AI / открыт</span>
          <h1>Поддержите развитие <em>НИХУ-AI</em></h1>
          <p>В отличие от нашей выручки, этот платёж был бы настоящим. Но настоящую оплату пока не подключаем.</p>
        </div>
        <div className="fund-card">
          <span>Собрано на развитие</span>
          <strong>₽{total ? formatNumber(total) : 'НИХУ-AI'}</strong>
          <div className="fund-bar"><i style={{ width: total ? `${Math.min(100, total / 80)}%` : '8%' }} /></div>
          <small>Цель: найти смысл</small>
        </div>
      </section>

      <section className="section donate-section">
        <div className="section-head">
          <span className="eyebrow">Варианты поддержки</span>
          <h2>Выберите вклад в отсутствие продукта</h2>
          <p>Деньги не будут списаны. Впечатление останется.</p>
        </div>
        <div className="donate-grid">
          {donations.map(([amount, text, action, Icon]) => (
            <motion.article className="donate-card" key={amount} whileHover={{ y: -6 }}>
              <div className="donate-icon"><Icon /></div>
              <strong>{formatNumber(amount)} ₽</strong>
              <p>{text}</p>
              <button className="button button-ghost" onClick={() => setSelected(amount)}>{action}</button>
            </motion.article>
          ))}
          <article className="donate-card custom-donate">
            <div className="donate-icon"><CircleDollarSign /></div>
            <strong>Своя сумма</strong>
            <p>Введите оценку нашей уверенности.</p>
            <label htmlFor="custom-donation" className="sr-only">Своя сумма доната</label>
            <div className="money-input">
              <input
                id="custom-donation"
                inputMode="numeric"
                type="number"
                min="1"
                value={custom}
                onChange={(event) => setCustom(event.target.value)}
                placeholder="10 000"
              />
              <span>₽</span>
            </div>
            <button
              className="button"
              disabled={!Number(custom)}
              onClick={() => setSelected(Number(custom))}
            >
              Инвестировать в НИХУ-AI
            </button>
          </article>
        </div>
        <div className="donate-proof">
          <span>Нами заинтересовались инвесторы —</span>
          <strong>НИХУ-AI</strong>
        </div>
      </section>

      <AnimatePresence>
        {selected !== null && (
          <Modal title="Спасибо за поддержку" onClose={close}>
            <div className="modal-amount">{formatNumber(selected)} ₽</div>
            <p>Ваша готовность заплатить уже делает вас нашим самым ценным клиентом.</p>
            <p className="muted">Платёж не был списан, потому что даже монетизация у нас пока вайбкодится.</p>
            <button className="button modal-action" onClick={close}>Вернуться к росту</button>
          </Modal>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

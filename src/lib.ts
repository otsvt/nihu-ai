import type { SuccessMetrics } from './types'

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('ru-RU').format(value)

const random = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min

export function generateMetrics(project: string): SuccessMetrics {
  const minutes = random(11, 4320)
  return {
    users: random(12000, 98000),
    subscribers: random(1500, 18000),
    mrr: random(8, 98) * 100000,
    countries: random(42, 196),
    buildTime:
      minutes < 60
        ? `${minutes} минут`
        : `${Math.round((minutes / 60) * 10) / 10} часа`,
    codeLines: random(0, 14),
    growth: random(180, 980),
    project,
  }
}

export const activityItems = [
  '+4 283 пользователя зарегистрировались, пока вы читали этот текст',
  'Новый клиент приобрёл тариф «Серийный фаундер»',
  'Основатель увеличил MRR ещё на ₽800 000',
  'В систему добавлен новый несуществующий отзыв',
  'AI заменил ещё одного AI',
  'Никто не обратился в поддержку',
  'Продукт всё ещё не найден',
  'Инвестор посмотрел страницу 0,4 секунды',
]

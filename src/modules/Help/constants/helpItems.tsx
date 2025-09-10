import auth from "@assets/svg/helpPage/auth.svg";
import roblox from "@assets/svg/helpPage/roblox.svg";
import topup from "@assets/svg/helpPage/topup.svg";
import talk from "@assets/svg/helpPage/talk.svg";
import deposit from "@assets/svg/helpPage/deposit.svg";
import buy from "@assets/svg/helpPage/buy.svg";

export const helpItems = [
  {
    number: "01",
    icon: <img src={auth} alt="" />,
    title: "Авторизация",
    description: "Зарегистрировать  аккаунт на сайте или войти в существующий",
  },
  {
    number: "02",
    icon: <img src={topup} alt="" />,
    title: "Пополнение",
    description: "Пополнить и дождаться появления средств на балансе",
  },
  {
    number: "03",
    icon: <img src={buy} alt="" />,
    title: "Покупка",
    description:
      'Выбрать и купить предметы, они отобразятся в разделе Инвентарь"',
  },
  {
    number: "04",
    icon: <img src={deposit} alt="" />,
    title: "Вывод",
    description:
      "Зайти в раздел Инвентарь, нажать кнопку Вывести все предметы, следовать предложенным действиям",
  },
  {
    number: "05",
    icon: <img src={talk} alt="" />,
    title: "Связь с админом",
    description:
      "Написать админу в  Telegram, сообщить ему номер вашего заказа и дождаться его ответа",
  },
  {
    number: "06",
    icon: <img src={roblox} alt="" />,
    title: "Получение",
    description:
      "Админ скинет вам ссылку на вип сервер, вам нужно будет на него зайти и дождаться трейда от админа в игре",
  },
];

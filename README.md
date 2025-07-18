# 📦 Lorryworld Frontend

## 🚀 Стек технологий

- React
- TypeScript/ JavaScript
- Vite
- React Router
- Tanstack Query
- MobX
- SCSS

## 📁 Структура проекта

```bash
src/
├── api/               # Функции для взаимодействия с бэкендом
├── assets/            # Шрифты, изображения, иконки
├── components/        # Переиспользуемые UI-компоненты
├── hooks/             # Кастомные хуки
├── modules/           # Модули с бизнес-логикой
├── pages/             # Страницы приложения
├── router/            # Конфигурация маршрутов
├── store/             # СТМ - MobX
├── /app               # Корневой компонент приложения
└── main.tsx           # Точка входа
```

## 🔧 Установка и запуск

Убедитесь, что у вас установлены:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

```bash
# Клонировать репозиторий
git clone https://github.com/reomashka/lorryworld-frontend
cd lorryworld-frontend

# Собрать и запустить контейнеры в фоне
sudo docker compose up -d --build
```

После запуска приложение будет доступно по адресу: [http://localhost:3001](http://localhost:3001)

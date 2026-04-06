# Nabooshy — Модуль бүтэц

## Folder бүтэц

```
nabooshy/
│
├── index.html                  # Үндсэн HTML
├── sw.js / manifest.json       # PWA
├── data_*.json                 # Кино, цуврал өгөгдөл
│
├── [CSS файлууд — root]        # style, nave, hero, cards, ...
│
├── core/                       # Үндсэн логик
│   ├── config.js               # Глобал тохиргоо (API key, HOME_ROWS)
│   ├── app.js                  # Entry point — бүх module import
│   ├── utils.js                # fillRow() helper
│   └── data-loader.js          # JSON өгөгдөл татах, row байгуулах
│
├── ui/                         # UI компонент
│   ├── hero/                   # Hero banner
│   │   ├── hero.js             # Entry
│   │   ├── hero-tmdb.js        # TMDB API
│   │   ├── hero-utils.js       # animateContent, startProgress, stopProgress
│   │   ├── hero-movies.js      # Кино hero slide
│   │   ├── hero-weather.js     # Цаг агаарын hero
│   │   ├── hero-games.js       # Тоглоомын hero
│   │   ├── hero-pages.js       # Хуудас солих үед hero шинэчлэх
│   │   └── hero-matrix.js      # Matrix background animation
│   └── cards/
│       ├── movie-card.js       # Кино карт HTML builder
│       └── games-cards.js      # Тоглоомын карт
│
├── pages/                      # Хуудас бүрийн логик
│   ├── movies.js               # Кино хуудас
│   ├── series.js               # Цуврал хуудас + modal
│   ├── search.js               # Хайлт
│   ├── games/
│   │   ├── games.js            # Тоглоом хуудас
│   │   └── games-data.js       # Тоглоомын өгөгдөл
│   └── weather/
│       ├── weather.js          # Цаг агаар хуудас
│       └── weather-data.js     # Хотуудын жагсаалт
│
├── player/                     # Видео тоглуулагч
│   ├── player.js               # MP4 / HLS / iframe логик
│   ├── player-hls.js           # HLS.js + P2P интеграц
│   └── player-advanced.js      # Нэмэлт тоглуулагч функцүүд
│
├── platform/                   # Платформ-тусгай код
│   ├── tv/                     # Android TV / Smart TV
│   │   ├── tv-detect.js        # TV браузер илрүүлэх
│   │   ├── tv-state.js         # Хуваалцсан state объект
│   │   ├── tv-styles.js        # TV UI CSS inject
│   │   ├── tv-shell.js         # TV HTML бүтэц
│   │   ├── tv-hero.js          # TV hero section
│   │   ├── tv-rows.js          # TV movie rows + cards
│   │   ├── tv-detail.js        # TV detail modal
│   │   ├── tv-player.js        # TV video player
│   │   ├── tv-navigation.js    # D-pad keyboard navigation
│   │   ├── tv-data.js          # TV data loader
│   │   └── tv-init.js          # ★ Entry point (tv-ui.js-г орлуулна)
│   ├── mobile/                 # Mobile immersion system
│   │   ├── mobile-detect.js    # isMobile шалгах + utilities
│   │   ├── mobile-boot.js      # Boot sequence animation
│   │   ├── mobile-feed.js      # Live activity ticker
│   │   ├── mobile-sensors.js   # Gyro / accelerometer
│   │   ├── mobile-hud.js       # Battery, network HUD
│   │   ├── mobile-effects.js   # Touch ripple, glitch, signals, haptic
│   │   └── mobile-init.js      # ★ Entry point (hacker-mobile.js-г орлуулна)
│   ├── spatial-ui.js           # Spatial navigation (TV/remote)
│   └── pwa-init.js             # PWA service worker бүртгэл
│
├── ads/                        # Зар удирдлага
│   ├── zar-config.js           # Зарын URL тохиргоо — ЗӨВХӨН ЭНД засна
│   ├── zar-styles.js           # AdBlock wall CSS
│   └── zar.js                  # AdBlock илрүүлэлт + зар ачаалах
│
└── settings/                   # Тохиргоо & нэмэлт
    ├── settings.js             # Settings panel
    ├── profile-gamify.js       # Profile gamification
    └── watch-party.js          # Watch party
```

## Шинэ feature нэмэх бол

- **Кино/цуврал логик** → `pages/` доторх файлд
- **UI компонент** → `ui/cards/` эсвэл `ui/hero/`
- **TV-д нөлөөлөх** → `platform/tv/` доторх тохирох файлд
- **Mobile эффект** → `platform/mobile/`
- **Зарын URL** → зөвхөн `ads/zar-config.js`
- **Глобал тохиргоо** → `core/config.js`

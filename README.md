# Pop-up виджет
***
## Инструкция по установке для html+css+js проекта
***
### 1. Деплой необходимых файлов
Первым шагом необходимо задеплоить все необходимые файлы виджета pop-up на сервер:
1. manifest-pwa.json
2. pwa.css
3. app-pwa-pop-up.js
4. register-service-worker.js
5. pwa2.js
### 2. Редактирование необходимой информации в коде (обратить внимание)
1. manifest.json:
```
{
    "name": "demo",      <----------- название вашего домена (ресурса)
    "short_name": "demo",     <----------- короткое название
    "display": "standalone",               вашего домена (ресурса)
    "start_url": "/",                      
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [{
            "src": "assets/screenify192.png",     <----------- Ваше лого
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "assets/screenify512.png",      <----------- Ваше 2-е лого
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```
2. register-service-worker.js:
```
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('js/pwa2.js')   <----------- Путь к файлу pwa2.js
            .then(registration => {
                console.log('Service Worker зарегистрирован. Scope:', registration.scope);
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}
```
3. index.html
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Popup</title>
    <!-- Подключаем шрифт Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    <!-- Подключаем манифест PWA -->
    <link rel="manifest" href="manifest.json">    <----------- Путь к файлу manifest
    <link rel="stylesheet" href="style/pwa.css">   <----------- Путь к файлу стилей pwa.css
    <script src="js/register-service-worker.js"></script>
</head>

<body>

    <div id="popup" class="popup">
        <div id="popupContent" class="popup-content">
            <svg id="closeButton" class="close-button" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                <line x1="1" y1="1" x2="14" y2="14" stroke="white" stroke-width="2"/>
                <line x1="1" y1="14" x2="14" y2="1" stroke="white" stroke-width="2"/>
            </svg>
            <img src="assets/screenify-logo-min.png" alt="Logo" class="popup-logo">
            <h2 class="popup-text">Download our App and get FREE month!</h2>
            <!-- Кнопка установки PWA -->
            <button id="install-button" class="popup-button">Install Now!</button>
            <!-- Кнопка с прямой ссылкой -->
            <button id="external-link-button" class="popup-button" style="display: none;" onclick="window.location.href='#'">Install Now!</button>
            
        </div>
    </div>    
    
    <script src="js/jquery-3.7.1.min.js"></script>     <----------- Путь к map-файлу jQuery 
    <script src="js/app-pwa-pop-up.js"></script>      <----------- Путь к файлу скрипта app-pwa-pop-up.js
</body>

</html>
```
***
## Инструкция по установке для React.js проекта
***
### 1. Подготовка файлов виджета
Создаем папку для виджета в public

>public/widget

В эту папку переместите следующие файлы:
* pwa.css — стили виджета.
* pwa2.js — кеширование по URL для PWA.
* app-pwa-pop-up.js — логика Pop-Up и deferredPrompt для PWA.
* jquery-3.7.1.min.js — библиотека jQuery.
* register-service-worker.js — регистрация сервис-воркера.
* screenify-logo-min.png — логотип для Pop-Up.
* screenify192.png - иконки для манифеста.
* screenify512.png - иконки для манифеста.

В папку public кидаем manifest-pwa.json и смотрим внимательно, все ли пути правильно указаны, в противном случае beforeinstallprompt срабатывать не будет.
```
{
    "name": "screenify",
    "short_name": "screenify",
    "start_url": "/",   <----------- Тут без изменений
    "display": "standalone",
    "background_color": "#ffffff",
    "theme_color": "#000000",
    "icons": [{
            "src": "widget/screenify192.png",   <----------- Путь к иконке
            "sizes": "192x192",
            "type": "image/png"
        },
        {
            "src": "widget/screenify512.png",   <----------- Путь к иконке
            "sizes": "512x512",
            "type": "image/png"
        }
    ]
}
```
### 2. Подключаем файлы в public/index.html
следуем примеру ниже
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="theme-color" content="#000000">
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json">
    <link rel="manifest" href="%PUBLIC_URL%/manifest-pwa.json">  <------- Подключаем манифест
    <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <title>React App</title>
    <link rel="stylesheet" href="%PUBLIC_URL%/widget/pwa.css">  <------- Подключаем стили
  </head>
  <body>
    <noscript>
      You need to enable JavaScript to run this app.
    </noscript>
    <div id="root"></div>

      
    <script src="%PUBLIC_URL%/widget/jquery-3.7.1.min.js"></script>  <------- Подключаем jQuery
    
    <script src="%PUBLIC_URL%/widget/app-pwa-pop-up.js"></script>  <------- Подключаем Pop-Up виджет

  </body>
</html>
```
### 3. Подключаем сервис воркер (у нас он назван pwa2.js) в регистраторе registerServiceWorker.js, беру пример стороннего проекта, найденного в публином репозитории GitHub
Необходимо найти определенный участок кода, например:
 ```
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('widget/pwa2.js')  <------- тут ставим путь к нашему сервис воркеру pwa2
            .then(registration => {
                console.log('Service Worker зарегистрирован. Scope:', registration.scope);
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}
 ```
 Этот участок кода взят из моего register-service-worker.js
 Также хочу представить случай с React.js проектом, взятым из публиного репозитории GitHub:
 ```
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export default function register() {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/widget/pwa2.js`;  <------- тут ставим путь к нашему 
                                                                          сервис воркеру pwa2
      if (isLocalhost) {
        // This is running on localhost. Lets check if a service worker still exists or not.
        checkValidServiceWorker(swUrl);
        navigator.serviceWorker.ready.then(() => {
          console.log(
            'This web app is being served cache-first by a service ' +
              'worker. To learn more, visit https://goo.gl/SC7cgQ'
          );
        });
      } else {
        registerValidSW(swUrl);
      }
    });
  }
}

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then(registration => {
      console.log('Service Worker зарегистрирован. Scope:', registration.scope);
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content is available; please refresh.');
            } else {
              console.log('Content is cached for offline use.');
            }
          }
        };
      };
    })
    .catch(error => {
      console.error('Ошибка регистрации Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then(response => {
      if (
        response.status === 404 ||
        response.headers.get('content-type').indexOf('javascript') === -1
      ) {
        navigator.serviceWorker.ready.then(registration => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log(
        'No internet connection found. App is running in offline mode.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
 ```
 Этот код проверяет, работает ли приложение в проде и поддерживает ли браузер сервис-воркеры. Если условия выполнены, он регистрирует сервис-воркер для кэширования ресурсов и поддержки оффлайн-режима. Для удобства все было помещено в константу swUrl
### 4. Создаем компонент PwaPopUp.js
Создаем сам компонент PwaPopUp.js в соответствующей папке src/components/ и помезаем туда следующие строки кода:
```
import React, { useEffect } from 'react';

const PwaPopUp = () => {
    useEffect(() => {
        // Получаем элементы напрямую
        const popup = document.getElementById('popup');
        const closeButton = document.getElementById('closeButton');
        const installButton = document.getElementById('install-button');
        const externalLinkButton = document.getElementById('external-link-button');
        let deferredPrompt;

        // Функция показа Pop-Up через 2 секунды
        const showPopup = () => {
            setTimeout(() => {
                if (popup) {
                    popup.style.display = 'block';
                }
            }, 2000);
        };

        // Скрытие Pop-Up при клике на крестик
        const handleCloseClick = () => {
            if (popup) {
                popup.style.display = 'none';
            }
        };

        // Обработка события beforeinstallprompt
        const handleBeforeInstallPrompt = (e) => {
            e.preventDefault();
            deferredPrompt = e;

            if (installButton) {
                installButton.style.display = 'inline-block';
            }
            if (externalLinkButton) {
                externalLinkButton.style.display = 'none';
            }

            if (installButton) {
                installButton.addEventListener('click', () => {
                    if (deferredPrompt) {
                        deferredPrompt.prompt();
                        deferredPrompt.userChoice.then((choiceResult) => {
                            if (choiceResult.outcome === 'accepted') {
                                console.log('PWA установлено');
                            } else {
                                console.log('Установка PWA отклонена');
                            }
                            deferredPrompt = null;
                        });
                    }
                });
            }
            
        };

        // Если PWA не поддерживается
        const handleUnsupportedPWA = () => {
            if (!window.matchMedia('(display-mode: standalone)').matches) {
                if (installButton) {
                    installButton.style.display = 'none';
                }
                if (externalLinkButton) {
                    externalLinkButton.style.display = 'inline-block';
                }
            }
        };

        // Установка обработчиков событий
        if (closeButton) {
            closeButton.addEventListener('click', handleCloseClick);
        }
        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        handleUnsupportedPWA();
        showPopup();

        // Очистка обработчиков при размонтировании
        return () => {
            if (closeButton) {
                closeButton.removeEventListener('click', handleCloseClick);
            }
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return (
        <div id="popup" className="popup" style={{ display: 'none' }}>
            <div id="popupContent" className="popup-content">
                <svg id="closeButton" className="close-button" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15">
                    <line x1="1" y1="1" x2="14" y2="14" stroke="white" strokeWidth="2" />
                    <line x1="1" y1="14" x2="14" y2="1" stroke="white" strokeWidth="2" />
                </svg>
                <img src="/widget/screenify-logo-min.png" alt="Logo" className="popup-logo" />
                <h2 className="popup-text">Download our App and get FREE month!</h2>
                <button id="install-button" className="popup-button" style={{ display: 'none' }}>Install Now!</button>
                <button id="external-link-button" className="popup-button" style={{ display: 'none' }} onClick={() => window.location.href = '#'}>
                    Install Now!
                </button>
            </div>
        </div>
    );
};

export default PwaPopUp;
```
### 4. Импортируем компонент PwaPopUp.js в основной компонент React-приложения и добавляем компонент в структуру разметки страниц
Пример как должно получиться:
```
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './Customers';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PwaPopUp from './components/PwaPopUp';  <------- Импортируем компонент PwaPopUp.js

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Simple React App</h1>
          </header>
          <PwaPopUp />  <------- добавляем компонент PwaPopUp
          <Switch>
            <Route exact path="/" render={() => (
              <Redirect to="/customerlist" />
            )} />
            <Route exact path="/customerlist" component={Customers} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

```
### 5. Запуск проекта

>npm i

>npm start


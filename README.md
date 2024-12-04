# Pop-up виджет
***
## Инструкция по установке
***
### 1. Деплой необходимых файлов
Первым шагом необходимо задеплоить все необходимые файлы виджета pop-up на сервер:
1. manifest.json
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
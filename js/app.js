let deferredPrompt; // Событие для запуска системного окна установки

// Универсальная функция для отображения поп-апа
function showInstallPopup() {
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        console.log('Показываем поп-ап.');
        installPopup.style.display = 'block'; // Показываем поп-ап
        installPopup.classList.add('show'); // Добавляем класс для анимации, если есть
    } else {
        console.error('Поп-ап не найден в DOM. Проверьте id="install-popup".');
    }
}

// Обработчик для события beforeinstallprompt (Chrome и Edge)
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Событие beforeinstallprompt сработало');
    e.preventDefault(); // Отключаем стандартное всплывающее окно
    deferredPrompt = e; // Сохраняем событие
    showInstallPopup(); // Показываем поп-ап
});

// Универсальная обработка кнопки установки
document.getElementById('install-button').addEventListener('click', () => {
    console.log('Кнопка установки нажата');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        installPopup.style.display = 'none'; // Скрываем поп-ап
        installPopup.classList.remove('show'); // Убираем класс анимации
    }

    if (deferredPrompt) {
        console.log('Показываем системное окно установки');
        deferredPrompt.prompt(); // Показать системное окно установки

        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Пользователь согласился на установку');
            } else {
                console.log('Пользователь отклонил установку');
            }
            deferredPrompt = null; // Сбрасываем событие
        });
    } else {
        console.log('Событие deferredPrompt недоступно, покажите инструкцию для установки вручную.');
    }
});

// Обработчик кнопки закрытия
document.querySelector('.close-button').addEventListener('click', () => {
    console.log('Кнопка закрытия нажата');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        installPopup.style.display = 'none'; // Скрываем поп-ап
        installPopup.classList.remove('show'); // Убираем класс анимации
    }
});

// Универсальная проверка для iOS и Firefox
window.onload = function () {
    console.log('Страница загружена');
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent.toLowerCase());

    if (isIos && isSafari) {
        console.log('Показываем поп-ап для iOS.');
        showInstallPopup(); // Для iOS показываем поп-ап с инструкцией
    } else if (!deferredPrompt) {
        console.log('Показываем поп-ап для других браузеров.');
        showInstallPopup(); // Показываем поп-ап для браузеров без поддержки beforeinstallprompt
    }
};
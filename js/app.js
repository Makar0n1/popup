let deferredPrompt; // Событие для запуска системного окна установки

// Перехват события beforeinstallprompt
window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Событие beforeinstallprompt сработало'); // Отладочное сообщение
    e.preventDefault(); // Отключить стандартное всплывающее окно
    deferredPrompt = e;

    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        console.log('Поп-ап найден в DOM. Показываем его.');
        installPopup.style.display = 'block'; // Показать поп-ап
        installPopup.classList.add('show'); // Добавляем класс для анимации, если есть
    } else {
        console.error('Поп-ап не найден в DOM. Проверьте id="install-popup".');
    }
});

// Обработчик кнопки установки
document.getElementById('install-button').addEventListener('click', () => {
    console.log('Кнопка установки нажата');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        installPopup.style.display = 'none'; // Скрыть поп-ап
        installPopup.classList.remove('show'); // Убрать класс анимации
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
            deferredPrompt = null; // Сброс события
        });
    } else {
        console.log('Событие deferredPrompt недоступно');
    }
});

// Обработчик кнопки закрытия
document.querySelector('.close-button').addEventListener('click', () => {
    console.log('Кнопка закрытия нажата');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        installPopup.style.display = 'none'; // Скрыть поп-ап
        installPopup.classList.remove('show'); // Убрать класс анимации
    }
});

// Проверка загрузки страницы
window.onload = function () {
    console.log('Страница загружена');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        console.log('Поп-ап доступен в DOM');
    } else {
        console.error('Поп-ап не найден в DOM. Проверьте наличие элемента с id="install-popup".');
    }
};


// Логика отображения для устройств
window.onload = function () {
    console.log('Страница загружена');
    const installPopup = document.getElementById('install-popup');
    if (installPopup) {
        console.log('Поп-ап доступен в DOM');
    } else {
        console.error('Поп-ап не найден в DOM. Проверьте наличие элемента с id="install-popup".');
    }
};
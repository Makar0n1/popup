$(document).ready(function () {
    // Функция для проверки ширины экрана
    function checkScreenWidth() {
        if ($(window).width() <= 500) {
            setTimeout(function() {
                $('#popup').fadeIn().css('bottom', '0'); // Плавно показываем попап через 2 секунды
            }, 2000); // Задержка 2 секунды
        }
    }

    // Закрытие попапа при клике на кнопку закрытия
    $('#closeButton').click(function () {
        $('#popup').fadeOut().css('bottom', '-100%'); // Скрываем попап
    });

    // Показ кнопки установки PWA, если браузер поддерживает установку
    let deferredPrompt;
    const installButton = document.getElementById('install-button');
    const externalLinkButton = document.getElementById('external-link-button');

    // Слушаем событие beforeinstallprompt
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();  // Откладываем системный диалог
        deferredPrompt = e;

        // Показываем кнопку установки PWA
        installButton.style.display = 'inline-block';
        externalLinkButton.style.display = 'none'; // Скрываем ссылку

        // Обработчик для кнопки установки
        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt(); // Запрашиваем установку
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('PWA установлено');
                    } else {
                        console.log('Пользователь отклонил установку');
                    }
                    deferredPrompt = null; // Очищаем deferredPrompt
                });
            }
        });
    });

    // Если браузер не поддерживает PWA (не будет события beforeinstallprompt),
    // то показываем кнопку с прямой ссылкой
    window.addEventListener('appinstalled', (e) => {
        console.log('PWA установлено');
    });

    // Если браузер не поддерживает PWA (нет события beforeinstallprompt),
    // показываем ссылку на скачивание
    if (!window.matchMedia('(display-mode: standalone)').matches) {
        installButton.style.display = 'none'; // Скрываем кнопку установки
        externalLinkButton.style.display = 'inline-block'; // Показываем кнопку с ссылкой
    }

    // Проверка ширины экрана при загрузке страницы и при изменении размера окна
    checkScreenWidth();
    $(window).resize(function () {
        checkScreenWidth();
    });
});

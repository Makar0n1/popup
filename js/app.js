$(document).ready(function () {
    // Проверяем ширину экрана
    function checkScreenWidth() {
        if ($(window).width() <= 500) {
            $('#popup').fadeIn().css('bottom', '0');
            $('#overlay').fadeIn();
        }
    }

    // Закрытие окна при нажатии на кнопку закрытия
    $('#closeButton').click(function () {
        $('#popup').fadeOut().css('bottom', '-100%');
        $('#overlay').fadeOut();
    });

    // Закрытие окна при нажатии на затемненный фон
    $('#overlay').click(function () {
        $('#popup').fadeOut().css('bottom', '-100%');
        $('#overlay').fadeOut();
    });

    // Показ кнопки установки, если браузер поддерживает PWA
    let deferredPrompt;
    const installButton = document.getElementById('install-button');
    window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        installButton.style.display = 'block'; // Показываем кнопку установки
    });

    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Запрашиваем установку
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('PWA installed');
                } else {
                    console.log('PWA installation dismissed');
                }
                deferredPrompt = null;
            });
        }
    });

    // Проверяем ширину экрана при загрузке страницы и при изменении размера окна
    checkScreenWidth();
    $(window).resize(function () {
        checkScreenWidth();
    });
})
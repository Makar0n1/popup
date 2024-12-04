if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('js/pwa2.js')
            .then(registration => {
                console.log('Service Worker зарегистрирован. Scope:', registration.scope);
            })
            .catch(error => {
                console.error('Ошибка регистрации Service Worker:', error);
            });
    });
}
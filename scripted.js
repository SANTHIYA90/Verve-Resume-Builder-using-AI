document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo');
    const text = 'Verve';
    const length = text.length;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let currentIndex = 0;

    function getRandomChar() {
        return chars.charAt(Math.floor(Math.random() * chars.length));
    }

    function updateText() {
        let newText = '';
        for (let i = 0; i < length; i++) {
            if (i < currentIndex) {
                newText += text.charAt(i);
            } else {
                newText += getRandomChar();
            }
        }
        logo.textContent = newText;
        if (currentIndex < length) {
            currentIndex++;
            setTimeout(updateText, 50); // Adjust speed here
        }
    }

    updateText();
});

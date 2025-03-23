document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.btn');
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    document.addEventListener('mousemove', (event) => {
        const cursorX = event.clientX;
        const cursorY = event.clientY;
        const distance = Math.sqrt(
            Math.pow(cursorX - buttonCenterX, 2) +
            Math.pow(cursorY - buttonCenterY, 2)
        );
        
        if (distance < 100) { // Adjust the proximity distance as needed
            button.querySelector('.text').style.color = '#000';
        } else {
            button.querySelector('.text').style.color = '#fff';
        }
    });
});

const slider = document.querySelector('.slider');
const cards = document.querySelectorAll('.card');
const bulletsContainer = document.querySelector('.bullets');
let currentIndex = 0;
let cardsPerView = window.innerWidth <= 768 ? 1 : 2;

function generateBullets(){
    const numBullets = 5;
    bulletsContainer.innerHTML = '';
    for(let i = 0; i < numBullets; i++){
        const bullet = document.createElement('span');
        bullet.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        bulletsContainer.appendChild(bullet);
    }
    updateSlider();
}

function updateSlider(){
    slider.style.transform = `translateX(-${currentIndex * (100 / cardsPerView)}%)`;
    const bullets = document.querySelectorAll('.bullets span');
    bullets.forEach((bullet, index) => {
        bullet.classList.toggle('active', index === currentIndex);
    });
}
window.addEventListener('resize', () => {
    const newCardsPerView = window.innerWidth <= 768 ? 1 : 2;
    if(cardsPerView !== newCardsPerView){
        currentIndex = 0;
        cardsPerView = newCardsPerView;
        generateBullets();
        updateSlider();
    }
});

generateBullets();

slider.addEventListener('touchstart', handleTouchStart, false);
slider.addEventListener('touchmove', handleTouchMove, false);

let xStart = null;

function handleTouchStart(event){
    xStart = event.touches[0].clientX;
}
function handleTouchMove(event){
    if (!xStart) return;

    const xEnd = event.touches[0].clientX;
    const xDiff = xStart - xEnd;

    if(xDiff > 50){
        currentIndex = Math.min(currentIndex + 1, 4);
        updateSlider();
    }else if(xDiff < -50){
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    }
    xStart = null;
}
function generateBullets() {
    let numBullets;

    if (window.innerWidth <= 768) {
        numBullets = 3; // мобильная версия
    } else {
        numBullets = 5; // компьютерная версия
    }

    bulletsContainer.innerHTML = '';

    for (let i = 0; i < numBullets; i++) {
        const bullet = document.createElement('span');
        bullet.addEventListener('click', () => {
            currentIndex = i;
            updateSlider();
        });
        bulletsContainer.appendChild(bullet);
    }

    updateSlider();
}

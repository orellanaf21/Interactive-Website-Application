'use strict';

const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const navDot = document.querySelector('.carousel-nav');
const CAROUSEL_SIZE = carouselItems.length;

leftBtn.addEventListener('click', swipe);
rightBtn.addEventListener('click', swipe);
navDot.addEventListener('click', changeNav);

function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left')) {
        if (currentIndex === 0) {
            nextIndex = CAROUSEL_SIZE - 1;
        }
        else {
            nextIndex = currentIndex - 1;
        }
    } else {
        if (currentIndex === CAROUSEL_SIZE - 1) {
            nextIndex = 0;
        }
        else {
            nextIndex = currentIndex + 1;
        }
    }

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
}

function changeNav(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentNavItem = document.querySelector('.nav-item.active');
    const targetIndex = navItems.indexOf(e.target);

    if (e.target.classList.contains('active')) {
        return;
    }

    currentCarouselItem.classList.remove('active');
    currentNavItem.classList.remove('active');

    carouselItems[targetIndex].classList.add('active');
    navItems[targetIndex].classList.add('active');
}
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button');

    const root = document.documentElement;

    function buttonClick() {
        console.log('Button Clicked!');
    }

    buttons.forEach(button => {
        button.addEventListener('click', buttonClick);
    });

    function buttonClick(e) {
        const btn = e.target;

        btn.classList.toggle('open');

        const content = btn.nextElementSibling;

        content.classList.toggle('open');

        root.style.setProperty('--content-height', btn.nextElementSibling.scrollHeight + 'px');

        buttons.forEach(button => {
            if (button !== btn && button.classList.contains('open')) {
                button.classList.remove('open');
                button.nextElementSibling.classList.remove('open');
            }
        });
    }
});
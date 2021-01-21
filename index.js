import pictures from './gallery-items.js';

console.log(pictures);

const gallery = document.querySelector('.gallery');

gallery.innerHTML =
  '<li class="gallery__item"><a class="gallery__link" href=pictures[0].original><img class="gallery__image" src=pictures[0].preview data-source=pictures[0].original alt=pictures[0].description/></a></li>';

// 1. добавить 1 элемент на страницу с классами

// 2. создать цикл и передать все эдементы

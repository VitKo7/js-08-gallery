import pictures from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.gallery'),
  largeImage: document.querySelector('.lightbox__image'),
  modalWindow: document.querySelector('.lightbox'),
  openModalWindow: document.querySelector('.js-gallery'),
  closeModalBtn: document.querySelector('button[data-action="close-lightbox"]'),
  overlay: document.querySelector('.lightbox__overlay'),
};

pictures.forEach(({ preview, original, description }, index) => {
  refs.gallery.insertAdjacentHTML(
    'afterbegin',
    `<li class="gallery__item">
      <a class="gallery__link"
        href="${original}">
          <img class="gallery__image"
            src="${preview}" 
            data-source="${original}" 
            alt="${description}" 
            data-index="${index}" /> </a> </li>`,
  );
});

const galleryItems = refs.gallery.querySelectorAll('.gallery__image');

refs.gallery.addEventListener('click', onGalleryClick);

let indexCurrentImage;

function onGalleryClick(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageRef = event.target;
  const largeImageURL = imageRef.dataset.source;

  setLargeImageSrc(largeImageURL);
  setLargeImageALT(imageRef.alt);
  indexCurrentImage = imageRef.dataset.index;
}

function setLargeImageSrc(url) {
  refs.largeImage.src = url;
}

function setLargeImageALT(description) {
  refs.largeImage.alt = description;
}

// ! --------- MODAL WINDOW ---------

refs.openModalWindow.addEventListener('click', onOpenModal);
refs.closeModalBtn.addEventListener('click', onCloseModal);
refs.overlay.addEventListener('click', onOverlayClick);

function onOpenModal() {
  window.addEventListener('keydown', onPressKey);
  refs.modalWindow.classList.add('is-open');
}

function onCloseModal() {
  window.removeEventListener('keydown', onPressKey);
  refs.modalWindow.classList.remove('is-open');
  setLargeImageSrc('');
}

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    onCloseModal();
  }
}

function onPressKey(event) {
  switch (event.code) {
    case 'Escape':
      onCloseModal();
      break;

    case 'ArrowLeft':
      indexCurrentImage === 0
        ? '' // (indexCurrentImage = galleryItems.length - 1) // ! not working
        : (indexCurrentImage = parseInt(indexCurrentImage) - 1);
      refs.largeImage.src = galleryItems[indexCurrentImage].dataset.source;
      break;

    case 'ArrowRight':
      indexCurrentImage === 8 // refs.gallery.length - 1
        ? '' // (indexCurrentImage = 0) // ! not working
        : (indexCurrentImage = parseInt(indexCurrentImage) + 1);
      refs.largeImage.src = galleryItems[indexCurrentImage].dataset.source;
      break;

    default:
      return;
  }
}

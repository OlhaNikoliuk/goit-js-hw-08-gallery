import imagesGallery from './gallery-items.js';



const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  // images: document.querySelectorAll('.gallery__image'),
  modal: document.querySelector('.lightbox'),
  modalImgEl: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
}

let currentIndex = 0;


const galleryMarkup = createImageCardMarkup(imagesGallery);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

refs.galleryContainer.addEventListener('click', onImageClick);

function createImageCardMarkup(images) {

  return images.map(({ preview, original, description }) => {
    return `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
  }).join('');
}

function onImageClick(evt) {
  evt.preventDefault();

  refs.modalCloseBtn.addEventListener('click', onCloseBtnClick);
  refs.modalOverlay.addEventListener('click', onCloseBtnClick);
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onArrowKeyPress);

  const currImage = evt.target;

  const isGalleryImage = evt.target.classList.contains('gallery__image');
  console.log(isGalleryImage);

  if (!isGalleryImage) {
    return;
  }

  refs.modal.classList.add('is-open');
  refs.modalImgEl.src = currImage.dataset.source;
}

function onCloseBtnClick() {
  refs.modalCloseBtn.removeEventListener('click', onCloseBtnClick);
  refs.modalOverlay.removeEventListener('click', onCloseBtnClick);
  window.removeEventListener('keydown', onEscKeyPress);
  window.removeEventListener('keydown', onArrowKeyPress);

  refs.modal.classList.remove('is-open');
  refs.modalImgEl.src = '';
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  if (evt.code === ESC_KEY_CODE) {
    onCloseBtnClick()
  }

}

function onRightChange() {

  if (currentIndex === imagesGallery.length - 1) {
    currentIndex = -1;
  }
  currentIndex += 1;
  changeCurrentIngex()
}

function onLeftChange() {

  if (currentIndex === 0) {
    currentIndex = imagesGallery.length;
  }
  currentIndex -= 1;
  changeCurrentIngex()
}


function changeCurrentIngex() {
  refs.modalImgEl.src = imagesGallery[currentIndex].original;
  refs.modalImgEl.alt = imagesGallery[currentIndex].description;
}


function onArrowKeyPress(evt) {
  const ARROW_RIGHT_KEY = 'ArrowRight';
  const ARROW_LEFT_KEY = 'ArrowLeft';
  if (evt.code === ARROW_RIGHT_KEY) {
    onRightChange();
  }
  if (evt.code === ARROW_LEFT_KEY) {
    onLeftChange();
  }
}


import imagesGallery from './gallery-items.js';



const refs = {
  galleryContainer: document.querySelector('.js-gallery'),
  // images: document.querySelectorAll('.gallery__image'),
  modal: document.querySelector('.lightbox'),
  modalImgEl: document.querySelector('.lightbox__image'),
  modalCloseBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalOverlay: document.querySelector('.lightbox__overlay'),
}



const galleryMarkup = createImageCardMarkup(imagesGallery);
refs.galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

refs.galleryContainer.addEventListener('click', onImageClick);
refs.modalCloseBtn.addEventListener('click', onCloseBtnClick);
refs.modalOverlay.addEventListener('click', onOverlayClick);


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

  // window.addEventListener('keydown', onArrowKeyPress);
  window.addEventListener('keydown', onEscKeyPress);


  const currImage = evt.target;
  const imageParrent = currImage.closest('.gallery__link')
  // console.log(currImage.dataset.source); //url большого изображения
  const largeImgLink = imageParrent.href; //url большого изображения


  const isGalleryImage = evt.target.classList.contains('gallery__image');
  console.log(isGalleryImage);

  if (!isGalleryImage) {
    return;
  }

  refs.modal.classList.add('is-open');
  refs.modalImgEl.src = largeImgLink;
}

function onCloseBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.modal.classList.remove('is-open');
  refs.modalImgEl.src = '';
}

function onOverlayClick() {
  onCloseBtnClick();
}

function onEscKeyPress(evt) {
  const ESC_KEY_CODE = 'Escape';
  if (evt.code === ESC_KEY_CODE) {
    onCloseBtnClick()
  }

}


console.log(refs.modalImgEl.src);









// ===== 3 часть доп задания в процессе


// function onArrowKeyPress(evt) {
//   const ARROW_RIGHT_KEY = 'ArrowRight';
//   const ARROW_LEFT_KEY = 'ArrowLeft';


//   return imagesGallery.forEach((img, i = 0, array) => {
    
//     if (refs.modalImgEl.src === img.original && evt.code === ARROW_RIGHT_KEY) {
//       refs.modalImgEl.src = array[i + 1].original;
//     }
//   });

// }





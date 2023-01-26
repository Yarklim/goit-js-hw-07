import { galleryItems } from './gallery-items.js';

const galleryListEl = document.querySelector('.gallery');

// Прослушивание и делегирование события / открытие модального окна
galleryListEl.addEventListener('click', openModalImg);

function openModalImg(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'IMG') {
    return;
  }
  const instanceImg = basicLightbox.create(`
        <img src="${e.target.dataset.source}" width="800" height="600">
    `);

  instanceImg.show();

  // Закрытие модалки по Escape
  if (instanceImg.visible()) {
    document.addEventListener('keydown', onKeyboardClick);
  }

  function onKeyboardClick(e) {
    if (e.code === 'Escape') {
      instanceImg.close();
      document.removeEventListener('keydown', onKeyboardClick);
    }
  }
}

// Создаю разметку галлереи в HTML
const imgMarcup = createItemImg(galleryItems);
galleryListEl.insertAdjacentHTML('beforeend', imgMarcup);

// Функция для создания разметки изображения
function createItemImg(items) {
  const imgItem = items
    .map(({ preview, original, description }) => {
      return `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src='${preview}'
      data-source='${original}'
      alt='${description}'
    />
  </a>
</div>`;
    })
    .join('');

  return imgItem;
}

import { fetchImages } from './js/pixabay-api.js';
import { renderImageCards } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('#loader');
const loadMoreBtn = document.querySelector('#load-more-btn');

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;
let lightbox = new SimpleLightbox('.gallery a');

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function clearGallery() {
  gallery.innerHTML = '';
}

function showLoadMoreButton() {
  loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
  loadMoreBtn.style.display = 'none';
}

async function searchImages(query) {
  currentQuery = query;
  currentPage = 1;
  totalHits = 0;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchImages(query, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found!',
      });
    } else {
      gallery.innerHTML = renderImageCards(data.hits);
      lightbox.refresh();

      if (data.totalHits > 15) {
        showLoadMoreButton();
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images.',
    });
  } finally {
    hideLoader();
  }
}

async function loadMoreImages() {
  currentPage += 1;
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Info',
        message: "You've reached the end of the results.",
      });
      hideLoadMoreButton();
    } else {
      gallery.insertAdjacentHTML('beforeend', renderImageCards(data.hits));
      lightbox.refresh();

      if (currentPage * 15 >= totalHits) {
        hideLoadMoreButton();
        iziToast.info({
          title: 'Info',
          message: "We're sorry, but you've reached the end of search results.",
        });
      }

      smoothScroll();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
    });
  } finally {
    hideLoader();
  }
}

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();
  if (query) {
    searchImages(query);
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query cannot be empty!',
    });
  }
});

loadMoreBtn.addEventListener('click', loadMoreImages);

window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100 &&
    currentQuery
  ) {
    loadMoreImages();
  }
});

function smoothScroll() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

// Element
const searchButtonId = document.getElementById('searchButtonId');
const spinner = document.getElementById('spinner');
const noDataAvailable = document.getElementById('noDataAvailable');
const signUpBtn = document.getElementById('signUpId');
const buyNowBtn = document.getElementById('buyNowId');
const joinBtn = document.getElementById('joinPremeum');

// signup button
signUpBtn.addEventListener('click', () => {
  signUp();
});

// Buy now
buyNowBtn.addEventListener('click', () => {
  buyNow();
});

// search button listener
searchButtonId.addEventListener('click', () => {
  showSpinner();
  document.getElementById('cardContainer').innerHTML = '';
  const searchText = document.getElementById('searchId').value;
  loadPhone(searchText);
});

// showAll button listener
let moreCard = 0;
const showAll = document.getElementById('showAllButton');
showAll.addEventListener('click', () => {
  const cardContainer = document.getElementById('cardContainer');

  moreCard.forEach((phone) => {
    const div = document.createElement('div');
    div.classList = 'card shadow-xl';
    div.innerHTML = `
    <figure class="px-10 pt-10 bg-[#0d6efd0d]">
      <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p class="text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
      <h3 class="text-2xl font-bold">$999</h3>
      <div class="card-actions">
        <button onclick="my_modal_5.showModal(); showDetails('${phone.slug}');" class="btn bg-btn-color text-white">Show Details</button>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });

  document.getElementById('showAllButton').classList.add('hidden');
});

// press enter and fire search button
document.getElementById('searchId').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchButtonId.click();
  }
});

joinBtn.addEventListener('click', () => {
  join();
})


// Functions
async function loadPhone(searchText) {
  let response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  let data = await response.json();
  displayPhone(data.data);
}

function displayPhone(phones) {
  const cardContainer = document.getElementById('cardContainer');

  if (phones.length > 15) {
    document.getElementById('showAllButton').classList.remove('hidden');
    // Slice phone array
    moreCard = phones.slice(15, phones.length);
    phones = phones.slice(0, 15);
  } else {
    document.getElementById('showAllButton').classList.add('hidden');
  }

  if (phones.length === 0) {
    noDataAvailable.classList.remove('hidden');
  } else {
    noDataAvailable.classList.add('hidden');
  }

  phones.forEach((phone) => {
    const div = document.createElement('div');
    div.classList = 'card shadow-xl';
    div.innerHTML = `
    <figure class="px-10 pt-10 bg-[#0d6efd0d]">
      <img src="${phone.image}" alt="${phone.phone_name}" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p class="text-[#706F6F]">There are many variations of passages of available, but the majority have suffered</p>
      <h3 class="text-2xl font-bold">$999</h3>
      <div class="card-actions">
        <button onclick="my_modal_5.showModal(); showDetails('${phone.slug}');" class="btn bg-btn-color text-white">Show Details</button>
      </div>
    </div>
    `;
    cardContainer.appendChild(div);
  });
  hideSpinner();
}

function showSpinner() {
  spinner.classList.remove('hidden');
}

function hideSpinner() {
  spinner.classList.add('hidden');
}

async function showDetails(slug) {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${slug}`
  );
  const data = await response.json();
  setModalData(data.data);
}

function setModalData(data) {
  const name = data.name ? data.name : 'No Information';
  const storage = data.mainFeatures.storage
    ? data.mainFeatures.storage
    : 'No Information';
  const slug = data.slug ? data.slug : 'No Information';
  const releaseDate = data.releaseDate ? data.releaseDate : 'No Information';
  const brand = data.brand ? data.brand : 'No Information';
  const displaySize = data.mainFeatures?.displaySize
    ? data.mainFeatures.displaySize
    : 'No Information';
  const chipset = data.mainFeatures?.chipSet
    ? data.mainFeatures.chipSet
    : 'No Information';
  const memory = data.mainFeatures?.memory
    ? data.mainFeatures.memory
    : 'No Information';
  const gps = data.others?.GPS ? data.others.GPS : 'No Information';

  const modal = document.getElementById('modal');

  modal.innerHTML = `
    <div class="card">
      <div class="bg-[#0d6efd0d] py-4">
        <figure><img src="${data.image}" alt="${name}" /></figure>
      </div>
      <div class="card-body p-2">
        <h2 class="card-title text-3xl">${name}</h2>
        <p class="text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Storage: </span>${storage}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Display Size: </span>${displaySize}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Chipset: </span>2${chipset}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Memory: </span>${memory}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Slug: </span>${slug}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Rllease date: </span>${releaseDate}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">Brand: </span>${brand}</p>

        <p class="text-xl text-[#706F6F]"><span class="font-semibold text-[#403F3F]">GPS: </span>${gps}</p>


        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn bg-[#DC3545] text-white">Close</button>
          </form>
        </div>
      </div>
    </div>
  `;
}

function signUp() {
  alert('Sign Up function does not exist!!');
}

function buyNow() {
  alert('Buy Now function does not exist!!');
}
function join() {
  alert('Join Premium function does not exist!!');
}

// loadPhone(['iphone', 'samsung', 'oppo', 'watch']);
loadPhone('a');

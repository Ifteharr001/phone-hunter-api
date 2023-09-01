const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displyPhones(phones);
};

const displyPhones = (phones) => {
    const showAllContiner = document.getElementById("show-all-container");
    if(phones.length > 12){
        showAllContiner.classList.remove("hidden");
    } else{
        showAllContiner.classList.add('hidden')
    }
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = '';
    phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-red-100 shadow-xl`;
    phoneCard.innerHTML = `
        <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.phone_name}</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard)
  });
  toggleLoadingSpinner(false)
};
// handle search button
const handleSearch = () =>{
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText);
}

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }
    else{
        loadingSpinner.classList.add('hidden')
    }
}
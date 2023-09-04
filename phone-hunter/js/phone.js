const loadPhone = async (searchText='samsung', isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displyPhones(phones, isShowAll);
};

const displyPhones = (phones, isShowAll) => {
    

    const showAllContiner = document.getElementById("show-all-container");
    if(phones.length > 12 && !isShowAll){
        showAllContiner.classList.remove("hidden");
    } else{
        showAllContiner.classList.add('hidden')
    }
    
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.textContent = "";
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }

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
              <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Ditails</button>
              </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard)
  });
  toggleLoadingSpinner(false)
};
// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchFiled = document.getElementById('search-filed');
    const searchText = searchFiled.value;
    loadPhone(searchText, isShowAll);
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

const showAllhandaler = () =>{
    handleSearch(true)
}

const handleShowDetails = async (id) =>{
    // console.log('clicked show details', id);
    const res = await fetch(
      `https://openapi.programming-hero.com/api/phone/${id}`
    );
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById("phone-name");
    phoneName.innerText = phone.name;
    const showDetailsContainer = document.getElementById(
      "show-ditails-container"
    );
    showDetailsContainer.innerHTML = `
      <img src ="${phone.image}" alt ="" />
      <p><span>storage: </span>${phone?.mainFeatures?.storage}</p>
    `;
    show_details_modal.showModal();
}

loadPhone()

let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button"); 

// Problem 1. List of pitches on page load [3}




let productData = [];

function fetchData(){
    fetch('http://localhost:3000/pitches')
    .then((res)=>res.json())
    .then((data)=>{
        cardList(data),
        productData= data
    })
    .catch((err)=>console.log(err))
}
fetchData();


function cardList(data)
{
    let dataList = data.map((el)=>
    card(el.id,el.image, el.founder, el.description,el.title,el.price,el.category))
    mainSection.innerHTML = dataList.join(" ");
}

function card(id,image,founder,description,title,price,category)
{
    let store = `
        <div>
        <h3 data-id=${id}> id : ${id} </h3>
        <img src="${image}" height="200px" width="200px">
        <h2>Founder : ${founder}</h2>
        <p>Description : ${description} </p>
        <p>Title : ${title} </p>
        <p> Price : ${price} </p>
        <p>category : ${category} </p>
        <a href="#" class="card-link" data-id=${id}> Edit </a> &nbsp;&nbsp;&nbsp;
        <button class="card-button" data-id=${id}> Delete </button>
        </div>
        
    `
    return store
}





document.addEventListener('click',(e)=>{
    if (e.target.classList.contains('card-button'))  
    {
        deleteProduct(e.target.dataset.id)
    }
})

function deleteProduct(id)
{
    fetch(`http://localhost:3000/pitches/${id}`,{
        method:'DELETE'
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
}



filterFood.addEventListener('click',()=>{
    let filterData = productData.filter((el)=>el.category=="Food")
    console.log(filterData)
    cardList(filterData)
});
filterElectronics.addEventListener('click',()=>{
    let filterData = productData.filter((el)=>el.category=="Electronics")
    console.log(filterData)
    cardList(filterData)
});
filterPersonalCare.addEventListener('click', () => {
    let filterData = productData.filter((el) => el.category == "Personal Care");
    console.log(filterData);
    cardList(filterData);
});

sortAtoZBtn.addEventListener('click',()=>{
    let lowtoHigh = productData.sort((a,b)=>{
        return a.price - b.price
    })
    cardList(lowtoHigh)
})

sortZtoABtn.addEventListener('click',()=>{
    let lowtoHigh = productData.sort((a,b)=>{
        return b.price - a.price
    })
    cardList(lowtoHigh)
})





document.addEventListener('click',(e)=>{
   if(e.target.classList.contains('card-link'))
   {
        console.log(e.target.dataset.id)
        updateData(e.target.dataset.id)
   }
})

function updateData(id)
{
    fetch(`http://localhost:3000/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        console.log(data)

        updatePitchTitleInput.value = data.title
        updatePitchIdInput.value = data.id
        updatePitchImageInput.value = data.image
        updatePitchfounderInput.value = data.founder
        updatePitchCategoryInput.value = data.category
        updatePitchPriceInput.value = data.price
    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener('click',()=>{
   

    let updateObj = {
        id :updatePitchIdInput.value,
        title : updatePitchTitleInput.value,
        image : updatePitchImageInput.value,
        category :updatePitchCategoryInput.value,
        founder : updatePitchfounderInput.value,
        price : updatePitchPriceInput.value,
    }
    fetch(`http://localhost:3000/pitches/${updateObj.id}`,{
        method:'PUT',
        headers : {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateObj)
    }).then((res)=>res.json())
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err))
})
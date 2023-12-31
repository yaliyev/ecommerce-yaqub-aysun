
import { get } from './product-request.js';

let favouritesString = localStorage.getItem('ecommerce-favourites');

let cartString = localStorage.getItem('ecommerce-cart');

let favourites = [];

let cart = [];

if(cartString != null){
    cart = JSON.parse(cartString);
}

if (favouritesString != null) {
    favourites = JSON.parse(favouritesString);
}

let productsCards = document.getElementById('products-cards');

let products = [];

let colorCheck = document.querySelectorAll(".colorCheck")

colorCheck.forEach((check) => {
  check.addEventListener("click", () => {
    colorCheck.forEach((anotherCheck) => {
      if (anotherCheck !== check) {
        anotherCheck.classList.remove("select");
      }
    });

    check.classList.toggle("select");
  });
});


async function getSearchParameters(){

    let parameters = new URLSearchParams(document.location.search);
    let search = parameters.get("search");

    
    if(search != null){
        products =  await get();
        let searchData = products.filter( (product)=> product.name.toLowerCase().indexOf(search.toLowerCase()) > -1);
        insertProducts(false,true,searchData);
    }else{
        insertProducts(true);
    }
     
    
    
 }




async function insertProducts(reloadData = false,searchMode = false, searchModeData = []) {

    productsCards.innerHTML = '';

    if(reloadData){

        products = await get();
    }
    if(!searchMode){
        searchModeData = JSON.parse(JSON.stringify(products));        
    }

    for (let i = 0; i < searchModeData.length; i++) {

        let product = searchModeData[i];

        // creating elements

        let colDiv = document.createElement('div');
        let productDiv = document.createElement('div');
        let cardDiv = document.createElement('div');
        let productCurrentStatus = document.createElement('div');
        let productCurrentStatusButton = document.createElement('button');
        let favouriteIcon = document.createElement('i');

        let productImageElement = document.createElement('img');
        let cardBodyDiv = document.createElement('div');
        let starsDiv = document.createElement('div');
        let cardTitleElement = document.createElement('h5');
        let cardPriceElement = document.createElement('p');
        let addToCartButton = document.createElement('button');



        // Attributes
        colDiv.setAttribute('class', 'col-12 col-xxl-6 col-xl-6 col-lg-6 col-md-12 mt-3');
        productDiv.setAttribute('class', 'product');
        cardDiv.setAttribute('class', 'card');
        productCurrentStatus.setAttribute('class', 'product-current-status d-flex justify-content-between');

        if(product.isNew == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-success m-2 py-2 px-4');
        }
        if(product.isDiscounted == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-danger m-2 py-2 px-4');
        }

        if (favourites.find((element) => element.id === product.id) != undefined) {
            favouriteIcon.setAttribute('class', 'fa-solid fa-heart fa-3x m-2');
        } else {
            favouriteIcon.setAttribute('class', 'fa-regular fa-heart fa-3x m-2');
        }

        productImageElement.setAttribute('class', 'card-img-top w-100 product-image');
        cardBodyDiv.setAttribute('class', 'card-body');
        starsDiv.setAttribute('class', 'stars');
        cardTitleElement.setAttribute('class', 'card-title');
        cardPriceElement.setAttribute('class', 'card-text');
        addToCartButton.setAttribute('class', 'product-add-to-cart btn btn-secondary text-secondary  bg-light w-100');


        // Text Contents

        if(product.isNew)
        productCurrentStatusButton.innerText = 'New';
        if(product.isDiscounted)
        productCurrentStatusButton.innerText = `-${product.discountPercent}%`;
        productImageElement.src = product.productImage;

        for(let j = 0; j < product.stars;j++){
            starsDiv.innerHTML +=`
            <i class="fa-solid fa-star"></i>
            `
        }
        for(let j = 0; j < 5 - product.stars;j++){
            starsDiv.innerHTML +=`
            <i class="fa-regular fa-star"></i>
            `
        }
        cardTitleElement.innerText = product.name;

        cardPriceElement.innerHTML = `
     <span class="product-price text-danger">$${product.price}</span>
     <span class="product-annual-price-information text-secondary">From $${(((product.price) / (100 - product.discountPercent)) * 100).toFixed(2)}</span>
     `;

        addToCartButton.innerText = 'Add to cart';

        if(!product.isNew&&!product.isDiscounted) // eger product yeni deyilse ve endirimde deyilse button gizlet
        productCurrentStatusButton.style.visibility = 'hidden';


        // eventListeners

        favouriteIcon.addEventListener('click', function () {
            let favouritesProductIndex = null;
            let productInFavourites = favourites.find((element,index) =>{
                favouritesProductIndex = index;
                return element.id === product.id;
            } );

            if (productInFavourites == undefined) {
                favourites.push({ id: product.id });
                localStorage.setItem('ecommerce-favourites', JSON.stringify(favourites));
                this.setAttribute('class', 'fa-solid fa-heart fa-3x m-2');
                Swal.fire({
                    icon: "success",
                    title: "Magnificent",
                    text: `Wooow you liked ${product.name}`,
                    timer: 1000
                  });
            }else{
                 favourites.splice(favouritesProductIndex,1);
                 localStorage.setItem('ecommerce-favourites', JSON.stringify(favourites));
                this.setAttribute('class', 'fa-regular fa-heart fa-3x m-2');
                Swal.fire({
                    icon: "success",
                    title: "Oops...",
                    text: `Product has been deleted from favourites`,
                    timer: 1000
                  });
            }

        });

        addToCartButton.addEventListener('click',function(){

            let result = cart.find((element)=>element.id === product.id);

            if(result == undefined){
                cart.push({id: product.id });
                localStorage.setItem('ecommerce-cart',JSON.stringify(cart));
                Swal.fire({
                    title: "Success",
                    text: "Product added to cart",
                    icon: "success"
                  });
            }else{
                Swal.fire({
                    title: "Exist",
                    text: "Product exist in cart",
                    icon: "error"
                  });
            }

            
        });


        // appends

        
        productCurrentStatus.appendChild(productCurrentStatusButton);
        productCurrentStatus.appendChild(favouriteIcon);

        cardBodyDiv.appendChild(starsDiv);
        cardBodyDiv.appendChild(cardTitleElement);
        cardBodyDiv.appendChild(cardPriceElement);
        cardBodyDiv.appendChild(addToCartButton);


        cardDiv.appendChild(productCurrentStatus);
        cardDiv.appendChild(productImageElement);
        cardDiv.appendChild(cardBodyDiv);

        productDiv.appendChild(cardDiv);
        colDiv.appendChild(productDiv);
        productsCards.appendChild(colDiv);
    }

}

(async () => {
    getSearchParameters();
  await insertProducts(false);
})();

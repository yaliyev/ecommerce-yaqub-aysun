import { get } from './product-request.js';

let cartString = localStorage.getItem('ecommerce-cart');

let products = [];

let cart = [];

if(cartString != null){
    cart = JSON.parse(cartString);
}

let featuredProductsCards = document.getElementById('featured-products-cards');
let bestsellerProductsCards = document.getElementById('bestseller-products-cards');
let discountProductsCards = document.getElementById('discount-products-cards');

let searchInputButton = document.getElementById('searchInptBtn');

searchInputButton.addEventListener('click',function(){
    let searchInput = document.getElementById('searchInpt');
    setTimeout(()=>{
        window.location.href = `search-result.html?search=${searchInput.value}`;
    },200)
   
})

async function insertFeaturedProducts(reloadData = false) {

    featuredProductsCards.innerHTML = '';

    if (reloadData == true) {
        products = await get();
    }

    for (let i = 0; i < products.length; i++) {

        let product = products[i];

        if(!product.isFeatured){
            continue;
        }

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
        //saver .setAttribute('class','');
        colDiv.setAttribute('class', 'col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 mt-3');
        productDiv.setAttribute('class', 'product');
        cardDiv.setAttribute('class', 'card');
        productCurrentStatus.setAttribute('class', 'product-current-status d-flex justify-content-between');

        if(product.isNew == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-success m-2 py-2 px-4');
        }
        if(product.isDiscounted == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-danger m-2 py-2 px-4');
        }
        favouriteIcon.setAttribute('class', 'fa-regular fa-heart fa-3x m-2');
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
    //     starsDiv.innerHTML = `
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  `;

        cardTitleElement.innerText = product.name;

        cardPriceElement.innerHTML = `
     <span class="product-price text-danger">$${product.price}</span>
     <span class="product-annual-price-information text-secondary">From $${(((product.price) / (100 - product.discountPercent)) * 100).toFixed(2)}</span>
     `;

        addToCartButton.innerText = 'Add to cart';

        if(!product.isNew&&!product.isDiscounted) // eger product yeni deyilse ve endirimde deyilse button gizlet
        productCurrentStatusButton.style.visibility = 'hidden';


        // eventListeners

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
        featuredProductsCards.appendChild(colDiv);
    }
}
async function insertBestsellerProducts(reloadData = false) {

    bestsellerProductsCards.innerHTML = '';

    if (reloadData == true) {
        products = await get();
    }

    for (let i = 0; i < products.length; i++) {

        let product = products[i];

        if(!product.isBestSeller){
            continue;
        }

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
        //saver .setAttribute('class','');
        colDiv.setAttribute('class', 'col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 mt-3');
        productDiv.setAttribute('class', 'product');
        cardDiv.setAttribute('class', 'card');
        productCurrentStatus.setAttribute('class', 'product-current-status d-flex justify-content-between');
        if(product.isNew == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-success m-2 py-2 px-4');
        }
        if(product.isDiscounted == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-danger m-2 py-2 px-4');
        }
        favouriteIcon.setAttribute('class', 'fa-regular fa-heart fa-3x m-2');
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
    //     starsDiv.innerHTML = `
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  `;

        cardTitleElement.innerText = product.name;

        cardPriceElement.innerHTML = `
     <span class="product-price text-danger">$${product.price}</span>
     <span class="product-annual-price-information text-secondary">From $${(((product.price) / (100 - product.discountPercent)) * 100).toFixed(2)}</span>
     `;

        addToCartButton.innerText = 'Add to cart';

        // eventListeners

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
        bestsellerProductsCards.appendChild(colDiv);
    }
}

async function insertDiscountProducts(reloadData = false) {

    discountProductsCards.innerHTML = '';

    if (reloadData == true) {
        products = await get();
    }

    for (let i = 0; i < products.length; i++) {

        let product = products[i];

        if(!product.isDiscounted){
            continue;
        }

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
        //saver .setAttribute('class','');
        colDiv.setAttribute('class', 'col-12 col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 mt-3');
        productDiv.setAttribute('class', 'product');
        cardDiv.setAttribute('class', 'card');
        productCurrentStatus.setAttribute('class', 'product-current-status d-flex justify-content-between');
        if(product.isNew == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-success m-2 py-2 px-4');
        }
        if(product.isDiscounted == true){
            productCurrentStatusButton.setAttribute('class', 'product-current-status-button btn btn-danger m-2 py-2 px-4');
        }
        favouriteIcon.setAttribute('class', 'fa-regular fa-heart fa-3x m-2');
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
    //     starsDiv.innerHTML = `
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  <i class="fa-regular fa-star"></i>
    //  `;

        cardTitleElement.innerText = product.name;

        cardPriceElement.innerHTML = `
     <span class="product-price text-danger">$${product.price}</span>
     <span class="product-annual-price-information text-secondary">From $${(((product.price) / (100 - product.discountPercent)) * 100).toFixed(2)}</span>
     `;

        addToCartButton.innerText = 'Add to cart';

        // eventListeners

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
        discountProductsCards.appendChild(colDiv);
    }
}

(async ()=>{
    await insertFeaturedProducts(true); // data cekdiyimize gore gozdeyirik(Yalniz burada,ona gore digerlerinde falsedu)
    insertBestsellerProducts(false);
    insertDiscountProducts(false);
})();

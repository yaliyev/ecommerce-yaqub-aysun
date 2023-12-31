import { get } from './product-request.js';

let favouritesString = localStorage.getItem('ecommerce-favourites');

let cartString = localStorage.getItem('ecommerce-cart');

let favourites = [];


let cart = [];

let products = [];


if (favouritesString != null) {
    favourites = JSON.parse(favouritesString);
}

if(cartString != null){
    cart = JSON.parse(cartString);
}


let cartCards = document.getElementById('cart-cards');

function calculateTotalPrice(){
    let sum = 0;

    let subTotalPrice = document.getElementById('subtotal-price');
    let totalPrice = document.getElementById('total-price');

    subTotalPrice.innerText = '';
    totalPrice.innerText = '';

    for(let i=0;i<cart.length;i++){
        let productId = cart[i].id;

        let product = products.find(product=>product.id===productId);

        if(product != undefined){
            sum += Number(product.price);
        }
    }

    subTotalPrice.innerText = sum;
    totalPrice.innerText = sum;
}


function insertCartItems() {

    cartCards.innerHTML = "";

    for(let i = 0; i < cart.length;i++){
        let productId = cart[i].id;

        let product = products.find(product=>product.id===productId);

        if(product != undefined){

            let colTwelveDiv = document.createElement('div');

            let shoppingBagItemDiv = document.createElement('div');
        
            let rowOneDiv = document.createElement('div');
        
            let colFourDiv = document.createElement('div');
        
            let productImageElement = document.createElement('img');
        
            let colEightDiv = document.createElement('div');
        
            let rowTwoDiv = document.createElement('div');
        
           
        
            let shoppingBagGeneralInfoDiv = document.createElement('div');
        
            let productNameElement = document.createElement('h5');
        
            let productPriceElement = document.createElement('h5');
        
            let rowThreeDiv = document.createElement('div');
        
            let colFourInfoDiv = document.createElement('div');
        
            let sizeSpan = document.createElement('span');
        
            let colorSpan = document.createElement('span');
        
            let rowFourDiv = document.createElement('div');
        
            let colFourDeliveryDiv = document.createElement('div');
        
            let deliverySpan = document.createElement('span');
        
            let rowFiveDiv = document.createElement('div');
        
            let colFourQualityDiv = document.createElement('div');
        
            let qualitySpan = document.createElement('span');
        
            let qualitySelect = document.createElement('select');
        
            let optionElement = document.createElement('option');
        
            let rowSixDiv = document.createElement('div');
        
            let colFiveDiv = document.createElement('div');
        
            let flexContainer = document.createElement('div');
        
            let favouriteDiv = document.createElement('div');
        
            let favouriteIcon = document.createElement('i');
        
            let favouriteButton = document.createElement('button');
        
            let removeDiv = document.createElement('div');
        
            let removeIcon = document.createElement('i');
        
            let removeButton = document.createElement('button');
        
        
            colTwelveDiv.setAttribute('class', 'col-12');
        
            shoppingBagItemDiv.setAttribute('class', 'shopping-bag-item');
        
            rowOneDiv.setAttribute('class', 'row border rounded my-3 p-3');
        
            colFourDiv.setAttribute('class', 'col-4');
        
            productImageElement.setAttribute('class', 'bg-light-subtle');
        
            productImageElement.src = product.productImage;
        
            colEightDiv.setAttribute('class', 'col-8');
        
            rowTwoDiv.setAttribute('class', 'row my-2');
        
            shoppingBagGeneralInfoDiv.setAttribute('class', 'shopping-bag-general-info d-flex justify-content-between');
        
            rowThreeDiv.setAttribute('class', 'row my-3');
        
            colFourInfoDiv.setAttribute('class', 'col-4 d-flex justify-content-between');
        
            rowFourDiv.setAttribute('class', 'row my-3');
        
            colFourDeliveryDiv.setAttribute('class', 'col-4');
        
            rowFiveDiv.setAttribute('class', 'row my-3');
        
            colFourQualityDiv.setAttribute('class', 'col-4 d-flex justify-content-between');
        
            qualitySelect.setAttribute('class', 'form-control w-50');
        
            optionElement.setAttribute('value', '');
        
            rowSixDiv.setAttribute('class', 'row my-3 d-flex flex-row-reverse');
        
            colFiveDiv.setAttribute('class', 'col-5');
        
            flexContainer.setAttribute('class', 'd-flex column-gap-5');
        
            favouriteDiv.setAttribute('class', 'shopping-bag-general-info-favourite');
        
            if (favourites.find((element) => element.id === product.id) != undefined) {
                favouriteIcon.setAttribute('class', 'fa-solid fa-heart');
            } else {
                favouriteIcon.setAttribute('class', 'fa-regular fa-heart');
            }
        
            favouriteButton.setAttribute('class', 'shopping-bag-general-info-favourite-btn');
        
            removeDiv.setAttribute('class', 'shopping-bag-general-info-remove');
        
            removeIcon.setAttribute('class', 'fa-solid fa-trash');
        
            removeButton.setAttribute('class', 'shopping-bag-general-info-remove-btn');
        
            productNameElement.innerText = product.name;
        
            productPriceElement.innerHTML = `US $<span class="shopping-bag-general-info-price">${product.price}</span>`;
        
            sizeSpan.innerText = `Size: ${product.size}`;
        
            colorSpan.innerText = 'Color: Grey';

            let day1 = Math.trunc((Math.random()*100)/10);
            let day2 = Math.trunc((Math.random()*100)/10);

            deliverySpan.innerText = `Delivery: ${Math.min(day1,day2)}-${Math.max(day1,day2)} days`;
        
            qualitySpan.innerText = 'Quality:';
        
            optionElement.innerText = '2-9';
        
            favouriteButton.innerText = 'favourite';
        
            removeButton.innerText = 'Remove';


            favouriteDiv.addEventListener('click', function () {
                console.log(1);
                let favouritesProductIndex = null;
                let productInFavourites = favourites.find((element,index) =>{
                    favouritesProductIndex = index;
                    return element.id === product.id;
                } );
    
                if (productInFavourites == undefined) {
                    favourites.push({ id: product.id });
                    localStorage.setItem('ecommerce-favourites', JSON.stringify(favourites));
                    favouriteDiv.querySelector('i').setAttribute('class', 'fa-solid fa-heart');
                    Swal.fire({
                        icon: "success",
                        title: "Magnificent",
                        text: `Wooow you liked ${product.name}`,
                        timer: 1000
                      });
                }else{
                     favourites.splice(favouritesProductIndex,1);
                     localStorage.setItem('ecommerce-favourites', JSON.stringify(favourites));
                     favouriteDiv.querySelector('i').setAttribute('class', 'fa-regular fa-heart');
                    Swal.fire({
                        icon: "success",
                        title: "Oops...",
                        text: `Product has been deleted from favourites`,
                        timer: 1000
                      });
                }
    
            });

            removeButton.addEventListener('click',function(){
                cart.splice(i,1);
                    localStorage.setItem('ecommerce-cart',JSON.stringify(cart));
                    insertCartItems();
                Swal.fire({
                    icon: "success",
                    title: "Deleted",
                    text: "Product has been deleted from cart",
                  })
            });
        
        
            colFourDiv.appendChild(productImageElement);
        
            rowOneDiv.appendChild(colFourDiv);
        
            shoppingBagGeneralInfoDiv.appendChild(productNameElement);
        
            shoppingBagGeneralInfoDiv.appendChild(productPriceElement);
        
            rowTwoDiv.appendChild(shoppingBagGeneralInfoDiv);
            colEightDiv.appendChild(rowTwoDiv);
        
            colFourInfoDiv.appendChild(sizeSpan);
            colFourInfoDiv.appendChild(colorSpan);
        
            rowThreeDiv.appendChild(colFourInfoDiv);
        
            colFourDeliveryDiv.appendChild(deliverySpan);
        
            rowFourDiv.appendChild(colFourDeliveryDiv);
        
            qualitySelect.appendChild(optionElement);
        
            colFourQualityDiv.appendChild(qualitySpan);
        
            colFourQualityDiv.appendChild(qualitySelect);
        
            rowFiveDiv.appendChild(colFourQualityDiv);
        
            favouriteDiv.appendChild(favouriteIcon);
        
            favouriteDiv.appendChild(favouriteButton);
        
            removeDiv.appendChild(removeIcon);
        
            removeDiv.appendChild(removeButton);
        
            flexContainer.appendChild(favouriteDiv);
        
            flexContainer.appendChild(removeDiv);
        
        
            
        
            colFiveDiv.appendChild(flexContainer);

            rowSixDiv.appendChild(colFiveDiv);
            
            colEightDiv.appendChild(rowThreeDiv);
        
            colEightDiv.appendChild(rowFourDiv);
        
            colEightDiv.appendChild(rowFiveDiv);
        
            colEightDiv.appendChild(rowSixDiv);
        
            rowOneDiv.appendChild(colEightDiv);
        
            shoppingBagItemDiv.appendChild(rowOneDiv);
        
            colTwelveDiv.appendChild(shoppingBagItemDiv);
        
            cartCards.appendChild(colTwelveDiv);

        }
    }
    calculateTotalPrice();
}
(async()=>{
   products = await get();
   insertCartItems();
})()
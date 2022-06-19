let food = [
    {
        "name": ['Rosa Vegana'],
        "ingredients": ['Rote Beete Soße, veganer Morzarella, veganer Gorgonzola, Feigen, Pinienkerne, Basilikum, Oregano'],
        "price": ['9.10'],
    },
    {
        "name": ['Arancione Vegana'],
        "ingredients": ['Kürbis Creme, veganer Morzarella, gegrillte Melanzani, gegrillter Zucchini, gelbe Tomaten, Pistazien Crumble, Rucola'],
        "price": ['11.30'],
    },
    {
        "name": ['Viola Vegana'],
        "ingredients": ['Lila Kartoffel Creme, vegan Feta Crumble, getrocknete gelbe und rote Tomaten, Basilikum, lila Kartoffelchips, Basilikumpesto'],
        "price": ['12.10'],
    },
    {
        "name": ['Gyros'],
        "ingredients": ['Seitan Gyros, Quinoa, Karotten, Rotkraut, Tomaten, Avocado, Tzatziki'],
        "price": ['10.20']
    },
    {
        "name": ['Rainbow'],
        "ingredients": ['Tofu-Spieße, gegrilltes Gemüse, Rotkraut, Kartotte, Salat, lauch, schwazer Sesam, Saté-Sauce, Koriander'],
        "price": ["11.20"]
    },
    {
        "name": ['Crunchy Pumpkin'],
        "ingredients": ['Quinoa, Lauch, Kürbis, Orangen-Senf, geröstete Nüsse & Kerne'],
        "price": ['12.30']
    },
    {
        "name": ['Cheesburger'],
        "ingredients": ['Impossible-Pattie, veganer Cheddar, Zwiebel, Tomate, Salat, Cheese-Sauce'],
        "price": ['9.90']
    },
    {
        "name": ['Chili-Burger'],
        "ingredients": ['Impossible-Pattie, veganer Cheddar, Jalapenos, röst Zwiebel, Tomate, Salat, Hot-Sauce'],
        "price": ['10.50']
    },
    {
        "name": ['Houseburger'],
        "ingredients": ['Rote-Beete-Pattie, veganer Cheddar, Jalapenos, Karamell Zwiebel, Tomate, Salat, House-Sauce'],
        "price": ['11.90']
    },
    {
        "name": ['Apfelstrudel'],
        "ingredients": ['Frische Äpfelscheiben in  Blätterteig serviert mit Vanillesauce'],
        "price": ['8.10']
    },
    {
        "name": ['Schoko-Mousse'],
        "ingredients": ['Fluffiges Schoko-Mousse, leichter und gesünder als das Original'],
        "price": ['9.20']
    },
    {
        "name": ['Schoko-Donuts'],
        "ingredients": ['Klassischer Donut mit Schokoglasur'],
        "price": ['5.10']
    }
]
let basketNames = []
let basketPrices = []
let basketAmouts = []

//-----------render Menu-------------

function renderDishes() {
    let menu = document.getElementById('menu')
    menu.innerHTML = '';

    for (let i = 0; i < food.length; i++) {
        renderDishesTemplate(i)
    }
    renderBasket();
}

function showPizza() {
    let menu = document.getElementById('menu')
    menu.innerHTML = '';

    for (let i = 0; i < 3; i++) {
        renderDishesTemplate(i)
    }
}

function showBowls() {
    let menu = document.getElementById('menu')
    menu.innerHTML = '';

    for (let i = 3; i < 6; i++) {
        renderDishesTemplate(i)
    }
}

function showBurger() {
    let menu = document.getElementById('menu')
    menu.innerHTML = '';

    for (let i = 6; i < 9; i++) {
        renderDishesTemplate(i)
    }
}

function showDessert() {
    let menu = document.getElementById('menu')
    menu.innerHTML = '';

    for (let i = 9; i < 12; i++) {
        renderDishesTemplate(i)
    }
}


function renderDishesTemplate(i) {
    menu.innerHTML += `<div class="menulist">
                            <div class="menulistText">
                                 <h3>${food[i]['name']}</h3>
                                <div>${food[i]['ingredients']}</div>
                            </div>
                             <div class="menulistPrice">
                                <img class="addToBasket" onclick="addToBasket(${i})" src="img/plus.png">
                                <div>${food[i]['price']}</div>
                            </div>
                        </div>`
}

//-------------Basket--------------//

function addToBasket(i) {
    let price = `${food[i]['price']}`;
    let index = basketNames.indexOf(`${food[i]['name']}`)
    if (index == -1) {
        basketNames.push(`${food[i]['name']}`);
        basketPrices.push(price);
        basketAmouts.push(1);

    } else {
        basketAmouts[index]++;
    }
    renderBasket();
}

function renderBasket() {
    let basket = document.getElementById('basketItems');

    if (basketAmouts.length == 0) {
        document.getElementById('emptyBasket').classList.remove('d-none');
        document.getElementById('basketImg').classList.remove('d-none');
        document.getElementById('priceBasket').classList.add('d-none');
        document.getElementById('payBtn').classList.add('d-none');
    } else {
        document.getElementById('emptyBasket').classList.add('d-none');
        document.getElementById('basketImg').classList.add('d-none');
        document.getElementById('priceBasket').classList.remove('d-none');
        document.getElementById('payBtn').classList.remove('d-none');
        basket.innerHTML = '';
        document.getElementById('basketItemsResponsive').innerHTML = '';
        for (i = 0; i < basketNames.length; i++) {
            renderBasketTemplate(i);
            renderResponsiveBasketTemplate(i);
        }
    }
    subtotal();
    renderResponsiveBasket()
}

function renderBasketTemplate(i) {
    let basket = document.getElementById('basketItems', 'basketItemsResponsive');
    
    basket.innerHTML += `<div class="basketGroups">
                            <div>${basketAmouts[i]}</div>
                            <div>${basketNames[i]}</div>
                            <div class="basketRight">
                                <div class="basketPriceSingle">${(basketPrices[i] * basketAmouts[i]).toFixed(2)} €</div>
                                <img class="minus-plus-basket" onclick="minusOne(${i})" src="/img/minus-basket.png">
                                <img class="minus-plus-basket" onclick="plusOne(${i})" src="/img/plus-basket.png">
                            </div>
                        </div>`
}

function renderResponsiveBasketTemplate(i) {
  
}

function minusOne(i) {
    if (basketAmouts[i] == 1) {
        deleteItem(i)
    } else {
        basketAmouts[i]--;
        renderBasket();
    }

}

function plusOne(i) {
    basketAmouts[i]++;
    renderBasket();
}

function deleteItem(i) {
    basketNames.splice(i, 1);
    basketPrices.splice(i, 1);
    basketAmouts.splice(i, 1);
    let basket = document.getElementById('basketItems');
    basket.innerHTML = '';
    document.getElementById('basketItemsResponsive').innerHTML = '';
    renderBasket();

}

function subtotal() {
    let subtotal = document.getElementById('subtotal');
    let result = 0;

    for (i = 0; i < basketAmouts.length; i++) {
        result += basketPrices[i] * basketAmouts[i];
    }
    subtotal.innerHTML = result.toFixed(2) + ' €';
    sum(result);
    subtotalResponsive();
}

function subtotalResponsive() {
    let subtotal = document.getElementById('subtotalResponsive');
    let result = 0;

    for (i = 0; i < basketAmouts.length; i++) {
        result += basketPrices[i] * basketAmouts[i];
    }
    subtotal.innerHTML = result.toFixed(2) + ' €';
    sum(result);
}

function sum(result) {
    let deliverycosts = 4.9;
    let finalsum = document.getElementById('sum');
    let delivery = document.getElementById('costs');
    if (result < 20) {
        let sum = result + deliverycosts;
        finalsum.innerHTML = `${sum.toFixed(2)} €`;
        delivery.innerHTML = `<div>4,90 €</div>`;
    } else {
        finalsum.innerHTML = `${result.toFixed(2)} €`;
        delivery.innerHTML = `<div>0 €</div>`;
    }
    sumResponsive(result);
}

function sumResponsive(result) {
    let deliverycosts = 4.9;
    let finalsum = document.getElementById('sumResponsive');
    let delivery = document.getElementById('costsResponsive');
    if (result < 20) {
        let sum = result + deliverycosts;
        finalsum.innerHTML = `${sum.toFixed(2)} €`;
        delivery.innerHTML = `<div>4,90 €</div>`;
    } else {
        finalsum.innerHTML = `${result.toFixed(2)} €`;
        delivery.innerHTML = `<div>0 €</div>`;
    }
}

window.onscroll = function () {
    if (window.scrollY > 200) {
        document.getElementById('basket').classList.add('basketScroll');
    } else {
        document.getElementById('basket').classList.remove('basketScroll');
    }
}

function openBasket() {
    document.getElementById('responsiveBasket').classList.remove('d-none');
    document.getElementById('menu').classList.add('d-none');

}

function renderResponsiveBasket() {
    if (basketAmouts.length == 0) {
        document.getElementById('emptyBasketResponsive').classList.remove('d-none');
        document.getElementById('basketImgResponsive').classList.remove('d-none');
        document.getElementById('priceBasketResponsive').classList.add('d-none');
        document.getElementById('payBtnResponsive').classList.add('d-none');
    } else {
        document.getElementById('emptyBasketResponsive').classList.add('d-none');
        document.getElementById('basketImgResponsive').classList.add('d-none');
        document.getElementById('priceBasketResponsive').classList.remove('d-none');
        document.getElementById('payBtnResponsive').classList.remove('d-none');

    }
}



function backToMenu() {
    document.getElementById('responsiveBasket').classList.add('d-none');
    document.getElementById('menu').classList.remove('d-none');
}
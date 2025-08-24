const product = document.querySelector('.product');
const inputText = document.querySelector('.inputText');
const btnserch = document.querySelector('.btnserch');
const favorit = document.querySelector('.countFavorit');
const count = document.querySelector('.count');
const loadbg = document.querySelector('.loadbg');
const popupbg = document.querySelector('.popupbg');
const btnClosed = document.querySelector('.btnClosed');
const btnTop = document.querySelector('.gotop');
const storegeGoods = JSON.parse(localStorage.getItem('goods')) || [];
const favoritStorege = JSON.parse(localStorage.getItem('favorit')) || [];
const searchbg = document.querySelector('.serchbg');
const navigation = document.querySelector('.navigation');
const btnOpenHeader = document.querySelector('.btnheader');
const span1 = document.querySelector('.span1');
const span2 = document.querySelector('.span2');
const span3 = document.querySelector('.span3');

btnOpenHeader.addEventListener('click', () => {
    span1.classList.toggle('open');
    span2.classList.toggle('open');
    span3.classList.toggle('open');
    searchbg.classList.toggle('open');
    navigation.classList.toggle('open');
    document.querySelector('main').classList.toggle('open');
});


if(storegeGoods) {
    renderCard();
    loadbg.classList.add('active');
}

fetch('https://fakestoreapi.com/products')
   .then(response => {
       return response.json();
    })

    .then(data => {
       localStorage.setItem('goods', JSON.stringify(data));
       renderCard(data);
       loadbg.classList.add('active');
    })

   .catch(err => {
       console.log('Ошибка соединения с сервером!');
    })

function renderCard() {
      product.innerHTML = '';
        storegeGoods.forEach((item, index) => {
            const {id, category, image, title, price, description, rating} = item;
            const titleMin = title.slice(0, 14);
            const desMin = description.slice(0, 60);
            let cards = document.createElement('div');
            cards.setAttribute('class', 'card');
            cards.setAttribute('id', id);
            cards.innerHTML = `
            <img src="${image}" alt="goods" class="imgcard">
            <h2 class="title">${titleMin}</h2>
            <p class="description">${desMin}...</p>
            <div class="center">
            <span class="price">${price} $</span>
            <span class="rating">${rating.rate}</span>
            </div>
            <div class="centerBtn">
            <img class="imgHard" data-index="${index}" src="img/hard.png">
            <button class="btnAdd" data-index="${index}">Add to cart</button>
            </div>
            </div>
            `;
            product.appendChild(cards);
    
            const btnAdd = cards.querySelector('.btnAdd');
            const hards = cards.querySelector('.imgHard');
            const storegeFavorit = JSON.parse(localStorage.getItem('favorit')) || [];
            const isFavorit = storegeFavorit.find(item => item.id == id);
            if(isFavorit) {
                hards.src = 'img/blackHard.png';
            };
            const itsCard = JSON.parse(localStorage.getItem('carts')) || [];
            const isCard = itsCard.find(item => item.id == id);
            if(isCard) {
              btnAdd.classList.add('active');
              btnAdd.textContent = '✔';
            };

        });

};

const storege = JSON.parse(localStorage.getItem('carts')) || [];
const totalCard = storege.reduce((prev, item) => {
    return prev + item.quantity;
}, 0);

count.textContent = totalCard;

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnAdd')) {
        const card = e.target.closest('.card');
        const id = card.id;
        const img = card.querySelector('.imgcard').src;
        const title = card.querySelector('.title').textContent;
        const desc = card.querySelector('.description').textContent;
        const prices = card.querySelector('.price').textContent;
        const rating = card.querySelector('.rating').textContent;
        const price = parseInt(prices.replace(/\s/, ''), 10);
        const cards = {id, img, title, desc, price, rating, quantity: 1};
        const goodStorege = localStorage.getItem('carts') || '[]';
        const carts = JSON.parse(goodStorege);
        
        const existCard = carts.findIndex(item => item.id === id);
        if(existCard !== -1) {
            alert('Такой товар уже есть!');
        } else {
            carts.push(cards);
            localStorage.setItem('carts', JSON.stringify(carts));
            e.target.classList.add('active');
            e.target.textContent = '✔';
            const storege = JSON.parse(localStorage.getItem('carts')) || [];
            const totalCard = storege.reduce((prev, item) => {
                return prev + item.quantity;
            }, 0);

            count.textContent = totalCard;
        };

    } else if(e.target.classList.contains('imgcard')) {
        const cardElem = e.target.closest('.card');
        const id = cardElem.id;
        const img = cardElem.querySelector('.imgcard').src;
        const title = cardElem.querySelector('.title').textContent;
        const descriptions = cardElem.querySelector('.description').textContent;
        const price = cardElem.querySelector('.price').textContent;
        const rating = cardElem.querySelector('.rating').textContent;
        const btn = cardElem.querySelector('.btnadd');
        
        const popup = document.querySelector('.popup');
        const imgPopup = document.querySelector('.popImg');
        const titlePopup = document.querySelector('.popTitle');
        const popDescription = document.querySelector('.popDescription');
        const pricePopup = document.querySelector('.popPrice');
        const ratingPopup = document.querySelector('.popRating');
        const btnPopup = document.querySelector('.btnadd');
        
        popup.setAttribute('id', id);
        imgPopup.src = img;
        titlePopup.textContent = title;
        popDescription.textContent = descriptions;
        pricePopup.textContent = price;
        ratingPopup.textContent = rating;

        btnPopup.classList.remove('active');
        btnPopup.textContent = 'Add to cart';

        const itsCard = JSON.parse(localStorage.getItem('carts')) || [];
        const isCard = itsCard.find(item => item.id == id);
        if(isCard) {
            btnPopup.classList.add('active');
            btnPopup.textContent = '✔';
        };

        popupbg.classList.add('active');
        document.querySelector('html').classList.add('noScroll');

    } else if(e.target.classList.contains('btnadd')) {
        const popupElem = e.target.closest('.popup');
        const id = popupElem.id;
        const img = popupElem.querySelector('.popImg').src;
        const title = popupElem.querySelector('.popTitle').textContent;
        const desc = popupElem.querySelector('.popDescription').textContent;
        const prices = popupElem.querySelector('.popPrice').textContent;
        const rating = popupElem.querySelector('.popRating').textContent;
        const price = parseInt(prices.replace(/\s/, ''), 10);

        const cards = {id, img, title, desc, price, rating, quantity:1};
        const goodsStorege = localStorage.getItem('carts') || '[]';
        const carts = JSON.parse(goodsStorege);

        const existId = carts.findIndex(item => item.id === id);
        if(existId !== -1) {
            alert('Такой товар уже есть!');
        } else {
            carts.push(cards);
            localStorage.setItem('carts', JSON.stringify(carts));
            const goodsStorege = JSON.parse(localStorage.getItem('carts')) || [];
            const totalCard = goodsStorege.reduce((prev, item) => {
                return prev + item.quantity;
            }, 0);
            count.textContent = totalCard;
            e.target.classList.add('active');
            e.target.textContent = '✔';

        };

    } else if (e.target.classList.contains('imgHard')) {
        const cardsElem = e.target.closest('.card');
        const id = cardsElem.id;
        const img = cardsElem.querySelector('.imgcard').src;
        const title = cardsElem.querySelector('.title').textContent;
        const desc = cardsElem.querySelector('.description').textContent;
        const prices = cardsElem.querySelector('.price').textContent;
        const rating = cardsElem.querySelector('.rating').textContent;
        const price = parseInt(prices.replace(/\s/, ''), 10);

        const cards = {id, img, title, desc, price, rating, quantity:1};
        const goodsStorege = localStorage.getItem('favorit') || '[]';
        const cartsfavorit = JSON.parse(goodsStorege);
        const existId = cartsfavorit.findIndex(item => item.id === id);
        if(existId !== -1) {
            cartsfavorit.splice(existId, 1);
            e.target.src = 'img/hard.png'; 
            localStorage.setItem('favorit', JSON.stringify(cartsfavorit));
        } else {
            cartsfavorit.push(cards);
            localStorage.setItem('favorit', JSON.stringify(cartsfavorit));
            e.target.src = 'img/blackHard.png';
            favorit.classList.add('active');
            setTimeout(() => {
                favorit.classList.remove('active');
            }, 500);
        };
    };

    btnClosed.addEventListener('click', () => {
        popupbg.classList.remove('active');
        document.querySelector('html').classList.remove('noScroll');
        location.reload();
    });

});


btnTop.addEventListener('click', goTop);
window.addEventListener('scroll', track);

function track() {
    const offset = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if(offset > coords) {
        btnTop.classList.add('active');
    } else {
        btnTop.classList.remove('active');
    };
};

function goTop() {
    if(window.pageYOffset > 0) {
        window.scroll(0, -77);
        setTimeout(goTop, 0);
    };
};

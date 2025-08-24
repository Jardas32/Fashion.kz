const storegeFavorit = JSON.parse(localStorage.getItem('favorit')) || [];
const storegeGoods = JSON.parse(localStorage.getItem('carts')) || [];
const favoritesGoods = document.querySelector('.favoritesGoods');
const count = document.querySelector('.count');
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

const totalCard = storegeGoods.reduce((prev, item) => {
    return prev + item.quantity;
}, 0);

count.textContent = totalCard;

function renderFavorit() {
    favoritesGoods.innerHTML = '';
    if(storegeFavorit) {
        storegeFavorit.forEach((item, index) => {
           const {id, img, title, desc, price, rating, quantity = 1} = item;
            const newCard = document.createElement('div');
            newCard.setAttribute('class', 'card');
            newCard.setAttribute('id', id);
            newCard.innerHTML = `
            <img src="${img}" alt="goods" class="imgcard">
            <h2 class="title">${title}</h2>
            <p class="description">${desc}...</p>
            <div class="center">
            <span class="price">${price} $</span>
            <span class="rating">${rating}</span>
            </div>
            <div class="centerBtn">
            <img class="imgHard" data-index="${index}" src="img/blackHard.png">
            <button class="btnAdd" data-index="${index}">Add to cart</button>
            </div>
            </div>
            `;
            favoritesGoods.appendChild(newCard);
            const btnAdd = newCard.querySelector('.btnAdd');
            const isFavorit = JSON.parse(localStorage.getItem('carts')) || [];
            const itsCard = isFavorit.find(item => item.id == id);
            if(itsCard) {
                btnAdd.classList.add('active');
                btnAdd.textContent = '✔';
            };

        });
    };
};

renderFavorit();

document.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if(e.target.classList.contains('imgHard')) {
        storegeFavorit.splice(index, 1);
        localStorage.setItem('favorit', JSON.stringify(storegeFavorit));
        renderFavorit();
    } else if(e.target.classList.contains('btnAdd')) {
        const cardElem = e.target.closest('.card');
        const id = cardElem.id;
        const img = cardElem.querySelector('.imgcard').src;
        const title = cardElem.querySelector('.title').textContent;
        const desc = cardElem.querySelector('.description').textContent;
        const prices = cardElem.querySelector('.price').textContent;
        const price = parseInt(prices.replace(/\s/, ''), 10);

        const cards = {id, img, title, desc, price, quantity: 1};
        const storegeGoods = localStorage.getItem('carts') || '[]';
        const carts = JSON.parse(storegeGoods);
        const existCard = carts.findIndex(item => item.id === id);
        if(existCard !== -1) {
            alert('Такой товар уже есть!');
        } else {
            carts.push(cards);
            localStorage.setItem('carts', JSON.stringify(carts));
            e.target.classList.add('active');
            e.target.textContent = '✔';
            const totalCard = carts.reduce((prev, item) => {
                return prev + item.quantity;
            }, 0);
            count.textContent = totalCard;
        };
    };

});


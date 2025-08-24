const countCard = document.querySelector('.count');
const slider = document.querySelector('.slider');
const storegeGoods = JSON.parse(localStorage.getItem('carts')) || [];
const storegeAllproducts = JSON.parse(localStorage.getItem('goods')) || [];
const btnLeft = document.querySelector('.btnLeft');
const btnRight = document.querySelector('.btnRight');
const countFavorit = document.querySelector('.countFavorit');
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


function renderTotalCard() {
    const totalCard = storegeGoods.reduce((prev, item) => {
        return prev + item.quantity;
    }, 0)

    countCard.textContent = totalCard;
};

renderTotalCard();

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('li-list')) {
       e.target.classList.toggle('active');
       const liElem = e.target.closest('.li-list');
       const textAbout = liElem.querySelector('.ptext');
       textAbout.classList.toggle('active');
    };
    
});

function rendrCard() {
    slider.innerHTML = '';
    if(storegeAllproducts) {
        storegeAllproducts.forEach((item, index) => {
            if(index <= 7) {
                const {id, image, title, description, price, rating,  quantity = 1 } = item;
                const titleMin = title.slice(0, 14);
                const descMin = description.slice(0, 60);
                const newCard = document.createElement('div');
                newCard.className = 'card';
                newCard.setAttribute('id', id);
                newCard.innerHTML = `
                <img src="${image}" alt="goods" class="imgcard">
                <h2 class="title">${titleMin}</h2>
                <p class="description">${descMin}...</p>
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
                slider.appendChild(newCard);

                const btnAdd = newCard.querySelector('.btnAdd');
                const isCard = JSON.parse(localStorage.getItem('carts')) || [];
                const itsCard = isCard.find(item => item.id == id);
                if(itsCard) {
                   btnAdd.classList.add('active');
                   btnAdd.textContent = '✔';
                };
                
                const imgHard = newCard.querySelector('.imgHard');
                const isCardFavorit = JSON.parse(localStorage.getItem('favorit')) || [];
                const itsCardFavorit = isCardFavorit.find(item => item.id == id);
                if(itsCardFavorit) {
                   imgHard.src = 'img/blackHard.png';
                };
            };
        });
    };
};

rendrCard();

document.addEventListener('click', (e) => {
    if(e.target.classList.contains('btnAdd') || e.target.classList.contains('imgcard') ||
     e.target.classList.contains('imgHard')) {
        const cardElem = e.target.closest('.card');
        const id = cardElem.id;
        const img = cardElem.querySelector('.imgcard').src;
        const title = cardElem.querySelector('.title').textContent;
        const desc = cardElem.querySelector('.description').textContent;
        const prices = cardElem.querySelector('.price').textContent;
        const price = parseInt(prices.replace(/\s/, ''), 10);
        const rating = cardElem.querySelector('.rating').textContent;
        const btnAdd = cardElem.querySelector('.btnAdd').textContent;
        const cards = {id, img, title, desc, price, rating, quantity:1};

        if(e.target.classList.contains('btnAdd')) {
        const storegeGoods = localStorage.getItem('carts') || '[]';
        const carts = JSON.parse(storegeGoods);
        const existCard = carts.findIndex(item => item.id === id);
        if(existCard !== -1) {
            alert('Такой товар уже в корзине!');
        }
        else {
            carts.push(cards);
            localStorage.setItem('carts', JSON.stringify(carts));
            const total = carts.reduce((prev, item) => {
                return prev + item.quantity;
            }, 0);
            countCard.textContent = total;

            e.target.classList.add('active');
            e.target.textContent = '✔';
        };
    
        } else if(e.target.classList.contains('imgHard')) {
            const storegeFavorit = localStorage.getItem('favorit') || '[]';
            const carts = JSON.parse(storegeFavorit);
            const existCard = carts.findIndex(item => item.id === id);
            if(existCard !== -1) {
                carts.splice(existCard, 1);
                e.target.src = 'img/hard.png';
                localStorage.setItem('favorit', JSON.stringify(carts));
            } else {
                carts.push(cards);
                localStorage.setItem('favorit', JSON.stringify(carts));
                e.target.src = 'img/blackHard.png';
                countFavorit.classList.add('active');
                setTimeout(() => {
                    countFavorit.classList.remove('active');
                }, 500);
            };

        } else if(e.target.classList.contains('imgcard')) {
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
            popDescription.textContent = desc;
            pricePopup.textContent = prices;
            ratingPopup.textContent = rating;
            btnPopup.textContent = 'Add to cart';

            btnPopup.classList.remove('active');

            document.querySelector('.popupbg').classList.add('active');
            document.querySelector('html').classList.add('noScroll');

            const storegeCarts = JSON.parse(localStorage.getItem('carts')) || [];
            const isCard = storegeCarts.find(item => item.id == id);
            if(isCard) {
                btnPopup.classList.add('active');
                btnPopup.textContent = '✔';
            };

        };

        } else if(e.target.classList.contains('btnClosed')) {
            document.querySelector('.popupbg').classList.remove('active');
            document.querySelector('html').classList.remove('noScroll');
            location.reload();
        };
        
        if(e.target.classList.contains('btnadd')) {
            const popupCard = e.target.closest('.popup');
            const id = popupCard.id;
            const img = popupCard.querySelector('.popImg').src;
            const title = popupCard.querySelector('.popTitle').textContent;
            const desc = popupCard.querySelector('.popDescription').textContent;
            const prices = popupCard.querySelector('.popPrice').textContent;
            const price = parseInt(prices.replace(/\s/, ''), 10);
            const rating = popupCard.querySelector('.popRating').textContent;
            const cards = {id, img, title, desc, price, rating, quantity:1};

            const storegeCart = localStorage.getItem('carts') || '[]';
            const carts = JSON.parse(storegeCart);
            const existId = carts.findIndex(item => item.id === id);
            if(existId !== -1) {
                alert('Такой товар уже в корзине!');
            } else {
                carts.push(cards);
                localStorage.setItem('carts', JSON.stringify(carts));
                e.target.classList.add('active');
                e.target.textContent = '✔';
            };

        };

});


let currentIndex = 0;
function getVisibleCardsCount() {
    const width = window.innerWidth;
    if (width < 576) return 1;
    if (width < 992) return 1;
    if (width < 1200) return 3;
    return 4;
};

function updateSliderPosition() {
    const card = document.querySelector('.card');
    const cardWidth = card.offsetWidth + 20; 
    const visibleCount = getVisibleCardsCount();
    const totalCards = document.querySelectorAll('.card').length;
    const maxIndex = Math.ceil(totalCards - visibleCount);
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;
    const offset = -(cardWidth * currentIndex);
    slider.style.transform = `translateX(${offset}px)`;
};

btnLeft.addEventListener('click', () => {
    currentIndex--;
    updateSliderPosition();
});

btnRight.addEventListener('click', () => {
    currentIndex++;
    updateSliderPosition();
});

window.addEventListener('resize', updateSliderPosition);
window.addEventListener('load', updateSliderPosition);


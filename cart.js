const goodsStorege = JSON.parse(localStorage.getItem('carts')) || [];
const cartbg = document.querySelector('.cartsbg');
const cart = document.querySelector('.cart');
const total = document.querySelector('.total');
const totalPrice = document.querySelector('.totalPrice');
const titleProduct = document.querySelector('.titleProduct');
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

function quantityTotal() {
    const total = goodsStorege.reduce((prev, item) => {
        return prev + item.price * item.quantity;
    }, 0);
    
    const tottalString = total.toLocaleString('usd') + '$';
    totalPrice.textContent = tottalString;
};

function renderCard() {
    cart.innerHTML = '';
    titleProduct.innerHTML = '';
    const totalCard = goodsStorege.reduce((prev, item) => {
    return prev + item.quantity;
    }, 0);

    count.textContent = totalCard;

    if (goodsStorege.length > 0) {
        titleProduct.textContent = 'Your cart';
        total.classList.add('active');
    } else {
        total.classList.remove('active');
        total.style.display = 'none';
        titleProduct.style.marginTop = '60px';

        const a = document.createElement('a');
        a.className = 'shoping';
        a.href = 'goods.html';
        a.textContent = 'Shoping';
        titleProduct.appendChild(a);

        const img = document.createElement('img');
        img.className = 'cartEmpty';
        img.src = 'img/empty_cart.png';
        cartbg.appendChild(img);
    };

    if(goodsStorege) {
        goodsStorege.forEach((item, index) => {
        const {id, img, title, desc, price, quantity = 1} = item;
        const quantPrice = price * quantity;

        let card = document.createElement('div');
        card.setAttribute('class', 'card');
        card.setAttribute('id', id);
        card.innerHTML = `
        <img class="imgcard" src="${img}" alt="product">
        <h2 class="title">${title}</h2>
        <p class="description">${desc}</p>
        <span class="price">${quantPrice}$</span>
        <div class="counts">
            <span data-index="${index}" class="minus">-</span>
            <span class="fill">${quantity}</span>
            <span data-index="${index}" class="plus">+</span>
        </div>
        <button data-index="${index}" class="btnDel">X</button>
        `;

        cart.appendChild(card);

        });

        quantityTotal();
    };

};

renderCard();

cart.addEventListener('click', (e) => {
    const index = e.target.getAttribute('data-index');
    if(e.target.classList.contains('plus')) {
        goodsStorege[index].quantity++;
    } else if(e.target.classList.contains('minus')) {
        goodsStorege[index].quantity--;
        if(goodsStorege[index].quantity <= 1) {
            goodsStorege[index].quantity = 1;
        }
    } else if(e.target.classList.contains('btnDel')) {
        goodsStorege.splice(index, 1);
    };

    localStorage.setItem('carts', JSON.stringify(goodsStorege));
    renderCard();
});

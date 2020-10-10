import {getData} from './getData.js';

const COUNTER = 6

const wishList = ['idd005', 'idd100', 'idd077', 'idd033']

const generateGoodsPage = () => {
  
  const mainHeader = document.querySelector('.main-header')
  const goodsList = document.querySelector('.goods-list')
  
  const generateCards = (data) => {
    goodsList.textContent = ''
    if (!data.length) {
      const goods = document.querySelector('.goods')
      goods.textContent = location.search === '?wishlist' ?
        'Список желаний пуст' :
        'К сожалению по вашему запросу ничего не найдено'
    }
    data.forEach(item => {
      const {name, count, description, id, img, price} = item
      const itemHTML = `
        <li class="goods-list__item">
          <a class="goods-item__link" href="card.html#idd001">
            <article class="goods-item">
              <div class="goods-item__img">
                <img src=${img[0]}
                  ${img[1] ? `data-second-image=${img[1]}` : ''}>
              </div>
              ${count > COUNTER ? `<p class="goods-item__new">Новинка</p>`: ''}
              ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
              <h3 class="goods-item__header">${name}</h3>
              <p class="goods-item__description">${description}</p>
              <p class="goods-item__price">
                <span class="goods-item__price-value">${price}</span>
                <span class="goods-item__currency"> ₽</span>
              </p>
              <button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>
            </article>
          </a>
        </li>
      `
      goodsList.insertAdjacentHTML('afterbegin', itemHTML)
    })
  }
  
  if (location.pathname.includes('goods') && location.search) {
    const search = decodeURI(location.search)
    const prop = search.split('=')[0].slice(1)
    console.log('prop: ', prop);
    const value = search.split('=')[1]
    console.log('value: ', value);

    if (prop === 's') {
      getData.search(value, (data) => generateCards)
      mainHeader.textContent = `Поиск: ${value}`
    } else if (prop === 'wishlist') {
      getData.wishList(wishList, generateCards)
      mainHeader.textContent = `Список желаний`
    } else if (prop === 'cat' || prop === 'subcat') {
      getData.category(prop, value, generateCards)
      mainHeader.textContent = value
    }
  }
}

export default generateGoodsPage

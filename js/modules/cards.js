import {getResource} from '../services/services'

function cards() {
  // Cards
  // Используем классы для создание карточек меню

  class MenuCard {
    constructor(
      src,
      alt,
      title,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.classes = classes;
      this.parent = document.querySelector(parentSelector);
      this.transfer = 430;
      this.changeToTenge();
    }

    changeToTenge() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement("div");

      // проверка на наличие хотя бы одного класса в обертке
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element); // добавляем класс по умолчанию
      } else {
        // пробегаемся по массиву, и добавляем его в классы
        this.classes.forEach((className) => element.classList.add(className));
      }

      element.innerHTML = `
                <img src=${this.src} alt=${this.alt}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> тенге/день</div>
                </div>
            `;
      this.parent.append(element); // добавить элемент в родитель
    }
  }

  // получение данных для карточек
  // getResource('http://localhost:3000/menu')
  //     .then(data => {
  //         // пробегаемся по массиву и добавляем в новую MenuCard
  //         data.forEach(({img, altImg, title, descr, price}) => {
  //             new MenuCard(img, altImg, title, descr, price, '.menu .container').render();
  //         });
  //     })

  axios.get("http://localhost:3000/menu").then((data) => {
    console.log(data);
    // пробегаемся по массиву и добавляем в новую MenuCard
    data.data.forEach(({ img, altImg, title, descr, price }) => {
      new MenuCard(
        img,
        altImg,
        title,
        descr,
        price,
        ".menu .container"
      ).render();
    });
  });
}

export default cards;

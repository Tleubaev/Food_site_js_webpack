require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calculator from "./modules/calculator";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {

  const modalTimerId = setTimeout(() => openModal(".modal", modalTimerId), 50000);

  calculator();
  cards();
  forms("form", modalTimerId);
  modal("[data-modal]", ".modal");
  tabs(".tabheader__item", ".tabcontent", ".tabheader__items", "tabheader__item_active");
  timer('.timer', '2023-01-01');
  slider({
    container: '.offer__slide',
    wrapper: '.offer__slider-wrapper',
    field: '.offer__slider-inner',
    nextArrow: '.offer__slider-next',
    prevArrow: '.offer__slider-prev',
    slide: '.offer__slider',
    totalCounter: '#total',
    currentCounter: '#current',
  });
});

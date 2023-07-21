// открыть модалку
function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";

  if (modalTimerId) {
    clearInterval(modalTimerId); // отключить таймер модалки
  }
}

// закрыть модалку
function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
  // Модалка
  const modalTrigger = document.querySelectorAll(triggerSelector), // data-modal - атрибут
    modal = document.querySelector(modalSelector);

  // const modalTimerId = setTimeout(openModal, 15000);  // setTimeout - активирует функцию через какой то время
  let modalClick = 0;

  modalTrigger.forEach((btn) => {
    btn.addEventListener("click", () => openModal(modalSelector, modalTimerId));
  });

  modal.addEventListener("click", (e) => {
    // e.target.getAttribute('data-close') - если нажимаем на крестик
    if (e.target === modal || e.target.getAttribute("data-close") == "") {
      closeModal(modalSelector);
    }
  });

  document.addEventListener("keydown", (e) => {
    // слушель событий кнопок
    if (e.code === "Escape" && modal.classList.contains("show")) {
      // e.code - считывает код нажатой кнопки, contains - содержит ли
      closeModal(modalSelector);
    }
  });

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight &&
      modalClick === 0
    ) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener("scroll", showModalByScroll);
      modalClick++;
    }
    // window.pageYOffset - Высота от верхней части экрана
    // document.documentElement.clientHeight - Высота браузера
    // document.documentElement.scrollHeight - Высота всей станицы
  }
  window.addEventListener("scroll", showModalByScroll);

  // window.addEventListener('scroll', () => {
  // }, {once: true}); - проверяет выполнилось ли событие хоть один раз, т.е. был ли скролл хотя бы раз
}

export default modal;
export { openModal };
export { closeModal };

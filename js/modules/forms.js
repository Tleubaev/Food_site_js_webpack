import { openModal, closeModal } from "./modal";
import { postData } from "../services/services";

function forms(formSelector, modalTimerId) {
  // Forms
  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: "img/form/spinner.svg",
    success: "Спасибо! Скоро мы с вами свяжемся",
    failure: "Что-то пошло не так...",
  };

  // под каждую форму запускаем функцию postData
  forms.forEach((item) => {
    bindPostData(item);
  });
  

  // передаём в функцию нашу форму
  function bindPostData(form) {
    // ставим слушатель событий на форму, кнопка button имеет событие submit
    form.addEventListener("submit", (e) => {
      // preventDefault - отменяем стандартное поведение браузера
      e.preventDefault();

      // создаём вывод сообщения о статусе отправки
      const statusMessage = document.createElement("img");
      // изменяем пусть картинки, есть 2 способа:
      // statusMessage.setAttribute('src', message.loading);
      statusMessage.src = message.loading;
      statusMessage.classList.add("form_image");
      // form.append(statusMessage);
      // insertAdjacentElement - альтернатива append, только ставит после элемента
      form.insertAdjacentElement("afterend", statusMessage);

      // для получения данных с формы используем
      const formData = new FormData(form);

      // конвертируем объект FormData в JSON объект
      const json = JSON.stringify(Object.fromEntries(formData.entries()));
      // fromEntries - массивы превратить в объекты
      // entries - объекты превратить в массивы
      // JSON.stringify - конвертирует обычный объект в объект JSON

      postData("http://localhost:3000/requests", json)
        .then((data) => {
          console.log(data);
          // при успешной прогрузке меняем сообщение
          showThanksModal(message.success, true);
        })
        .catch(() => {
          showThanksModal(message.failure, false);
        })
        .finally(() => {
          // что бы очистить форму - reset
          form.reset();
          // убираем картинку прогрузки
          statusMessage.remove();
        });
    });
  }

  // функция об успешной отправки сообщения
  function showThanksModal(message, complete) {
    // подсоединяемся к контенту модального окна, что бы его скрыть
    const modalDialog = document.querySelector(".modal__dialog");
    modalDialog.classList.add("hide");
    // открываем модальное окно заново, это для формы которая НЕ в модалке
    openModal('.modal', modalTimerId);

    // создаём новый контент для модального окна
    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
                <div class="progress_bar">
                    <div class="my_progress_bar"></div>
                </div>
            </div>
        `;

    // добавляем в нашу модалку новый контент
    modal.append(thanksModal);

    // Progress bar
    const myProgressBar = document.querySelector(".my_progress_bar");
    setTimeout(() => {
      if (complete) {
        myProgressBar.style.width = "100%";
      } else {
        myProgressBar.style.width = "37%";
        myProgressBar.style.backgroundColor = "red";
      }
    }, 100);

    // обновляем модальное окно, после показа пользователю
    setTimeout(() => {
      thanksModal.remove();
      modalDialog.classList.add("show");
      modalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 3000);
  }

  // подключаемся к json-server
  fetch("http://localhost:3000/menu") // запрос
    .then((data) => data.json()) // ответ от сервера превращаем в json объект
    .then((res) => {
      // результат выводим в консоль
      console.log(res);
    });
}

export default forms;

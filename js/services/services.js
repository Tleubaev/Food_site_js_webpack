// для отправки данных на сервер
const postData = async (url, data) => {
  // async - Асинхронные функции
  // создаём fetch запрос
  const res = await fetch(url, {
    // await - обозначение функции окончание которой нужно дождаться
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    // JSON.stringify - конвертирует обычный объект в объект JSON
    body: data,
  });
  return await res.json(); // return ожидает срабатывания окончания метода
};

const getResource = async (url) => {
  const res = await fetch(url);
  // т.к. для fetch ошибки с сервера не являются catch, то код продолжит работать, хотя не должен, поэтому делаем проверку
  if (!res.ok) {
    // .ok - специальное свойство fetch, обозначает что ответ был получен
    // throw - выбросить, например ошибку
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};

export { postData };
export { getResource };

// await - работает только внутри async–функций
// await заставит интерпретатор JavaScript ждать до тех пор, пока промис справа от await не выполнится. 
// После чего оно вернёт его результат, и выполнение кода продолжится.

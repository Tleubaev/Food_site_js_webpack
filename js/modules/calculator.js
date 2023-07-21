function calculator() {
    // Caltulator
    const result = document.querySelector('.calculating__result span');

    let sex, height, weight, age, activity;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female')
    }

    if (localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');
    } else {
        activity = 1.375;
        localStorage.setItem('activity', 1.375)
    }

    // set active class from local storage
    function setActiveClass(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('data-activity') === localStorage.getItem('activity')) {
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }
        })
    }
    setActiveClass('#gender div', 'calculating__choose-item_active');
    setActiveClass('.calculating__choose_big div', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !activity) {
            result.textContent = '___ ';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * activity);
            console.log('girl');
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
            console.log('man');
        }
    }
    calcTotal();


    // calculate selector choose
    function chooseCalculateSelector(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-activity')) {
                    activity = +e.target.getAttribute('data-activity');
                    localStorage.setItem('activity', +e.target.getAttribute('data-activity'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                })
                elem.classList.add(activeClass);
            })
            calcTotal();
        })
    };
    chooseCalculateSelector('#gender div', 'calculating__choose-item_active');
    chooseCalculateSelector('.calculating__choose_big div', 'calculating__choose-item_active');

    // get input value to let
    function getInputInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
                input.setAttribute('title', 'Введите числа')
            } else {
                input.style.border = 'none';
                input.setAttribute('title', '')
            }

            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    getInputInformation('#height');
    getInputInformation('#weight');
    getInputInformation('#age');
}

export default calculator; 







    // function chooseCalculateSelector(selector) {
    //     selector.classList.add('calculating__choose-item_active');
    // }
    // function removeCaltulateSelectors([]) {

    // }
    // const male = document.querySelector('#male'),
    //     female = document.querySelector('#female');
    // male.addEventListener('click', () => {
    //     male.classList.add('calculating__choose-item_active');
    //     female.classList.remove('calculating__choose-item_active');
    //     sex = 'male';
    // })
    // female.addEventListener('click', () => {
    //     female.classList.add('calculating__choose-item_active');
    //     male.classList.remove('calculating__choose-item_active');
    //     sex = 'female';
    // })
    // const lowActivity = document.querySelector('#low'),
    //     smallActivity = document.querySelector('#small'),
    //     mediumActivity = document.querySelector('#medium'),
    //     hightActivity = document.querySelector('#hight');
    // lowActivity.addEventListener('click', () => {
    //     lowActivity.classList.add('calculating__choose-item_active');
    //     smallActivity.classList.remove('calculating__choose-item_active');
    //     mediumActivity.classList.remove('calculating__choose-item_active');
    //     hightActivity.classList.remove('calculating__choose-item_active');
    //     activity = lowActivity.getAttribute('data-activity');
    // })
    // smallActivity.addEventListener('click', () => {
    //     smallActivity.classList.add('calculating__choose-item_active');
    //     lowActivity.classList.remove('calculating__choose-item_active');
    //     mediumActivity.classList.remove('calculating__choose-item_active');
    //     hightActivity.classList.remove('calculating__choose-item_active');
    //     activity = smallActivity.getAttribute('data-activity');
    // })
    // mediumActivity.addEventListener('click', () => {
    //     mediumActivity.classList.add('calculating__choose-item_active');
    //     smallActivity.classList.remove('calculating__choose-item_active');
    //     lowActivity.classList.remove('calculating__choose-item_active');
    //     hightActivity.classList.remove('calculating__choose-item_active');
    //     activity = mediumActivity.getAttribute('data-activity');
    // })
    // hightActivity.addEventListener('click', () => {
    //     hightActivity.classList.add('calculating__choose-item_active');
    //     smallActivity.classList.remove('calculating__choose-item_active');
    //     mediumActivity.classList.remove('calculating__choose-item_active');
    //     lowActivity.classList.remove('calculating__choose-item_active');
    //     activity = hightActivity.getAttribute('data-activity');
    // })
    // heightInput = document.querySelector('#height'),
    //     weightInput = document.querySelector('#weight'),
    //     ageInput = document.querySelector('#age');
    // heightInput.addEventListener('change', () => {
    //     height = heightInput.value;
    // });
    // weightInput.addEventListener('change', () => {
    //     weight = weightInput.value;
    // });
    // ageInput.addEventListener('change', () => {
    //     age = ageInput.value;
    // });
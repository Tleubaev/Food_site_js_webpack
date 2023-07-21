function timer(id, deadLine) {

    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date()), // new Date - текущая дата, parse - превратить в мили секунды
            days = Math.floor(t / (1000 * 60 * 60 * 24) % 7),     // floor - округление до целого
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60),
            month = Math.floor(t / (1000 * 60 * 60 * 24 * 30)),
            week = Math.floor((t / (1000 * 60 * 60 * 24 * 7)) % 4);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
            'month': month,
            'week': week,
        };
    };

    function getZero(num) {     // что бы поставить 0, где нужно
        if (num >= 0 && num <= 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000),      // setInterval - запускает определенную функцию через определенное время
            month = timer.querySelector('#month'),
            week = timer.querySelector('#week'),
            title = timer.querySelector('.title');

        updateClock();  // для того что бы не было задержки в 1 секунду

        function updateClock() {
            const t = getTimeRemaining(endtime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            month.innerHTML = getZero(t.month);
            week.innerHTML = getZero(t.week);

            if (t.total <= 0) {
                clearInterval(timeInterval);        // clearInterval - функция остановки таймера 
                month.innerHTML = '0';
                week.innerHTML = '0';
                days.innerHTML = '0';
                hours.innerHTML = '0';
                minutes.innerHTML = '0';
                seconds.innerHTML = '0';
                title.innerHTML = 'Акция закончилась!';
            }
        }
    }
    setClock(id, deadLine);   // запускаем функцию

};

export default timer;
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // Слайдер

    const currentSlide = document.querySelector(currentCounter),
        totalSlides = document.querySelector(totalCounter),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        slides = document.querySelectorAll(container),
        slidersWrapper = document.querySelector(wrapper),
        slidersField = document.querySelector(field),
        width = window.getComputedStyle(slidersWrapper).width,
        slider = document.querySelector(slide);

    let slideIndex = 1,
        offset = 0,
        slideWidth = +width.replace(/\D/g, '');     // replace - возвращает новую строку, использутеся в основном с регулярными выражениям

    function deleteNotDigits(str) {             // альтенатива slideWidth
        return +str.replace(/\D/g, '');
    }


    if (slides.length < 10) {
        totalSlides.innerHTML = `0${slides.length}`;
    } else {
        totalSlides.innerHTML = `${slides.length}`;
    }

    slidersField.style.display = 'flex';
    slidersField.style.width = 100 * slides.length + '%';
    slidersField.style.transition = '0.5s all';
    slidersWrapper.style.overflow = 'hidden';

    next.addEventListener('click', () => {
        if (offset == slideWidth * (slides.length - 1)) {
            offset = 0;
            console.log(offset);
        } else {
            offset += slideWidth;
            console.log(offset);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slideIndex < 10) {
            currentSlide.innerHTML = `0${slideIndex}`;
        } else {
            currentSlide.innerHTML = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = slideWidth * (slides.length - 1);
            console.log(offset);
        } else {
            offset -= slideWidth;
            console.log(offset);
        }
        slidersField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        if (slideIndex < 10) {
            currentSlide.innerHTML = `0${slideIndex}`;
        } else {
            currentSlide.innerHTML = `${slideIndex}`;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[slideIndex - 1].style.opacity = 1;
    });

    // Альтернативный вариант слайдера
    // if (slides.length < 10) {
    //     totalSlides.innerHTML = `0${slides.length}`;
    // } else {
    //     totalSlides.innerHTML = `${slides.length}`;
    // }
    // function showSlider(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     } else if (n < 1) {
    //         slideIndex = slides.length;
    //     } else {
    //         console.log(slideIndex);
    //     } 
    //     slides.forEach((item, i) => {
    //         item.classList.add('hide');
    //         if (i + 1 === slideIndex) {
    //             item.classList.remove('hide');
    //             item.classList.add('show');
    //         }
    //     })
    //     if (slideIndex < 10) {
    //         currentSlide.innerHTML = `0${slideIndex}`;
    //     } else {
    //         currentSlide.innerHTML = `${slideIndex}`;
    //     }
    // };
    // showSlider(slideIndex);

    // function swipeSlider(n) {
    //     showSlider(slideIndex += n);
    // };

    // next.addEventListener('click', () => {
    //     swipeSlider(1);
    // });
    // prev.addEventListener('click', () => {
    //     swipeSlider(-1);
    // });


    // Slider's dots
    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicators');
    indicators.style.cssText = `
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;
    slider.append(indicators);
    slider.style.cssText = `position: relative;`;

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;
        if (i + 1 == slideIndex) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = slideWidth * (slideTo - 1);
            slidersField.style.transform = `translateX(-${offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[slideIndex - 1].style.opacity = 1;

            if (slideIndex < 10) {
                currentSlide.innerHTML = `0${slideIndex}`;
            } else {
                currentSlide.innerHTML = `${slideIndex}`;
            }
        })
    })
}

export default slider;
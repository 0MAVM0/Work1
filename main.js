document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;
  
    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        updateIndicators(index);
        updateButtons(index);
    }

    function updateIndicators(index) {
      indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.style.backgroundColor = 'black';
            } else {
                indicator.style.backgroundColor = '#ccc';
            }
        });
    }

    function updateButtons(index) {
        if (index === 0) {
            prevBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'inline-block';
        }
        if (index < 4) {
            prevBtn.textContent = 'Назад';
            nextBtn.textContent = 'Вперёд';
        } else {
            prevBtn.textContent = 'Оставить заявку';
            nextBtn.textContent = 'Посчитать заново';
        }
    }
        prevBtn.addEventListener('click', function () {
        if (currentSlide > 0) {
            currentSlide--;
            showSlide(currentSlide);
        }
    });

    nextBtn.addEventListener('click', function () {
        if (currentSlide < 4) {
            currentSlide++;
            showSlide(currentSlide);
        } else {
            currentSlide = 0;
            showSlide(currentSlide);
        }
    });

    showSlide(currentSlide);
});

var element = document.getElementById('phone');
var maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false
}
var mask = new IMask(element, maskOptions);
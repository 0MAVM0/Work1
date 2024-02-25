function showSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none';
}

document.querySelectorAll('.sidebar a').forEach(item => {
    item.addEventListener('click', () => {
        hideSidebar();
    });
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.bottom = "40px";
    } else {
        scrollToTopBtn.style.bottom = "700px";
    }
}

document.getElementById("scrollToTopBtn").onclick = function() {
    scrollToTop();
};

function scrollToTop() {
    var position = document.documentElement.scrollTop || document.body.scrollTop;
    if (position) {
        window.requestAnimationFrame(scrollToTop);
        window.scrollTo(0, position - position / 8);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const resultParagraph = document.getElementById('result');
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
        if (index === 4) {
            calculateResult();
            addPromoInputChangeListener();
        }
    }

    function updateIndicators(index) {
        indicators.forEach((indicator, i) => {
            if (i <= index) {
                indicator.style.backgroundColor = 'red';
            } else {
                indicator.style.backgroundColor = '#ccc';
            }
        });
    }

    function updateButtons(index) {
        if (index === 0) {
            prevBtn.style.display = 'none';
            prevBtn.id = 'prevBtn';
        } else {
            prevBtn.style.display = 'inline-block';
        }
        if (index < 4) {
            prevBtn.textContent = 'Назад';
            prevBtn.id = 'prevBtn';
            nextBtn.textContent = 'Далее';
        } else {
            prevBtn.innerHTML = `<a href="#popupHr">Оставить заявку</a>`;
            prevBtn.id = 'popupBtn';
            nextBtn.textContent = 'Посчитать заново';
        }
    }

    prevBtn.addEventListener('click', function () {
        if (currentSlide < 4) {
            currentSlide--;
            showSlide(currentSlide);
        } else if (currentSlide === 0) {
            currentSlide = 4;
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

    function calculateResult() {
        const sum = parseFloat(document.getElementById('sumInput').value);
        const vatRate = parseInt(document.querySelector('input[name="vat"]:checked').value);
        const promo = document.querySelector('input[name="promo"]:checked').value;
        const promoInputValue = document.getElementById('promo-input').value.trim();

        let vatSize = sum / 6;
        let discount = 0;

        if (promo === 'no') {
            discount = 0;
        } else if (promo === 'yes' && promoInputValue === 'НЕТНДС') {
            discount = 0.10;
        }

        let serviceFee = 0;
        if (sum <= 1000000) {
            serviceFee = sum * (2.5 / 100);
        } else if (sum <= 5000000) {
            serviceFee = sum * (2 / 100);
        } else if (sum <= 10000000) {
            serviceFee = sum * (1.5 / 100);
        } else if (sum <= 50000000) {
            serviceFee = sum * (1 / 100);
        } else {
            serviceFee = sum * (0.8 / 100);
        }

        let totalAmount = sum + vatSize - (sum * discount) - serviceFee;

        resultParagraph.innerHTML = `<p>Сумма НДС: <span>${vatSize.toFixed(2)} руб.</span></p>
                                <p>Стоимость услуг: <span>${serviceFee.toFixed(2)} руб.</span></p>
                                <p>Скидка: <span>${(discount * 100).toFixed(2)}%</span></p>
                                <p>Итоговая сумма: <span>${totalAmount.toFixed(2)} руб.</span></p>`;
    }

    showSlide(currentSlide);

    function addPromoInputChangeListener() {
        const promoInput = document.getElementById('promo-input');
        promoInput.addEventListener('input', function () {
            calculateResult();
        });
    }

    const promoRadioYes = document.querySelector('input[value="yes"]');
    const promoRadioNo = document.querySelector('input[value="no"]');
    const promoInput = document.getElementById('promo-input');

    function togglePromoInputVisibility() {
        if (promoRadioYes.checked) {
            promoInput.style.display = 'inline-block';
        } else {
            promoInput.style.display = 'none';
        }
    }

    promoRadioYes.addEventListener('change', togglePromoInputVisibility);
    promoRadioNo.addEventListener('change', togglePromoInputVisibility);

    togglePromoInputVisibility();

    const popupBtn = document.getElementById('popupBtn');
    const popupWrapper = document.getElementById('popupWrapper');

    popupBtn.addEventListener('click', function() {
        popupWrapper.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    popupWrapper.addEventListener('click', function(event) {
        if (event.target === popupWrapper) {
            popupWrapper.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

document.getElementById('submit-btn').addEventListener('click', function(event) {
    event.preventDefault();

    var form = document.getElementById('promo-form');
    var paragraph = document.getElementById('promo-paragraph');
    var container = document.getElementById('promo-container');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    if (!form.checkValidity()) {
        if (!emailInput.checkValidity()) {
            emailInput.style.borderColor = 'red';
        }
        var phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneInput.style.borderColor = 'red';
        }
        return;
    }

    form.style.display = 'none';
    paragraph.style.display = 'none';
    container.style.display = 'block';
});

var element = document.getElementById('phone');
var maskOptions = {
    mask: '+7(000)000-00-00',
    lazy: false
}
var mask = new IMask(element, maskOptions);

emailjs.init('puPX_Z8YnEmKEToWM');

document.getElementById('submit-btn').addEventListener('click', function() {
    event.preventDefault();

    var formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value
    };

    emailjs.send('service_3g6gffm', 'template_r6oyzik', formData)
        .then(function(response) {
            console.log('Письмо успешно отправлено!', response.status, response.text);
        }, function(error) {
            console.log('Письмо не удалось отправить!', error);
        });
});

var element2 = document.getElementById('phone2');
var mask2 = new IMask(element2, maskOptions);

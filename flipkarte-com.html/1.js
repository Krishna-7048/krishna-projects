let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoPlayInterval;
let touchStartX = 0;
let touchEndX = 0;

function updateCarousel() {
    const carouselInner = document.getElementById('carouselInner');
    carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
    resetAutoPlay();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
    resetAutoPlay();
}

function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
    resetAutoPlay();
}

function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

function resetAutoPlay() {
    stopAutoPlay();
    startAutoPlay();
}


const carousel = document.getElementById('carousel');

carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoPlay();
});

carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoPlay();
});

function handleSwipe() {
    if (touchEndX < touchStartX - 50) {
        nextSlide();
    }
    if (touchEndX > touchStartX + 50) {
        prevSlide();
    }
}


startAutoPlay();


carousel.addEventListener('mouseenter', stopAutoPlay);
carousel.addEventListener('mouseleave', startAutoPlay);


function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');

    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    overlay.classList.toggle('active');


    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
}


document.querySelectorAll('.mobile-menu-item').forEach(item => {
    item.addEventListener('click', () => {
        toggleMobileMenu();
    });
});


const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.product-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(section);
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevSlide();
    } else if (e.key === 'ArrowRight') {
        nextSlide();
    }
});


let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {

    }, 100);
}, { passive: true });


window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s';

let cart = {};

function showControls(id,name,price){

    cart[name]=1;

    document.getElementById(id).innerHTML=`
    <div class="cart-controls">
        <button class="qty-btn"
        onclick="changeQty('${id}','${name}',${price},-1)">
        -
        </button>

        <span class="qty" id="${id}-qty">1</span>

        <button class="qty-btn"
        onclick="changeQty('${id}','${name}',${price},1)">
        +
        </button>
    </div>
    `;

    updateCartCount();
}

function changeQty(id,name,price,value){

    cart[name]+=value;

    if(cart[name]<=0){
        delete cart[name];

        document.getElementById(id).innerHTML=`
        <button class="add-btn"
        onclick="showControls('${id}','${name}',${price})">
        Add
        </button>
        `;
    }
    else{
        document.getElementById(id+"-qty").innerText=cart[name];
    }

    updateCartCount();
}

function updateCartCount(){

    let total=0;

    for(let item in cart){
        total+=cart[item];
    }

    document.getElementById("cartCount").innerText=total;
}
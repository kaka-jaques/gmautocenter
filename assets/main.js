const counters = document.querySelectorAll('.counter-number');
const fadeIns = document.querySelectorAll('.fade-in');

const introSwiper = new Swiper('#swiper-intro', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    effect: 'fade',
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    }
})

const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const start = +counter.innerText;
            const target = +counter.getAttribute('akhi');
            const duration = 2000;
            const interval = 10;
            let currentTime = 0;

            const animate = () => {
                currentTime += interval;
                const progress = Math.min(currentTime / duration, 1);
                const easedProgress = easeInOutCubic(progress);

                const value = Math.round(start + (target - start) * easedProgress);

                if(counter.getAttribute('ap') == 1){
                    counter.innerText = value+'+';
                }else if(counter.getAttribute('ap') == 2){
                    counter.innerText = value+'K';
                }else if(counter.getAttribute('ap') == 3){
                    counter.innerText = value+'K+';
                }else{
                    counter.innerText = value;
                }

                if (currentTime < duration) {
                    setTimeout(animate, interval);
                }
            };

            animate();

            // Parar de observar após a animação ter começado
            observer.unobserve(counter);
        }
    });
}, options);

const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in-active');
            observer.unobserve(entry.target);
        }
    })
}, options)

counters.forEach(counter => {
    observer.observe(counter);
});

fadeIns.forEach(fadeIn => {
    fadeInObserver.observe(fadeIn);
})

function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t ** 3 : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function enableOverlayer(){
    document.getElementById('over-choose').classList.add('overlay-active');
}
function disableOverlayer(){
    document.getElementById('over-choose').classList.remove('overlay-active');
}

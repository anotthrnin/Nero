/**
 * 1. PENGATURAN NAVBAR (Scroll Logic & Performance)
 * Menggabungkan class toggling dan inline style ke dalam satu listener.
 */
const navbar = document.querySelector('#main-nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        console.log("Navbar Scrolled Active"); 
    } else {
        navbar.classList.remove('scrolled');
        console.log("Navbar Scrolled Removed");
    }
});

/**
 * 2. REVEAL ANIMATION (Intersection Observer)
 * Animasi elemen muncul saat di-scroll.
 */
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Unobserve setelah animasi jalan agar hemat memori
            revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Targetkan semua elemen yang ingin di-reveal
document.querySelectorAll('.product-card, .blog-card, .about-text, .about-img, .section-header').forEach(el => {
    el.classList.add('reveal-hidden'); 
    revealObserver.observe(el);
});

/**
 * 3. CAROUSEL DRAG & TOUCH SUPPORT
 * Mendukung geser pakai mouse dan layar sentuh (HP).
 */
const slider = document.querySelector('.blog-carousel');

if (slider) {
    let isDown = false;
    let startX;
    let scrollLeft;

    const startAction = (e) => {
        isDown = true;
        slider.classList.add('dragging');
        startX = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    };

    const stopAction = () => {
        isDown = false;
        slider.classList.remove('dragging');
    };

    const moveAction = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - slider.offsetLeft;
        const walk = (x - startX) * 2; // Angka '2' adalah sensitivitas geser
        slider.scrollLeft = scrollLeft - walk;
    };

    // Gabungan Mouse & Touch Listener
    slider.addEventListener('mousedown', startAction);
    slider.addEventListener('touchstart', startAction, { passive: true });
    
    slider.addEventListener('mousemove', moveAction);
    slider.addEventListener('touchmove', moveAction, { passive: false });

    slider.addEventListener('mouseup', stopAction);
    slider.addEventListener('mouseleave', stopAction);
    slider.addEventListener('touchend', stopAction);
}

/**
 * 4. GLOBAL SMOOTH SCROLL WITH OFFSET
 * Menyatukan semua fungsi klik link agar tidak menutupi judul section.
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = nav.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Script ini menghentikan lompatan instan HTML
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // 80 adalah offset navbar
                behavior: 'smooth'
            });
        }
    });
});
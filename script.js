document.addEventListener('DOMContentLoaded', () => {

    // --- 1. INISIALISASI AOS (Animate On Scroll) ---
    AOS.init({
        duration: 800, // Durasi animasi dalam (ms)
        once: true,    // Animasi hanya berjalan satu kali
        delay: 100,    // Delay global
    });

    // --- 2. Logika Toggle Menu Hamburger ---
    const menuToggle = document.getElementById('menu-toggle');
    const menuLinks = document.getElementById('menu-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuLinks.classList.toggle('active');
            menuToggle.classList.toggle('toggled');
        });
    }

    // --- 3. Logika Kursor Bintang & Sparkle ---
    const starCursor = document.querySelector('.star-cursor');
    const sparkleContainer = document.getElementById('sparkle-container');
    
    let lastSparkleTime = 0;
    const sparkleInterval = 50; // Waktu (ms) antar sparkle

    // Sembunyikan kursor jika di luar window
    document.addEventListener('mouseleave', () => {
        starCursor.style.display = 'none';
    });
    document.addEventListener('mouseenter', () => {
        starCursor.style.display = 'block';
    });
    
    // Gerakkan bintang utama
    window.addEventListener('mousemove', (e) => {
        if (starCursor.style.display === 'none') {
            starCursor.style.display = 'block';
        }
        
        starCursor.style.left = e.clientX + 'px';
        starCursor.style.top = e.clientY + 'px';

        // Buat sparkle (dibatasi intervalnya)
        const now = Date.now();
        if (now - lastSparkleTime > sparkleInterval) {
            lastSparkleTime = now;
            createSparkle(e.clientX, e.clientY);
        }
    });

    // Fungsi untuk membuat sparkle
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        sparkle.style.left = (x + offsetX) + 'px';
        sparkle.style.top = (y + offsetY) + 'px';
        
        const size = Math.random() * 8 + 4;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';

        sparkleContainer.appendChild(sparkle);

        // Hapus sparkle setelah animasi selesai (800ms)
        setTimeout(() => {
            sparkle.remove();
        }, 800);
    }
    
    // --- 4. Logika Hover Kursor ---
    // Tambahkan class 'hover' pada kursor saat menyentuh elemen interaktif
    const interactiveElements = document.querySelectorAll(
        'a, button, .skill-card, .timeline-item'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            starCursor.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            starCursor.classList.remove('hover');
        });
    });

});
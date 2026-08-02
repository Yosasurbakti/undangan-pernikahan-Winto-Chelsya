document.addEventListener("DOMContentLoaded", () => {
    // Memilih semua elemen dengan class 'fade-in-up'
    const animatedElements = document.querySelectorAll('.fade-in-up');

    // Membuat Observer untuk memicu animasi saat elemen masuk ke dalam layar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Menambahkan class 'visible' untuk menjalankan animasi
                entry.target.classList.add('visible');
                // Berhenti mengobservasi setelah animasi berjalan sekali
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    // Menerapkan observer ke setiap elemen
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});
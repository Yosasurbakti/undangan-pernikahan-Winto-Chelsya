/*=====================================================
    PREMIUM WEDDING INVITATION
    Winto & Chelsya
======================================================*/

"use strict";

/*=====================================================
    SELECTOR HELPERS
======================================================*/
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*=====================================================
    LOADER
======================================================*/
window.addEventListener("load", () => {
    const loader = $("#loader");
    if (loader) {
        gsap.to(loader, {
            opacity: 0,
            duration: 1.2,
            delay: 1,
            onComplete() {
                loader.style.display = "none";
            }
        });
    }
});

/*=====================================================
    LENIS SMOOTH SCROLL
======================================================*/
const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    smoothTouch: false,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/*=====================================================
    OPEN INVITATION & MUSIC SETUP
======================================================*/
const openInvitation = $("#openInvitation");
const opening = $("#opening");
const music = $("#backgroundMusic");
const musicButton = $("#musicButton");
let musicPlaying = false;
let audioVisualizerInitialized = false;

if (openInvitation && opening && music) {
    openInvitation.addEventListener("click", () => {
        // Hapus layar pembuka
        gsap.to(opening, {
            opacity: 0,
            duration: 1,
            onComplete() {
                opening.style.display = "none";
            }
        });

        // Mainkan musik
        music.play().then(() => {
            musicPlaying = true;
            if (!audioVisualizerInitialized) {
                initAudioVisualizer();
                audioVisualizerInitialized = true;
            }
        }).catch(() => {
            console.log("Autoplay diblokir oleh browser.");
        });
    });
}

// Tombol Toggle Musik
if (musicButton) {
    musicButton.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            musicPlaying = true;
            musicButton.innerHTML = '<i class="fa-solid fa-music"></i>';
        } else {
            music.pause();
            musicPlaying = false;
            musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        }
    });
}

// Auto Pause saat tab tidak aktif
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        if (musicPlaying) music.pause();
    } else {
        if (musicPlaying) music.play().catch(() => {});
    }
});

/*=====================================================
    SCROLL PROGRESS BAR
======================================================*/
const progress = $(".scroll-progress-bar");
window.addEventListener("scroll", () => {
    if (progress) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const current = (window.scrollY / total) * 100;
        progress.style.width = current + "%";
    }
});

/*=====================================================
    CUSTOM CURSOR
======================================================*/
const dot = $(".cursor-dot");
const outline = $(".cursor-outline");

if (dot && outline) {
    window.addEventListener("mousemove", (e) => {
        dot.style.left = e.clientX + "px";
        dot.style.top = e.clientY + "px";
        outline.animate({
            left: e.clientX + "px",
            top: e.clientY + "px"
        }, {
            duration: 250,
            fill: "forwards"
        });
    });
}

/*=====================================================
    GSAP ANIMATIONS
======================================================*/
// Hero Animations
gsap.from(".hero-content p", { y: 80, opacity: 0, duration: 1 });
gsap.from(".hero-content h1", { y: 100, opacity: 0, delay: 0.3, duration: 1 });
gsap.from(".hero-content h3", { y: 80, opacity: 0, delay: 0.6, duration: 1 });
gsap.from(".hero-button", { scale: 0.5, opacity: 0, delay: 0.8, duration: 0.8 });

// Scroll Reveal Global
gsap.utils.toArray("section").forEach((section) => {
    gsap.from(section, {
        opacity: 0,
        y: 120,
        duration: 1,
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// Komponen spesifik
const animateOnScroll = (elements, props) => {
    gsap.utils.toArray(elements).forEach(el => {
        gsap.from(el, { ...props, scrollTrigger: { trigger: el, start: "top 85%" }});
    });
};

animateOnScroll(".person", { y: 120, opacity: 0, duration: 1 });
animateOnScroll(".gallery-item", { opacity: 0, scale: 0.8, duration: 1 });
animateOnScroll(".event-card", { y: 80, opacity: 0, duration: 1 });
animateOnScroll(".gift-card", { y: 100, opacity: 0, stagger: 0.2, duration: 1 });
animateOnScroll(".wish-card", { y: 80, opacity: 0, stagger: 0.2, duration: 1 });
animateOnScroll(".map-wrapper", { scale: 0.85, opacity: 0, duration: 1.3 });

gsap.utils.toArray(".timeline-item").forEach((item) => {
    gsap.from(item, {
        x: item.classList.contains("reverse") ? 150 : -150,
        opacity: 0,
        duration: 1,
        scrollTrigger: { trigger: item, start: "top 80%" }
    });
});

gsap.from(".count-box", {
    y: 100,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    scrollTrigger: { trigger: ".countdown", start: "top 80%" }
});

/*=====================================================
    PARALLAX & MOUSE MOVE EFFECTS
======================================================*/
window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    // Opening Parallax
    const openingImg = document.querySelector(".opening-background img");
    if (openingImg) openingImg.style.transform = `scale(1.1) translate(${x * 40}px, ${y * 40}px)`;

    // Hero Video Parallax
    const heroVideo = document.querySelector(".hero-video video");
    if (heroVideo) heroVideo.style.transform = `scale(1.12) translate(${x * 30}px, ${y * 30}px)`;

    // Multi-layer Parallax
    document.querySelectorAll("[data-parallax]").forEach(layer => {
        const speed = parseFloat(layer.dataset.parallax) || 20;
        layer.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
    });
});

// Scroll Parallax
window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    document.querySelectorAll(".opening-background img, .quote-background img").forEach((img) => {
        img.style.transform = `translateY(${scroll * 0.18}px) scale(1.12)`;
    });
});

/*=====================================================
    COUNTDOWN
======================================================*/
const weddingDate = new Date("December 20, 2026 09:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) {
        if($("#days")) $("#days").textContent = "00";
        if($("#hours")) $("#hours").textContent = "00";
        if($("#minutes")) $("#minutes").textContent = "00";
        if($("#seconds")) $("#seconds").textContent = "00";
        return;
    }

    if($("#days")) $("#days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
    if($("#hours")) $("#hours").textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if($("#minutes")) $("#minutes").textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    if($("#seconds")) $("#seconds").textContent = Math.floor((distance % (1000 * 60)) / 1000);
}
setInterval(updateCountdown, 1000);
updateCountdown();

/*=====================================================
    LIGHTBOX GALLERY
======================================================*/
const galleryImages = $$(".gallery-item img");
const lightbox = $("#lightbox");
const lightboxImage = $("#lightboxImage");
const closeLightbox = $("#closeLightbox");

if (lightbox) {
    galleryImages.forEach((img) => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            if(lightboxImage) lightboxImage.src = img.src;
        });
    });

    closeLightbox?.addEventListener("click", () => lightbox.classList.remove("active"));
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) lightbox.classList.remove("active");
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") lightbox.classList.remove("active");
    });
}

/*=====================================================
    PREMIUM 3D TILT EFFECT (Gabungan logic tilt)
======================================================*/
document.querySelectorAll(".gallery-item").forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = (x - rect.width / 2) / 18;
        const rotateX = (rect.height / 2 - y) / 18;
        
        card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`;
    });

    card.addEventListener("mouseleave", () => {
        // PERBAIKAN: Format template literal sebelumnya salah
        card.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
});

/*=====================================================
    UTILITIES: COPY, RSVP, LAZY LOAD, SMOOTH ANCHOR
======================================================*/
// Copy Button
$$(".copy-button").forEach((button) => {
    button.addEventListener("click", () => {
        navigator.clipboard.writeText(button.dataset.copy);
        const text = button.innerHTML;
        button.innerHTML = "Berhasil Disalin";
        setTimeout(() => button.innerHTML = text, 2000);
    });
});

// RSVP Form
const rsvpForm = $("#rsvpForm");
if (rsvpForm) {
    rsvpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Terima kasih atas konfirmasi kehadiran Anda.");
        e.target.reset();
    });
}

// Lazy Load
const lazyImages = $$("img[data-src]");
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});
lazyImages.forEach((img) => observer.observe(img));

// Smooth Anchor with Lenis
$$('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = $(anchor.getAttribute("href"));
        if (target) lenis.scrollTo(target);
    });
});

/*=====================================================
    FLOATING MENU ACTIVE STATE
======================================================*/
const menuLinks = $$(".floating-menu a");
window.addEventListener("scroll", () => {
    let current = "";
    $$("section").forEach((section) => {
        const top = section.offsetTop - 200;
        if (scrollY >= top) current = section.getAttribute("id");
    });
    menuLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/*=====================================================
    THREE.JS BACKGROUND
======================================================*/
if (typeof THREE !== 'undefined') {
    const threeContainer = document.createElement("div");
    threeContainer.id = "three-background";
    Object.assign(threeContainer.style, {
        position: "fixed", left: 0, top: 0, width: "100%", 
        height: "100%", zIndex: "-10", pointerEvents: "none"
    });
    document.body.prepend(threeContainer);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeContainer.appendChild(renderer.domElement);

    // Light
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));
    const pointLight = new THREE.PointLight(0xffd98c, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4 ? 800 : 1800;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 35;
    }
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xd7c08f,
        size: navigator.hardwareConcurrency <= 4 ? 0.04 : 0.055,
        transparent: true,
        opacity: navigator.hardwareConcurrency <= 4 ? 0.4 : 0.65
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Spheres
    const spheres = [];
    for (let i = 0; i < 35; i++) {
        const geometry = new THREE.SphereGeometry(Math.random() * 0.08 + 0.05, 20, 20);
        const material = new THREE.MeshStandardMaterial({
            color: 0xc8a96a, transparent: true, opacity: 0.28, roughness: 0.1, metalness: 0.8
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.set((Math.random() - 0.5) * 18, (Math.random() - 0.5) * 12, (Math.random() - 0.5) * 18);
        sphere.userData.speed = Math.random() * 0.01 + 0.002;
        scene.add(sphere);
        spheres.push(sphere);
    }

    // Animation & Resize
    let mouseX = 0, mouseY = 0;
    window.addEventListener("mousemove", (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    window.addEventListener("scroll", () => {
        const val = window.scrollY * 0.05;
        particles.rotation.z = val * 0.002;
        scene.rotation.y = val * 0.0003;
    });

    function animateThree() {
        requestAnimationFrame(animateThree);
        particles.rotation.y += 0.0008;
        particles.rotation.x += 0.0002;

        spheres.forEach((sphere) => {
            sphere.rotation.x += 0.004;
            sphere.rotation.y += 0.004;
            sphere.position.y += Math.sin(Date.now() * 0.001 * sphere.userData.speed) * 0.003;
        });

        camera.position.x += (mouseX * 2 - camera.position.x) * 0.03;
        camera.position.y += (-mouseY * 2 - camera.position.y) * 0.03;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }
    
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) renderer.setAnimationLoop(null);
        else animateThree();
    });
    
    animateThree();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

/*=====================================================
    AUDIO VISUALIZER (Dipanggil Setelah Klik)
======================================================*/
function initAudioVisualizer() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if(!AudioContext) return;
    
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    const source = audioCtx.createMediaElementSource(music);
    
    source.connect(analyser);
    analyser.connect(audioCtx.destination);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    const visualCanvas = document.createElement("canvas");
    visualCanvas.id = "musicVisualizer";
    visualCanvas.width = 320;
    visualCanvas.height = 80;
    Object.assign(visualCanvas.style, { position: "fixed", bottom: "20px", left: "20px", zIndex: "9998", pointerEvents: "none" });
    document.body.appendChild(visualCanvas);
    
    const vctx = visualCanvas.getContext("2d");
    
    function drawVisualizer() {
        requestAnimationFrame(drawVisualizer);
        analyser.getByteFrequencyData(dataArray);
        vctx.clearRect(0, 0, 320, 80);
        
        for (let i = 0; i < bufferLength; i++) {
            const h = dataArray[i] / 3;
            vctx.fillStyle = "#c8a96a";
            vctx.fillRect(i * 5, 80 - h, 3, h);
        }
    }
    drawVisualizer();
}

/*=====================================================
    SCROLL TO TOP BUTTON (PERBAIKAN KODE TERPOTONG)
======================================================*/
const topButton = document.createElement("button");
topButton.className = "scroll-top";
topButton.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
Object.assign(topButton.style, {
    position: "fixed", bottom: "30px", right: "30px", zIndex: "999", 
    opacity: "0", visibility: "hidden", transition: "all 0.3s ease"
});
document.body.appendChild(topButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        topButton.style.opacity = "1";
        topButton.style.visibility = "visible";
    } else {
        topButton.style.opacity = "0";
        topButton.style.visibility = "hidden";
    }
});

// Klik menggunakan fungsi Lenis agar transisi mulus
topButton.onclick = () => {
    lenis.scrollTo(0, { duration: 1.5 });
};

/*=====================================================
    AOS INIT
======================================================*/
if(typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, once: false, offset: 120, easing: "ease-out-cubic" });
}

/*=====================================================
    END OF SCRIPT
======================================================*/

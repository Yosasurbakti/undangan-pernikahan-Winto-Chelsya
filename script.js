/*=====================================================
    PREMIUM WEDDING INVITATION
    Winto & Chelsya
======================================================*/

"use strict";

/*=====================================================
    SELECTOR
======================================================*/

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

/*=====================================================
    LOADER
======================================================*/

window.addEventListener("load", () => {

    const loader = $("#loader");

    gsap.to(loader, {

        opacity:0,

        duration:1.2,

        delay:1,

        onComplete(){

            loader.style.display="none";

        }

    });

});

/*=====================================================
    LENIS SMOOTH SCROLL
======================================================*/

const lenis = new Lenis({

    duration:1.2,

    smoothWheel:true,

    smoothTouch:false,

});

function raf(time){

    lenis.raf(time);

    requestAnimationFrame(raf);

}

requestAnimationFrame(raf);

/*=====================================================
    OPEN INVITATION
======================================================*/

const openInvitation = $("#openInvitation");

const opening = $("#opening");

const music = $("#backgroundMusic");

openInvitation.addEventListener("click",()=>{

    gsap.to(opening,{

        opacity:0,

        duration:1,

        onComplete(){

            opening.style.display="none";

        }

    });

    music.play().catch(()=>{});

});

/*=====================================================
    MUSIC BUTTON
======================================================*/

const musicButton=$("#musicButton");

let musicPlaying=true;

musicButton.addEventListener("click",()=>{

    if(music.paused){

        music.play();

        musicPlaying=true;

        musicButton.innerHTML='<i class="fa-solid fa-music"></i>';

    }else{

        music.pause();

        musicPlaying=false;

        musicButton.innerHTML='<i class="fa-solid fa-volume-xmark"></i>';

    }

});

/*=====================================================
    SCROLL PROGRESS
======================================================*/

const progress=$(".scroll-progress-bar");

window.addEventListener("scroll",()=>{

    const total=

    document.documentElement.scrollHeight-

    window.innerHeight;

    const current=

    (window.scrollY/total)*100;

    progress.style.width=current+"%";

});

/*=====================================================
    CUSTOM CURSOR
======================================================*/

const dot=$(".cursor-dot");

const outline=$(".cursor-outline");

window.addEventListener("mousemove",(e)=>{

    dot.style.left=e.clientX+"px";

    dot.style.top=e.clientY+"px";

    outline.animate({

        left:e.clientX+"px",

        top:e.clientY+"px"

    },{

        duration:250,

        fill:"forwards"

    });

});

/*=====================================================
    HERO GSAP
======================================================*/

gsap.from(".hero-content p",{

    y:80,

    opacity:0,

    duration:1

});

gsap.from(".hero-content h1",{

    y:100,

    opacity:0,

    delay:.3,

    duration:1

});

gsap.from(".hero-content h3",{

    y:80,

    opacity:0,

    delay:.6,

    duration:1

});

gsap.from(".hero-button",{

    scale:.5,

    opacity:0,

    delay:.8,

    duration:.8

});

/*=====================================================
    OPENING PARALLAX
======================================================*/

window.addEventListener("mousemove",(e)=>{

    const img=document.querySelector(".opening-background img");

    const x=(e.clientX/window.innerWidth-.5)*20;

    const y=(e.clientY/window.innerHeight-.5)*20;

    img.style.transform=

    `scale(1.1) translate(${x}px,${y}px)`;

});

/*=====================================================
    HERO VIDEO PARALLAX
======================================================*/

window.addEventListener("mousemove",(e)=>{

    const hero=document.querySelector(".hero-video video");

    const moveX=(e.clientX/window.innerWidth-.5)*15;

    const moveY=(e.clientY/window.innerHeight-.5)*15;

    hero.style.transform=

    `scale(1.12) translate(${moveX}px,${moveY}px)`;

});

/*=====================================================
    SCROLL REVEAL
======================================================*/

gsap.utils.toArray("section").forEach((section)=>{

    gsap.from(section,{

        opacity:0,

        y:120,

        duration:1,

        scrollTrigger:{

            trigger:section,

            start:"top 80%",

            toggleActions:"play none none reverse"

        }

    });

});

/*=====================================================
    COUPLE CARD
======================================================*/

gsap.utils.toArray(".person").forEach((card)=>{

    gsap.from(card,{

        y:120,

        opacity:0,

        duration:1,

        scrollTrigger:{

            trigger:card,

            start:"top 80%"

        }

    });
    /*=====================================================
COUNTDOWN
======================================================*/

const weddingDate = new Date("December 20, 2026 09:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        $("#days").textContent="00";
        $("#hours").textContent="00";
        $("#minutes").textContent="00";
        $("#seconds").textContent="00";

        return;

    }

    const days=Math.floor(distance/(1000*60*60*24));

    const hours=Math.floor(

        (distance%(1000*60*60*24))/(1000*60*60)

    );

    const minutes=Math.floor(

        (distance%(1000*60*60))/(1000*60)

    );

    const seconds=Math.floor(

        (distance%(1000*60))/1000

    );

    $("#days").textContent=days;

    $("#hours").textContent=hours;

    $("#minutes").textContent=minutes;

    $("#seconds").textContent=seconds;

}

setInterval(updateCountdown,1000);

updateCountdown();

/*=====================================================
LIGHTBOX
======================================================*/

const galleryImages=$$(".gallery-item img");

const lightbox=$("#lightbox");

const lightboxImage=$("#lightboxImage");

const closeLightbox=$("#closeLightbox");

galleryImages.forEach((img)=>{

    img.addEventListener("click",()=>{

        lightbox.classList.add("active");

        lightboxImage.src=img.src;

    });

});

closeLightbox.addEventListener("click",()=>{

    lightbox.classList.remove("active");

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});

/*=====================================================
COPY BANK ACCOUNT
======================================================*/

$$(".copy-button").forEach((button)=>{

    button.addEventListener("click",()=>{

        navigator.clipboard.writeText(

            button.dataset.copy

        );

        const text=button.innerHTML;

        button.innerHTML="Berhasil Disalin";

        setTimeout(()=>{

            button.innerHTML=text;

        },2000);

    });

});

/*=====================================================
RSVP
======================================================*/

$("#rsvpForm").addEventListener("submit",(e)=>{

    e.preventDefault();

    alert("Terima kasih atas konfirmasi kehadiran Anda.");

    e.target.reset();

});

/*=====================================================
ACTIVE FLOATING MENU
======================================================*/

const menuLinks=$$(".floating-menu a");

window.addEventListener("scroll",()=>{

    let current="";

    $$("section").forEach((section)=>{

        const top=section.offsetTop-200;

        const height=section.clientHeight;

        if(scrollY>=top){

            current=section.getAttribute("id");

        }

    });

    menuLinks.forEach((link)=>{

        link.classList.remove("active");

        if(

            link.getAttribute("href")==="#"+current

        ){

            link.classList.add("active");

        }

    });

});

/*=====================================================
SMOOTH ANCHOR
======================================================*/

$$('a[href^="#"]').forEach((anchor)=>{

    anchor.addEventListener("click",(e)=>{

        e.preventDefault();

        const target=document.querySelector(

            anchor.getAttribute("href")

        );

        if(target){

            lenis.scrollTo(target);

        }

    });

});

/*=====================================================
AOS
======================================================*/

AOS.init({

    duration:1000,

    once:false,

    offset:120,

    easing:"ease-out-cubic"

});

/*=====================================================
GALLERY ANIMATION
======================================================*/

gsap.utils.toArray(".gallery-item").forEach((item)=>{

    gsap.from(item,{

        opacity:0,

        scale:.8,

        duration:1,

        scrollTrigger:{

            trigger:item,

            start:"top 85%"

        }

    });

});

/*=====================================================
TIMELINE ANIMATION
======================================================*/

gsap.utils.toArray(".timeline-item").forEach((item)=>{

    gsap.from(item,{

        x:item.classList.contains("reverse")?150:-150,

        opacity:0,

        duration:1,

        scrollTrigger:{

            trigger:item,

            start:"top 80%"

        }

    });

});

/*=====================================================
EVENT CARD
======================================================*/

gsap.utils.toArray(".event-card").forEach((card)=>{

    gsap.from(card,{

        y:80,

        opacity:0,

        duration:1,

        scrollTrigger:{

            trigger:card,

            start:"top 85%"

        }

    });

});

/*=====================================================
COUNTDOWN ANIMATION
======================================================*/

gsap.from(".count-box",{

    y:100,

    opacity:0,

    stagger:.15,

    duration:1,

    scrollTrigger:{

        trigger:".countdown",

        start:"top 80%"

    }

});

/*=====================================================
MAP ANIMATION
======================================================*/

gsap.from(".map-wrapper",{

    scale:.85,

    opacity:0,

    duration:1.3,

    scrollTrigger:{

        trigger:".location",

        start:"top 80%"

    }

});

/*=====================================================
GIFT ANIMATION
======================================================*/

gsap.from(".gift-card",{

    y:100,

    opacity:0,

    stagger:.2,

    duration:1,

    scrollTrigger:{

        trigger:".gift",

        start:"top 80%"

    }

});

/*=====================================================
WISH ANIMATION
======================================================*/

gsap.from(".wish-card",{

    opacity:0,

    y:80,

    stagger:.2,

    duration:1,

    scrollTrigger:{

        trigger:".wishes",

        start:"top 80%"

    }

});

/*=====================================================
LAZY LOAD IMAGE
======================================================*/

const lazyImages=$$("img");

const observer=new IntersectionObserver((entries)=>{

    entries.forEach((entry)=>{

        if(entry.isIntersecting){

            const img=entry.target;

            if(img.dataset.src){

                img.src=img.dataset.src;

            }

            observer.unobserve(img);

        }

    });

});

lazyImages.forEach((img)=>observer.observe(img));

/*=====================================================
WINDOW RESIZE
======================================================*/

window.addEventListener("resize",()=>{

    ScrollTrigger.refresh();

});
    /*=====================================================
    THREE.JS BACKGROUND
======================================================*/

const threeContainer = document.createElement("div");

threeContainer.id = "three-background";

threeContainer.style.position = "fixed";
threeContainer.style.left = "0";
threeContainer.style.top = "0";
threeContainer.style.width = "100%";
threeContainer.style.height = "100%";
threeContainer.style.zIndex = "-10";
threeContainer.style.pointerEvents = "none";

document.body.prepend(threeContainer);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(

    75,

    window.innerWidth / window.innerHeight,

    0.1,

    1000

);

camera.position.z = 8;

const renderer = new THREE.WebGLRenderer({

    alpha:true,

    antialias:true

});

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio,2)

);

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

threeContainer.appendChild(

    renderer.domElement

);

/*=====================================================
LIGHT
======================================================*/

const ambient = new THREE.AmbientLight(

    0xffffff,

    1.2

);

scene.add(ambient);

const pointLight = new THREE.PointLight(

    0xffd98c,

    2

);

pointLight.position.set(5,5,5);

scene.add(pointLight);

/*=====================================================
PARTICLE SYSTEM
======================================================*/

const particleGeometry = new THREE.BufferGeometry();

const particleCount = 1800;

const positions = [];

for(let i=0;i<particleCount;i++){

    positions.push(

        (Math.random()-0.5)*35,

        (Math.random()-0.5)*35,

        (Math.random()-0.5)*35

    );

}

particleGeometry.setAttribute(

    "position",

    new THREE.Float32BufferAttribute(

        positions,

        3

    )

);

const particleMaterial = new THREE.PointsMaterial({

    color:0xd7c08f,

    size:.055,

    transparent:true,

    opacity:.65

});

const particles = new THREE.Points(

    particleGeometry,

    particleMaterial

);

scene.add(particles);

/*=====================================================
FLOATING SPHERES
======================================================*/

const spheres=[];

for(let i=0;i<35;i++){

    const geometry=new THREE.SphereGeometry(

        Math.random()*0.08+.05,

        20,

        20

    );

    const material=new THREE.MeshStandardMaterial({

        color:0xc8a96a,

        transparent:true,

        opacity:.28,

        roughness:.1,

        metalness:.8

    });

    const sphere=new THREE.Mesh(

        geometry,

        material

    );

    sphere.position.set(

        (Math.random()-0.5)*18,

        (Math.random()-0.5)*12,

        (Math.random()-0.5)*18

    );

    sphere.userData.speed=

    Math.random()*0.01+.002;

    scene.add(sphere);

    spheres.push(sphere);

}

/*=====================================================
MOUSE PARALLAX
======================================================*/

let mouseX=0;

let mouseY=0;

window.addEventListener(

    "mousemove",

    (e)=>{

        mouseX=

        (e.clientX/window.innerWidth-.5)*2;

        mouseY=

        (e.clientY/window.innerHeight-.5)*2;

    }

);

/*=====================================================
FLOATING FLOWERS
======================================================*/

const flowerContainer=document.createElement("div");

flowerContainer.className="flower-container";

document.body.appendChild(flowerContainer);

for(let i=0;i<28;i++){

    const flower=document.createElement("div");

    flower.className="flower";

    flower.style.left=Math.random()*100+"%";

    flower.style.animationDuration=

    12+Math.random()*12+"s";

    flower.style.animationDelay=

    Math.random()*8+"s";

    flower.style.opacity=

    .25+Math.random()*.45;

    flower.innerHTML="❀";

    flowerContainer.appendChild(flower);

}

/*=====================================================
AURORA
======================================================*/

const aurora=document.createElement("div");

aurora.className="aurora-layer";

document.body.appendChild(aurora);

/*=====================================================
ANIMATION LOOP
======================================================*/

function animate(){

    requestAnimationFrame(animate);

    particles.rotation.y+=0.0008;

    particles.rotation.x+=0.0002;

    spheres.forEach((sphere)=>{

        sphere.rotation.x+=0.004;

        sphere.rotation.y+=0.004;

        sphere.position.y+=

        Math.sin(Date.now()*0.001*sphere.userData.speed)

        *0.003;

    });

    camera.position.x+=

    (mouseX*2-camera.position.x)*0.03;

    camera.position.y+=

    (-mouseY*2-camera.position.y)*0.03;

    camera.lookAt(scene.position);

    renderer.render(

        scene,

        camera

    );

}

animate();

/*=====================================================
RESIZE
======================================================*/

window.addEventListener(

    "resize",

    ()=>{

        camera.aspect=

        window.innerWidth/

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

);

/*=====================================================
PERFORMANCE MODE
======================================================*/

if(

navigator.hardwareConcurrency &&

navigator.hardwareConcurrency<=4

){

    particleMaterial.size=.04;

    particleMaterial.opacity=.4;

}

/*=====================================================
PAGE VISIBILITY
======================================================*/

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(document.hidden){

            renderer.setAnimationLoop(null);

        }else{

            animate();

        }

    }

);

});

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
/*=====================================================
    PREMIUM CURSOR TRAIL
======================================================*/

const trailPoints = [];

const trailCanvas = document.createElement("canvas");

trailCanvas.id = "trailCanvas";

trailCanvas.style.position = "fixed";
trailCanvas.style.left = "0";
trailCanvas.style.top = "0";
trailCanvas.style.pointerEvents = "none";
trailCanvas.style.zIndex = "9997";

document.body.appendChild(trailCanvas);

const ctx = trailCanvas.getContext("2d");

function resizeTrail(){

    trailCanvas.width = window.innerWidth;

    trailCanvas.height = window.innerHeight;

}

resizeTrail();

window.addEventListener("resize",resizeTrail);

window.addEventListener("mousemove",(e)=>{

    trailPoints.push({

        x:e.clientX,

        y:e.clientY,

        alpha:1,

        radius:12

    });

});

function drawTrail(){

    ctx.clearRect(

        0,

        0,

        trailCanvas.width,

        trailCanvas.height

    );

    for(let i=0;i<trailPoints.length;i++){

        const p = trailPoints[i];

        ctx.beginPath();

        ctx.arc(

            p.x,

            p.y,

            p.radius,

            0,

            Math.PI*2

        );

        ctx.fillStyle =

        `rgba(200,169,106,${p.alpha})`;

        ctx.fill();

        p.alpha -= .018;

        p.radius += .18;

    }

    while(

        trailPoints.length &&

        trailPoints[0].alpha <=0

    ){

        trailPoints.shift();

    }

    requestAnimationFrame(drawTrail);

}

drawTrail();

/*=====================================================
SCROLL PARALLAX
======================================================*/

window.addEventListener(

    "scroll",

    ()=>{

        const scroll = window.scrollY;

        document.querySelectorAll(

            ".opening-background img,.quote-background img"

        ).forEach((img)=>{

            img.style.transform =

            `translateY(${scroll*0.18}px) scale(1.12)`;

        });

    }

);

/*=====================================================
FLOATING ELEMENT
======================================================*/

gsap.utils.toArray(

".event-card,.gift-card,.person"

).forEach((item)=>{

    gsap.to(item,{

        y:12,

        repeat:-1,

        yoyo:true,

        duration:

        2+Math.random()*2,

        ease:"sine.inOut"

    });

});

/*=====================================================
BUTTON RIPPLE
======================================================*/

document.querySelectorAll(

"button"

).forEach((button)=>{

button.addEventListener(

"click",

function(e){

const circle=document.createElement("span");

const diameter=

Math.max(

button.clientWidth,

button.clientHeight

);

circle.style.width=

circle.style.height=

diameter+"px";

circle.style.left=

e.offsetX-diameter/2+"px";

circle.style.top=

e.offsetY-diameter/2+"px";

circle.className="ripple";

button.appendChild(circle);

setTimeout(()=>{

circle.remove();

},700);

});

});

/*=====================================================
SECTION TRANSITION
======================================================*/

gsap.utils.toArray("section").forEach(

(section)=>{

ScrollTrigger.create({

trigger:section,

start:"top center",

onEnter:()=>{

gsap.to(section,{

opacity:1,

duration:.8

});

},

onLeaveBack:()=>{

gsap.to(section,{

opacity:.96,

duration:.4

});

}

});

});

/*=====================================================
TEXT SPLIT EFFECT
======================================================*/

document.querySelectorAll(

".section-title h2"

).forEach((title)=>{

const letters=

title.innerText.split("");

title.innerHTML="";

letters.forEach((letter)=>{

const span=document.createElement("span");

span.innerHTML=

letter===" " ?

"&nbsp;" :

letter;

span.style.display="inline-block";

title.appendChild(span);

});

gsap.from(

title.querySelectorAll("span"),

{

y:60,

opacity:0,

stagger:.03,

duration:.8,

scrollTrigger:{

trigger:title,

start:"top 85%"

}

}

);

});

/*=====================================================
IMAGE HOVER
======================================================*/

document.querySelectorAll(

".gallery-item"

).forEach((item)=>{

item.addEventListener(

"mousemove",

(e)=>{

const rect=item.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

item.style.transform=

`perspective(800px)

rotateX(${-(y-rect.height/2)/28}deg)

rotateY(${(x-rect.width/2)/28}deg)

scale(1.03)`;

});

item.addEventListener(

"mouseleave",

()=>{

item.style.transform=

"perspective(800px)

rotateX(0)

rotateY(0)

scale(1)";

});

});

/*=====================================================
FPS LIMIT
======================================================*/

let lastFrame=0;

const fps=60;

const interval=1000/fps;

function fpsLoop(time){

if(time-lastFrame>interval){

lastFrame=time;

}

requestAnimationFrame(fpsLoop);

}

requestAnimationFrame(fpsLoop);

/*=====================================================
DEVICE CHECK
======================================================*/

const mobile=

window.innerWidth<768;

if(mobile){

document.body.classList.add(

"mobile-device"

);

}

/*=====================================================
END PART 4
======================================================*/
/*=====================================================
    SHOOTING STAR
======================================================*/

const shootingContainer = document.createElement("div");

shootingContainer.className = "shooting-stars";

document.body.appendChild(shootingContainer);

function createStar(){

    const star = document.createElement("span");

    star.className = "shooting-star";

    star.style.left = Math.random()*window.innerWidth+"px";

    star.style.top = Math.random()*200+"px";

    star.style.animationDuration =

    1+Math.random()*2+"s";

    shootingContainer.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },3500);

}

setInterval(createStar,2200);

/*=====================================================
SPARKLE
======================================================*/

const sparkleContainer=document.createElement("div");

sparkleContainer.className="sparkle-container";

document.body.appendChild(sparkleContainer);

function sparkle(){

    const s=document.createElement("div");

    s.className="sparkle";

    s.style.left=Math.random()*100+"vw";

    s.style.top=Math.random()*100+"vh";

    s.style.animationDuration=

    1+Math.random()*2+"s";

    sparkleContainer.appendChild(s);

    setTimeout(()=>{

        s.remove();

    },3000);

}

setInterval(sparkle,400);

/*=====================================================
PETAL PARTICLE
======================================================*/

function createPetal(){

    const petal=document.createElement("img");

    petal.src="assets/img/petal.webp";

    petal.className="petal";

    petal.style.left=Math.random()*100+"vw";

    petal.style.animationDuration=

    8+Math.random()*8+"s";

    petal.style.opacity=

    .3+Math.random()*.4;

    document.body.appendChild(petal);

    setTimeout(()=>{

        petal.remove();

    },18000);

}

setInterval(createPetal,900);

/*=====================================================
AUDIO VISUALIZER
======================================================*/

const AudioContext=

window.AudioContext||

window.webkitAudioContext;

const audioCtx=new AudioContext();

const analyser=

audioCtx.createAnalyser();

analyser.fftSize=128;

const source=

audioCtx.createMediaElementSource(

music

);

source.connect(analyser);

analyser.connect(

audioCtx.destination

);

const bufferLength=

analyser.frequencyBinCount;

const dataArray=

new Uint8Array(bufferLength);

const visualCanvas=

document.createElement("canvas");

visualCanvas.id="musicVisualizer";

visualCanvas.width=320;

visualCanvas.height=80;

document.body.appendChild(

visualCanvas

);

const vctx=

visualCanvas.getContext("2d");

function drawVisualizer(){

requestAnimationFrame(

drawVisualizer

);

analyser.getByteFrequencyData(

dataArray

);

vctx.clearRect(

0,

0,

320,

80

);

for(let i=0;i<bufferLength;i++){

const h=dataArray[i]/3;

vctx.fillStyle=

"#c8a96a";

vctx.fillRect(

i*5,

80-h,

3,

h

);

}

}

drawVisualizer();

/*=====================================================
PAGE TRANSITION
======================================================*/

const transition=

document.createElement("div");

transition.className=

"page-transition";

document.body.appendChild(

transition

);

window.addEventListener(

"beforeunload",

()=>{

transition.classList.add(

"active"

);

});

/*=====================================================
RANDOM GLOW
======================================================*/

setInterval(()=>{

document.querySelectorAll(

".gift-card,.event-card,.person"

).forEach(card=>{

gsap.to(card,{

boxShadow:

"0 0 45px rgba(200,169,106,.25)",

duration:.8,

yoyo:true,

repeat:1

});

});

},5000);

/*=====================================================
SCROLL DEPTH
======================================================*/

window.addEventListener(

"scroll",

()=>{

const value=

window.scrollY*.05;

particles.rotation.z=

value*.002;

scene.rotation.y=

value*.0003;

});

/*=====================================================
AUTO PAUSE
======================================================*/

document.addEventListener(

"visibilitychange",

()=>{

if(document.hidden){

music.pause();

}else{

music.play().catch(()=>{});

}

});

/*=====================================================
PERFORMANCE OPTIMIZATION
======================================================*/

let ticking=false;

window.addEventListener(

"scroll",

()=>{

if(!ticking){

requestAnimationFrame(()=>{

ScrollTrigger.refresh();

ticking=false;

});

ticking=true;

}

});

/*=====================================================
PRELOAD IMAGE
======================================================*/

const preloadImages=[

"assets/img/gallery/gallery1.webp",

"assets/img/gallery/gallery2.webp",

"assets/img/gallery/gallery3.webp",

"assets/img/gallery/gallery4.webp",

"assets/img/gallery/gallery5.webp",

"assets/img/gallery/gallery6.webp"

];

preloadImages.forEach(src=>{

const img=new Image();

img.src=src;

});

/*=====================================================
END PART 5
======================================================*/
/*=====================================================
    PARALLAX MULTI LAYER
======================================================*/

const parallaxLayers = document.querySelectorAll(

"[data-parallax]"

);

window.addEventListener(

"mousemove",

(e)=>{

const x=(e.clientX/window.innerWidth-.5);

const y=(e.clientY/window.innerHeight-.5);

parallaxLayers.forEach(layer=>{

const speed=

parseFloat(

layer.dataset.parallax

)||20;

layer.style.transform=

`translate3d(

${x*speed}px,

${y*speed}px,

0)`;

});

});

/*=====================================================
SECTION FADE
======================================================*/

const fadeObserver=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(

"show"

);

}

});

},

{

threshold:.25

}

);

document.querySelectorAll(

".fade"

).forEach(el=>{

fadeObserver.observe(el);

});

/*=====================================================
IMAGE TILT PREMIUM
======================================================*/

document.querySelectorAll(

".gallery-item"

).forEach(card=>{

card.addEventListener(

"mousemove",

(e)=>{

const rect=

card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=

(x-rect.width/2)/18;

const rotateX=

(rect.height/2-y)/18;

card.style.transform=

`perspective(1200px)

rotateX(${rotateX}deg)

rotateY(${rotateY}deg)

scale(1.04)`;

});

card.addEventListener(

"mouseleave",

()=>{

card.style.transform=

"perspective(1200px)

rotateX(0deg)

rotateY(0deg)

scale(1)";

});

});

/*=====================================================
SCROLL INDICATOR TEXT
======================================================*/

const scrollHint=document.createElement("div");

scrollHint.className="scroll-hint";

scrollHint.innerHTML="Scroll";

document.body.appendChild(scrollHint);

window.addEventListener(

"scroll",

()=>{

if(window.scrollY>200){

scrollHint.style.opacity=0;

}else{

scrollHint.style.opacity=1;

}

});

/*=====================================================
BUTTON HOVER GLOW
======================================================*/

document.querySelectorAll(

".hero-button,.submit-button,.copy-button"

).forEach(btn=>{

btn.addEventListener(

"mouseenter",

()=>{

gsap.to(btn,{

scale:1.05,

boxShadow:

"0 0 40px rgba(200,169,106,.45)",

duration:.35

});

});

btn.addEventListener(

"mouseleave",

()=>{

gsap.to(btn,{

scale:1,

boxShadow:"none",

duration:.35

});

});

});

/*=====================================================
RANDOM SPARK
======================================================*/

function randomSpark(){

const spark=document.createElement("div");

spark.className="random-spark";

spark.style.left=

Math.random()*100+"vw";

spark.style.top=

Math.random()*100+"vh";

document.body.appendChild(spark);

setTimeout(()=>{

spark.remove();

},2500);

}

setInterval(randomSpark,1200);

/*=====================================================
AUTO CLOSE LIGHTBOX ESC
======================================================*/

document.addEventListener(

"keydown",

(e)=>{

if(

e.key==="Escape"

){

lightbox.classList.remove(

"active"

);

}

});

/*=====================================================
SCROLL TO TOP
======================================================*/

const topButton=document.createElement("button");

topButton.className="scroll-top";

topButton.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topButton);

topButton.onclick=()=>{

lenis.scrollTo(0);

};

window.addEventListener(

"scroll",

()=>{

topButton.style.opacity=

window.scrollY>600?1:0;

});

/*=====================================================
MEMORY CLEANUP
======================================================*/

window.addEventListener(

"beforeunload",

()=>{

ScrollTrigger.getAll().forEach(

t=>t.kill()

);

});

/*=====================================================
END PART 6
======================================================*/
/*=====================================================
    DYNAMIC GRADIENT BACKGROUND
======================================================*/

const gradientLayer = document.createElement("div");

gradientLayer.id = "dynamicGradient";

document.body.appendChild(gradientLayer);

let gradientX = 50;
let gradientY = 50;

window.addEventListener("mousemove",(e)=>{

    gradientX = (e.clientX/window.innerWidth)*100;

    gradientY = (e.clientY/window.innerHeight)*100;

});

function animateGradient(){

    gradientLayer.style.background =

    `radial-gradient(circle at ${gradientX}% ${gradientY}%,

    rgba(200,169,106,.14),

    transparent 45%)`;

    requestAnimationFrame(animateGradient);

}

animateGradient();

/*=====================================================
MAGNET BUTTON
======================================================*/

document.querySelectorAll(

".hero-button,.submit-button,.copy-button"

).forEach(button=>{

button.addEventListener("mousemove",(e)=>{

const rect=button.getBoundingClientRect();

const x=e.clientX-rect.left-rect.width/2;

const y=e.clientY-rect.top-rect.height/2;

gsap.to(button,{

x:x*.25,

y:y*.25,

duration:.3

});

});

button.addEventListener("mouseleave",()=>{

gsap.to(button,{

x:0,

y:0,

duration:.4

});

});

});

/*=====================================================
COUNTER ANIMATION
======================================================*/

document.querySelectorAll(

"[data-counter]"

).forEach(counter=>{

let started=false;

ScrollTrigger.create({

trigger:counter,

start:"top 85%",

onEnter(){

if(started)return;

started=true;

let current=0;

const target=

parseInt(counter.dataset.counter);

const increment=

Math.ceil(target/100);

const timer=setInterval(()=>{

current+=increment;

if(current>=target){

current=target;

clearInterval(timer);

}

counter.innerHTML=current;

},20);

}

});

});

/*=====================================================
TEXT REVEAL
======================================================*/

document.querySelectorAll(

".reveal-text"

).forEach(text=>{

gsap.from(text,{

opacity:0,

y:40,

duration:1,

scrollTrigger:{

trigger:text,

start:"top 88%"

}

});

});

/*=====================================================
IMAGE ZOOM ON SCROLL
======================================================*/

document.querySelectorAll(

".zoom-scroll"

).forEach(image=>{

gsap.to(image,{

scale:1.15,

ease:"none",

scrollTrigger:{

trigger:image,

scrub:true

}

});

});

/*=====================================================
AUTO HIDE NAVBAR
======================================================*/

let lastScroll=0;

window.addEventListener(

"scroll",

()=>{

const current=window.scrollY;

const nav=document.querySelector("header");

if(!nav)return;

if(current>lastScroll && current>250){

nav.style.transform="translateY(-120%)";

}else{

nav.style.transform="translateY(0)";

}

lastScroll=current;

});

/*=====================================================
SECTION PROGRESS
======================================================*/

document.querySelectorAll("section").forEach(section=>{

ScrollTrigger.create({

trigger:section,

start:"top center",

end:"bottom center",

onUpdate:self=>{

section.style.setProperty(

"--progress",

self.progress

);

}

});

});

/*=====================================================
FLOATING ICONS
======================================================*/

const iconContainer=document.createElement("div");

iconContainer.className="floating-icons";

document.body.appendChild(iconContainer);

const icons=[

"❤",

"✿",

"❀",

"✦",

"✧"

];

setInterval(()=>{

const icon=document.createElement("span");

icon.innerHTML=

icons[Math.floor(Math.random()*icons.length)];

icon.style.left=Math.random()*100+"vw";

icon.style.fontSize=

16+Math.random()*20+"px";

icon.style.animationDuration=

5+Math.random()*5+"s";

iconContainer.appendChild(icon);

setTimeout(()=>{

icon.remove();

},12000);

},900);

/*=====================================================
PERFORMANCE LOGGER
======================================================*/

let fpsFrames=0;

let fpsLast=performance.now();

function monitorFPS(){

fpsFrames++;

const now=performance.now();

if(now-fpsLast>=1000){

console.log(

"FPS:",

fpsFrames

);

fpsFrames=0;

fpsLast=now;

}

requestAnimationFrame(

monitorFPS

);

}

monitorFPS();

/*=====================================================
END PART 7
======================================================*/

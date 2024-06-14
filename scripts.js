document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted!');
    // Add functionality to send the form data to your server or email.
});

// Moving star background
const canvas = document.createElement('canvas');
canvas.id = 'star-canvas';
document.getElementById('star-background').appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let shootingStars = [];

function createStars() {
    stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.1
        });
    }
}

function createShootingStars() {
    shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: Math.random() * 2,
        speed: Math.random() * 15 + 5,
        length: Math.random() * 300 + 50,
        duration: Math.random() * 5 + 1,
        alpha: Math.random() * 0.5 + 0.5
    });
}

function updateStars() {
    for (let star of stars) {
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        shootingStars[i].x += shootingStars[i].speed;
        shootingStars[i].y += shootingStars[i].speed;
        shootingStars[i].alpha -= 0.01;
        if (shootingStars[i].alpha <= 0) {
            shootingStars.splice(i, 1);
        }
    }
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let shootingStar of shootingStars) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length);
        ctx.stroke();
    }
}

function animateStars() {
    updateStars();
    drawStars();
    requestAnimationFrame(animateStars);
}

createStars();
animateStars();

setInterval(createShootingStars, 1000);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
});

// Spinning Earth and Moon
function initEarth() {
    const container = document.getElementById('earth-container');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('earth.jpg')
    });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    scene.add(earth);

    const moonGeometry = new THREE.SphereGeometry(0.27, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load('moon.jpg')
    });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(2, 0, 0);
    scene.add(moon);

    camera.position.z = 3;

    function animate() {
        requestAnimationFrame(animate);
        earth.rotation.y += 0.001;
        moon.rotation.y += 0.001;
        moon.position.x = Math.cos(Date.now() * 0.001) * 2;
        moon.position.z = Math.sin(Date.now() * 0.001) * 2;
        renderer.render(scene, camera);
    }
    animate();
}

window.onload = initEarth;

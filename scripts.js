document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'star-canvas';
    document.getElementById('star-background').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    let shootingStars = [];
    let lastShootingStarTime = 0;

    function createStars() {
        stars = [];
        for (let i = 0; i < 500; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }

    function createShootingStars() {
        shootingStars.push({
            x: Math.random() * canvas.width,
            y: 0,
            size: Math.random() * 2 + 1,
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

        // Draw stars
        ctx.fillStyle = 'white';
        for (let star of stars) {
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fill();
        }

        // Draw shooting stars
        for (let shootingStar of shootingStars) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${shootingStar.alpha})`;
            ctx.beginPath();
            ctx.moveTo(shootingStar.x, shootingStar.y);
            ctx.lineTo(shootingStar.x - shootingStar.length, shootingStar.y - shootingStar.length);
            ctx.stroke();
        }
    }

    function animateStars(timestamp) {
        updateStars();
        drawStars();

        // Create shooting stars at intervals
        if (timestamp - lastShootingStarTime > 1000) {
            createShootingStars();
            lastShootingStarTime = timestamp;
        }

        requestAnimationFrame(animateStars);
    }

    createStars();
    requestAnimationFrame(animateStars);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
    });

    // Three.js for procedural dust clouds and supernovae
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('star-background').appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 2;

    // Create procedural dust clouds
    const dustGeometry = new THREE.BufferGeometry();
    const dustMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.02 });

    const dustPositions = [];
    for (let i = 0; i < 1000; i++) {
        dustPositions.push((Math.random() - 0.5) * 10);
        dustPositions.push((Math.random() - 0.5) * 10);
        dustPositions.push((Math.random() - 0.5) * 10);
    }
    dustGeometry.setAttribute('position', new THREE.Float32BufferAttribute(dustPositions, 3));
    const dustCloud = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustCloud);

    // Create procedural supernovae
    const supernovaGeometry = new THREE.BufferGeometry();
    const supernovaMaterial = new THREE.PointsMaterial({ color: 0xffcc00, size: 0.05 });

    const supernovaPositions = [];
    for (let i = 0; i < 100; i++) {
        supernovaPositions.push((Math.random() - 0.5) * 10);
        supernovaPositions.push((Math.random() - 0.5) * 10);
        supernovaPositions.push((Math.random() - 0.5) * 10);
    }
    supernovaGeometry.setAttribute('position', new THREE.Float32BufferAttribute(supernovaPositions, 3));
    const supernova = new THREE.Points(supernovaGeometry, supernovaMaterial);
    scene.add(supernova);

    function animate() {
        dustCloud.rotation.y += 0.001;
        supernova.rotation.y += 0.002;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    animate();
});

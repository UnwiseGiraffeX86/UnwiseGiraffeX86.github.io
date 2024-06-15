document.addEventListener('DOMContentLoaded', function() {
    // Moving star background
    const canvas = document.createElement('canvas');
    canvas.id = 'star-canvas';
    document.getElementById('star-background').appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let stars = [];
    let shootingStars = [];
    let dustClouds = [];
    let supernovae = [];
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

    function createDustClouds() {
        dustClouds = [];
        for (let i = 0; i < 10; i++) {
            dustClouds.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 100 + 50,
                alpha: Math.random() * 0.3 + 0.1
            });
        }
    }

    function createSupernovae() {
        supernovae = [];
        for (let i = 0; i < 5; i++) {
            supernovae.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 30 + 10,
                alpha: Math.random() * 0.7 + 0.3
            });
        }
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
        
        // Draw dust clouds
        for (let cloud of dustClouds) {
            ctx.fillStyle = `rgba(255, 255, 255, ${cloud.alpha})`;
            ctx.beginPath();
            ctx.arc(cloud.x, cloud.y, cloud.size, 0, Math.PI * 2);
            ctx.fill();
        }

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

        // Draw supernovae
        for (let nova of supernovae) {
            ctx.fillStyle = `rgba(255, 255, 255, ${nova.alpha})`;
            ctx.beginPath();
            ctx.arc(nova.x, nova.y, nova.size, 0, Math.PI * 2);
            ctx.fill();
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
    createDustClouds();
    createSupernovae();
    requestAnimationFrame(animateStars);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        createStars();
        createDustClouds();
        createSupernovae();
    });

    // Mouseover effect
    canvas.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
    });
});

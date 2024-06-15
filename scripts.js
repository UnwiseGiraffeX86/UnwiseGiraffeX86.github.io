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

    // Mouseover effect
    canvas.addEventListener('mousemove', (event) => {
        const x = event.clientX;
        const y = event.clientY;
        
        ctx.beginPath();
        ctx.arc(x, y, 50, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.fill();
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
    const dustMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() }
        },
        vertexShader: `
            uniform float time;
            varying vec3 vPos;
            void main() {
                vPos = position;
                vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * modelViewPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec3 vPos;
            void main() {
                float brightness = 0.1 / length(vPos);
                gl_FragColor = vec4(vec3(brightness), 1.0);
            }
        `,
        transparent: true
    });

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
    const supernovaMaterial = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 1.0 },
            resolution: { value: new THREE.Vector2() }
        },
        vertexShader: `
            uniform float time;
            varying vec3 vPos;
            void main() {
                vPos = position;
                vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
                gl_Position = projectionMatrix * modelViewPosition;
            }
        `,
        fragmentShader: `
            uniform float time;
            varying vec3 vPos;
            void main() {
                float brightness = 0.5 / length(vPos);
                gl_FragColor = vec4(vec3(brightness), 1.0);
            }
        `,
        transparent: true
    });

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
        requestAnimationFrame(animate);

        dustMaterial.uniforms.time.value += 0.05;
        supernovaMaterial.uniforms.time.value += 0.05;

        renderer.render(scene, camera);
    }

    animate();
});

document.addEventListener("DOMContentLoaded", function () {
    const viewerContainer = document.getElementById('cad-viewer');
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const header = document.querySelector("header");
    let model;

    if (!viewerContainer) {
        console.error("Viewer container not found!");
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    viewerContainer.style.width = "100%";
    viewerContainer.style.height = "100%";
    viewerContainer.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/main.glb', function (gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(7, 7, 7);
        scene.add(model);
        console.log('GLB model loaded successfully!');
    });

    // Window resize handling
    window.addEventListener('resize', () => {
        camera.aspect = viewerContainer.clientWidth / viewerContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    });

    // Scroll-triggered animations
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        // First text fade-in/out
        if (scrollPosition > 50 && scrollPosition < windowHeight / 2) {
            text1.style.opacity = (scrollPosition / (windowHeight / 2)).toString();
        } else if (scrollPosition < 50) {
            text1.style.opacity = '1';
        }

        // Start PCB rotation when the first text is fading out
        if (scrollPosition > windowHeight / 3 && scrollPosition < windowHeight) {
            const rotationProgress = (scrollPosition - windowHeight / 3) / (windowHeight / 2); // Start rotation earlier
            model.rotation.x = THREE.MathUtils.clamp(rotationProgress * Math.PI / 2, 0, Math.PI / 2); // Faster rotation
            text1.style.opacity = (1 - rotationProgress).toString(); // Fade out first text along with PCB rotation
        }

        // Second text fade-in
        if (scrollPosition > windowHeight && scrollPosition < windowHeight * 1.5) {
            text2.style.opacity = ((scrollPosition - windowHeight) / (windowHeight / 2)).toString();
        } else {
            text2.style.opacity = '0';
        }

        // Shrink header when scrolling past the first section
        if (scrollPosition > windowHeight) {
            header.classList.add("shrink");
        } else {
            header.classList.remove("shrink");
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

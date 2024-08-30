document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    const viewerContainer = document.getElementById('cad-viewer');

    if (!viewerContainer) {
        console.error("Viewer container not found!");
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    viewerContainer.style.width = "100%";
    viewerContainer.style.height = "100%";
    renderer.setSize(window.innerWidth, window.innerHeight);
    viewerContainer.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Softer ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Adjust the camera position
    camera.position.set(0, 0, 30);  // Adjusted camera position for better initial view
    camera.lookAt(0, 0, 0);  // Ensure the camera is looking at the scene center

    let model;
    let rotationComplete = false;

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/main.glb', function(gltf) {
        model = gltf.scene;

        // Center and scale the model
        model.position.set(0, 0, 0);
        model.scale.set(3, 3, 3);  // Adjust the scale based on your preference

        scene.add(model);
        console.log('GLB model loaded successfully!');
    }, function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function(error) {
        console.error('An error occurred while loading the GLB model:', error);
    });

    // Handle window resize to adjust the viewer
    window.addEventListener('resize', () => {
        camera.aspect = viewerContainer.clientWidth / viewerContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    });

    // Lock scroll to the viewer section
    function lockScroll() {
        document.body.style.overflow = 'hidden';
    }

    function unlockScroll() {
        document.body.style.overflow = 'auto';
    }

    // Rotate model on scroll
    window.addEventListener('scroll', () => {
        if (model && !rotationComplete) {
            lockScroll();

            const maxRotation = Math.PI / 4; // +45 degrees in radians
            const scrollTop = window.scrollY - viewerContainer.offsetTop;
            const scrollHeight = viewerContainer.clientHeight;
            const rotationProgress = scrollTop / scrollHeight;

            // Clamp rotation between 0 and +45 degrees
            model.rotation.x = THREE.MathUtils.clamp(rotationProgress * maxRotation, 0, maxRotation);

            // Check if the rotation is complete
            if (rotationProgress >= 1) {
                rotationComplete = true;
                unlockScroll();
            }
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

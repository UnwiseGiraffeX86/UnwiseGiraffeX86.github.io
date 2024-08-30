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
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Adjust the camera position
    camera.position.set(0, 0, 30);
    camera.lookAt(0, 0, 0);

    let model;
    let isRotating = true; // To manage when to allow scrolling
    let rotationComplete = false; // To indicate when rotation is complete

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/main.glb', function(gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(3, 3, 3);
        scene.add(model);
        console.log('GLB model loaded successfully!');
    }, function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function(error) {
        console.error('An error occurred while loading the GLB model:', error);
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = viewerContainer.clientWidth / viewerContainer.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    });

    // Scroll event for rotation
    window.addEventListener('scroll', () => {
        if (model && isRotating) {
            const maxRotation = Math.PI / 4; // +45 degrees in radians
            const scrollTop = window.scrollY - viewerContainer.offsetTop;
            const scrollHeight = viewerContainer.clientHeight;
            const rotationProgress = scrollTop / scrollHeight;

            // Clamp rotation between 0 and +45 degrees
            model.rotation.x = THREE.MathUtils.clamp(rotationProgress * maxRotation, 0, maxRotation);

            // Lock the scroll while the rotation is in progress
            if (rotationProgress >= 1) {
                isRotating = false; // Stop rotation, unlock scroll
                rotationComplete = true;
            } else if (rotationProgress < 1) {
                isRotating = true; // Continue rotating
                rotationComplete = false;
            }
        }

        if (!isRotating && !rotationComplete) {
            document.body.style.overflowY = 'hidden'; // Lock scrolling
        } else {
            document.body.style.overflowY = 'auto'; // Unlock scrolling
        }
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

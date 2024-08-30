document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    const viewerContainer = document.getElementById('cad-viewer');

    if (!viewerContainer) {
        console.error("Viewer container not found!");
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
    
    // Improved renderer with higher resolution
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Set to device pixel ratio for higher resolution
    renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    viewerContainer.style.width = "100%";
    viewerContainer.style.height = "100%";
    viewerContainer.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
    directionalLight.position.set(10, 10, 10).normalize();
    scene.add(directionalLight);

    // Adjust the camera position
    camera.position.set(0, 0, 50);
    camera.lookAt(0, 0, 0);

    let model;
    let isPrimaryRotationComplete = false;
    let isWaitingForSecondaryScroll = false;

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/main.glb', function(gltf) {
        model = gltf.scene;
        model.position.set(0, 0, 0);
        model.scale.set(5, 5, 5);
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
        if (model && !isPrimaryRotationComplete) {
            const maxRotationX = Math.PI / 4; // +45 degrees in radians for the initial rotation
            const scrollTop = window.scrollY;
            const scrollHeight = viewerContainer.clientHeight / 2;
            const rotationProgress = scrollTop / scrollHeight;

            // Rotate bottom to top
            model.rotation.x = THREE.MathUtils.clamp(rotationProgress * maxRotationX, 0, maxRotationX);

            // Check if the initial rotation is complete
            if (rotationProgress >= 1) {
                isPrimaryRotationComplete = true;
                setTimeout(() => {
                    isWaitingForSecondaryScroll = true;
                }, 1000); // Wait for 1 second before allowing the next scroll
            }
        }

        if (model && isPrimaryRotationComplete && isWaitingForSecondaryScroll) {
            const secondaryScrollTop = window.scrollY - viewerContainer.clientHeight;
            const secondaryScrollHeight = viewerContainer.clientHeight / 2;
            const secondaryRotationProgress = secondaryScrollTop / secondaryScrollHeight;

            if (secondaryRotationProgress > 0) {
                initiateSecondaryRotation(secondaryRotationProgress);
            }
        }
    });

    function initiateSecondaryRotation(progress) {
        const targetRotationZ = Math.PI; // 180 degrees

        // Rotate around the top-right to bottom-left axis
        model.rotation.z = THREE.MathUtils.clamp(progress * targetRotationZ, 0, targetRotationZ);

        if (progress >= 1) {
            isWaitingForSecondaryScroll = false;
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

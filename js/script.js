document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded and parsed.");

    const viewerContainer = document.getElementById("cad-viewer");
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");

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

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        "assets/models/main.glb",
        function (gltf) {
            model = gltf.scene;
            model.position.set(0, 0, 0);
            model.scale.set(5, 5, 5);
            scene.add(model);
            console.log("GLB model loaded successfully!");
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        function (error) {
            console.error("An error occurred while loading the GLB model:", error);
        }
    );

    // Scroll-based Animation Control
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const scrollHeight = document.body.scrollHeight - window.innerHeight;

        if (model) {
            const progress = scrollTop / scrollHeight;

            if (progress < 0.33) {
                // Rotate to the front (45 degrees)
                model.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 4, progress / 0.33);
                model.rotation.z = 0; // Ensure no Z-axis rotation in this phase
                if (!text1.classList.contains("visible")) {
                    text1.classList.add("visible");
                }
            } else if (progress < 0.66) {
                // Hold position, fade out first text and fade in second
                model.rotation.x = Math.PI / 4;  // Ensure the rotation is fixed at 45 degrees
                model.rotation.z = 0;  // Keep Z-axis rotation at 0
                if (text1.classList.contains("visible")) {
                    text1.classList.remove("visible");
                }
                if (!text2.classList.contains("visible")) {
                    text2.classList.add("visible");
                }
            } else if (progress < 1) {
                // Diagonal flip (around the diagonal axis)
                const rotationProgress = (progress - 0.66) / 0.34;

                // Rotate around a custom axis (diagonal from top-right to bottom-left)
                const diagonalAxis = new THREE.Vector3(1, 0, -1).normalize(); // Normalized vector for diagonal rotation axis
                const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(diagonalAxis, Math.PI); // 180-degree rotation around the diagonal axis

                model.quaternion.slerp(targetQuaternion, rotationProgress); // Spherical linear interpolation for smooth rotation
            } else {
                // Second 45-degree bottom to top rotation
                const rotationProgress = (progress - 1) / 0.33;
                model.rotation.x = THREE.MathUtils.lerp(0, Math.PI / 4, rotationProgress);
                model.rotation.z = 0; // Reset Z-axis rotation for this phase
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

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    const viewerContainer = document.getElementById('cad-viewer');
    
    if (!viewerContainer) {
        console.error("Viewer container not found!");
        return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, viewerContainer.clientWidth / viewerContainer.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(viewerContainer.clientWidth, viewerContainer.clientHeight);
    viewerContainer.appendChild(renderer.domElement);

    // Add lighting
    const light = new THREE.AmbientLight(0x404040, 5); // soft white light
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1).normalize();
    scene.add(directionalLight);

    // Load the GLB model
    const loader = new THREE.GLTFLoader();
    loader.load('assets/models/pcb.glb', function(gltf) {
        scene.add(gltf.scene);
        console.log('GLB model loaded successfully!');

        // Optional: center and scale the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        gltf.scene.position.x -= center.x;
        gltf.scene.position.y -= center.y;
        gltf.scene.position.z -= center.z;

        const maxSize = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxSize;
        gltf.scene.scale.set(scale, scale, scale);

    }, function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    }, function(error) {
        console.error('An error occurred while loading the GLB model:', error);
    });

    camera.position.z = 5;

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});

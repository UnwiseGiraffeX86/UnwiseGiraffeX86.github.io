document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Form submitted!');
    // Add functionality to send the form data to your server or email.
});

$(document).ready(function(){
    $('.slider').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        arrows: true
    });
});

// 3D Model Initialization (if needed)
// function init3D() {
//     const container = document.getElementById('3d-container');
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
//     const renderer = new THREE.WebGLRenderer({ alpha: true });
    
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     container.appendChild(renderer.domElement);

//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//     const cube = new THREE.Mesh(geometry, material);

//     scene.add(cube);
//     camera.position.z = 5;

//     function animate() {
//         requestAnimationFrame(animate);
//         cube.rotation.x += 0.01;
//         cube.rotation.y += 0.01;
//         renderer.render(scene, camera);
//     }
//     animate();
// }

// window.onload = init3D;

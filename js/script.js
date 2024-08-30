// Ensure that the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    const viewerContainer = document.getElementById('cad-viewer');
    
    // Initialize the CAD Viewer
    const cadViewer = new CadViewer(viewerContainer, {
        backgroundColor: '#ffffff',
        showAxes: true,
        showGrid: true
    });

    // Load the STEP file
    cadViewer.load('assets/models/pcb.step', function () {
        console.log('STEP model loaded successfully!');
    }, function (error) {
        console.error('An error occurred while loading the STEP model:', error);
    });
});

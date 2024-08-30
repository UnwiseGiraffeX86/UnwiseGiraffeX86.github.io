document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed.");

    const viewerContainer = document.getElementById('cad-viewer');
    if (!viewerContainer) {
        console.error("Viewer container not found!");
        return;
    }

    // Initialize the CAD Viewer
    const cadViewer = new CadViewer(viewerContainer, {
        backgroundColor: '#ffffff',
        showAxes: true,
        showGrid: true
    });

    console.log("CAD Viewer initialized.");

    // Load the STEP file
    cadViewer.load('assets/models/pcb.step', function () {
        console.log('STEP model loaded successfully!');
    }, function (error) {
        console.error('An error occurred while loading the STEP model:', error);
    });
});

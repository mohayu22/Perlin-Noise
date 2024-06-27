// script.js
window.onload = function() {
    const canvas = document.getElementById('noiseCanvas');
    const ctx = canvas.getContext('2d');
    
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;

    const scale = 0.02; // Scale of the noise
    let z = 0; // Initial Z value for animation

    function draw() {
        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const noiseValue = noise(x * scale, y * scale, z);
                const colorValue = (noiseValue + 1) * 128; // Map noise value to 0-255
                
                const index = (x + y * width) * 4;
                
                // Color mapping
                const r = Math.floor(Math.sin(colorValue * Math.PI / 128) * 128 + 128);
                const g = Math.floor(Math.sin(colorValue * Math.PI / 64) * 128 + 128);
                const b = Math.floor(Math.sin(colorValue * Math.PI / 32) * 128 + 128);

                data[index] = r;       // Red
                data[index + 1] = g;   // Green
                data[index + 2] = b;   // Blue
                data[index + 3] = 255; // Alpha
            }
        }

        ctx.putImageData(imageData, 0, 0);
        z += 0.01; // Increment Z value for animation
        requestAnimationFrame(draw);
    }

    draw();
};

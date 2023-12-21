const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const boids = [];

let targetX = null;
let targetY = null;

function initBoids(no) {
    for (let i = 0; i < no; i++) {
        boids.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.random() * 2 - 1,
            vy: Math.random() * 2 - 1,
        });
    }
}

function drawBoids() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00F"; 

    for (const boid of boids) {
        ctx.beginPath();
        ctx.arc(boid.x, boid.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function updateBoids() {
    const maxSpeed = 2; 
    const acceleration = 0.02; 

    for (const boid of boids) {
        if (targetX !== null && targetY !== null) {
            const angle = Math.atan2(targetY - boid.y, targetX - boid.x);
            
            boid.vx += acceleration * Math.cos(angle);
            boid.vy += acceleration * Math.sin(angle);

            const speed = Math.sqrt(boid.vx * boid.vx + boid.vy * boid.vy);
            if (speed > maxSpeed) {
                const factor = maxSpeed / speed;
                boid.vx *= factor;
                boid.vy *= factor;
            }
        }

        boid.x += boid.vx;
        boid.y += boid.vy;

        if (boid.x > canvas.width) boid.x = 0;
        if (boid.x < 0) boid.x = canvas.width;
        if (boid.y > canvas.height) boid.y = 0;
        if (boid.y < 0) boid.y = canvas.height;
    }
}

function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
}

function handleMouseOut() {
    targetX = null;
    targetY = null;
}

function animate() {
    updateBoids();
    drawBoids();
    requestAnimationFrame(animate);
}

initBoids(500);
animate();

canvas.addEventListener("mousemove", handleMouseMove);
canvas.addEventListener("mouseout", handleMouseOut);

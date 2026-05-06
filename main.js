const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const leftPaddle = {
    x:30,
    y: canvas.height / 2 - 50,
    width: 12,
    height: 100,
    speed: 400 //pixels per second
};

// Track which keys are currently pressed
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});

let lastTime = 0;

//Game logic here!
function update (dt) {
    
    //Left paddle movement
    if (keys['w']) {
        leftPaddle.y -= leftPaddle.speed * dt;
    }
    if (keys['s']) {
        leftPaddle.y += leftPaddle.speed * dt;
    }

    //Clamp paddle to canvas bound
    if (leftPaddle.y < 0) {
        leftPaddle.y = 0;
    }
    if (leftPaddle.y + leftPaddle.height > canvas.height) {
        leftPaddle.y = canvas.height - leftPaddle.height
    }

}

function render () {
    //Clear screen
    ctx.fillStyle = '#000';
    ctx.fillRect(0,0, canvas.width, canvas.height);

    //center dashed line
    ctx.fillStyle = '#444';
    for (let y = 0; y < canvas.height; y+= 20) {
        ctx.fillRect(canvas.width / 2 - 1, y, 2, 10);
    }

    //Draw game objects here

    //Left paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
}

function loop (timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    update(dt);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
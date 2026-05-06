const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const leftPaddle = {
    x:30,
    y: canvas.height / 2 - 50,
    width: 12,
    height: 100,
    speed: 400 //pixels per second
};

const rightPaddle = {
    x: canvas.width - 30 - 12,
    y: canvas.height / 2 - 50,
    width: 12,
    height: 100,
    speed: 400
}

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 12,
    vx: 300, // horizontal velocity, pixels per second
    vy: 200 // vertical velocity, pixels per second
};

// Returns true if ball overlaps with paddle
function ballHitsPaddle (ball, paddle) {
    return ball.x < paddle.x + paddle.width &&
           ball.x + ball.size > paddle.x &&
           ball.y < paddle.y + paddle.height &&
           ball.y + ball.size > paddle.y 
}


function resetBall (direction) {
    ball.x = canvas.width / 2 - ball.size / 2;
    ball.y = canvas.height / 2 - ball.size / 2;
    ball.vx = 300 * direction // direction is +1 (right) or -1 (left)
    ball.vy = (Math.random() - 0.5) * 400; //Random between -200 and 200
}

//Scores
let leftScore = 0;
let rightScore = 0;

// Track which keys are currently pressed
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
});



let lastTime = 0;

//Game logic here!!
function update (dt) {

    // Move ball
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    // Ball bounce off top and bottom walls
    if (ball.y < 0) {
        ball.y = 0;
        ball.vy *= -1;
    }
    if (ball.y + ball.size > canvas.height) {
        ball.y = canvas.height - ball.size;
        ball.vy *= -1;
    }

    // Ball collision with paddles
    if (ballHitsPaddle(ball, leftPaddle)) {
        ball.x = leftPaddle.x + leftPaddle.width; //Snap ball to right edge of paddle
        ball.vx *= -1;
    }
    if (ballHitsPaddle(ball, rightPaddle)) {
        ball.x = rightPaddle.x - ball.size; //Snap ball to left edge of paddle
        ball.vx *= -1;
    }

    // Ball off screen - score and reset
    if (ball.x + ball.size < 0 ) {
        rightScore++;
        resetBall(-1);
    }
    if (ball.x > canvas.width) {
        leftScore++;
        resetBall(1);
    }

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

    //Right paddle movement
    if (keys['arrowup']) {
        rightPaddle.y -= rightPaddle.speed * dt;
    }
    if (keys['arrowdown']) {
        rightPaddle.y += rightPaddle.speed * dt;
    }

    //Clamp paddle to canvas bound
    if (rightPaddle.y < 0) {
        rightPaddle.y = 0;
    }
    if (rightPaddle.y + rightPaddle.height > canvas.height) {
        rightPaddle.y = canvas.height - rightPaddle.height
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

    // Draw score
    ctx.fillStyle = '#fff';
    ctx.font = '64px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(leftScore, canvas.width / 4, 80);
    ctx.fillText(rightScore, canvas.width * 3 / 4, 80);



    //Draw game objects here

    //Ball
    ctx.fillStyle = '#fff';
    ctx.fillRect(ball.x, ball.y, ball.size, ball.size);

    //Left paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);

    //Right paddle
    ctx.fillStyle = '#fff';
    ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height)
}

function loop (timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    update(dt);
    render();

    requestAnimationFrame(loop);
}

resetBall(Math.random() < 0.5 ? -1 : 1);
requestAnimationFrame(loop);
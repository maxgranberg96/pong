const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

let lastTime = 0;

function update (dt) {
    //Game logic here
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
}

function loop (timestamp) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    update(dt);
    render();

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);
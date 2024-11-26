// Obtener elementos del DOM
const player = document.getElementById('player');
const ball = document.getElementById('ball');
const goal = document.getElementById('goal');
const message = document.getElementById('message');

let playerPosition = 50;  // Posición inicial del jugador (en porcentaje)
let ballPosition = 50;  // Posición inicial de la pelota
let ballInMotion = false;

// Configuración del campo y la portería
const fieldWidth = 100;  // 100% de ancho
const fieldHeight = 400;
const goalWidth = 80;
const goalHeight = 40;

// Función para mover al jugador
function movePlayer(direction) {
    if (direction === 'left' && playerPosition > 0) {
        playerPosition -= 2;
    } else if (direction === 'right' && playerPosition < 100) {
        playerPosition += 2;
    }
    player.style.left = playerPosition + '%';
}

// Función para mover la pelota
function moveBall() {
    if (ballInMotion) {
        let ballLeft = parseInt(ball.style.left);
        if (ballLeft >= (goalPosition - goalWidth / 2) && ballLeft <= (goalPosition + goalWidth / 2) && ball.style.bottom === '40px') {
            // Si la pelota entra en la portería
            message.textContent = "¡Gol! Has marcado un gol.";
            ballInMotion = false;
        } else {
            // Si no ha marcado gol, sigue moviendo
            ballPosition += 1;
            ball.style.left = ballPosition + '%';

            if (ballPosition > 100) {
                // Si la pelota sale del campo
                ballPosition = playerPosition;
                ball.style.left = ballPosition + '%';
                ballInMotion = false;
            }
        }
    }
}

// Función para iniciar el movimiento de la pelota
function kickBall() {
    if (!ballInMotion) {
        ballInMotion = true;
        message.textContent = "¡La pelota está en movimiento!";
        setInterval(moveBall, 10);
    }
}

// Función para verificar si el jugador presiona las teclas
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    } else if (event.key === ' ') {
        kickBall();  // Si presionas la barra espaciadora, la pelota se mueve
    }
});

// Obtener elementos del DOM
const player = document.getElementById('player');
const ball = document.getElementById('ball');
const goal = document.getElementById('goal');
const message = document.getElementById('message');

let playerPosition = 50; // Posición inicial del jugador (en porcentaje)
let ballPositionX = 50; // Posición inicial horizontal de la pelota
let ballPositionY = 60; // Posición inicial vertical de la pelota
let ballInMotion = false;

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
        ballPositionY -= 1; // La pelota sube
        ball.style.bottom = ballPositionY + '%';

        if (ballPositionY <= 10) {
            // Verificar si la pelota entra en la portería
            const ballLeft = parseFloat(ball.style.left);
            const goalLeft = parseFloat(goal.style.left);

            if (ballLeft >= (goalLeft - 5) && ballLeft <= (goalLeft + 5)) {
                // Gol marcado
                message.textContent = "¡Gol! Presiona espacio para reiniciar.";
                ballInMotion = false;
            } else if (ballPositionY <= 5) {
                // La pelota salió fuera
                message.textContent = "¡Fallaste! Presiona espacio para intentarlo de nuevo.";
                ballInMotion = false;
            }
        }
    }
}

// Función para reiniciar la posición de la pelota
function resetBall() {
    ballInMotion = false;
    ballPositionX = playerPosition; // Colocar la pelota frente al jugador
    ballPositionY = 60;
    ball.style.left = ballPositionX + '%';
    ball.style.bottom = ballPositionY + '%';
    message.textContent = "¡Intenta marcar un gol!";
}

// Función para chutar la pelota
function kickBall() {
    if (!ballInMotion) {
        ballInMotion = true;
        ballPositionX = playerPosition; // Fija la pelota frente al jugador
        ball.style.left = ballPositionX + '%';
        message.textContent = "¡La pelota está en movimiento!";
    }
}

// Detectar teclas
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
        movePlayer('left');
    } else if (event.key === 'ArrowRight') {
        movePlayer('right');
    } else if (event.key === ' ') {
        if (ballInMotion) {
            resetBall(); // Reinicia si la pelota está en movimiento
        } else {
            kickBall(); // Chuta si la pelota está detenida
        }
    }
});

// Actualizar el movimiento de la pelota
setInterval(moveBall, 20); // Suavidad de movimiento


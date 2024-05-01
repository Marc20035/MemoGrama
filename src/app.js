const boton = document.getElementById('start-game');
const pages = document.querySelectorAll('.page');
const pagesContainer = document.querySelector('.pages');
const tablero = document.querySelector('.tablero');
let totalCards = 4;
let flippedCards = [];
let win = 0;
let intentos = 0;
let intentosElement = document.getElementById('contador');

// Agrega un evento de clic al botón. Cuando se hace clic en el botón...
boton.addEventListener('click', () => {
    // Recorre cada "página" y aplica una transformación CSS para moverla hacia arriba y ocultarla.
    pages.forEach(page => {
        page.style.transform = 'translateY(-100%)';
    });
    // Establece la altura del contenedor de páginas a 100% del viewport.
    pagesContainer.style.height = '100vh';
});

// Llama a la función para crear las cartas y asignar números iniciales.
createCards(totalCards, tablero);
asignarNumeros();
funcionalidad();

// Evento que detecta cambios en el elemento 'dificultad' del DOM.
document.getElementById('dificultad').addEventListener('change', function() {
    let dificultad = this.value;

    // Establece el número de cartas según la dificultad seleccionada.
    if (dificultad === 'facil') {
        totalCards = 4;
    } else if (dificultad === 'medio') {
        totalCards = 8;
    } else if (dificultad === 'difícil') {
        totalCards = 12;
    }

    // Limpia el tablero antes de crear nuevas cartas.
    tablero.innerHTML = '';
    createCards(totalCards, tablero);
    asignarNumeros();
    funcionalidad();
});

// Función para crear cartas en el tablero.
function createCards(totalCards, tablero) {
    for (let i = 0; i < totalCards; i++) {
        let card = document.createElement('div');  // Crea un nuevo div para cada carta.
        card.classList.add('carta');  // Añade la clase 'carta'.
        let back = document.createElement('div');  // Crea el lado trasero de la carta.
        back.classList.add('back');
        card.appendChild(back);  // Añade el lado trasero a la carta.
        let front = document.createElement('div');  // Crea el lado frontal de la carta.
        front.classList.add('front');
        card.appendChild(front);  // Añade el lado frontal a la carta.

        tablero.appendChild(card);  // Añade la carta al tablero.
    }
}

// Función para asignar números a las cartas.
function asignarNumeros() {
    const backs = document.querySelectorAll('.back');  // Selecciona todos los elementos con clase 'back'.
    let numbers = [];
    for (let i = 1; i <= totalCards / 2; i++) {
        numbers.push(i, i);  // Añade pares de números al arreglo.
    }
    shuffleArray(numbers);  // Mezcla los números aleatoriamente.
    backs.forEach((back, index) => {
        back.textContent = numbers[index];  // Asigna un número a cada lado trasero de las cartas.
    });
}

// Función para barajar un arreglo.
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];  // Intercambia elementos aleatoriamente.
    }
}

// Función para agregar interactividad a las cartas.
function funcionalidad() {
    document.querySelectorAll('.carta').forEach(carta => {
        carta.addEventListener('click', function () {
            if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.classList.add('flipped');  // Voltea la carta.
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    intentos++;
                    intentosElement.innerHTML = "Intentos: " + intentos;  // Actualiza el número de intentos.
                    intentosElement.style.color = "#ffffff";  // Establece el color del texto a blanco.

                    if (flippedCards[0].querySelector('.back').textContent === flippedCards[1].querySelector('.back').textContent) {
                        win++;  // Incrementa el contador de aciertos.
                        flippedCards = [];
                        if (win === totalCards / 2) {  // Verifica si el jugador ha ganado.
                            setTimeout(() => {
                                Swal.fire({
                                    title: '¡Ganaste!',
                                    text: `Has ganado en ${intentos} intentos`,
                                    icon: 'success',
                                    confirmButtonText: 'Volver a jugar'
                                }).then(() => {
                                    window.location.reload();  // Recarga la página para reiniciar el juego.
                                });
                            }, 500);
                        }
                    } else {
                        setTimeout(() => {
                            flippedCards.forEach(card => card.classList.remove('flipped'));  // Desvoltea las cartas.
                            flippedCards = [];
                        }, 600);
                    }
                }
            }
        });
    });
}


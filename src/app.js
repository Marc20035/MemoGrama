
const boton = document.getElementById('start-game');
const pages = document.querySelectorAll('.page');
const pagesContainer = document.querySelector('.pages');

boton.addEventListener('click', () => {
    pages.forEach(page => {
        page.style.transform = 'translateY(-100%)';
    });
    pagesContainer.style.height = '100vh';
});

//---------------------------------------------
// Hacemos tablero Dinámicamente
//---------------------------------------------
const tablero = document.querySelector('.tablero');
let totalCards = 4;
createCards(totalCards, tablero);

document.getElementById('dificultad').addEventListener('change', function() {
    let dificultad = this.value;

    if (dificultad === 'facil') {
        totalCards = 4;
    } else if (dificultad === 'medio') {
        totalCards = 8;
    } else if (dificultad === 'difícil') {
        totalCards = 12;
    }

    tablero.innerHTML = '';
    createCards(totalCards, tablero);
});


function createCards(totalCards, tablero) {
    for (let i = 0; i < totalCards; i++) {
        // Create the card div and add 'carta' class
        let card = document.createElement('div');
        card.classList.add('carta');

        // Create the back of the card and add it to the card
        let back = document.createElement('div');
        back.classList.add('back');
        card.appendChild(back);

        // Create the front of the card and add it to the card
        let front = document.createElement('div');
        front.classList.add('front');
        card.appendChild(front);

        // Append the complete card to the board (tablero)
        tablero.appendChild(card);
    }
}

//---------------------------------------------
// Hacemos que las cartas se volteen
//---------------------------------------------
/*document.querySelectorAll('.carta').forEach(carta => {
    carta.addEventListener('click', () => {
        carta.classList.toggle('flipped');
    });
});*/
//---------------------------------------------
// Hacemos que las cartas "Back" contengan un número y sean aleatorias
//---------------------------------------------


const back = document.querySelectorAll('.back');

// Función para barajar un arreglo usando el algoritmo de Fisher-Yates
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let numbers = [];
for (let i = 1; i <= 6; i++) {
    numbers.push(i, i);
}

shuffleArray(numbers);

back.forEach((back, index) => {
    back.textContent = numbers[index];
});

//---------------------------------------------
// Hacemos que las cartas se volteen y se comparen
// Mostramos mensaje de win si todas las cartas son iguales
//---------------------------------------------

let flippedCards = [];
let win = 0;
let intentos = 0;
let intentosElement = document.getElementById('contador');
// Array para guardar las cartas volteadas temporalmente

document.querySelectorAll('.carta').forEach(carta => {
    carta.addEventListener('click', function() {
        if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
            this.classList.add('flipped');
            flippedCards.push(this);

            if (flippedCards.length === 2) {
                intentos ++;
                intentosElement.innerHTML = "Intentos: " + intentos;

                if (flippedCards[0].querySelector('.back').textContent === flippedCards[1].querySelector('.back').textContent) {
                    win ++;
                    flippedCards = [];
                    if (win === 6) { // Verifica si el jugador ha ganado después de hacer una pareja correcta
                        setTimeout(() => {
                            Swal.fire({
                                title: '¡Ganaste!',
                                text: `Has ganado en ${intentos} intentos`,
                                icon: 'success',
                                confirmButtonText: 'Volver a jugar'
                            }).then(() => {
                                window.location.reload();
                            });
                        }, 500);
                    }
                }else {
                    setTimeout(() => {
                        flippedCards.forEach(card => card.classList.remove('flipped'));
                        flippedCards = [];
                    }, 600);
                }
            }
        }
    });
});

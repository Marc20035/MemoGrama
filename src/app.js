const boton = document.getElementById('start-game');
const pages = document.querySelectorAll('.page');
const pagesContainer = document.querySelector('.pages');
const tablero = document.querySelector('.tablero');
let totalCards = 4;
let flippedCards = [];
let win = 0;
let intentos = 0;
let intentosElement = document.getElementById('contador');

boton.addEventListener('click', () => {
    pages.forEach(page => {
        page.style.transform = 'translateY(-100%)';
    });
    pagesContainer.style.height = '100vh';
});
createCards(totalCards, tablero);
asignarNumeros();
funcionalidad();
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
    asignarNumeros();
    funcionalidad();
});

function createCards(totalCards, tablero) {
    for (let i = 0; i < totalCards; i++) {
        let card = document.createElement('div');
        card.classList.add('carta');
        let back = document.createElement('div');
        back.classList.add('back');
        card.appendChild(back);
        let front = document.createElement('div');
        front.classList.add('front');
        card.appendChild(front);
        tablero.appendChild(card);
    }
}

function asignarNumeros() {
    const backs = document.querySelectorAll('.back');
    let numbers = [];
    for (let i = 1; i <= totalCards / 2; i++) {
        numbers.push(i, i);
    }
    shuffleArray(numbers);
    backs.forEach((back, index) => {
        back.textContent = numbers[index];
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function funcionalidad() {
    document.querySelectorAll('.carta').forEach(carta => {
        carta.addEventListener('click', function () {
            if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                this.classList.add('flipped');
                flippedCards.push(this);

                if (flippedCards.length === 2) {
                    intentos++;
                    intentosElement.innerHTML = "Intentos: " + intentos;
                    intentosElement.style.color = "#ffffff";          // Texto blanco

                    if (flippedCards[0].querySelector('.back').textContent === flippedCards[1].querySelector('.back').textContent) {
                        win++;
                        flippedCards = [];
                        if (win === totalCards / 2) { // Asegurarse que la condición de ganar se ajuste a la dificultad
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
                    } else {
                        setTimeout(() => {
                            flippedCards.forEach(card => card.classList.remove('flipped'));
                            flippedCards = [];
                        }, 600);
                    }
                }
            }
        });
    });
}

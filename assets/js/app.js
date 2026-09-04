//////// Variables globales ////////
const information = document.getElementById("info");
const playButton = document.getElementById("playBtn");
const dialogInfo = document.querySelector('#dialogTable');
const values = ["2","3","4","5","6","7","8","9","10",
                "J","Q","K","A"]; // Índices de la baraja de cartas
const suits = ["♣️","♦️","♥️","♠️"]; // Palos de la baraja francesa
let deck = []; // Mazo de 52 cartas de la baraja francesa
let hand = []; // Mano de 5 cartas del jugador tras repartir
let firstDraw = true; // Primer reparto de cartas (sin descartes)



//////// Funciones de la aplicación ////////

// Algoritmo de Fisher-Yates (también conocido como el "Knuth shuffle")
function shuffle(array) {
    // Recorre el array desde el último elemento hasta el segundo
    for (let i = array.length - 1; i > 0; i--) {
        // Elige un índice aleatorio entre 0 e i (inclusive)
        const j = Math.floor(Math.random() * (i + 1));
        // Intercambia elementos array[i] y array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Crea y mezcla aleatoriamente el mazo de cartas
function createDeck() {
    deck = [];

    for(const suit of suits) {
        for(const value of values) {
            deck.push( {value, suit} );
        }
    }

    shuffle(deck);
}

// Reparte una carta del mazo
function drawCard() {
    return deck.pop();
}

// Implementa la mano del jugador con el listener de selección para descartar
function renderHand() {
    const container = document.getElementById("cards");

    container.innerHTML = "";

    hand.forEach((card,index) => {
        const cardElement = document.createElement("div");
        cardElement.className = "card";

        cardElement.innerHTML = `
            <div class="card-inner">
                <div class="card-face front">
                    <p class="value">${card.value}</p>
                    <p class="suit">${card.suit}</p>
                </div>
                <div class="card-face back">
                    Carta a cambiar
                </div>
            </div>
        `;

        cardElement.addEventListener("click", () => {
            if(!firstDraw) return;

            cardElement.classList.toggle("selected");
        });

        container.appendChild(cardElement);
    });
}

// Reparte y muestra la mano del jugador
function dealHand() {
    hand = [];

    for(let i=0;i<5;i++) {
        hand.push(drawCard());
    }

    // Descomentar lo siguiente permite hacer pruebas
    /*
    hand = [
        {value: '5', suit: '♣️'},
        {value: '3', suit: '♦️'},
        {value: '4', suit: '♠️'},
        {value: '2', suit: '♥️'},
        {value: 'A', suit: '♣️'}
    ];
    */

    renderHand();
}

// Traduce el índice de las cartas y las ordena de menor a mayor
function getNumericValues(cards) {
    return cards.map(card => {
        if(card.value === "J") return 11;
        if(card.value === "Q") return 12;
        if(card.value === "K") return 13;
        if(card.value === "A") return 14;
        // El as se considera 1 en la escalera baja de [A,2,3,4,5]
        return parseInt(card.value);
    }).sort((a,b) => a-b);
}

// Analiza qué jugada hay en la mano de cartas
function evaluateHand(cards) {
    const nums = getNumericValues(cards);

    // Conteo de cartas repetidas
    const counts = {};

    // Crea en counts cada valor diferente y el número de veces que aparece
    cards.forEach(card => {
        // En cada valor, se comprueba si ya existía antes o no (caso 0)
        counts[card.value] = (counts[card.value] || 0) + 1;
    });

    /*
        Se olvida del valor, se queda con el número de veces que se repite
        y ordena todo de mayor a menor, de tal modo que un full es "[3, 2]"
    */
    const repetitions = Object.values(counts).sort((a,b) => b-a);

    // Comprobación de color
    const flush = cards.every(
        c => c.suit === cards[0].suit
    );

    // Comprobación de escalera, de entrada se supone que hay una
    let straight = true;
    
    // Se contempla una posible escalera real con [10,J,Q,K,A]
    const highStraight =
        JSON.stringify(nums) === JSON.stringify([10,11,12,13,14]);

    // Se contempla la escalera baja [A,2,3,4,5] donde el as es 1
    const lowStraight =
        JSON.stringify(nums) === JSON.stringify([2,3,4,5,14]);

    // Si no hay esas dos escaleras, se comprueba si hay otra
    if(!highStraight && !lowStraight) {
        for(let i = 1; i < nums.length; i++) {
            if(nums[i] !== nums[i-1] + 1) {
                // Si no son consecutivos, no hay escalera
                straight = false;
                break;
            }
        }    
    }

    if(highStraight && flush)
        return "✅ Escalera real de color";

    if(straight && flush)
        return "✅ Escalera de color";

    if(repetitions[0] === 4)
        return "✅ Póker";

    if(repetitions[0] === 3 && repetitions[1] === 2)
        return "✅ Full";

    if(flush)
        return "✅ Color";

    if(straight)
        return "✅ Escalera";

    if(repetitions[0] === 3)
        return "✅ Trío";

    if(repetitions[0] === 2 && repetitions[1] === 2)
        return "✅ Doble pareja";

    const pairValue = Object.keys(counts).find(k => counts[k] === 2);

    if(pairValue) {
        const highPair = ["J","Q","K","A"].includes(pairValue);

        if(highPair) return "✅ Pareja de jotas o mejor";
    }

    return "❌ Sin premio";
}



//////// Eventos principales de la aplicación ////////
playButton.addEventListener("click", () => {
    if(!firstDraw) {
        createDeck();
        dealHand();

        information.textContent =
        "Pulsa de 0 a 5 cartas que quieras cambiar y confirma la jugada.";
        information.classList.toggle("result");
        playButton.textContent = "Confirmar jugada";
        firstDraw = true;

        return;
    }

    const selectedCards = document.querySelectorAll(".card.selected");

    selectedCards.forEach(element => {
        const index = [...document.querySelectorAll(".card")].indexOf(element);

        hand[index] = drawCard();
    });

    renderHand();

    const result = evaluateHand(hand);

    information.textContent = result;
    information.classList.toggle("result");
    playButton.textContent = "Nueva partida";
    firstDraw = false;
});

document.getElementById("dialogBtn").addEventListener('click', () => {
    dialogInfo.showModal();
});


document.getElementById("closeBtn").addEventListener('click', () => {
    dialogInfo.close();
});



//////// Inicio de la aplicación ////////
createDeck();
dealHand();
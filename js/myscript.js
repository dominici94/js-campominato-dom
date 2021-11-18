// Consegna
// Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco (attenzione: non bisogna copiare tutta la cartella dell'esercizio ma solo l'index.html, e le cartelle js/ css/ con i relativi script e fogli di stile, per evitare problemi con l'inizializzazione di git).
// ****L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range: con difficoltà 1 => tra 1 e 100 con difficoltà 2 => tra 1 e 81 con difficoltà 3 => tra 1 e 49
// Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe. I numeri nella lista delle bombe non possono essere duplicati.
// In seguito l'utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
// Consigli del giorno: :party_wizard: ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi. Ad esempio: Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti. Le validazioni e i controlli possiamo farli anche in un secondo momento.

document.getElementById('play').addEventListener('click', function(){
    play();
});

function play(){
    document.querySelector('.container-square').innerHTML = '';

    const livelloScelto = document.getElementById('level').value;

    let boxNumero;
    let boxRiga;
    const bombeNumero = 16;

    switch(livelloScelto){
        case '1':
            boxNumero = 100;
            break;
        case '2':
            boxNumero = 81;
            break;
        case '3':
            boxNumero = 49;
    }

    const bombe = generaBombe();

    function generaBombe(){
        const arrayBombe = [];

        while(arrayBombe.length < bombeNumero){
            const numeroRandom = getRndInteger(1,boxNumero);
            if(!arrayBombe.includes(numeroRandom)){
                arrayBombe.push(numeroRandom);
            }
        }

        return arrayBombe;
    }

    function getRndInteger(min,max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    boxRiga = Math.sqrt(boxNumero);

    generaCampo();

    function generaCampo(){
        const container = document.querySelector('.container-square');

        for(let i=1; i<= boxNumero; i++){
            const box = creaElemento(i); 

            box.addEventListener('click', function(){
                this.classList.add('color');
            });

            container.appendChild(box);
        }

    }

    function creaElemento(num){
        const cella = document.createElement('div');
        cella.classList.add('box');
        const size = `calc(100% / ${boxRiga})`;
        cella.style.width = size;
        cella.style.height = size;
        cella.innerHTML = num;
        
        return cella;

    }

}
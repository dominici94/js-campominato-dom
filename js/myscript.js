
// In seguito l'utente clicca su ogni cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina, altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle. La partita termina quando il giocatore clicca su una bomba o raggiunge il numero massimo possibile di numeri consentiti. Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito.
// BONUS: Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
// Consigli del giorno: :party_wizard: ****Scriviamo prima cosa vogliamo fare passo passo in italiano, dividiamo il lavoro in micro problemi. Ad esempio: Di cosa ho bisogno per generare i numeri? Proviamo sempre prima con dei console.log() per capire se stiamo ricevendo i dati giusti. Le validazioni e i controlli possiamo farli anche in un secondo momento.

const gioca = document.getElementById('play');
gioca.addEventListener('click', function(){
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
    console.log(bombe);

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
        let count = 0;
        for(let i=1; i<= boxNumero; i++){
            const box = creaElemento(i); 

            box.addEventListener('click', function(){
                if(bombe.includes(i)){
                    this.classList.add('bomba');
                    return alert("Hai calpestato una bomba e hai perso. clicca 'inizia' per giocare ancora. "+ `Hai totalizzato ${count} punti.`), play();
                }else if(!bombe.includes(i)){
                    this.classList.add('safe');
                    count++;
                    console.log(count);
                }
                if(count == (boxNumero - bombeNumero)){
                    return alert("Hai vinto!"), play();
                }
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
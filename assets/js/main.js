const domandeErisposte = [
    {
        domanda: "DOH",
        rispostaCorretta: "Homer",
        personaggi: ["T-Rex", "Superman", "Batman"],
        personaggioCorretto: "Homer"
    },
    {
        domanda: "Tu non puoi passare",
        rispostaCorretta: "Gandalf",
        personaggi: ["Robocop", "V", "Jules"],
        personaggioCorretto: "Gandalf"
    },
    {
        domanda: "Sono tuo padre",
        rispostaCorretta: "Darth-Vader",
        personaggi: ["Gandalf", "Robocop", "T-Rex"],
        personaggioCorretto: "Darth-Vader"
    },
    {
        domanda: "Ascolto tutto, ma tu hai scritto che il mondo non ha bisogno di un salvatore, ma ogni giorno sento la gente gridare per uno.",
        rispostaCorretta: "Superman",
        personaggi: ["Batman", "Homer", "Luffy"],
        personaggioCorretto: "Superman"
    },
    {
        domanda: "Diventerò il re dei pirati",
        rispostaCorretta: "Luffy",
        personaggi: ["Robocop", "Homer", "Jules"],
        personaggioCorretto: "Luffy"
    },
    {
        domanda: "Ricorda per sempre il 5 novembre",
        rispostaCorretta: "V",
        personaggi: ["Gandalf", "Darth-Vader", "Batman"],
        personaggioCorretto: "V"
    },
    {
        domanda: "Wroooooar!",
        rispostaCorretta: "T-Rex",
        personaggi: ["Batman", "Gandalf", "Robocop"],
        personaggioCorretto: "T-Rex"
    },
    {
        domanda: "Ezechiele 25,17: Il sentiero dell'uomo giusto è minacciato da ogni lato dalle malvagità degli egoisti e dalla tirannia degli uomini malvagi.",
        rispostaCorretta: "Jules",
        personaggi: ["Superman", "Gandalf", "V"],
        personaggioCorretto: "Jules"
    },
];

const personaggiElementi = document.querySelectorAll(".card");
let risposteCorrette = 0;
let risposteErrate = 0;
let domandeFatte = [];
const numeroDomandeMassimo = 5;
let domandaCorrente = 0;

// Inizio mostrando una domanda casuale
mostraDomandaCasuale();

function mostraDomandaCasuale() {
    if (domandaCorrente >= numeroDomandeMassimo) {
        mostraValutazione();
        return;
    }

    // Selezione una domanda casuale che non è stata ancora fatta
    let domandaCasuale;
    do {
        const indiceDomandaCasuale = Math.floor(Math.random() * domandeErisposte.length);
        domandaCasuale = { ...domandeErisposte[indiceDomandaCasuale] };
    } while (domandeFatte.includes(domandaCasuale));

    domandeFatte.push(domandaCasuale);

    const rispostaCorretta = domandaCasuale.rispostaCorretta;

    // Mostro la domanda
    document.getElementById("quote").textContent = `"${domandaCasuale.domanda}"`;

    // Mescolo l'ordine dei personaggi (senza duplicati)
    const personaggiMisti = [...domandaCasuale.personaggi, rispostaCorretta];
    personaggiMisti.sort(() => Math.random() - 0.5);

    // Assegno le immagini e abilito le carte
    personaggiElementi.forEach((element, index) => {
        const img = element.querySelector("img");
        img.src = `assets/img/${personaggiMisti[index]}.png`;
        img.alt = personaggiMisti[index];
        element.onclick = () => checkAnswer(element, personaggiMisti[index], rispostaCorretta);
        element.style.backgroundColor = "";
    });

    domandaCorrente++;
    document.getElementById("nextButton").style.display = "none";
}

function checkAnswer(selectedOption, selectedPersonaggio, personaggioCorretto) {
    if (selectedPersonaggio === personaggioCorretto) {
        selectedOption.style.backgroundColor = "green";
        document.getElementById("risultato").innerHTML += `<p>Risposta corretta!</p>`;
        risposteCorrette++;
    } else {
        selectedOption.style.backgroundColor = "red";
        document.getElementById("risultato").innerHTML += `<p>Risposta sbagliata. La risposta corretta è: ${personaggioCorretto}</p>`;
        risposteErrate++;
    }

    // Disabilita le opzioni dopo aver risposto
    personaggiElementi.forEach(element => {
        element.onclick = null;
    });

    // Mostra il pulsante "Domanda successiva"
    if (domandaCorrente < numeroDomandeMassimo) {
        document.getElementById("nextButton").style.display = "block";
    }
}

function mostraValutazione() {
    const risultatoDiv = document.getElementById("risultato");

    // Crea un elemento div per la valutazione
    const valutazioneElement = document.createElement("div");
    valutazioneElement.innerHTML = `<p>Valutazione:</p>`;
    valutazioneElement.innerHTML += `<p>Risposte corrette: ${risposteCorrette}</p>`;
    valutazioneElement.innerHTML += `<p>Risposte errate: ${risposteErrate}</p>`;

    // Aggiungi l'elemento valutazione al risultatoDiv
    risultatoDiv.appendChild(valutazioneElement);

    // Calcola il punteggio totale
    const punteggioTotale = risposteCorrette + risposteErrate;

    // Aggiungi il punteggio totale all'elemento HTML
    const punteggioTotaleElement = document.getElementById("punteggioTotale");
    punteggioTotaleElement.textContent = `Punteggio totale: ${punteggioTotale} su ${numeroDomandeMassimo}`;
}
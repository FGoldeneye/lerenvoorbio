//dit is de objectvorm voor het opslaan van de vragen
 const vragen = [
    {
        vraag: "Welke kleur is insectenbloed?",
        optieA: "lichtgeel",
        optieB: "rood",
        optieC: "lichtblauw",
        optieD: "donker wit",
        goedantwoord: "optieA"
    },

    {
        vraag: "Hoe is het bloed van insecten lichtgeel?",
        optieA: "gele bloedvaten",
        optieB: "geen witte bloedcellen",
        optieC: "geen rode bloedcellen",
        optieD: "geen hemoglobine in bloed",
        goedantwoord: "optieD"
    },

    {
        vraag: "Hoelang zijn de darmen van een potvis?",
        optieA: "10m",
        optieB: "600m",
        optieC: "40m",
        optieD: "500m",
        goedantwoord: "optieB"
    },

    {
        vraag: "Waarom heeft de hengelvis een lamp?",
        optieA: "omdat het donker is onder water",
        optieB: "voor decoratie",
        optieC: "om prooi te lokken",
        optieD: "hij kan niet goed zien",
        goedantwoord: "optieC"
    },

    {
        vraag: "Welke tanden ontbreken bij planteneters?",
        optieA: "voortanden",
        optieB: "knobbelkiezen",
        optieC: "ze hebben geen tanden",
        optieD: "hoektanden",
        goedantwoord: "optieD"
    },

    {
        vraag: "Waardoor is een kat slanker dan een koe?",
        optieA: "de kat beweegt meer",
        optieB: "korter verteringsstelsel",
        optieC: "toevallig",
        optieD: "een koe eet meer",
        goedantwoord: "optieB"
    },

    {
        vraag: "Wat voor soort is een koe?",
        optieA: "planteneter",
        optieB: "diereneter",
        optieC: "alleseter",
        optieD: "graseter",
        goedantwoord: "optieA"
    },

    {
        vraag: "Welke overlevingsstrategie heeft de melkslang?",
        optieA: "camouflage",
        optieB: "mimicry",
        optieC: "dieren aanvallen",
        optieD: "ondergronds blijven",
        goedantwoord: "optieB"
    },

    {
        vraag: "Waar zitten de ademhalingsorganen van de wesp?",
        optieA: "in zijn hoofd",
        optieB: "in zijn stinger",
        optieC: "door zijn hele lichaan",
        optieD: "in zijn poten",
        goedantwoord: "optieC"
    },

    {
        vraag: "Wanneer is je lichaamstemperatuur het hoogst?",
        optieA: "in de ochtend",
        optieB: "in de middag",
        optieC: "in de avond",
        optieD: "in de nacht",
        goedantwoord: "optieB"
    },

    {
        vraag: "Wanneer is je lichaamstemperatuur het laagst?",
        optieA: "in de ochtend",
        optieB: "in de middag",
        optieC: "in de avond",
        optieD: "in de nacht",
        goedantwoord: "optieD"
    }
];


let geschuddevragen = [] //lege array om geschudde geselecteerde vragen uit alle beschikbare vragen te houden

function behandelvragen() { 
    //functie om te shufflen en 10 vragen naar geschuddevragen array te pushen
    //app zou 10 vragen per sessie behandelen
    while (geschuddevragen.length <= 9) {
        const random = vragen[Math.floor(Math.random() * vragen.length)]
        if (!geschuddevragen.includes(random)) {
            geschuddevragen.push(random)
        }
    }
}


let vraagNummer = 1 
let spelerScoor = 0 
let foutPogingen = 0
let indexNumber = 0 

// Functie om de volgende vraag in de array te tonen
function Volgendevraag(index) {
    behandelvragen()
    const huidigvraag = geschuddevragen[index]
    document.getElementById("vraag-nummer").innerHTML = vraagNummer
    document.getElementById("speler-scoor").innerHTML = spelerScoor
    document.getElementById("vraag-weergeven").innerHTML = huidigvraag.vraag;
    document.getElementById("optie-een-label").innerHTML = huidigvraag.optieA;
    document.getElementById("optie-twee-label").innerHTML = huidigvraag.optieB;
    document.getElementById("optie-drie-label").innerHTML = huidigvraag.optieC;
    document.getElementById("optie-vier-label").innerHTML = huidigvraag.optieD;

}


function controleerVoorAntwoord() {
    const huidigvraag = geschuddevragen[indexNumber] //pakt huidige vraag
    const huidigvraagAntwoord = huidigvraag.goedantwoord //pakt huidige antwoord
    const opties = document.getElementsByName("optie"); //pakt alle opties
    let goedantwoord = null

    opties.forEach((optie) => {
        if (optie.value === huidigvraagAntwoord) {
            goedantwoord = optie.labels[0].id
        }
    })

    //controleren of een radio-ingang is gecontroleerd of een optie is gekozen
    if (opties[0].checked === false && opties[1].checked === false && opties[2].checked === false && opties[3].checked == false) {
        document.getElementById('optie-modaal').style.display = "flex"
    }

    //controleren of keuze optie hetzelfde is als antwoord
    opties.forEach((optie) => {
        if (optie.checked === true && optie.value === huidigvraagAntwoord) {
            document.getElementById(goedantwoord).style.backgroundColor = "green"
            spelerScoor++ //toevoegen aan de scoor van de speler
            indexNumber++ //1 toevoegen aan index dus moet volgende vraag weergeven
            //ingesteld om vraagnummer uit te stellen tot wanneer de volgende vraag wordt geladen
            
            timeoutinstellen(() => {
                vraagNummer++
            }, 1000)
        }

        else if (optie.checked && optie.value !== huidigvraagAntwoord) {
            const foutLabelId = optie.labels[0].id
            document.getElementById(foutLabelId).style.backgroundColor = "red"
            document.getElementById(goedantwoord).style.backgroundColor = "green"
            foutPogingen++ //telt 1 op bij foute pogingen
            indexNumber++
            //ingesteld om vraagnummer uit te stellen tot wanneer de volgende vraag wordt geladen
            
            timeoutinstellen(() => {
                vraagNummer++
            }, 1000)
        }
    })
}


//opgeroepen wanneer de volgende knop wordt aangeroepen
function behandelVolgendeVraag() {
    controleerVoorAntwoord() //controleer of de speler de juiste of verkeerde optie heeft gekozen
    oncontroleerRadioKnoppen()
    //vertraagt ​​de weergave van de volgende vraag een seconde, alleen voor sommige effecten, zodat vragen niet op de speler afstormen
    
    timeoutinstellen(() => {
        if (indexNumber <= 9) {
            //geeft volgende vraag weer zolang indexnummer niet groter is dan 9, onthoud dat indexnummer begint bij 0, dus index 9 is vraag 10
            Volgendevraag(indexNumber)
        }
        else {
            behandelEindSpel()//beëindigt het spel als indexgetal groter is dan 9, wat betekent dat we al bij de 10e vraag zijn
        }
        resetoptieAchtergrond()
    }, 1000);
}

//zet opties background terug op null na weergave juiste/verkeerde kleuren
function resetoptieAchtergrond() {
    const opties = document.getElementsByName("optie");
    opties.forEach((optie) => {
        document.getElementById(optie.labels[0].id).style.backgroundColor = ""
    })
}

// alle radio knoppen oncontroleren voor volgende vraag(kan ook worden gedaan met map of voorelk loop)
function oncontroleerRadioKnoppen() {
    const opties = document.getElementsByName("optie");
    for (let i = 0; i < opties.length; i++) {
        opties[i].checked = false;
    }
}

// function for when all vragen being antwoorded
function behandelEindSpel() {
    let opmerking = null
    let opmerkingKleur = null

    // controleer de speler scoor voor commentatie en ook de kleur die erbij hoort
    if (spelerScoor <= 3) {
        opmerking = "Blijf oefenen."
        opmerkingKleur = "red"
    }
    else if (spelerScoor >= 4 && spelerScoor < 8) {
        opmerking = "Scoor kan beter."
        opmerkingKleur = "orange"
    }
    else if (spelerScoor >= 8) {
        opmerking = "Goed gedaan!"
        opmerkingKleur = "green"
    }
    const spelerCijfer = (spelerScoor / 10)

    //gegevens om weer te geven op het scorebord
    document.getElementById('opmerkingen').innerHTML = opmerking
    document.getElementById('opmerkingen').style.color = opmerkingKleur
    document.getElementById('cijfer').innerHTML = spelerCijfer
    document.getElementById('fout-antwoorden').innerHTML = foutPogingen
    document.getElementById('goed-antwoorden').innerHTML = spelerScoor
    document.getElementById('scoor-modaal').style.display = "flex"

}

//sluit scoor modaal, opnieuw spel laten beginnen en herschudt vragen
function sluitscoorModaal() {
    vraagNummer = 1
    spelerScoor = 0
    foutPogingen = 0
    indexNumber = 0
    geschuddevragen = []
    Volgendevraag(indexNumber)
    document.getElementById('scoor-modaal').style.display = "none"
}

//function to sluit warning modaal
function sluitoptieModaal() {
    document.getElementById('optie-modaal').style.display = "none"
}
//dit is de objectvorm voor het opslaan van de vragen
const vragen = [
    {
        vraag: "Welke kleur is insectenbloed?",
        optieA: "lichtgeel",
        optieB: "rood",
        optieC: "lichtblauw",
        optieD: "donker wit",
        goedAntwoord: "optieA"
    },

    {
        vraag: "Hoe is het bloed van insecten lichtgeel?",
        optieA: "gele bloedvaten",
        optieB: "geen witte bloedcellen",
        optieC: "geen rode bloedcellen",
        optieD: "geen hemoglobine in bloed",
        goedAntwoord: "optieD"
    },

    {
        vraag: "Hoelang zijn de darmen van een potvis?",
        optieA: "10m",
        optieB: "600m",
        optieC: "40m",
        optieD: "500m",
        goedAntwoord: "optieB"
    },

    {
        vraag: "Waarom heeft de hengelvis een lamp?",
        optieA: "omdat het donker is onder water",
        optieB: "voor decoratie",
        optieC: "om prooi te lokken",
        optieD: "hij kan niet goed zien",
        goedAntwoord: "optieC"
    },

    {
        vraag: "Welke tanden ontbreken bij planteneters?",
        optieA: "voortanden",
        optieB: "knobbelkiezen",
        optieC: "ze hebben geen tanden",
        optieD: "hoektanden",
        goedAntwoord: "optieD"
    },

    {
        vraag: "Waardoor is een kat slanker dan een koe?",
        optieA: "de kat beweegt meer",
        optieB: "korter verteringsstelsel",
        optieC: "toevallig",
        optieD: "een koe eet meer",
        goedAntwoord: "optieB"
    },

    {
        vraag: "Wat voor soort is een koe?",
        optieA: "planteneter",
        optieB: "diereneter",
        optieC: "alleseter",
        optieD: "graseter",
        goedAntwoord: "optieA"
    },

    {
        vraag: "Welke overlevingsstrategie heeft de melkslang?",
        optieA: "camouflage",
        optieB: "mimicry",
        optieC: "dieren aanvallen",
        optieD: "ondergronds blijven",
        goedAntwoord: "optieB"
    },

    {
        vraag: "Waar zitten de ademhalingsorganen van de wesp?",
        optieA: "in zijn hoofd",
        optieB: "in zijn stinger",
        optieC: "door zijn hele lichaan",
        optieD: "in zijn poten",
        goedAntwoord: "optieC"
    },

    {
        vraag: "Wanneer is je lichaamstemperatuur het hoogst?",
        optieA: "in de ochtend",
        optieB: "in de middag",
        optieC: "in de avond",
        optieD: "in de nacht",
        goedAntwoord: "optieB"
    },

    {
        vraag: "Wanneer is je lichaamstemperatuur het laagst?",
        optieA: "in de ochtend",
        optieB: "in de middag",
        optieC: "in de avond",
        optieD: "in de nacht",
        goedAntwoord: "optieD"
    }
];


let geschuddeVragen = [] //lege array om geschudde geselecteerde vragen uit alle beschikbare vragen te houden

function behandelVragen() {
    //functie om te shufflen en 10 vragen naar geschuddeVragen array te pushen
    //app zou 10 vragen per sessie behandelen
    for (let i = 0; i < 10; i++) {
        const random = vragen[Math.floor(Math.random() * vragen.length)];
        if (!geschuddeVragen.includes(random)) {
            geschuddeVragen.push(random);
        }
    }
}

function timeoutInstellen(callback, delay) {
    setTimeout(callback, delay);
}  


let vraagNummer = 1 
let spelerScoor = 0 
let fouten = 0
let indexNummer = 0 

// Functie om de volgende vraag in de array te tonen
function VolgendeVraag(index) {
    behandelVragen()
    const huidigVraag = geschuddeVragen[index]
    document.getElementById("vraag-nummer").innerHTML = vraagNummer
    document.getElementById("speler-scoor").innerHTML = spelerScoor
    document.getElementById("vraag-weergeven").innerHTML = huidigVraag.vraag;
    document.getElementById("optie-een-label").innerHTML = huidigVraag.optieA;
    document.getElementById("optie-twee-label").innerHTML = huidigVraag.optieB;
    document.getElementById("optie-drie-label").innerHTML = huidigVraag.optieC;
    document.getElementById("optie-vier-label").innerHTML = huidigVraag.optieD;

}


function controleerVoorAntwoord() {
    const huidigVraag = geschuddeVragen[indexNummer];
    const huidigVraagAntwoord = huidigVraag.goedAntwoord;
    const opties = document.getElementsByName("optie");
    let goedAntwoord = null;

    opties.forEach((optie) => {
        if (optie.value === huidigVraagAntwoord) {
            goedAntwoord = optie.labels[0].id;
        }
    });

    if (opties[0].checked === false && opties[1].checked === false && opties[2].checked === false && opties[3].checked == false) {
        document.getElementById('optie-modaal').style.display = "flex";
    }

    opties.forEach((optie) => {
        if (optie.checked === true && optie.value === huidigVraagAntwoord) {
            document.getElementById(goedAntwoord).style.backgroundColor = "green";
            spelerScoor++;
            indexNummer++;
            timeoutInstellen(() => {
                vraagNummer++;
            }, 1000);
        } else if (optie.checked && optie.value !== huidigVraagAntwoord) {
            const foutLabelId = optie.labels[0].id;
            document.getElementById(foutLabelId).style.backgroundColor = "red";
            document.getElementById(goedAntwoord).style.backgroundColor = "green";
            fouten++;
            indexNummer++;
            timeoutInstellen(() => {
                vraagNummer++;
            }, 1000);
        }
    });
}



//opgeroepen wanneer de volgende knop wordt aangeroepen
function behandelVolgendeVraag() {
    controleerVoorAntwoord() //controleer of de speler de juiste of verkeerde optie heeft gekozen
    onControleerRadioKnoppen()
    //vertraagt ​​de weergave van de volgende vraag een seconde, alleen voor sommige effecten, zodat vragen niet op de speler afstormen
    
    timeoutInstellen(() => {
        if (indexNummer <= 9) {
            //geeft volgende vraag weer zolang indexnummer niet groter is dan 9, onthoud dat indexnummer begint bij 0, dus index 9 is vraag 10
            VolgendeVraag(indexNummer)
        }
        else {
            behandelEindSpel()//beëindigt het spel als indexgetal groter is dan 9, wat betekent dat we al bij de 10e vraag zijn
        }
        resetOptieAchtergrond()
    }, 1000);
}

//zet opties background terug op null na weergave juiste/verkeerde kleuren
function resetOptieAchtergrond() {
    const opties = document.getElementsByName("optie");
    opties.forEach((optie) => {
        document.getElementById(optie.labels[0].id).style.backgroundColor = ""
    })
}

// alle radio knoppen oncontroleren voor volgende vraag(kan ook worden gedaan met map of voorelk loop)
function onControleerRadioKnoppen() {
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

    //gegevens om weer te geven op het scorebord
    document.getElementById('opmerkingen').innerHTML = opmerking
    document.getElementById('opmerkingen').style.color = opmerkingKleur
    document.getElementById('cijfer').innerHTML = spelerScoor
    document.getElementById('fout-antwoorden').innerHTML = fouten
    document.getElementById('scoor-modaal').style.display = "flex"

}

//sluit scoor modaal, opnieuw spel laten beginnen en herschudt vragen
function sluitScoorModaal() {
    vraagNummer = 1
    spelerScoor = 0
    fouten = 0
    indexNummer = 0
    geschuddeVragen = []
    VolgendeVraag(indexNummer)
    document.getElementById('scoor-modaal').style.display = "none"
}

//function to sluit warning modaal
function sluitOptieModaal() {
    document.getElementById('optie-modaal').style.display = "none"
}
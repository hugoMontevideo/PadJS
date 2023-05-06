const playPad = document.getElementById('pad-button');
const closeModal = document.getElementById('modalclose');
const replayModal = document.getElementById('modalreplay');
const divInfo = document.getElementById("divInfo");
const tableScore = document.getElementById("tableScore");
const divBonus = document.getElementById("divBonus");

// arrays gagnants
const mainArray = [0,1,2,3,4,5,6,7,8];
const bonusArrayMirror = [0,1,2];
const bonusArrayMirrorI = [0,1,2,3,4,5,];

// arrays temporaires
let bonusArray= [];
let bonusArrayI = [];

// mouvements possibles
const ArrayPlusThree = [0,1,2,3,4,5];
const ArrayMinusThree = [3,4,5,6,7,8];
const ArrayPlusOne = [0,1,3,4,6,7];
const ArrayMinusOne = [1,2,4,5,7,8];

// disposition jetons dans le jeu                                      
let currentArray = [0,1,2,3,4,5,6,7];

const mainUl = document.getElementById("table");

let invisible = 4;
let iTry = 0; // nombre d'essais et premiere visite
//variables de points 
let iScore = 0;
let iBonus;
let iBonusPlus = 50;
//variables booleennes
let arrayBool = false;
let arrayBoolI = false;
let startBool = false;
let winBool = false;

/** FONCTIONS */

function start()
{
document.querySelector(".modal-container").classList.remove("none");
document.getElementById((4).toString()).classList.add('invisible');
// z-index de la galerie à 0 pour eliminer bugs on hover
document.getElementById("galerie").style.zIndex = 0;
invisible = 4;
tableScore.textContent =  `${iScore} pts`;

 // ajoute dynamiquement la stylesheet
if (iTry == 0) {
    let link = document.createElement('link');
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "css/pad.css";   
    document.head.appendChild(link);
}
//initialiser le jeu. 
shuffleArray(currentArray);

// initialisation du jeu
document.getElementById("0").textContent = currentArray[0] + 1;
document.getElementById("1").textContent = currentArray[1] + 1;
document.getElementById("2").textContent = currentArray[2] + 1;

document.getElementById("3").textContent = currentArray[3] + 1;
document.getElementById("4").textContent = 9;
document.getElementById("5").textContent = currentArray[4] + 1;

document.getElementById("6").textContent = currentArray[5] + 1;
document.getElementById("7").textContent = currentArray[6] + 1;
document.getElementById("8").textContent = currentArray[7] + 1;

currentArray.splice(4, 0, 8);

divBonus.textContent = `+ ${iBonusPlus} pts`;
divBonus.classList.remove("none");
divBonus.classList.add("div-bonusplus");
setTimeout(divTimer,1000, divBonus, "div-bonusplus");
setTimeout(classTimer,1000, divBonus,"none");
iScore += iBonusPlus;
startBool = true;

tableScore.textContent =  `${iScore} pts`;

}

/**
* ferme la fenetre de jeu
* @returns {void}
*/
function closePad()
{
// effacer le nombre 8 du tableau
for(let i=0; i<currentArray.length; i++){
    if ( currentArray[i] == 8){
        currentArray.splice(i,1);
        //console.log(currentArray);
        document.getElementById((i).toString()).classList.remove('invisible');
        document.getElementById((4).toString()).classList.add('invisible');
        divInfo.textContent = "" ;
        document.querySelector(".modal-container").classList.add("none");
        document.getElementById("galerie").style.zIndex = 1;
        //win = false;
        iTry=0;
        break;
    }
}

}

function replayPad(){
console.log(compareArrays(mainArray, currentArray) == true);
if(compareArrays(mainArray, currentArray) == true){
    iBonusPlus = 50;
}else if( iTry > 11){
    iBonusPlus = 10;
}

closePad();
arrayBool = false;
arrayBoolI = false;
winBool = false;
start();
divInfo.textContent =  `Bonne chance !`;
divInfo.className = "tries";

}

function controlPossibilities(id){
let currentPossibilities = [];

if( ArrayPlusThree.includes(id)){
    currentId = id + 3;
    currentPossibilities.push(currentId);
}
if( ArrayMinusThree.includes(id)){
    currentId = id - 3;
    currentPossibilities.push(currentId);

}
if(ArrayPlusOne.includes(id)){
    currentId = id + 1;
    currentPossibilities.push(currentId);

    
}
if(ArrayMinusOne.includes(id)){
    currentId = id - 1;
    currentPossibilities.push(currentId);
}

return currentPossibilities;

}
/** 
* @param {*} mainArray 
* @param {*} currentArray 
* @returns {bool} 
*/
const compareArrays = (mainArray, currentArray) => {
return mainArray.toString() === currentArray.toString();
};
/**
* @param {*} array1 
* array qu'on doit former 
* @param {*} array2 
* on le forme a partir d'array2
* @param {*} array3 
* ça va nous servir a comparer a array3
* @returns {array1}
*/
const arrayGenerator = (array1, array2, array3)=>{
array1 = [];
for(let i=0; i<array3.length; i++){
    array1.push(array2[i]);
 }
 return array1;
}


function shuffleArray(currentArray){
currentArray.sort(()=> Math.random() - 0.5);
}
//agrandir la div en utilisant une classe
function divTimer(elt, removeClass){
elt.classList.remove(removeClass);
}
function classTimer(elt, addClass){
elt.classList.add(addClass);
}


// ******* CODE ********
// *********************

playPad.addEventListener("click",start);

mainUl.addEventListener("click", function(e){ 

if(winBool == false){
        
    //nombre de coups
    iTry ++;
    iScore --;
    if(iTry > 119){
        divInfo.textContent =  `Vous avez perdu en ${iTry} coups !`;
        divInfo.classList.add("lost");
        divInfo.classList.add("big-div");
        setTimeout(divTimer,1500, divInfo, "big-div");
        // perdu mais winBool = true :)
        winBool = true;
        
        tableScore.textContent =  `${iScore} pts`; 
    }else{
        
        divInfo.textContent = `${iTry}  coups` ;
        //tableScore.textContent =  `${iScore} pts`;

        // si on a cliqué sur un button valide :
        if(mainArray.includes(parseInt (e.target.id))){
            //console.log(e.target.id);
            // retout tableau possibilités de mouvemnt du clic
            currentPossibilities = controlPossibilities(parseInt(e.target.id));
            //console.log(currentPossibilities);
            //console.log(invisible);
            if(currentPossibilities.includes(parseInt(invisible))){
                document.querySelector('.invisible').textContent = e.target.textContent;
                //mettre à jour currentArray
                currentArray[parseInt(document.querySelector('.invisible').id)] = parseInt(e.target.textContent)-1 ;
                                
                document.querySelector('.invisible').classList.remove('invisible');
                e.target.classList.add('invisible');
                e.target.textContent = 9;
                //mettre à jour currentArray
                currentArray[e.target.id] = 8 ;

                invisible = e.target.id;
                //console.log(arrayBool);
                if( arrayBool == false){ 
                    bonusArray = arrayGenerator(bonusArray, currentArray, bonusArrayMirror);
                    if(compareArrays(bonusArrayMirror, bonusArray) == true){
                        iBonus = 20;
                        divBonus.textContent = `+ ${iBonus} pts !`;
                        divBonus.classList.remove("none");
                        divBonus.classList.add("div-bonus");
                        setTimeout(divTimer,1000, divBonus, "div-bonus");
                        setTimeout(classTimer,1000, divBonus,"none");
                        iScore +=iBonus;
                        arrayBool = true;
                    }
                }else if( arrayBoolI == false){ 
                    bonusArray = arrayGenerator(bonusArray, currentArray, bonusArrayMirrorI);
                    if(compareArrays(bonusArrayMirrorI, bonusArray) == true){
                        iBonus = 30;
                        divBonus.textContent = `+ ${iBonus} pts !`;
                        divBonus.classList.remove("none");
                        divBonus.classList.add("div-bonus");
                        setTimeout(divTimer,1000, divBonus, "div-bonus");
                        setTimeout(classTimer,1000, divBonus,"none");
                        iScore +=iBonus;
                        arrayBoolI = true;
                    }
                } 
                tableScore.textContent =  `${iScore} pts`;
                
            }
        }
        if(compareArrays(mainArray, currentArray) == true){
            divInfo.textContent =  `Vous avez trouvé en ${iTry} coups !`;
            divInfo.classList.add("win");
            divInfo.classList.add("big-div");
            setTimeout(divTimer,1500, divInfo, "big-div");
            
            iBonusPlus = 50;
            divBonus.textContent = `+ ${iBonusPlus} pts`;
            divBonus.classList.remove("none");
            divBonus.classList.add("div-bonusplus");
            setTimeout(divTimer,1000, divBonus, "div-bonusplus");
            setTimeout(classTimer,1000, divBonus,"none");
            iScore += iBonusPlus;
            console.log(iScore);
            winBool = true;
            
            tableScore.textContent =  `${iScore} pts`;
        }
    }
}
});

// Revenir sur le site    
closeModal.addEventListener("click", closePad);
replayModal.addEventListener("click", replayPad);


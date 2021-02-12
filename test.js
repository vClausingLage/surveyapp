let ergebnisse = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
let frLength = ergebnisse[0].length;
let optLength = ergebnisse.length;
let antworten = [];
let list = [];

function count (nF, nO, arr) {
    for(let j = 0; j < nF; j++) {
        for(let i = 0; i < nO; i++){
            antworten = [...antworten, arr[i][j]];
        }
    }
    while(antworten.length>0){
        list = [...list, antworten.splice(0,3)]
    }
    console.log('fertig: ', list)
}

count(frLength, optLength, ergebnisse)
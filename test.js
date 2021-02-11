let ergebnisse = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
let frLength = ergebnisse[0].length;
let optLength = ergebnisse.length;

let antworten = [];



function count (nF, nO, arr) {
    for(let j = 0; j < nF; j++) {
        for(let i = 0; i < nO; i++){
            console.log(arr[i][j])
        }
        console.log('hello')
    }
}

count(frLength, optLength, ergebnisse)
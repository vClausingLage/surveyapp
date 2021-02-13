const arr = [[100,200],[10,20],[1,2],[3,4]]

let sum = []
let zaehler = 0

let n = 2
let m = 4

for (let k = 0; k < n; k++) {       
    for (let l = 0; l < m; l++) {
    zaehler += arr[l][k]
    console.log(zaehler)
  }
  console.log(zaehler)
  
  sum = [...sum, zaehler]
  zaehler = 0
  }

  console.log(sum)
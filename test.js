function pageCount(n, p) {
    // Write your code here
        let fromStart = Math.floor((p) / 2);
        let fromEnd = ((n % 2 === 0) && n !==p  ? 1:  0);
        let i = 1;
        while ( (p + 2* i) <= n){
            fromEnd += 1;
            i++;
        }

        if(fromStart < fromEnd){
            return fromStart
        }
        return fromEnd
}

let res = pageCount(6, 4 )
console.log(res);
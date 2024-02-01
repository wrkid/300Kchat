const f = (s) => {
  const arr = s.split(',');
  let res = '';
  let i = 0;
  let l = arr.length;
  while(i < l) { 
    console.log(arr[i])
    let n = i;
    if (arr[i] + 1 !== arr[i+1]) {
      res += arr[i];
      i++;
    } else {
      while (arr[n] + 1 === arr[n+1]) {
        n++;
      }
      res += `,${arr[i]} - ${arr[n+1]}`;
      i += n;
    }
  }
  return res;
}

console.log(f('1,2,4,6,7,8,10'))

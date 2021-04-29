'use strict';

function sortStart () {
  var input  = document.getElementById('sortInput'),
      output = document.getElementById('sortResult'),
      arr = input.value.split(',');

  output.innerHTML = '小さい順に並びかえると[' + mergeSort(arr) + ']だよ。';
}

function mergeSort (arr) {
  var len = arr.length;

  //リストの長さが1以下なら、ソートされているとみなしてそのまま返す
  if (len <= 1) {
    return arr;

  //そうでなければ、リストを半分にして再帰
  } else {
    return merge(mergeSort(arr.slice(0, Math.floor(len/2))),
                 mergeSort(arr.slice(Math.floor(len/2), len)));
  }
}

//既にそれぞれがソートされている配列をソートしながらくっつける
function merge (arr1, arr2) {
  var arr = new Array,
      i = 0,
      j = 0,
      k = 0;

 while (!(i == arr1.length && j == arr2.length)) {
   //どちらかのリストがもう空なら、まだ残ってる方を使う
   if (i == arr1.length) {
     arr[k] = arr2[j];
     j++;
   } else if (j == arr2.length) {
     arr[k] = arr1[i];
     i++
   //いずれのリストも空でなければ、まだくっつけてない中で小さいほうを選ぶ
   } else {
     if (Number(arr1[i]) <= Number(arr2[j])) { //Number()を使わないと文字列として比較するようで妙な並びになる
       arr[k] = arr1[i];
       i++;
     } else {
       arr[k] = arr2[j];
       j++;
     }
   }

   k++;
 }
  return arr;
}

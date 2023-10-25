function anagrams(str1, str2) {
    let str1set = new Set(str1.split(''))
    let str2split = str2.split('');

    for (const char of str2split){
      if(!str1set.has(char)) return false;
    }

    return true;
}


function commonElements(arr1, arr2) {
  let commons = new Array();
  const set1 = new Set(arr1);

  arr2.forEach((element) => {
    if (set1.has(element)) commons.push(element);
  })
  return commons;
}


function duplicate(arr) {
  let set = new Set();
  for (const ele of arr) {
    if (!set.has(ele)) set.add(ele);
    else return ele;
  }
}


function twoSum(nums, target) {
  let set = new Set(nums);
  let difference = 0;

  for (const num of nums) {
    difference = target - num;
    if (difference === num) continue;
    else if (set.has(difference)) return true;
  }
  return false;
}


function wordPattern(pattern, strings) {
  let hash = new Object();

  for (let i = 0; i < pattern.length; i++) {

    if (!hash[pattern[i]] && !hash[strings[i]]) {
      hash[pattern[i]] = strings[i];
      hash[strings[i]] = pattern[i];
    } else if (hash[pattern[i]] !== strings[i]) return false;

  }
  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];

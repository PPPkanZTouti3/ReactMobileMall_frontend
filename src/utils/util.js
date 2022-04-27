export const baseUrl = "http://localhost:5000"

//数组去重
export const unique = (array)=>{
    var n = []; //一个新的临时数组 
    //遍历当前数组 
    for (var i = 0; i < array.length; i++) {
      //如果当前数组的第i已经保存进了临时数组，那么跳过， 
      //否则把当前项push到临时数组里面 
      if (n.indexOf(array[i]) === -1) n.push(array[i]);
    }
    return n; 
}
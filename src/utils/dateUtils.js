const dateUtils = (h = 0, m = 0, s = 0) => {
    var date = new Date();
    date.setHours(date.getHours() + h)
    date.setMinutes(date.getMinutes() + m)
    date.setSeconds(date.getSeconds() + s)
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var Hours = date.getHours();
    var Minutes = date.getMinutes();
    var Seconds = date.getSeconds();
    if (month < 10) {
          month = "0" + month;
    }
    if (day < 10) {
          day = "0" + day;
    }
    if(Hours < 10) {
          Hours = '0' + Hours;
    }
    if(Minutes < 10) {
          Minutes = '0' + Minutes;
    }
    if(Seconds < 10) {
          Seconds = '0' + Seconds;
    }
    
    const time = year + '-' + month + '-' + day + ' ' + Hours + ':' + Minutes + ':' + Seconds;
    return time
}

export default dateUtils;
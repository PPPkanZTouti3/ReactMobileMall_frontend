const countdownUtils = (str) => setInterval(() => {
    let nowtime = new Date(),  //获取当前时间
        endtime = new Date(str);  //定义结束时间
    let lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
        leftm = Math.floor(lefttime/(1000*60)%60),  //计算分钟数
        lefts = Math.floor(lefttime/1000%60);  //计算秒数
        console.log(leftm + ":" + lefts)
    return leftm + ":" + lefts;  //返回倒计时的字符串
}, 1000)

export default countdownUtils;
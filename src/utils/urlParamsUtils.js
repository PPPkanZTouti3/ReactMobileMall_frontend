// 获取url中的参数
const urlParamsUtils = (key) => {
    const reg = new RegExp("(^|[&,?])" + key + "=([^&]*)(&|$)");
    const res = window.location.search.substr(1).match(reg);
    return res;
}

export default urlParamsUtils;
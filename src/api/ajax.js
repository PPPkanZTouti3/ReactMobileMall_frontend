// 封装axios库
import axios from 'axios'
// import {message} from 'antd'

export default function ajax(url, data = {}, method = 'GET') {
    return new Promise((resolve, reject) => {
        let promise;
        if (method === 'GET') {
            promise = axios.get(url, {
                params: data
            });
        } else if (method === 'POST') {
            promise = axios.post(
                url,
                data,
            );
        }

        promise.then(res => {
            resolve(res.data)
        }).catch(err => {
            alert(err.message)
        })
    })
}
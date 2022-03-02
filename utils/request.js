import config from './config'
export default  (url, data={}, method='GET') => {
    return new Promise((resolve, reject) => {
        // 1. new Promise初始化promise实例的状态为pending
        wx.request({
            url: config.host + url,
            data,
            method,
            header: {
            },
            success: (res) => {
                console.log(res);
                resolve(res.data); // resolve修改promise的状态为成功状态resolved
                console.log("已成功返回")
            },
            fail: (err) => {
                // console.log('请求失败: ', err);
                reject(err); // reject修改promise的状态为失败状态 rejected
                console.log("失败了")
            }
        })
    })

}
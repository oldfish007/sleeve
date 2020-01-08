import {config} from "../config/config";
import {promisic} from "./util";

class Http{
    static async request({
                          url,
                          data,
                          method='GET'
                         }){
       //如此改造就把一个不支持promise的api变成一个支持promise的api
       const res =  await promisic(wx.request)({
            url:`${config.apiBaseUrl}${url}`,
            data,
            method,
            header:{
                appkey:config.appkey
            },
            //传递进来的是一个callback函数
            //返回回来的数据得返回给callback  response返回出去
            //这是一个异步的调用方式
           /* success(res) {
                callback(res.data)//回调业务层的callback
            }*/
        })
           return res.data
    }
}
export {
    Http
}
// promisic(wx.getStorage)() 加了个括号就可以调用了
// promisic(wx.request)
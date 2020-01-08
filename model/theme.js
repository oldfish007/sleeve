//业务对象
//theme、banner、spu商品、SKU 单品、address、user
//注意不要把请求写在页面逻辑里面，页面home.js是很薄的一层
//去掉无效import ctrl+alt+o
import {Http} from "../utils/http";

class Theme{

    static locationA='t-1';
    static locationE='t-2';
    static locationF='t-3';
    static locationH='t-4';

    themes=[]
//定义成static 扩展性不够
//static只能保存数据因为只有一份，不能保存状态
//获取一组专题
//GET /v1/theme/by/names?names=t-1,t-2 HTTP/1.1
    async getThemes(){
        const names=`${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        //保存服务器返回的所有专题数据
        this.themes =  await Http.request({
            url:`theme/by/names`,
            data:{
                names
            }
        })
    }


     async getHomeLocationA() {
         return this.themes.find(t => t.name === Theme.locationA)

            /*callback:data=>{
                //这里需要主动接收回调函数作为参数
                callback(data)//这个里面在调用一次callback然后把data传送回去
            }*/
        }
        /*wx.request({
            //url:'http://se.7yue.pro/v1/theme/by/names',
            url:`${config.apiBaseUrl}theme/by/names`,
            method:'GET',
            data:{
                names:'t-1'
            },
            header:{
                appkey:config.appkey
            },
            success:res=>{
                //在页面page里面才可以setData 模型里面不行
                callback(res.data)
                /!*this.setData({
                    topTheme:res.data[0]
                })*!/
            }
        })*/


     async getHomeLocationE(){
         return this.themes.find(t => t.name === Theme.locationE)

     }
     //热卖榜单数据，板块可以看成是banner
    async getHomeLocationF(){
        return this.themes.find(t => t.name === Theme.locationF)

    }
    getHomeLocationH(){
        return this.themes.find(t => t.name === Theme.locationH)

    }
     static  getHomeLocationESpu(){
         return Theme.getThemeSpuByName(Theme.locationE)
     }
//Http.request返回就是一个promise对象 因为方法没有必要在写返回类型async
     static  getThemeSpuByName(name){
         return  Http.request({
             url:`theme/name/${name}/with_spu`
         })
     }

}

export {
    Theme
}
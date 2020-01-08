/*
根据name获取Banner
/v1/banner/name/{name}
可选Banner的name
b-1,b-2 共两个
*/
import {Http} from "../utils/http";

class Banner{

    static locationB='b-1'
    static locationG='b-2'
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }
   //去取特效榜单的数据
    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }

}
export {
    Banner
}

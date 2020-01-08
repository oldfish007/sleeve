/**
 * @author 郑新海
 * @date 2020-01-08
 * @Description: 商品详情业务对象
*/
import {Http} from "../utils/http";

class Spu{
     static getDetail(id){

         return Http.request({
             url:`spu/id/${id}/detail`
         })
     }
 }
 export {
    Spu
 }

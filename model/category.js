/**
 *获取六宫格数据
 */

import {Http} from "../utils/http";

class Category{

    static async getHomeLocationC(){
        return await Http.request({
            url:`category/grid/all`
        })
    }
}
export {
    Category
}
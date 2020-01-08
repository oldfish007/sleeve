/**
 * @author 郑新海
 * @date 2020-01-06
 * @Description:
*/
import {Paging} from "../utils/Paging";

class SpuPaging{
    static  getLatestPaging(){
        return new Paging({
            url:`spu/latest`
        },5)
    }
}

export {
    SpuPaging
}
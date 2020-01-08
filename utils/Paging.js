/**
 * @author 郑新海
 * @date 2020-01-02
 * @Description:
*/
import {Http} from "./http";

class Paging{
    //开始第N条数据
    start
    //总条数
    count
    //请求对象
    req
    //锁变量
    locker=false
    //每次请求的url都要重新赋值
    url
    //是否还有数据
    moreData = true
    //把每一次的分页结果都存到这个数组里面去
    //0-20 逻辑第二页(移动端没有页数概念) 21-40 显示需要从0-40 全部显示
    //而不是像PC第一样就翻过去了
    accumulator = []

    constructor(req,count = 10, start = 0) {
        this.req = req
        this.count=count
        this.start = start
        this.url = req.url
    }

    async getMoreData(){
      //注意如果没有更多数据了 后面的请求就不用在发送了
      //return page<totalNum-1   如果当前页>总页数-1
        if(!this.moreData){
            return
        }
        //如果没有拿到锁子，说明没有释放直接返回
        //this._getlocker()返回false表示this.locker=true 有锁是不能请求的
        if(!this._getLocker()){
            return
        }
        //说明拿到锁了，直接请求 返回数据
        const data = await this._actualGetData()
        //用完了释放锁
        this.__releaseLocker()
        return data
    }
//请求数据
    async _actualGetData(){
        const req = this._getCurrentReq()
        let paging= await Http.request(req)
        //请求返回的数据是null
        if(!paging){
            return null
        }
        //返回没有数据
        if(paging.total === 0 ){
            return{
                empty:true,
                items:[],
                moreData:false,
                accumulator:[]
            }
        }
        //如果当前页<total_page-1
        this.moreData = Paging._moreData(paging.total_page,paging.page)
        if(this.moreData){
            //如果不是最后一页还有数据
            this.start+=this.count
        }
        //把每次请求的数据连接到数组后面
        this._accumulator(paging.items)
        return {
            empty:false,
            items: paging.items,
            moreData:this.moreData,
            accumulator:this.accumulator
        }
    }
 //每页的数据连接到总数组accumulator[]中
    _accumulator(items){
        this.accumulator = this.accumulator.concat(items)
    }

//只要当前页小于总页数就还有数据
    static _moreData(totalPage,pageNum){
        return pageNum < totalPage-1;//当前页小于总页数
    }
    //拼装当前请求
    _getCurrentReq(){
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if(url.includes('?')){
            url+='&'+params
        }
        else{
            url+='?'+params
        }
        this.req.url = url//重新赋值
        return this.req
    }
    _getLocker(){
        //如果this.locker=true有锁就给返回false 不能请求 锁子还没有释放
        if(this.locker){
            return false
        }
        //若果没有锁 就给加个锁
        this.locker=true
        return true
    }
    //释放锁
    __releaseLocker(){
        this.locker = false
    }

}

export {
    Paging
}
// pages/home/home.js
/**
 * home.js主要是用于页面加载数据
 * 用于前端页面的数据加载脚本
 *
 */


import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    themeA:null,
    bannerB:null,
    themeE:null,
    themeF:null,
    grid:[],
    activityD:null,
    spuPaging:null,
    loadingType:'loading'

  },
//修改成es6的语法
  async onLoad (options) {
    this.initAllData()
    this.initBottomSpuList()
  },
//初始化底部的瀑布流商品列表
  async initBottomSpuList(){
     const paging =  SpuPaging.getLatestPaging()
     this.data.spuPaging = paging
     const data = await paging.getMoreData()
     if(!data){
       return
     }
     wx.lin.renderWaterFlow(data.items)
  },
//初始化数据全部写在这个方法里面
    async initAllData() {
    // const themeA = await Theme.getHomeLocationA()
    // const themes = await Theme.getThemes()
    //拿到数组以后遍历数组，匹配name=t-1
    //将之前的static方法改造为了使用对象调用方法
      const theme = new Theme()
      await theme.getThemes()
    //注意一个规律 永远要保证调用方式简单的 下面的内容放在业务对象
      //const themeA =  themes.find(t=>t.name=='t-1')要做到前端不写任何逻辑上的code
      //const themeE = themes.find(t=>t.name=='t-2')
      const  themeA = await theme.getHomeLocationA()
      const  themeE = await theme.getHomeLocationE()
      const  themeF = await theme.getHomeLocationF()
      const  themeH = theme.getHomeLocationH()
      let themeESpu=[]
      if(themeE.online){
        const data = await Theme.getHomeLocationESpu()
        if(data){
          themeESpu = data.spu_list.slice(0,8);
        }
      }
      const bannerB = await Banner.getHomeLocationB()
      const bannerG = await Banner.getHomeLocationG()
      const grid = await Category.getHomeLocationC()
      const activityD = await Activity.getHomeLocationD()
      this.setData({
        themeA,
        bannerB,
        activityD,
        themeE,
        themeESpu,
        themeF,
        bannerG,
        themeH,
        grid
      })
    },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    const  data = await this.data.spuPaging.getMoreData()
    if(!data){
        return
    }
    wx.lin.renderWaterFlow(data.items)
    //当没有更多数据的时候pageNum>totalPage-1
    if(!data.moreData){
        this.setData({
          loadingType:'end'
        })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
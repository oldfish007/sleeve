// components/hot-list/index.js
Component({
  /**
   * 组件的属性列表
   * 从b-2的接口里面拿数据
   */
  properties: {
    banner:Object
  },
  /*
  使用监听器
   return this.themes.find(t => t.name === Theme.locationA)=
   */
  observers:{
    'banner':function (banner) {
      if(!banner){
        return
      }
      //GET /v1/banner/name/b-2
      if(banner.items.length === 0){
        return
      }
      const left = banner.items.find(i=>i.name==='left')
      const rightTop = banner.items.find(i=>i.name==='right-top')
      const rightBottom = banner.items.find(i=>i.name==='right-bottom')
      this.setData({
        left,
        rightTop,
        rightBottom
      })
    }
  } ,



  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

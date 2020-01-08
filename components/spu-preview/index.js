// components/spu-preview/index.js
Component({
  /**
   * 组件的属性列表
   * 用于接收瀑布流组件传给我们的数据
   */
  properties: {
    data:Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    tags:Array
  },
  observers:{
    data:function (data) {
     //判断data是否为null
      if(!data){
        return
      }
      if(!data.tags){
        return
      }
      //以$切分返回标签数组
      const tags = data.tags.split('$')
      this.setData({
         tags
      })
    }

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImgLoad(event){
       const {width,height} = event.detail
      //console.log(width,height)
      //width,height
      //340,h 计算h  width/height=340/h  h = 340*height/width
      //需要动态的绑定数据
      this.setData({
        w:340,
        h:340*height/width
      })
    },
    onItemTap(event){
      console.log(event)
      const pid = event.currentTarget.dataset.pid
      //跳转
      wx.navigateTo({
        url:`/pages/detail/detail?pid=${pid}`
      })
    }
  }
})

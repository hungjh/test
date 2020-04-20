// pages/xinxi/xinxi.js
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    focus: false,
    inputValue: ''
    },
    bindKeyInput: function (e) {
      this.setData({
        inputValue: e.detail.value
      })
      db.collection('personaljabc').add({
                   data:{
                     name:inputValue.name,
                     collage:inputValue.collage,
                     getter:inputValue.getter,
                     objee:inputValue.objee,
                     xuehao:inputValue.xuehao
                   } 
                  }).then(res => {
                    console.log(res)
                  })
                    .catch(console.error)
                },
        
    
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){

    },
  //  async function(options) {
  //    app.globalData.openid = app.globalData.openid || (await wx.cloud.callFunction({
  //      name: 'login'
  //    })).result.OPENID
  //    console.log("openid", app.globalData.openid)
    
  //},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getpersonalinfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  async getpersonalinfo(){
    var idopen 
    const db = wx.cloud.database()
     await await  wx.cloud.callFunction({
      //调用的函数名字
      name: 'getopenid',
      success: function (result) {
        idopen = result.result.openid
        console.log("idopen", idopen)
      },
      fail: console.error
    })
    
    const result = await db.collection('personaljabc').where(
      {_openid:idopen}
    ).get()
      const data =result.data || []
      console.log("personalinfo","--"+data+"--"+idopen)
      this.setData({
      personalinfo:data
      })
      
  },
 // async  addpersoninfo(){
  //  const db = wx.cloud.database()
  //   db.collection('personaljabc').add({
  //    openid :this.data.openid
  //  }).then(res => {
  //    console.log(res)
  //  })
  //    .catch(console.error)
 // }
    
})

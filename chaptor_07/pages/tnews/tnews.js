// pages/xinxi/xinxi.js
const app = getApp()

Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    personalinfo:1

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(){
       this.getznews()
       console.log("shuju", this.getznews().result)
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

  async getznews(){
    const db = wx.cloud.database()
    const result = await db.collection("headnewsjdbc").get()
    const data = result.data || []

    
    this.setData({
      tnews : data
    })
  }
    
  
})
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
       this.gettimenews()
       console.log("shuju", this.gettimenews().result)
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

  async gettimenews(){
    const db = wx.cloud.database()
    const result = await db.collection("timenewsjdbc").get()
    const data = result.data || []

    
    this.setData({
      timenews : data
    })
  }
    
  
})
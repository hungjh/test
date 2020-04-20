var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    support:'active',
    refer: '',
    complain: '',
    chooseText:'业务办理',
    loading:false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.info("onLoad")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {  
    console.info("onReady")
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {  
    console.info("onShow")
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {  
    console.info("onHide")
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { 
    console.info("onUnload")
   },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { },
  productChoose:function(e){
    // console.info(e);
    if (e.currentTarget.id == 'support'){
      this.setData({
        support: 'active',
        refer: '',
        complain: '',
      });
      
    } else if (e.currentTarget.id == 'refer') {
      this.setData({
        support: '',
        refer: 'active',
        complain: '',
      });

    } else if (e.currentTarget.id == 'complain') {
      this.setData({
        support: '',
        refer: '',
        complain: 'active',
      });
    }

    this.setData({
      chooseText: e.currentTarget.dataset.text,
    });

  },
  productChioce:function(){
    this.setData({
      loading:true
    })
    app.globalData.chooseText = this.data.chooseText;
    var _this=this;
    wx.navigateTo({
      url: '../../pages/queue/queue?chooseText='+_this.data.chooseText,
      success:function(){
        _this.setData({
          loading:false
        })
      }
    });
  }
})
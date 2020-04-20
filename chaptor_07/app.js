const config = require('./config')

//app.js
App({
  onLaunch: function (options) {
  
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env: 'newsjdbc-pj6i5',
        traceUser: true,
      })
    }
  },
  onShow(opts) {
    console.log('App Show', opts)
  },
  onHide() {
    console.log('App Hide')
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
      // 获取用户信息
      wx.getSetting({
        success: resu => {
          if (resu.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: resu => {
                // 可以将 res 发送给后台解码出 unionId
                this.globalData.userInfo = resu.userInfo
                console.log("resu.userInfo",resu.userInfo)
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(resu)
                }
              }
            })
          }
        }
      })
    }
  },
  getRequestInfo: function (url, data, callback) {
    wx.request({
      url: url,
      data: data,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        callback(res.data);
      },
      fail: function () {
        console.info("调用失败");
      },
      complete: function () {
        console.info("调用了");
      }
    })
  },
  globalData: {
    server: 'https://localhost:8443/weappservice/api/v1',
    appId: 'JWEJIJ345QHWJKENVKF',
    phone: '',
    chooseText: ''
  },
})
const app = getApp()

Page({
  data: {
    focus: true,
    inputValue: '',
    error: false,
    loading: false,
    disabled: true
  },
  onLoad: function () {

  },
  bindKeyInput: function (e) {
    if (e.detail.value == '') {
      this.setData({
        disabled: true
      });
    } else {
      this.setData({
        disabled: false,
        inputValue: e.detail.value
      });
    }
  },
  nextLoading: function () {
    if (!(/^1[3|4|5|7|8]\d{9}$/.test(this.data.inputValue))) {
      this.setData({
        error: true,
      });
    } else {
      this.setData({
        error: false,
        loading: true,
      });
      var _this = this;
      app.globalData.phone = this.data.inputValue;
      wx.navigateTo({
        url: '../../pages/productChoice/productChoice',
        success: function () {
          _this.setData({
            loading: false,
          });
        }
      });
    }
  }
})
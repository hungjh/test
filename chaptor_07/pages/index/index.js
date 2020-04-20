//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
   gridIcons: [
      {icon:'1.png',text:'学校简介',path:'pages/jianjie/jianjie',desc:'我们学校是xxxx，要干嘛干嘛'},
     { icon:'zhaos.jfif',text:'招生章程',path:'pages/zhangcheng/zhangcheng',desc:'这个招生放张图片'},
     { icon:'xueyuanzhuanye.jfif',text:'学院专业',path:'pages/object/object',desc:'学院专业图片'},
     { icon: '4.png', text: '校园风光', path:'pages/scenery/scenery',desc:'找点图片和字'},
     { icon: '5.png', text: '宣传片', path: 'pages/pvedio/pvedio', desc: '找个视频'},
     { icon: '6.jpg', text: '新闻头条', path:'pages/headnews/headnews',desc:'找点新闻'},
     { icon: 'newsPeople.jpg', text: '阳光人物', path:'pages/sunpeo/sunpeo',desc:'来点个人简介？'},
     { icon:'newStudent.jpg',text:'新生服务',path:'pages/newstuwk/newstuwk',desc:'在线客服，阳光小地图'},
     { icon: 'grfp.jfif', text: '交通路线', path:'pages/trific/trific',desc:'安装微信小地图'}
   ],
   inputShowed: false,
   inputVal: ""
  },
  onLoad: function () {
    
  },
  showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    search: function(e){
        wx.navigateTo({
          url: '/pages/article/list?type=search&text=' + this.data.inputVal,
          success: function(res){
            // success
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    },
    scancode: function(e){
        wx.scanCode({
          success: function(res){
            console.log(res)
            var result = res.result;
            console.log(result)
              var url = result.replace('wa://','').replace('http://','');
              console.log(url)
              wx.navigateTo({
                url: url,
                success: function(res){
                  // success
                }
              })
            
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
    }
})

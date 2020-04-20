const anychatdefine=require("../../sdk/anychatdefine.js")
const anychat=require("../../sdk/anychat4wx.js")
const util=require("../../utils/util.js")

var app = getApp();
var qtimer='';  //定时器
var rtmpUrlTimer=''; //拉流定时器
var rtmpUrlTimerTarget='';
var roomTimer='';//查询房间人数

Page({
  data: {
    hidden: true,
    nocancel: true,
    modelText:'',
    initActive:'active',  //连接
    queueActive:'',  //排队
    videoCall:'', //呼叫
    videoActive:'',  //视频
    layerActive:'', //弹出框
    layerText:'',
    layerActiveCamera:'',
    layerTextCamera:'',
    loadingText:'正在呼叫，请稍候',
    productContent: app.globalData.chooseText,  //业务类型
    wss_ip:'demo.anychat.cn',  //服务器地址
    wss_port:'9950', //端口
    nickname:'', //昵称
    room_no:'', //房间id
    gc_page:{}, //日志
    logs:[],
    mSelfUserId: '',  //UserId
    BusinessArea:[],  //营业厅数组
    areaId:'',  //营业厅id
    queueId:'',    //队列id
    queueRealtimeNo:'',  //队列总人数
    queueRealtimeRange:'',   //排在多少位
    WaitingDuration:'', // 排队时
    queueText:'取消排队',
    target_id:'', //坐席id
    anychat_local_id:'Client-Area', //本地视频显示区域id
    anychat_remote_id:'Agent-Area', //坐席视频显示区域id
    pusher_rtmpurl:'', //推流地址
    puller_rtmpurl:'', //拉流地址
    userIdList:'', //用户id列表
    userIduserInfoMapping:'', //用户详情信息列表
    openCamera:false,  //是否打开过摄像头
    videoCallSuccess:false  //是否呼叫成功
  },
  onLoad: function (option){
    console.log(option.chooseText);
    console.error("onLoad");
    this.setData({
      productContent: option.chooseText
    });
  },
  /**
  * 生命周期函数--监听页面初次渲染完成
  */
  onReady: function () {  
    console.error("onReady");
    var _this = this;
    // 客户端连接服务器，bSuccess表示是否连接成功，errorcode表示出错代码
    anychat.OnAnyChatConnect = function () {
      var logsArr = _this.data.logs;
      let log = `${util.formatTime(new Date())}: OnAnyChatConnect(${_this.data.wss_ip}, ${_this.data.wss_port})`
      logsArr.push({ message: log })
      console.log("OnAnyChatConnect logs:", logsArr);
      var json = {
        logs: logsArr
      }
      _this.setData({
        gc_page: json
      })

      _this.onTapLogin();
    }
    // 客户端登录系统，dwUserId表示自己的用户ID号，errorcode表示登录结果：0 成功，否则为出错代码，参考出错代码定义
    anychat.OnAnyChatLoginSystem = function (dwUserId, errorcode) {
      var logsArr = _this.data.logs;
      let log = `${util.formatTime(new Date())}: OnAnyChatLoginSystem(${dwUserId}, ${errorcode}), nickname: ${_this.data.nickname}`
      logsArr.push({ message: log })
      console.log("OnAnyChatLoginSystem logs:", logsArr);
      var json = {
        logs: logsArr
      }
      _this.setData({
        gc_page: json,
        mSelfUserId: dwUserId
      });

      if (errorcode == 201) {
        console.info("重复登录")
      }
      anychat.BRAC_SetSDKOption(anychatdefine.BRAC_SO_OBJECT_INITFLAGS, 0);

      //同步营业厅
      _this.onTapBusinessHall();

    }
    // 座席端进入房间，dwRoomId表示所进入房间的ID号，errorcode表示是否进入房间：0成功进入，否则为出错代码
    anychat.OnAnyChatEnterRoom = function (dwRoomId, errorcode) {
      console.info("自己进房间")
      var logsArr = _this.data.logs;
      let log = `${util.formatTime(new Date())}: OnAnyChatEnterRoom(${dwRoomId}, ${errorcode})`
      logsArr.push({ message: log })
      console.log("OnAnyChatEnterRoom logs:", logsArr)
      var json = {
        logs: logsArr
      }
      _this.setData({
        gc_page: json,
        videoActive: 'active',
        videoCall: '',
        initActive: '',
        queueActive: ''
      });
      roomTimer = setInterval(function () {
        let userIdList = anychat.BRAC_GetOnlineUser();
        if (userIdList.indexOf(_this.data.target_id) > -1) {
          _this.openMSelfCameraSpeak();
          clearInterval(roomTimer);
          roomTimer = null;
        }
      }, 600);
    }
    // 收到当前房间的在线用户信息，进入房间后触发一次，dwUserCount表示在线用户数（包含自己），dwRoomId表示房间ID
    anychat.OnAnyChatRoomOnlineUser = function (dwUserCount, dwRoomId) {
      console.info("房间有两个人" + dwUserCount);
      var logsArr = _this.data.logs;
      let log = `${util.formatTime(new Date())}: OnAnyChatRoomOnlineUser(${dwUserCount}, ${dwRoomId})`
      logsArr.push({ message: log })
      console.log("OnAnyChatRoomOnlineUser logs:", logsArr);
      var json = {
        logs: logsArr
      }
      _this.setData({
        gc_page: json,
        userIdList: anychat.userIdList,
        userIduserInfoMapping: anychat.userIduserInfoMapping
      });
      if (dwUserCount > 1) {
        //有两个人
        for (var i in anychat.userIdList) {
          if (anychat.userIdList[i] == _this.data.target_id) {
            console.info("房间有两个人");
            //打开坐席摄像头
            _this.openTargetCameraSpeak();
          }
        }
      }
    }
    // 用户进入（离开）房间，dwUserId表示用户ID号，bEnterRoom表示该用户是进入（1）或离开（0）房间
    anychat.OnAnyChatUserAtRoom = function (dwUserId, bEnterRoom) {
      console.info("后进房间");
      if (bEnterRoom == 1) {
        //进入房间
        if (dwUserId == _this.data.target_id) {
          console.info("坐席后进房间");
          //打开坐席摄像头
          _this.openTargetCameraSpeak();
        }
      } else if (bEnterRoom == 0) {
        //离开房间
      }

    }
    // 网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，reason表示连接断开的原因
    anychat.OnAnyChatLinkClose = function (error_info) {
      console.log("OnAnyChatLinkClose logs:", error_info)
      _this.setData({
        hidden: false,
        modelText: '网络断线,返回登录',
      })
    }

    anychat.OnSignalingError = function (error_info) {
      var logsArr = _this.data.logs;
      let log = `${util.formatTime(new Date())}: OnSignalingError(${JSON.stringify(error_info)})`
      logsArr.push({ message: log })
      console.log("OnSignalingError logs:", error_info)
      var json = {
        logs: logsArr
      }
      _this.setData({
        gc_page: json
      })
    }

    // 业务对象事件通知
    anychat.OnAnyChatObjectEvent = function (dwObjectType, dwObjectId, dwEventType, dwParam1, dwParam2, dwParam3, dwParam4, strParam) {
      switch (dwEventType) {
        case anychatdefine.ANYCHAT_OBJECT_EVENT_UPDATE:
          //对象数据更新 1
          _this.OnAnyChatObjectUpdate(dwObjectType, dwObjectId);
          break;
        case anychatdefine.ANYCHAT_OBJECT_EVENT_SYNCDATAFINISH:
          //对象数据同步结束 2
          _this.OnAnyChatObjectSyncDataFinish(dwObjectType, dwObjectId);
          break;
        case anychatdefine.ANYCHAT_AREA_EVENT_ENTERRESULT:
          // 进入服务区域结果 402
          _this.OnAnyChatEnterAreaResult(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_AREA_EVENT_LEAVERESULT:
          // 离开服务区域结果 405
          _this.OnAnyChatLeaveAreaResult(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_AREA_EVENT_STATUSCHANGE:
          // 服务区域状态变化
          _this.OnAnyChatAreaStatusChange(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_QUEUE_EVENT_STATUSCHANGE:
          // 队列状态变化 501
          _this.OnAnyChatQueueStatusChanged(dwObjectType, dwObjectId);
          break;
        case anychatdefine.ANYCHAT_QUEUE_EVENT_ENTERRESULT:
          // 进入队列结果 502
          _this.OnAnyChatEnterQueueResult(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_QUEUE_EVENT_LEAVERESULT:
          // 离开队列结果 503
          _this.OnAnyChatLeaveQueueResult(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_AGENT_EVENT_STATUSCHANGE:
          // 坐席状态变化
          _this.OnAnyChatAgentStatusChanged(dwObjectType, dwObjectId, dwParam1);
          break;
        case anychatdefine.ANYCHAT_AGENT_EVENT_SERVICENOTIFY:
          // 坐席服务通知（哪个用户到哪个客服办理业务） 602
          _this.OnAnyChatServiceStart(dwParam1, dwParam2, dwParam3);
          break;
        case anychatdefine.ANYCHAT_AGENT_EVENT_WAITINGUSER:
          // 暂时没有客户，请等待  603
          _this.OnAnyChatAgentWaitingUser();
          break;
        case anychatdefine.ANYCHAT_AGENT_EVENT_ISREADY:
          // 坐席准备好，可以发起呼叫  604
          _this.OnAnyChatAgentprepared(dwParam1, dwParam2, dwParam3);
          break;
        default:
          break;
      }
    }
    //视频呼叫
    anychat.OnAnyChatVideoCallEvent = function (dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
      switch (dwEventType) {
        case anychatdefine.BRAC_VIDEOCALL_EVENT_REQUEST:
          //收到视频呼叫请求
          _this.onVideoCallControlRequest(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
          break;
        case anychatdefine.BRAC_VIDEOCALL_EVENT_REPLY:
          //视频呼叫请求回复
          _this.onVideoCallControlReply(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
          break;
        case anychatdefine.BRAC_VIDEOCALL_EVENT_START:
          //通话开始
          _this.onVideoCallControlStart(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
          break;
        case anychatdefine.BRAC_VIDEOCALL_EVENT_FINISH:
          //视频通话结束
          _this.onVideoCallControlFinish(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
          break;
      }
    }
    this.onTapConnect();
  },
  /**
  * 生命周期函数--监听页面显示
   */
  onShow: function () {  
    console.error("onShow")
  },
  /**
  * 生命周期函数--监听页面隐藏
  */
  onHide: function () {    
    console.error("onHide")
  },
  /**
   * 生命周期函数--监听页面卸载
  */
  onUnload: function () { 
    //销毁
    var _this=this;
    console.error("onUnload");
    clearInterval(qtimer);
    clearInterval(rtmpUrlTimer);
    clearInterval(rtmpUrlTimerTarget);
    clearInterval(roomTimer);
    qtimer=null;
    rtmpUrlTimer=null;
    rtmpUrlTimerTarget=null;
    roomTimer=null;
    
    if(_this.data.openCamera){
      _this.closeMSelfCameraSpeak();
      //离开房间
      _this.onTapLeaveRoom();
    }
    if(_this.data.videoCallSuccess){
      //挂断视频
      _this.onTapVideocallEnd();
    }
    //退出
    _this.onTapLogout();
  },
  queuTime:function(){
    //排队时间
    let second = 0;
    let _this=this;
    qtimer=setInterval(function () {
      second++;
      let time=_this.TimeFormat(second);
      let queue_length=anychat.BRAC_ObjectGetIntValue(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE, _this.data.queueId, anychatdefine.ANYCHAT_QUEUE_INFO_LENGTH);
      let queue_pos=anychat.BRAC_ObjectGetIntValue(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE, _this.data.queueId, anychatdefine.ANYCHAT_QUEUE_INFO_MYSEQUENCENO) + 1;
      _this.setData({
        WaitingDuration: time,
        queueRealtimeNo:queue_length,
        queueRealtimeRange:queue_pos
      });
    }, 1000);
  },
  onCoverShow:function(param){
    var _this=this;
    this.setData({
      layerActive:'active',
      layerText:param
    });
    setTimeout(function(){
      _this.setData({
        layerActive:''
      });
    },3000);
  },
  onCoverShowCamera:function(param){
    var _this=this;
    this.setData({
      layerActiveCamera:'active',
      layerTextCamera:param
    });
    setTimeout(function(){
      _this.setData({
        layerActiveCamera:''
      });
    },3000);
  },
  TimeFormat: function (time){
    var m = Math.floor(time / 60);
    m = m > 9 ? m : (m > 0 ? "0" + m : "00");
    var s = time % 60;
    s = s > 9 ? s : (s > 0 ? "0" + s : "00");
    return m + ":" + s; 
  },
  onTapConnect:function(){
    //链接
    anychat.BRAC_Connect(this.data.wss_ip,this.data.wss_port);
  },
  onTapLogin:function(){
    //登录
    // anychat.BRAC_LoginEx(this.data.nickname);
    this.setData({
      nickname:app.globalData.phone
    })
    anychat.BRAC_Login(app.globalData.phone,'',0);

  },
  onTapEnterRoom:function(){
    //进房间
    anychat.BRAC_EnterRoom(this.data.room_no,'',0);
  },
  onTapLeaveRoom:function(){
    //离开房间
    anychat.BRAC_LeaveRoom();
  },
  onTapBusinessHall:function(){
    var _this=this;
    //同步营业厅
    anychat.BRAC_ObjectControl(anychatdefine.ANYCHAT_OBJECT_TYPE_AREA, anychatdefine.ANYCHAT_INVALID_OBJECT_ID, anychatdefine.ANYCHAT_OBJECT_CTRL_SYNCDATA, _this.data.mSelfUserId, 0, 0, 0, "");
  },
  onTapEnterBusiness:function(){
    var _this = this;
    //进入营业厅
    anychat.BRAC_ObjectControl(anychatdefine.ANYCHAT_OBJECT_TYPE_AREA, _this.data.areaId, anychatdefine.ANYCHAT_AREA_CTRL_USERENTER, 0, 0, 0, 0, "");
  },
  onTapEnterQueue:function(){
    var _this = this;
    //进入队列
    anychat.BRAC_ObjectControl(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE, _this.data.queueId, anychatdefine.ANYCHAT_QUEUE_CTRL_USERENTER, 0, 0, 0, 0, "");
  },
  cancelQueue:function(){
    var _this = this;
    var text=this.data.queueText;
    if(text=='取消排队'){
      //取消排队
      anychat.BRAC_ObjectControl(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE, _this.data.queueId, anychatdefine.ANYCHAT_QUEUE_CTRL_USERLEAVE, 0, 0, 0, 0, "");
      _this.setData({
        queueText:'重新排队'
      });
    }else if(text=='重新排队'){
      _this.onTapEnterQueue();
      _this.setData({
        queueText:'取消排队'
      })
    }
    

  },
  onTapVideocallEnd:function(){
    //挂断
    anychat.BRAC_VideoCallControl(anychatdefine.BRAC_VIDEOCALL_EVENT_REPLY, this.data.mTargetUserId, anychatdefine.GV_ERR_SESSION_QUIT, 0, 0, '');
  },
  onTapVideocall:function(){
    //开始呼叫
    anychat.BRAC_VideoCallControl(anychatdefine.BRAC_VIDEOCALL_EVENT_REQUEST, this.data.target_id, 0, 0, 0, '');
  },
  openMSelfCameraSpeak:function(){
    var _this=this;
    this.setData({
      openCamera:true
    })
    //打开摄像头
    anychat.BRAC_UserCameraControl(_this.data.mSelfUserId, 1);//打开自己摄像头
    anychat.BRAC_UserSpeakControl(_this.data.mSelfUserId, 1) //打开自己麦克风
    anychat.BRAC_UserCameraControl(_this.data.target_id, 1) //打开对方摄像头
    anychat.BRAC_UserSpeakControl(_this.data.target_id, 1) //打开对方麦克风

    rtmpUrlTimer = setInterval(function(){
      if(anychat.pusher_rtmpurl[-1]&&anychat.puller_rtmpurl[_this.data.target_id]){
        clearInterval(rtmpUrlTimer);
        _this.setData({
          pusher_rtmpurl: anychat.pusher_rtmpurl[-1],
          puller_rtmpurl: anychat.puller_rtmpurl[_this.data.target_id]
        });
        anychat.BRAC_SetVideoPos(-1, _this.data.anychat_local_id) //设置本地位置
        anychat.BRAC_SetVideoPos(_this.data.target_id, _this.data.anychat_remote_id) //设置坐席视频位置
        rtmpUrlTimer=null;
      }
    },600)
  },
  closeMSelfCameraSpeak:function(){
    var _this=this;
    anychat.BRAC_UserCameraControl(_this.data.mSelfUserId, 0);//关闭自己摄像头
    anychat.BRAC_UserSpeakControl(_this.data.mSelfUserId, 0) //关闭自己麦克风
    anychat.BRAC_UserCameraControl(_this.data.target_id, 0) //关闭对方摄像头
    anychat.BRAC_UserSpeakControl(_this.data.target_id,0) //关闭对方麦克风
  },
  openTargetCameraSpeak:function(){
    // var _this=this;
    // //打开摄像头
    // console.info("坐席id"+_this.data.target_id)
    // anychat.BRAC_UserCameraControl(_this.data.target_id, 1) //打开对方摄像头
    // anychat.BRAC_UserSpeakControl(_this.data.target_id, 1) //打开对方麦克风
    
    // rtmpUrlTimerTarget = setInterval(function(){
    //   if(anychat.puller_rtmpurl[_this.data.target_id]){
    //     clearInterval(rtmpUrlTimerTarget);
                // rtmpUrlTimerTarget=null;
    //     console.info("anychat.puller_rtmpurl[_this.data.target_id]",anychat.puller_rtmpurl[_this.data.target_id])
    //     _this.setData({
    //       puller_rtmpurl: anychat.puller_rtmpurl[_this.data.target_id]
    //     });
    //     anychat.BRAC_SetVideoPos(_this.data.target_id, _this.data.anychat_remote_id) //设置坐席视频位置
    //   }
    // },1000)
  },
  onTapLogout:function(){
    //退出
    anychat.BRAC_Logout();
  },
  confirm:function(){
    //弹出层
    this.onTapLogout();
    wx.reLaunch({
      url: '../../pages/index/index',
      success:function(){
    
      }     
    });
  },
  isInArray:function(arr,value){
    for(let i = 0; i < arr.length; i++){
        if(value === arr[i].id){
            return true;
        }
    }
    return false;
  },
  OnAnyChatObjectUpdate:function(dwObjectType, dwObjectId){
    //对象数据更新 1
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AREA) {
      //营业厅
      let idArr=this.data.BusinessArea;
      if(!this.isInArray(idArr,dwObjectId)){
        let json={
          id:dwObjectId,
          name:'',
          queue:''
        }
        idArr.push(json);
      }
      this.setData({
        BusinessArea:idArr
      })
    }
  },
  OnAnyChatObjectSyncDataFinish:function(dwObjectType, dwObjectId){
    //对象数据同步结束 2
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AREA) {
        //进入营业厅
        let area=this.data.BusinessArea;
        for(let i in area){
          //查询营业厅名字
          area[i].name=anychat.BRAC_ObjectGetStringValue(anychatdefine.ANYCHAT_OBJECT_TYPE_AREA, area[i].id, anychatdefine.ANYCHAT_OBJECT_INFO_NAME);
        }
        this.setData({
          areaId:area[1].id
        });
        this.onTapEnterBusiness();
    }
  },
  OnAnyChatEnterAreaResult:function(dwObjectType, dwObjectId, dwErrorCode){
    // 进入服务区域结果 402
    if(dwErrorCode==0){
      //查询队列
      let queue_list=[];
      let queue_id = anychat.BRAC_ObjectGetIdList(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE);
      for (let j in queue_id) {
        let queueName = anychat.BRAC_ObjectGetStringValue(anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE, queue_id[j], anychatdefine.ANYCHAT_OBJECT_INFO_NAME);
        var json={
          id:queue_id[j],
          name:queueName
        }
        queue_list.push(json);
      }
      let area=this.data.BusinessArea;
      for(let i in area){
        if(this.data.areaId==area[i].id){
          area[i].queue=queue_list;
        }
      }
      this.setData({
        BusinessArea:area,
        queueId:queue_id[1]
      })
      //进入队列
      console.log("营业厅队列数组:");
      console.log(this.data.BusinessArea);

      this.onTapEnterQueue();
    }

  },
  OnAnyChatLeaveAreaResult:function(dwObjectType, dwObjectId, dwErrorCode){
    // 离开服务区域结果 405
  },
  OnAnyChatAreaStatusChange:function(dwObjectType, dwObjectId, dwErrorCode){
    // 服务区域状态变化 
  },
  OnAnyChatQueueStatusChanged:function(dwObjectType, dwObjectId){
    // 队列状态变化 501
  },
  OnAnyChatEnterQueueResult:function(dwObjectType, dwObjectId, dwErrorCode){
    // 进入队列结果 502
    if(dwErrorCode==0){
      //进入队列成功
      this.queuTime();
      this.setData({
        initActive:'',  //连接
        queueActive:'active',  //排队
        videoCall:'',
        videoActive:'',
        loadingText:'正在呼叫，请稍候',
      });
    }
  },
  OnAnyChatLeaveQueueResult:function(dwObjectType, dwObjectId, dwErrorCode){
    // 离开队列结果 503
    var _this=this;
    if(dwErrorCode==0){
      //离开队列
      clearInterval(qtimer); 
      qtimer=null;
    }
  },
  OnAnyChatAgentStatusChanged:function(dwObjectType, dwObjectId, dwParam1){
    // 坐席状态变化
  },
  OnAnyChatServiceStart:function(dwAgentId, clientId, dwQueueId){
    // 坐席服务通知（哪个用户到哪个客服办理业务） 602
  },
  OnAnyChatAgentWaitingUser:function(dwObjectType, dwObjectId){
    // 暂时没有客户，请等待  603
  },
  OnAnyChatAgentprepared:function(dwAgentId, clientId, dwQueueId){
    // 坐席准备好，可以发起呼叫  604
    var _this=this;
    clearInterval(qtimer);
    qtimer=null;
    this.setData({
      target_id:dwAgentId,
      queueActive:'',
      videoCall:'active'
    })
    this.onTapVideocall();
  },
  onVideoCallControlRequest:function(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr){
    //收到视频呼叫请求
    console.info('onVideoCallControlRequest(' + dwUserId + ',' + dwErrorCode + ',' + dwFlags + ',' + dwParam + ',' + szUserStr + ')');
  },
  onVideoCallControlReply:function(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr){
    var _this=this;
    //视频呼叫请求回复
    console.info('onVideoCallControlReply(' + dwUserId + ',' + dwErrorCode + ',' + dwFlags + ',' + dwParam + ',' + szUserStr + ')');
    switch(dwErrorCode){
		case anychatdefine.GV_ERR_SUCCESS://成功的情况
        console.info("呼叫成功");
        let name=anychat.BRAC_ObjectGetStringValue(anychatdefine.ANYCHAT_OBJECT_TYPE_AGENT,_this.data.target_id,anychatdefine.ANYCHAT_OBJECT_INFO_NAME)
        let text="呼叫"+name+"成功,等待响应";
        _this.setData({
          loadingText:text,
          videoCallSuccess:true
        });
			  break;
		case anychatdefine.GV_ERR_SESSION_QUIT:
        console.info("用户主动放弃会话")
        break;
		case anychatdefine.GV_ERR_SESSION_OFFLINE:
        console.info("目标用户不在线");
        _this.onCoverShow("目标用户不在线");
        //重新排队
        _this.onTapEnterQueue();
			  break;
		case anychatdefine.GV_ERR_SESSION_BUSY:
        console.info("目标用户忙");
        _this.onCoverShow("目标用户忙");
        //重新排队
        _this.onTapEnterQueue();
			  break; 
		case anychatdefine.GV_ERR_SESSION_REFUSE:
        console.info("目标用户拒绝会话");
        _this.setData({
          hidden: false,
          modelText:'会话被拒绝,返回登录',
        })	
			  break; 
		case anychatdefine.GV_ERR_SESSION_TIMEOUT:
        console.info("会话请求超时");	
        _this.onCoverShow("呼叫超时");	
        //重新排队
        _this.onTapEnterQueue();
			  break; 
		case anychatdefine.GV_ERR_SESSION_DISCONNECT:
        console.info("网络断线");
        _this.setData({
          hidden: false,
          modelText:'网络断线,返回登录',
        })
			  break; 
		default:
			break;
	  }
  },
  onVideoCallControlStart:function(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr){
    //通话开始
    console.info('onVideoCallControlStart(' + dwUserId + ',' + dwErrorCode + ',' + dwFlags + ',' + dwParam + ',' + szUserStr + ')');
    this.setData({
      room_no: dwParam
    });
    this.onTapEnterRoom();
  },
  onVideoCallControlFinish:function(dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr){
    
    var _this=this;
    //视频通话结束
    console.info('onVideoCallControlFinish(' + dwUserId + ',' + dwErrorCode + ',' + dwFlags + ',' + dwParam + ',' + szUserStr + ')');
    if(dwErrorCode==0){
      this.onCoverShowCamera("视频结束");
      setTimeout(function(){
        _this.closeMSelfCameraSpeak();
        _this.onTapLeaveRoom();
        _this.onTapLogout();
        wx.reLaunch({
          url: '../../pages/taskComplete/taskComplete',
          success: function () {

          }
        })
      },3000);
      
    }else if(dwErrorCode==100106){
      this.onCoverShowCamera("对方网络断线");
      setTimeout(function(){
        _this.closeMSelfCameraSpeak();
        _this.onTapLeaveRoom();
        _this.onTapLogout();
        wx.reLaunch({
          url: '../../pages/productChoice/productChoice',
          success: function () {

          }
        });
        },3000);
      
    }
  }
})
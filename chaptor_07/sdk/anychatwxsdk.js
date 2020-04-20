const anychatdefine = require('./anychatdefine')
const noop = function () { };

function EventEmitter() {
    this.event_k_v = {};
}
//绑定事件函数
EventEmitter.prototype.on = function (event, callback) {
    this.event_k_v[event] = this.event_k_v[event] || [];
    this.event_k_v[event].push(callback);
};
//触发事件函数
EventEmitter.prototype.emit = function (event, _) {
    var event_list = this.event_k_v[event] || [],
        args = Array.prototype.slice.call(arguments, 1);
    event_list.map(function (v, k) {
        v.apply(null, args)
    });
};

function AnyChatMiniProgram() {
    this.ANYCHAT_SDK_VERSION = 'R.1.1.0 commit f0a099b83f01d4769017e99921ebb709a98f153e';
    this.wss_url = '';//websocket信令服务地址
    this.signaling = null; //websocket句柄
    this.userId = ''; //anychat登录id
    this.mediaId = ''; //自己媒体id
    this.userIdList = []; //房间内用户id列表
    this.userIduserInfoMapping = {}; //房间内用户id与详细信息映射
    this.roomId = 0; //房间号
    this.mediaDeviceStatus = {}; //摄像头状态媒体ID映射
    this.wx_pusher = null; //自身视频区域
    this.wx_puller = null; //远程视频区域
    this.pusher_rtmpurl = {}; //推流号映射
    this.puller_rtmpurl = {}; //拉流号映射
    this.reconnect_handle = -1; //会话重连句柄
    this.heartbeat_handle = -1; //心跳保持请求句柄
    this.seq = 1;
    this.currentDevice = ''; //当前摄像头设备
    this.areaIdareaInfoMapping = {}; //缓存营业厅数据
    this.queueIdqueueInfoMapping = {}; //缓存队列数据
    this.agentIdagentInfoMapping = {}; //缓存座席数据f
    this.realtimeAreaStatus = {};   //实时营业厅数据状态
    this.realtimeQueueStatus = {};  //实时队列数据状态
    this.realtimeAgentStatus = {};  //实时座席数据状态
    this.userIduserInfoMappingBackup = {};
}

AnyChatMiniProgram.prototype = new EventEmitter();

//连接登录
AnyChatMiniProgram.prototype.OnAnyChatConnect = noop;
AnyChatMiniProgram.prototype.OnAnyChatLoginSystem = noop;
AnyChatMiniProgram.prototype.OnAnyChatEnterRoom = noop;
AnyChatMiniProgram.prototype.OnAnyChatRoomOnlineUser = noop;
AnyChatMiniProgram.prototype.OnAnyChatUserAtRoom = noop;
AnyChatMiniProgram.prototype.OnAnyChatLinkClose = noop;
// 智能排队
AnyChatMiniProgram.prototype.OnAnyChatObjectEvent = noop;
// 视频呼叫
AnyChatMiniProgram.prototype.OnAnyChatVideoCallEvent = noop;
//透明通道、拍照录像
AnyChatMiniProgram.prototype.OnAnyChatTextMessage = noop;
AnyChatMiniProgram.prototype.OnAnyChatTransBuffer = noop; //文字有乱码风险，可以传输文件流，1k
AnyChatMiniProgram.prototype.OnAnyChatTransBufferEx = noop; //8k
AnyChatMiniProgram.prototype.OnAnyChatTransFile = noop;
AnyChatMiniProgram.prototype.OnAnyChatRecordSnapShot = noop;
AnyChatMiniProgram.prototype.OnAnyChatRecordSnapShotEx = noop;
AnyChatMiniProgram.prototype.OnAnyChatRecordSnapShotEx2 = noop;

AnyChatMiniProgram.prototype.OnSignalingError = noop;

AnyChatMiniProgram.prototype.BRAC_InitSDK = function () {
    //console.log("BRAC_InitSDK");
}
AnyChatMiniProgram.prototype.BRAC_GetVersion = function () {
    //console.log("BRAC_GetVersion");
    return ANYCHAT_SDK_VERSION
}
AnyChatMiniProgram.prototype.BRAC_RegisterCallBack = function () {
    //console.log("BRAC_RegisterCallBack");
}
AnyChatMiniProgram.prototype.BRAC_SetVideoPos = function (userid, domid) {
    //console.log("BRAC_SetVideoPos");
    let _this = this
    if (userid == -1 || userid == this.userId) {
        let wx_pusher = wx.createLivePusherContext(domid)
        this.wx_pusher = wx_pusher
        wx_pusher.start({
            success: function () {
                _this.currentDevice = 'user'
            }
        })
    } else {
        let wx_puller = wx.createLivePlayerContext(domid)
        this.wx_puller = wx_puller
        wx_puller.play()
    }
    return 0
}
AnyChatMiniProgram.prototype.BRAC_SetVideoPosEx = function (userid, domid, streamindex) {
    //console.log("BRAC_SetVideoPosEx");
    let _this = this
    if (userid == -1 || userid == this.userId) {
        let wx_pusher = wx.createLivePusherContext(domid)
        this.wx_pusher = wx_pusher
        wx_pusher.start({
            success: function () {
                _this.currentDevice = 'user'
            }
        })
    } else {
        let wx_puller = wx.createLivePlayerContext(domid)
        this.wx_puller = wx_puller
        wx_puller.play()
    }
    return 0
}
AnyChatMiniProgram.prototype.BRAC_Connect = function (domain, port) {
    if (!domain || port > 65536 || port < 0) {
        return 21
    }
    let wss_url = 'wss://' + domain
    if (port) {
        wss_url += ':' + port
    }
    this.emit('websocket_connect', wss_url)
    return 0
}
AnyChatMiniProgram.prototype.BRAC_Login = function (lpUserName, lpPassword, dwParam) {
    //console.log("BRAC_Login");
    let random = ~~(Math.random() * 10000);
    if (!lpUserName) return 210;
    lpPassword = (lpPassword ? lpPassword : '')
    dwParam = (dwParam ? dwParam : 0)
    lpUserName += random;
    let data = {
        cmdcode: 'login',
        username: lpUserName,
        password: lpPassword,
        passenctype: dwParam
    }
    this.emit('websocket_send', data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_LoginEx = function (lpNickName, dwUserId, lpStrUserId, lpAppId, dwTimeStamp, lpSigStr, lpStrParam) {
    //console.log("BRAC_LoginEx")
    let random = ~~(Math.random() * 10000);
    if (!lpNickName) return 210;
    dwUserId = (dwUserId ? dwUserId : -1)
    lpStrUserId = (lpStrUserId ? lpStrUserId : lpNickName)
    lpAppId = (lpAppId ? lpAppId : '')
    dwTimeStamp = (dwTimeStamp ? dwTimeStamp : 0)
    lpSigStr = (lpSigStr ? lpSigStr : '')
    lpStrParam = (lpStrParam ? lpStrParam : '')
    lpNickName += random
    lpStrUserId += random
    let data = {
        cmdcode: 'loginex',
        nickname: lpNickName,
        userid: dwUserId,
        struserid: lpStrUserId,
        appid: lpAppId,
        timestamp: dwTimeStamp,
        lpSigStr: lpSigStr,
        lpStrParam: lpStrParam,
        platformtype: 1
    }
    this.emit('websocket_send', data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_EnterRoom = function (dwRoomid, lpRoomPass, dwParam) {
    //console.log("BRAC_EnterRoom");
    if (!this.userId) {
        return 307
    }
    dwRoomid = +dwRoomid
    lpRoomPass = (lpRoomPass ? lpRoomPass : '')
    dwParam = (dwParam ? dwParam : 0)
    if (!dwRoomid) return -1;
    let enterroom_data = {
        cmdcode: 'enterroom',
        roomid: dwRoomid,
        roompass: lpRoomPass,
        passenctype: dwParam
    }
    this.emit('websocket_send', enterroom_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_EnterRoomEx = function (lpRoomName, lpRoomPass) {
    //console.log("BRAC_EnterRoomEx");
    if (!this.userId) {
        return 307
    }
    lpRoomName = lpRoomName ? lpRoomName + '' : ''
    lpRoomPass = lpRoomPass ? lpRoomPass + '' : ''
    //anychat.EnterRoomEx(lpRoomName, lpRoomPass);
    let data = {
        cmdcode: 'enterroomex',
        roomname: lpRoomName,
        roompass: lpRoomPass
    }
    this.emit('websocket_send', data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_LeaveRoom = function () {
    //console.log("BRAC_LeaveRoom");
    //anychat.LeaveRoom(parseInt(dwRoomid));
    if (!this.roomId) {
        return 308
    }
    let leaveroom_data = {
        cmdcode: 'leaveroom',
        roomid: this.roomId
    }
    let mediacontrol_data = {
        cmdcode: 'mediacontrol',
        mediaid: this.mediaId,
        mediatype: 1,
        controltype: 0,
        jsonbuf: ''
    }
    this.emit('websocket_send', mediacontrol_data);
    for (let v in this.userIduserInfoMapping) {
        if (v.userId != -1 && v.userId != this.userId) {
            mediacontrol_data.mediaid = v.mediaId
            mediacontrol_data.mediatype = 2
            this.emit('websocket_send', mediacontrol_data);
        }
    }
    this.emit('websocket_send', leaveroom_data);
    this.wx_pusher && this.wx_pusher.stop();
    this.wx_puller && this.wx_puller.stop();
    return 0
}
AnyChatMiniProgram.prototype.BRAC_Logout = function () {
    //console.log("BRAC_Logout");
    let data = {
        cmdcode: 'logout'
    }
    this.emit('websocket_send', data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_Release = function () {
    this.BRAC_Logout();
    this.wx_pusher && this.wx_pusher.stop();
    this.wx_puller && this.wx_puller.stop();
    this.wx_pusher = this.wx_puller = null
    return 0
}
AnyChatMiniProgram.prototype.BRAC_GetOnlineUser = function () {
    //console.log("BRAC_GetOnlineUser");
    return this.userIdList;
}
AnyChatMiniProgram.prototype.BRAC_GetRoomOnlineUsers = function (dwRoomId) {
    //console.log("BRAC_GetRoomOnlineUsers");
    if (dwRoomId == -1 || dwRoomId == this.roomId) {
        return this.userIdList;
    } else {
        return [];
    }
}
AnyChatMiniProgram.prototype.BRAC_EnumDevices = function () {
    //console.log("BRAC_EnumDevices");
    return ['user', 'environment']
}
AnyChatMiniProgram.prototype.BRAC_SelectVideoCapture = function (deviceType, deviceName) {
    //console.log("BRAC_SelectVideoCapture");
    let _this = this
    if (this.currentDevice == "environment" && deviceName == "user") {
        this.wx_pusher.switchCamera({
            success: function () {
                _this.currentDevice = 'user'
            }
        })
    } else if (this.currentDevice == "user" && deviceName == "environment") {
        this.wx_pusher.switchCamera({
            success: function () {
                _this.currentDevice = 'environment'
            }
        })
    } else {
        return -1
    }
}
AnyChatMiniProgram.prototype.BRAC_GetCurrentDevice = function () {
    //console.log("BRAC_GetCurrentDevice");
    return this.currentDevice
}
AnyChatMiniProgram.prototype.BRAC_UserCameraControl = function (dwUserId, bOpen) {
    //console.log("BRAC_UserCameraControl", dwUserId, bOpen);
    if (this.userId == dwUserId) { dwUserId = -1 }
    let mid;
    let mediatype;
    if (dwUserId == -1) {
        mid = this.mediaId
        mediatype = 1
    } else {
        mediatype = 2
        let userInfo = this.userIduserInfoMapping[dwUserId] || this.userIduserInfoMappingBackup[dwUserId] || {}
        mid = userInfo.mediaId || ''
    }
    let mediacontrol_data = {
        cmdcode: 'mediacontrol',
        mediaid: mid,
        mediatype: mediatype,
        controltype: bOpen,
        jsonbuf: ''
    }
    if (bOpen == 1) {
        if (!this.mediaDeviceStatus[dwUserId]) {
            this.mediaDeviceStatus[dwUserId] = 1
            this.emit('websocket_send', mediacontrol_data);
        }
    } else if (bOpen == 0) {
        if (this.mediaDeviceStatus[dwUserId]) {
            this.emit('websocket_send', mediacontrol_data);
            this.mediaDeviceStatus[dwUserId] = 0
        }
    }
    let usercameracontrol_data = {
        cmdcode: 'usercameracontrol',
        mediaid: mid,
        userid: dwUserId,
        open: bOpen
    }
    this.emit('websocket_send', usercameracontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_UserCameraControlEx = function (dwUserId, bOpen, dwStreamIndex, dwFlags, szStrParam) {
    //console.log("BRAC_UserCameraControlEx");
    if (this.userId == dwUserId) { dwUserId = -1 }
    let mid;
    let mediatype;
    if (dwUserId == -1) {
        mid = this.mediaId
        mediatype = 1
    } else {
        mediatype = 2
        let userInfo = this.userIduserInfoMapping[dwUserId] || this.userIduserInfoMappingBackup[dwUserId] || {}
        mid = userInfo.mediaId || ''
    }
    let mediacontrol_data = {
        cmdcode: 'mediacontrol',
        mediaid: mid,
        mediatype: mediatype,
        controltype: bOpen,
        jsonbuf: ''
    }
    if (bOpen == 1) {
        if (!this.mediaDeviceStatus[dwUserId]) {
            this.mediaDeviceStatus[dwUserId] = 1
            this.emit('websocket_send', mediacontrol_data);
        }
    } else if (bOpen == 0) {
        if (this.mediaDeviceStatus[dwUserId]) {
            this.emit('websocket_send', mediacontrol_data);
            this.mediaDeviceStatus[dwUserId] = 0
        }
    }
    let usercameracontrol_data = {
        cmdcode: 'usercameracontrolex',
        mediaid: mid,
        userid: dwUserId,
        open: bOpen,
        streamindex: dwStreamIndex,
        flags: dwFlags,
        strparam: szStrParam
    }
    this.emit('websocket_send', usercameracontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_UserSpeakControl = function (dwUserId, bOpen) {
    //console.log("BRAC_UserSpeakControl", dwUserId, bOpen);
    if (this.userId == dwUserId) { dwUserId = -1 }
    let mid;
    let mediatype;
    if (dwUserId == -1) {
        mid = this.mediaId
        mediatype = 1
    } else {
        mediatype = 2
        let userInfo = this.userIduserInfoMapping[dwUserId] || this.userIduserInfoMappingBackup[dwUserId] || {}
        mid = userInfo.mediaId || ''
    }
    let mediacontrol_data = {
        cmdcode: 'mediacontrol',
        mediaid: mid,
        mediatype: mediatype,
        controltype: bOpen,
        jsonbuf: ''
    }
    if (bOpen == 1) {
        if (!this.mediaDeviceStatus[dwUserId]) {
            this.mediaDeviceStatus[dwUserId] = 1
            this.emit('websocket_send', mediacontrol_data);
        }
    } else if (bOpen == 0) {
        if (this.mediaDeviceStatus[dwUserId]) {
            this.emit('websocket_send', mediacontrol_data);
            this.mediaDeviceStatus[dwUserId] = 0
        }
    }
    let userspeakcontrol_data = {
        cmdcode: 'userspeakcontrol',
        mediaid: mid,
        userid: dwUserId,
        open: bOpen
    }
    this.emit('websocket_send', userspeakcontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_UserSpeakControlEx = function (dwUserId, bOpen, dwStreamIndex, dwFlags, szStrParam) {
    //console.log("BRAC_UserSpeakControlEx", dwUserId, bOpen);
    if (this.userId == dwUserId) { dwUserId = -1 }
    let mid;
    let mediatype;
    if (dwUserId == -1) {
        mid = this.mediaId
        mediatype = 1
    } else {
        mediatype = 2
        let userInfo = this.userIduserInfoMapping[dwUserId] || this.userIduserInfoMappingBackup[dwUserId] || {}
        mid = userInfo.mediaId || ''
    }
    let mediacontrol_data = {
        cmdcode: 'mediacontrol',
        mediaid: mid,
        mediatype: mediatype,
        controltype: bOpen,
        jsonbuf: ''
    }
    if (bOpen == 1) {
        if (!this.mediaDeviceStatus[dwUserId]) {
            this.mediaDeviceStatus[dwUserId] = 1
            this.emit('websocket_send', mediacontrol_data);
        }
    } else if (bOpen == 0) {
        if (this.mediaDeviceStatus[dwUserId]) {
            this.emit('websocket_send', mediacontrol_data);
            this.mediaDeviceStatus[dwUserId] = 0
        }
    }
    let userspeakcontrol_data = {
        cmdcode: 'userspeakcontrolex',
        mediaid: mid,
        userid: dwUserId,
        open: bOpen,
        streamindex: dwStreamIndex,
        flags: dwFlags,
        strparam: szStrParam
    }
    this.emit('websocket_send', userspeakcontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_StreamRecordCtrl = function () {
    //console.log("BRAC_StreamRecordCtrl");
    //anychat.StreamRecordCtrl(dwUserId, bStartRecord, dwFlags, dwParam);
}
AnyChatMiniProgram.prototype.BRAC_StreamRecordCtrlEx = function () {
    //console.log("BRAC_StreamRecordCtrlEx");
    // if(bSupportStreamRecordCtrlEx)
    // 	return anychat.StreamRecordCtrlEx(dwUserId, bStartRecord, dwFlags, dwParam, lpUserStr);
    // else
    // 	return anychat.StreamRecordCtrl(dwUserId, bStartRecord, dwFlags, dwParam);
}
AnyChatMiniProgram.prototype.BRAC_SnapShot = function () {
    //console.log("BRAC_SnapShot");
    //anychat.SnapShot(dwUserId, dwFlags, dwParam);
}
AnyChatMiniProgram.prototype.BRAC_TransBuffer = function (dwUserId, lpBuf) {
    //console.log("BRAC_TransBuffer");
    //anychat.TransBuffer(dwUserId, lpBuf, 0);
    let data = {
        cmdcode: 'transbuffer',
        userid: dwUserId,
        jsonbuf: lpBuf
    }
    this.emit('websocket_send', data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_TransBufferEx = function () {
    //console.log("BRAC_TransBufferEx");
    //anychat.TransBufferEx(dwUserId, lpBuf, wParam, lParam, dwFlags);
}
AnyChatMiniProgram.prototype.BRAC_TransFile = function () {
    //console.log("BRAC_TransFile");
    //anychat.TransFile(dwUserId, lpLocalPathName, wParam, lParam, dwFlags);
}
AnyChatMiniProgram.prototype.BRAC_QueryTransTaskInfo = function () {
    //console.log("BRAC_QueryTransTaskInfo");
}
AnyChatMiniProgram.prototype.BRAC_CancelTransTask = function () {
    //console.log("BRAC_CancelTransTask");
}
AnyChatMiniProgram.prototype.BRAC_SendTextMessage = function () {
    //console.log("BRAC_SendTextMessage");
    //anychat.SendTextMessage(dwUserId, bSecret, lpMsgBuf, 0);
}
AnyChatMiniProgram.prototype.BRAC_SetSDKOption = function (dwObjectType, optval) {
    //console.log("BRAC_SetSDKOption");
    let optype = Object.prototype.toString.call(optval);
    let cmdcode = ''
    if (optype == '[object String]') {
        cmdcode = 'setsdkoptionstring'
    } else if (optype == '[object Number]') {
        cmdcode = 'setsdkoptionint'
    }
    let setsdkoption_data = {
        cmdcode: cmdcode,
        optname: dwObjectType,
        optval: optval
    }
    this.emit('websocket_send', setsdkoption_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_SDKControl = function (ctrlcode, param) {
    let sdkcontrol_data = {
        cmdcode: 'sdkcontrol',
        ctrlcode: ctrlcode,
        param: param
    }
    this.emit('websocket_send', sdkcontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_GetSDKOptionInt = function () {
    //console.log("BRAC_GetSDKOptionInt");
}
AnyChatMiniProgram.prototype.BRAC_GetSDKOptionString = function () {
    //console.log("BRAC_GetSDKOptionString");
}
AnyChatMiniProgram.prototype.BRAC_GetSDKOptionStringEx = function () {
    //console.log("BRAC_GetSDKOptionStringEx");
}
// 视频呼叫事件控制（请求、回复、挂断等）
AnyChatMiniProgram.prototype.BRAC_VideoCallControl = function (dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr) {
    //console.log("BRAC_VideoCallControl", dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr);
    var videocallcontrol_data = {
        cmdcode: 'videocallcontrol',
        eventtype: dwEventType,
        userid: dwUserId,
        errorcode: dwErrorCode,
        flags: dwFlags,
        param: dwParam,
        userstr: szUserStr
    };
    this.emit('websocket_send', videocallcontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_GetUserInfo = function () {
    //console.log("BRAC_GetUserInfo");
}
AnyChatMiniProgram.prototype.BRAC_UserInfoControl = function () {
    //console.log("BRAC_UserInfoControl");
}
AnyChatMiniProgram.prototype.BRAC_ObjectGetIntValue = function (dwObjectType, dwObjectId, dwInfoName) {
    //console.log("BRAC_ObjectGetIntValue");
    let objectgetvalue_data = {
        cmdcode: 'objectgetvalue',
        objecttype: dwObjectType,
        objectid: dwObjectId,
        infoname: dwInfoName,
        valuetype: 0
    }
    // this.emit('websocket_send', objectgetvalue_data);
    let intValue;
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AREA) {
        if (dwInfoName == anychatdefine.ANYCHAT_AREA_INFO_AGENTCOUNT) {
            intValue = this.realtimeAreaStatus[dwObjectId].agentcount;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AREA_INFO_GUESTCOUNT) {
            intValue = this.realtimeAreaStatus[dwObjectId].guestcount;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AREA_INFO_QUEUEUSERCOUNT) {
            intValue = this.realtimeAreaStatus[dwObjectId].queueusercount;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AREA_INFO_QUEUECOUNT) {
            intValue = this.realtimeAreaStatus[dwObjectId].queuecount;
        }
    }
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE) {
        if (dwInfoName == anychatdefine.ANYCHAT_QUEUE_INFO_MYSEQUENCENO) {
            intValue = this.realtimeQueueStatus[dwObjectId].mysequenceno;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_QUEUE_INFO_BEFOREUSERNUM) {
            intValue = this.realtimeQueueStatus[dwObjectId].beforeusernum;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_QUEUE_INFO_MYENTERQUEUETIME) {
            intValue = this.realtimeQueueStatus[dwObjectId].myenterqueuetime;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_QUEUE_INFO_LENGTH) {
            intValue = this.realtimeQueueStatus[dwObjectId].queuelength;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_QUEUE_INFO_WAITTIMESECOND) {
            intValue = this.realtimeQueueStatus[dwObjectId].waittimesecond;
        }
    }
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AGENT) {
        if (dwInfoName == anychatdefine.ANYCHAT_AGENT_INFO_SERVICESTATUS) {
            intValue = this.realtimeAgentStatus[dwObjectId].servicestatus;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AGENT_INFO_SERVICEUSERID) {
            intValue = this.realtimeAgentStatus[dwObjectId].serviceuserid;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AGENT_INFO_SERVICEBEGINTIME) {
            intValue = this.realtimeAgentStatus[dwObjectId].servicebegintime;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AGENT_INFO_SERVICETOTALTIME) {
            intValue = this.realtimeAgentStatus[dwObjectId].servicetotaltime;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_AGENT_INFO_SERVICETOTALNUM) {
            intValue = this.realtimeAgentStatus[dwObjectId].servicetotalnum;
        }
    }

    return intValue;
}
AnyChatMiniProgram.prototype.BRAC_ObjectGetStringValue = function (dwObjectType, dwObjectId, dwInfoName) {
    //console.log("BRAC_ObjectGetStringValue");
    let objectgetvalue_data = {
        cmdcode: 'objectgetvalue',
        objecttype: dwObjectType,
        objectid: dwObjectId,
        infoname: dwInfoName,
        valuetype: 1
    }
    // this.emit('websocket_send', objectgetvalue_data);
    let stringValue;
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AREA) {
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_NAME) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].objectname;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_FLAGS) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].flags;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_PRIORITY) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].priority;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_ATTRIBUTE) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].attribute;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_DESCRIPTION) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].description;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_INTTAG) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].inttag;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_STRINGTAG) {
            stringValue = this.areaIdareaInfoMapping[dwObjectId].stringtag;
        }
    }
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE) {
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_NAME) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].objectname;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_FLAGS) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].flags;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_PRIORITY) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].priority;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_ATTRIBUTE) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].attribute;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_DESCRIPTION) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].description;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_INTTAG) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].inttag;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_STRINGTAG) {
            stringValue = this.queueIdqueueInfoMapping[dwObjectId].stringtag;
        }
    }
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AGENT) {
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_NAME) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].objectname;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_FLAGS) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].flags;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_PRIORITY) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].priority;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_ATTRIBUTE) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].attribute;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_DESCRIPTION) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].description;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_INTTAG) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].inttag;
        }
        if (dwInfoName == anychatdefine.ANYCHAT_OBJECT_INFO_STRINGTAG) {
            stringValue = this.agentIdagentInfoMapping[dwObjectId].stringtag;
        }
    }

    return stringValue;
}
AnyChatMiniProgram.prototype.BRAC_ObjectSetValue = function (dwObjectType, dwObjectId, dwInfoName, value) {
    //console.log("BRAC_ObjectSetValue");
    let dwFlags = 0
    if (Object.prototype.toString.call(value) == '[object String]') {
        dwFlags = 1
    }
    let objectsetvalue_data = {
        cmdcode: 'objectsetvalue',
        objecttype: dwObjectType,
        objectid: dwObjectId,
        infoname: dwInfoName,
        valuetype: dwFlags,
        infovalue: value
    }
    this.emit('websocket_send', objectsetvalue_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_ObjectControl = function (dwObjectType, dwObjectId, dwCtrlCode, dwParam1, dwParam2, dwParam3, dwParam4, strParam) {
    //console.log("BRAC_ObjectControl");
    let objectcontrol_data = {
        cmdcode: 'objectcontrol',
        objecttype: dwObjectType,
        objectid: dwObjectId,
        ctrlcode: dwCtrlCode,
        param1: dwParam1,
        param2: dwParam2,
        param3: dwParam3,
        param4: dwParam4,
        strparam: strParam
    }
    this.emit('websocket_send', objectcontrol_data);
    return 0
}
AnyChatMiniProgram.prototype.BRAC_SetUserStreamInfo = function () {
    //console.log("BRAC_SetUserStreamInfo");
}
AnyChatMiniProgram.prototype.BRAC_ObjectGetIdList = function (dwObjectType) {
    if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AREA) {
        return Object.keys(this.areaIdareaInfoMapping)
    } else if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_QUEUE) {
        return Object.keys(this.queueIdqueueInfoMapping)
    } else if (dwObjectType == anychatdefine.ANYCHAT_OBJECT_TYPE_AGENT) {
        return Object.keys(this.agentIdagentInfoMapping)
    }
    return 0
}

module.exports = AnyChatMiniProgram;
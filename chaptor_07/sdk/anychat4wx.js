
const AnyChat = require('./anychatwxsdk')
const ANYCHAT_DEFINE_TIMEOUT = 30; //会话超时时间
const ANYCHAT_HEARTBEAT_TIMEOUT = 5000; //心跳包间隔时间

const isObject = p => {
    return Object.prototype.toString.call(p) === '[object Object]'
}
const isString = p => {
    return Object.prototype.toString.call(p) === '[object String]'
}
const isArray = p => {
    return Object.prototype.toString.call(p) === '[object Array]'
}

const anychat = new AnyChat()

function Connect(wss_url) {
    anychat.wss_url = wss_url;
    anychat.signaling = wx.connectSocket({
        url: wss_url,
        protocols: ['anychat-protocol']
    })
    anychat.signaling.onOpen(function (open) {
        anychat.emit('websocket_open', open)
    });
    anychat.signaling.onClose(function (close) {
        anychat.emit('websocket_close', close)
    });
    anychat.signaling.onError(function (error) {
        anychat.emit('websocket_error', error)
    });
    anychat.signaling.onMessage(function (data) {
        anychat.emit('websocket_message', data)
    });
}
function Reconnect(faild_info) {
    if (!anychat.wss_url) return
    anychat.OnSignalingError(faild_info)
    clearInterval(anychat.reconnect_handle)
    let timeout = ANYCHAT_DEFINE_TIMEOUT
    anychat.reconnect_handle = setInterval(function () {
        if (timeout > 0) {
            anychat.signaling = wx.connectSocket({
                url: anychat.wss_url,
                protocols: ['anychat-protocol']
            })
            timeout -= 5;
        } else {
            clearInterval(anychat.reconnect_handle);
            anychat.OnAnyChatLinkClose(faild_info)
        }
    }, 5000);
}
function PreParseJSON(message_info) {
    let pldata = {}
    try {
        pldata = JSON.parse(message_info.data)
    } catch (e) {
        console.error('JSON.parse error: ', e)
    }
    if (pldata.eventname == 'notify' && anychat.signaling && anychat.signaling) {
        let ack_data = {
            eventname: 'ack',
            ssrc: 0,
            data: '',
            seq: pldata.seq
        };
        if (anychat.signaling && anychat.signaling.readyState == 1) {
            anychat.signaling.send({
                data: JSON.stringify(ack_data)
            });
        }
    }
    let redata = {}
    if (isString(pldata.data)) {
        try {
            redata = JSON.parse(pldata.data)
        } catch (e) {
            console.error('JSON.parse error: ', e)
        }
    } else {
        redata = pldata.data
    }
    return redata;
}
anychat.on('websocket_connect', function (wss_url) {
    Connect(wss_url)
})
anychat.on('websocket_open', function (open_info) {
    console.info('websocket_open', open_info)
    clearInterval(anychat.reconnect_handle);
    let open_data = {
        cmdcode: 'connect',
        version: anychat.ANYCHAT_SDK_VERSION,
        accesstype: 3
    }
    let heartbeat_data = {
        eventname: 'request',
        ssrc: 0,
        data: {
            cmdcode: 'heartbeat'
        }
    };
    anychat.heartbeat_handle = setInterval(function () {
        if (anychat.signaling && anychat.signaling.readyState == 1) {
            anychat.signaling.send({
                data: JSON.stringify(heartbeat_data)
            });
        }
    }, ANYCHAT_HEARTBEAT_TIMEOUT);
    anychat.emit('websocket_send', open_data)
})
anychat.on('websocket_close', function (close_info) {
    console.error('websocket_close', close_info)
    Reconnect(close_info)
})
anychat.on('websocket_error', function (error_info) {
    console.error('websocket_error', error_info)
    Reconnect(error_info)
})
anychat.on('websocket_send', function (send_info) {
    // console.info('websocket_send', send_info)
    let websocket_data = {
        eventname: 'request',
        ssrc: 0,
        data: send_info,
        seq: anychat.seq
    };
    if (anychat.signaling && anychat.signaling.readyState == 1) {
        anychat.signaling.send({
            data: JSON.stringify(websocket_data)
        });
    }
    anychat.seq++;
})
anychat.on('websocket_message', function (message_info) {
    let pldata = PreParseJSON(message_info) //格式化websocket消息
    try {
        let message_eventtype = JSON.parse(message_info.data).eventname
        message_eventtype !== "ack" && console.log('websocket_message: ', message_info, 'pldata: ', pldata)
    } catch (e) {
        console.error('JSON.parse(message_info.data).eventname: ', e)
    }
    let pljson = '';
    let errorcode = pldata.errorcode || 0;
    let cmdcode = pldata.cmdcode || '';
    let eventtype = pldata.eventtype || 0;
    let userId = pldata.userid || 0;
    let roomid = -1;
    switch (cmdcode) {
        case 'connect':
            anychat.OnAnyChatConnect(!errorcode, errorcode)
            break;
        case 'login':
            //console.log('login:', userId)
            anychat.userId = userId
            anychat.OnAnyChatLoginSystem(userId, errorcode)
            break;
        case 'logout':
            anychat.wss_url = '';
            anychat.signaling && anychat.signaling.close();
            anychat.signaling = null;
            break;
        case 'enterroom':
        case 'enterroomex':
            roomid = pldata.roomid
            anychat.roomId = roomid
            anychat.OnAnyChatEnterRoom(roomid, errorcode)
            break;
        case 'transbuffer':
            //console.log('transbuffer', pldata)
            anychat.OnAnyChatTransBuffer(pldata.userid, pldata.jsonbuf, )
            break;
        case 'transbufferex':
            //console.log('transbufferex', pldata)
            break;
        case 'useratroom':
            //console.log('useratroom', pldata)
            let benter = pldata.benter
            if (benter == 1) {
                anychat.userIdList.push(userId)
                anychat.userIduserInfoMapping[userId] = {
                    username: pldata.username,
                    camerastate: pldata.camerastate,
                    speakstate: pldata.speakstate,
                    errorcode: pldata.errorcode,
                }
                let useratroom_guuid_data = {
                    cmdcode: 'genericconsult',
                    mediaid: '',
                    type: 1,
                    jsonbuf: {
                        type: 1,
                        requuid: `${userId}-${anychat.roomId}-0`
                    }
                }
                anychat.emit('websocket_send', useratroom_guuid_data);
            } else if (benter == 0) {
                anychat.userIdList = anychat.userIdList.map(function (v) {
                    return v != userId
                })
                anychat.userIduserInfoMappingBackup[userId] = anychat.userIduserInfoMapping[userId]
                delete anychat.userIduserInfoMapping[userId]
            }
            anychat.OnAnyChatUserAtRoom(userId, benter)
            break;
        case 'onlineuser':
            //console.log('onlineuser', pldata)
            roomid = pldata.roomid
            let userIdList = []
            let userInfoList = []
            let userIduserInfoMapping = {}
            try {
                let roomuserinfo = JSON.parse(pldata.useridlist)
                userIdList = roomuserinfo.useridlist || []
                userInfoList = roomuserinfo.userlist || []
            } catch (e) {
                //console.log('onlineuser error: ', e)
            }
            let onlineuser_guuid_data = {
                cmdcode: 'genericconsult',
                mediaid: '',
                type: 1,
                jsonbuf: {
                    type: 1,
                    requuid: `${anychat.userId}-${anychat.roomId}-0`
                }
            }
            anychat.emit('websocket_send', onlineuser_guuid_data);
            userInfoList.forEach(function (v) {
                let onlineuser_guuid_data = {
                    cmdcode: 'genericconsult',
                    mediaid: '',
                    type: 1,
                    jsonbuf: {
                        type: 1,
                        requuid: `${v.userid}-${anychat.roomId}-0`
                    }
                }
                userIduserInfoMapping[v.userid] = v
                anychat.emit('websocket_send', onlineuser_guuid_data);
            });
            let dwUserCount = userIdList.length + 1
            anychat.userIduserInfoMapping = userIduserInfoMapping
            anychat.userIdList = userIdList
            anychat.OnAnyChatRoomOnlineUser(dwUserCount, roomid)
            break;
        case 'genericconsult':
            //console.log('genericconsult: ', pldata)
            pljson = pldata.jsonbuf
            let jsonbuf;
            let innerjsonbuf;
            try {
                jsonbuf = JSON.parse(pljson)
                innerjsonbuf = JSON.parse(jsonbuf.jsonbuf)
            } catch (e) {
                console.error('genericconsult JSON parse error: ', e)
                jsonbuf = {}
                innerjsonbuf = {}
            }
            if (pldata.type == 1) {
                //console.log('jsonbuf,innerjsonbuf:', jsonbuf, innerjsonbuf);
                let requuid = innerjsonbuf.requuid
                let mediaid = innerjsonbuf.mediaid
                let infoarray = requuid && requuid.split('-') || []
                let userId = -infoarray[1]
                let mediatype = 2
                if (infoarray[0]) {
                    userId = infoarray[0]
                }
                //console.log('anychat.mediaId.userId', userId, mediaid)
                if (userId == -1 || userId == anychat.userId) {
                    mediatype = 1
                    anychat.mediaId = mediaid
                } else {
                    anychat.userIduserInfoMapping[userId].mediaId = mediaid
                }
                let rtmpconfig_data = {
                    cmdcode: 'genericconsult',
                    mediaid: mediaid,
                    type: 2,
                    jsonbuf: {
                        type: 2,
                        mediaid: mediaid,
                        userid: userId,
                        roomid: anychat.roomId,
                        streamindex: 0,
                        mediatype: mediatype
                    }
                }
                anychat.emit('websocket_send', rtmpconfig_data);
            } else if (pldata.type == 2) {
                let rtmpurl = innerjsonbuf.rtmpurl
                //console.log('innerjsonbuf,rtmpurl', innerjsonbuf, rtmpurl)
                let mediaId = pldata.mediaid
                if (mediaId == anychat.mediaId) { //自身推流地址
                    anychat.pusher_rtmpurl[anychat.userId] = rtmpurl
                    anychat.pusher_rtmpurl[-1] = rtmpurl
                } else {    //对方拉流地址
                    for (let key in anychat.userIduserInfoMapping) {
                        if (anychat.userIduserInfoMapping[key].mediaId == mediaId) {
                            anychat.userIduserInfoMapping[key].rtmpurl = rtmpurl;
                            anychat.puller_rtmpurl[key] = rtmpurl
                            break;
                        }
                    }
                }
            }
            console.info('anychat.pusher_rtmpurl,anychat.puller_rtmpurl: ', anychat.pusher_rtmpurl, anychat.puller_rtmpurl)
            break;
        case 'objectevent':
            //console.log('objectevent:pldata',pldata);
            pljson = pldata.jsonbuf || '""'
            let dwObjectType = pldata.objecttype
            let dwObjectId = pldata.objectid
            let dwEventType = pldata.eventtype
            let dwParam1 = pldata.param1 || 0
            let dwParam2 = pldata.param2 || 0
            let dwParam3 = pldata.param3 || 0
            let dwParam4 = pldata.param4 || 0
            let strParam = pldata.strParam || '""'
            if (isString(pljson)) {
                try {
                    jsonbuf = JSON.parse(pljson)
                } catch (e) {
                    console.error('objectevent json parse error', e)
                    jsonbuf = null
                }
            }
            if (dwEventType == 0) {
                if (dwObjectType == 4) {
                    anychat.areaIdareaInfoMapping[dwObjectId] = jsonbuf
                } else if (dwObjectType == 5) {
                    anychat.queueIdqueueInfoMapping[dwObjectId] = jsonbuf
                } else if (dwObjectType == 6) {
                    anychat.agentIdagentInfoMapping[dwObjectId] = jsonbuf
                } else {
                    console.error('objectevent objecttype error, objecttype undefined.')
                }
            } else if (dwEventType == -1) {
                if (dwObjectType == 4) {
                    anychat.realtimeAreaStatus[dwObjectId] = jsonbuf
                } else if (dwObjectType == 5) {
                    anychat.realtimeQueueStatus[dwObjectId] = jsonbuf
                } else if (dwObjectType == 6) {
                    anychat.realtimeAgentStatus[dwObjectId] = jsonbuf
                } else {
                    console.error('objectevent objecttype error, objecttype undefined.')
                }
            } else {
                if (dwEventType == 405) {
                    // 离开营业厅时，把原来营业厅的队列数据清掉
                    anychat.queueIdqueueInfoMapping = {};
                    anychat.realtimeQueueStatus = {};
                }
                anychat.OnAnyChatObjectEvent(dwObjectType, dwObjectId, dwEventType, dwParam1, dwParam2, dwParam3, dwParam4, strParam)
            }
            break;
        case 'videocallevent':
            //console.log('videocallevent:pldata', pldata);
            dwEventType = pldata.eventtype
            let dwUserId = pldata.userid
            let dwErrorCode = errorcode
            let dwFlags = pldata.flags
            let dwParam = pldata.param
            let szUserStr = pldata.jsonbuf
            anychat.OnAnyChatVideoCallEvent(dwEventType, dwUserId, dwErrorCode, dwFlags, dwParam, szUserStr)
            break;
        default:
            break;
    }
})

module.exports = anychat
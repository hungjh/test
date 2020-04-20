const WM_GV = 0x0400 + 200
module.exports = {

    BRAC_AD_WAVEIN: 0,                              // 输入设备：Mic
    BRAC_AD_WAVEOUT: 1,                             // 输出设备：Wave

    // 设备类型定义（API：BRAC_EnumDevices 传入参数）
    BRAC_DEVICE_VIDEOCAPTURE: 1,                    // 视频采集设备
    BRAC_DEVICE_AUDIOCAPTURE: 2,                    // 音频采集设备
    BRAC_DEVICE_AUDIOPLAYBACK: 3,                   // 音频播放设备

    // 内核参数定义（API：BRAC_SetSDKOption、BRAC_GetSDKOption 传入参数）
    BRAC_SO_AUDIO_VADCTRL: 1,                       // 音频静音检测控制（参数为：int型：1打开，0关闭）
    BRAC_SO_AUDIO_NSCTRL: 2,                        // 音频噪音抑制控制（参数为：int型：1打开，0关闭）
    BRAC_SO_AUDIO_ECHOCTRL: 3,                      // 音频回音消除控制（参数为：int型：1打开，0关闭）
    BRAC_SO_AUDIO_AGCCTRL: 4,                       // 音频自动增益控制（参数为：int型：1打开，0关闭）
    BRAC_SO_AUDIO_CAPTUREMODE: 5,                   // 音频采集模式设置（参数为：int型：0 发言模式，1 放歌模式，2 卡拉OK模式，3 线路输入模式）
    BRAC_SO_AUDIO_MICBOOST: 6,                      // 音频采集Mic增强控制（参数为：int型：0 取消，1 选中，2 设备不存在[查询时返回值]）
    BRAC_SO_AUDIO_AUTOPARAM: 7,                     // 根据音频采集模式，自动选择合适的相关参数，包括编码器、采样参数、码率参数等（参数为int型：1 启用，0 关闭[默认]）
    BRAC_SO_AUDIO_MONOBITRATE: 8,                   // 设置单声道模式下音频编码目标码率（参数为：int型，单位：bps）
    BRAC_SO_AUDIO_STEREOBITRATE: 9,                 // 设置双声道模式下音频编码目标码率（参数为：int型，单位：bps）
    BRAC_SO_AUDIO_PLAYDRVCTRL: 70,                  // 音频播放驱动选择（参数为：int型，0默认驱动， 1 DSound驱动， 2 WaveOut驱动， 3 Java播放[Android平台使用]）
    BRAC_SO_AUDIO_CNGCTRL: 71,                      // 舒适噪音生成控制（参数为：int型：1打开，0关闭）
    BRAC_SO_AUDIO_CODECID: 72,                      // 本地音频编码器ID设置（参数为int型，-1表示默认，如果设置的编码器ID不存在，则内核会采用默认的编码器）
    BRAC_SO_AUDIO_SOFTVOLMODE: 73,                  // 设置软件音量模式控制（参数为int型，1打开，0关闭[默认]），使用软件音量模式，将不会改变系统的音量设置
    BRAC_SO_AUDIO_RECORDDRVCTRL: 74,                // 音频采集驱动控制（参数为int型，0默认驱动， 1 DSound驱动， 2 WaveIn驱动， 3 Java采集[Android平台使用]）

    BRAC_SO_RECORD_VIDEOBR: 10,                     // 录像视频码率设置（参数为：int型，单位：bps）
    BRAC_SO_RECORD_AUDIOBR: 11,                     // 录像音频码率设置（参数为：int型，单位：bps）
    BRAC_SO_RECORD_TMPDIR: 12,                      // 录像文件临时目录设置（参数为字符串TCHAR类型，必须是完整的绝对路径）
    BRAC_SO_SNAPSHOT_TMPDIR: 13,                    // 快照文件临时目录设置（参数为字符串TCHAR类型，必须是完整的绝对路径）
    BRAC_SO_RECORD_FILETYPE: 140,                   // 录制文件类型设置（参数为：int型， 0 MP4[默认], 1 WMV, 2 FLV, 3 MP3）
    BRAC_SO_RECORD_WIDTH: 141,                      // 录制视频宽度设置（参数为：int型，如：320）
    BRAC_SO_RECORD_HEIGHT: 142,                     // 录制文件高度设置（参数为：int型，如：240）
    BRAC_SO_RECORD_FILENAMERULE: 143,               // 录制文件名命名规则（参数为：int型）
    BRAC_SO_RECORD_CLIPMODE: 144,                   // 录制视频裁剪模式（参数为：int型）
    BRAC_SO_RECORD_DISABLEDATEDIR: 145,             // 录制文件不按日期分目录保存，全部生成在指定文件夹中（参数为：int型， 0禁止[默认] 1 开启）

    BRAC_SO_CORESDK_TMPDIR: 14,                     // 设置AnyChat Core SDK临时目录（参数为字符串TCHAR类型，必须是完整的绝对路径）
    BRAC_SO_CORESDK_MAGICADJUST: 15,                // 内核调试参数
    BRAC_SO_CORESDK_LOADCODEC: 16,                  // 加载外部编解码器（参数为字符串TCHAR类型，必须是完整的绝对路径，包含文件名，或包含文件名的绝对路径）
    BRAC_SO_CORESDK_USEARMV6LIB: 17,                // 强制使用ARMv6指令集的库，android平台使用（参数为：int型，1使用ARMv6指令集， 0内核自动判断[默认]）
    BRAC_SO_CORESDK_USEHWCODEC: 18,                 // 使用平台内置硬件编解码器（参数为int型，0 不使用硬件编解码器[默认]  1 使用内置硬件编解码器）
    BRAC_SO_CORESDK_REMOTEDEBUG: 19,                // 远程调试（参数为int型，表示目标用户ID，复用参数长度为调试类型参数）

    BRAC_SO_CORESDK_PATH: 20,                       // 设置AnyChat Core SDK相关组件路径（参数为字符串TCHAR类型，必须是完整的绝对路径）
    BRAC_SO_CORESDK_DUMPCOREINFO: 21,               // 输出内核信息到日志文件中，便于分析故障原因（参数为：int型：1 输出）
    BRAC_SO_CORESDK_MAINVERSION: 22,                // 查询SDK主版本号号（参数为int型）
    BRAC_SO_CORESDK_SUBVERSION: 23,                 // 查询SDK从版本号（参数为int型）
    BRAC_SO_CORESDK_BUILDTIME: 24,                  // 查询SDK编译时间（参数为字符串TCHAR类型）
    BRAC_SO_CORESDK_ACTIVESTATE: 25,                // 应用程序活动状态控制（参数为int型， 1 应用程序处于活动状态， 0 应用程序处于非活动状态），适用于iPhone等设备程序可后台运行的场合
    BRAC_SO_CORESDK_EXTVIDEOINPUT: 26,              // 外部扩展视频输入控制（参数为int型， 0 关闭外部视频输入[默认]， 1 启用外部视频输入）
    BRAC_SO_CORESDK_EXTAUDIOINPUT: 27,              // 外部扩展音频输入控制（参数为int型， 0 关闭外部音频输入[默认]， 1 启用外部音频输入）
    BRAC_SO_CORESDK_LOWDELAYCTRL: 28,               // 低延迟模式控制（参数为int型，0 关闭低延迟模式[默认]， 1 启用低延迟模式）
    BRAC_SO_CORESDK_NEWGUID: 29,                    // 产生新的GUID字符串

    BRAC_SO_LOCALVIDEO_BITRATECTRL: 30,             // 本地视频编码码率设置（参数为int型，单位bps，同服务器配置：VideoBitrate）
    BRAC_SO_LOCALVIDEO_QUALITYCTRL: 31,             // 本地视频编码质量因子控制（参数为int型，同服务器配置：VideoQuality）
    BRAC_SO_LOCALVIDEO_GOPCTRL: 32,                 // 本地视频编码关键帧间隔控制（参数为int型，同服务器配置：VideoGOPSize）
    BRAC_SO_LOCALVIDEO_FPSCTRL: 33,                 // 本地视频编码帧率控制（参数为int型，同服务器配置：VideoFps）
    BRAC_SO_LOCALVIDEO_PRESETCTRL: 34,              // 本地视频编码预设参数控制（参数为int型，1-5）
    BRAC_SO_LOCALVIDEO_APPLYPARAM: 35,              // 应用本地视频编码参数，使得前述修改即时生效（参数为int型：1 使用新参数，0 使用默认参数）
    BRAC_SO_LOCALVIDEO_VIDEOSIZEPOLITIC: 36,        // 本地视频采集分辩率控制策略（参数为int型，0 自动向下逐级匹配[默认]；1 使用采集设备默认分辩率），当配置的分辩率不被采集设备支持时有效
    BRAC_SO_LOCALVIDEO_DEINTERLACE: 37,             // 本地视频反交织参数控制（参数为int型： 0 不进行反交织处理[默认]；1 反交织处理），当输入视频源是隔行扫描源（如电视信号）时通过反交织处理可以提高画面质量
    BRAC_SO_LOCALVIDEO_WIDTHCTRL: 38,               // 本地视频采集分辨率宽度控制（参数为int型，同服务器配置：VideoWidth）
    BRAC_SO_LOCALVIDEO_HEIGHTCTRL: 39,              // 本地视频采集分辨率高度控制（参数为int型，同服务器配置：VideoHeight）
    BRAC_SO_LOCALVIDEO_FOCUSCTRL: 90,               // 本地视频摄像头对焦控制（参数为int型，1表示自动对焦， 0表示手动对焦）
    BRAC_SO_LOCALVIDEO_PIXFMTCTRL: 91,              // 本地视频采集优先格式控制（参数为int型，-1表示智能匹配，否则优先采用指定格式，参考：BRAC_PixelFormat）
    BRAC_SO_LOCALVIDEO_OVERLAY: 92,                 // 本地视频采用Overlay模式（参数为int型，1表示采用Overlay模式， 0表示普通模式[默认]）
    BRAC_SO_LOCALVIDEO_CODECID: 93,                 // 本地视频编码器ID设置（参数为int型，-1表示默认，如果设置的编码器ID不存在，则内核会采用默认的编码器）
    BRAC_SO_LOCALVIDEO_ROTATECTRL: 94,              // 本地视频旋转控制（参数为int型，0表示不进行旋转，1表示垂直翻转）
    BRAC_SO_LOCALVIDEO_CAPDRIVER: 95,               // 本地视频采集驱动设置（参数为int型，0表示自动选择[默认]， 1 Video4Linux, 2 DirectShow, 3 Java采集[Android平台使用]）
    BRAC_SO_LOCALVIDEO_FIXCOLORDEVIA: 96,           // 修正视频采集颜色偏色（参数为int型，0表示关闭[默认]，1 开启）
    BRAC_SO_LOCALVIDEO_TVFORMAT: 104,               // 视频采集制式设置（参数为：int型，定义为DirectShow::strmif.h::AnalogVideoStandard，默认为：AnalogVideo_PAL_B）
    BRAC_SO_LOCALVIDEO_OVERLAYTIMESTAMP: 105,       // 迭加时间戳到本地视频（参数为：int型， 0 不迭加[默认]， 1 迭加）
    BRAC_SO_LOCALVIDEO_DEVICENAME: 106,             // 本地视频采集设备名称，用于设置打开指定摄像头设备（参数为字符串类型）
    BRAC_SO_LOCALVIDEO_CLIPMODE: 107,               // 本地视频裁剪模式（参数为int型， 0 自动[默认]，禁止自动旋转时有效）
    BRAC_SO_LOCALVIDEO_SCREENHWND: 108,             // 屏幕采集窗口句柄
    BRAC_SO_LOCALVIDEO_SCREENFLAGS: 109,            // 屏幕采集标志（参数为int型）
    BRAC_SO_LOCALVIDEO_VIRTUALBK: 111,              // 本地视频迭加虚拟背景（字符串类型，JSON格式，包括虚拟背景路径、是否开启以及其它参数项）

    BRAC_SO_NETWORK_P2PPOLITIC: 40,                 // 本地网络P2P策略控制（参数为：int型：0 禁止本地P2P，1 服务器控制P2P[默认]，2 上层应用控制P2P连接，3 按需建立P2P连接）
    BRAC_SO_NETWORK_P2PCONNECT: 41,                 // 尝试与指定用户建立P2P连接（参数为int型，表示目标用户ID），连接建立成功后，会通过消息反馈给上层应用，P2P控制策略:2时有效
    BRAC_SO_NETWORK_P2PBREAK: 42,                   // 断开与指定用户的P2P连接（参数为int型，表示目标用户ID）[暂不支持，保留]
    BRAC_SO_NETWORK_TCPSERVICEPORT: 43,             // 设置本地TCP服务端口（参数为int型），连接服务器之前设置有效
    BRAC_SO_NETWORK_UDPSERVICEPORT: 44,             // 设置本地UDP服务端口（参数为int型），连接服务器之前设置有效
    BRAC_SO_NETWORK_MULTICASTPOLITIC: 45,           // 组播策略控制（参数为int型，定义为常量：BRAC_MCPOLITIC_XXXX）
    BRAC_SO_NETWORK_TRANSBUFMAXBITRATE: 46,         // 传输缓冲区、文件最大码率控制（参数为int型，0 不限制，以最快速率传输[默认]， 否则表示限制码率，单位为：bps）
    BRAC_SO_NETWORK_AUTORECONNECT: 47,              // 网络掉线自动重连功能控制（参数为int型，0 关闭， 1 开启[默认]）

    BRAC_SO_PROXY_FUNCTIONCTRL: 50,                 // 本地用户代理功能控制，（参数为：int型，1启动代理，0关闭代理[默认]）
    BRAC_SO_PROXY_VIDEOCTRL: 51,                    // 本地用户代理视频控制，将本地视频变为指定用户的视频对外发布（参数为int型，表示其它用户的userid）
    BRAC_SO_PROXY_AUDIOCTRL: 52,                    // 本地用户代理音频控制，将本地音频变为指定用户的音频对外发布（参数同BRAC_SO_PROXY_VIDEOCTRL）

    BRAC_SO_STREAM_MAXBUFFERTIME: 60,               // 最大流缓冲时间（参数为int型，单位：毫秒，取值范围：500 ~ 5000，默认：800），发言模式设置值，歌曲模式会自动增加一倍
    BRAC_SO_STREAM_SMOOTHPLAYMODE: 61,              // 平滑播放模式（参数为int型，0 关闭[默认], 1 打开），打开状态下遇到视频丢帧时会继续播放（可能出现马赛克），不会卡住

    BRAC_SO_VIDEOSHOW_MODECTRL: 80,                 // 视频显示模式控制（参数为：int型，0 单画面显示，1 视频迭加显示）
    BRAC_SO_VIDEOSHOW_SETPRIMARYUSER: 81,           // 设置主显示用户编号（参数为：int型，用户ID号）
    BRAC_SO_VIDEOSHOW_SETOVERLAYUSER: 82,           // 设置迭加显示用户编号（参数为：int型，用户ID号）
    BRAC_SO_VIDEOSHOW_DRIVERCTRL: 83,               // 视频显示驱动控制（参数为：int型，0 默认驱动， 1 Windows DirectShow，2 Windows GDI，3 SDL, 4 Android2X）
    BRAC_SO_VIDEOSHOW_CLIPMODE: 86,                 // 远程视频显示旋转裁剪模式（参数为int型， 0 自动[默认]）

    BRAC_SO_CORESDK_TICKOUTUSER: 110,               // 从服务器上踢掉指定用户（参数为int型，表示目标用户ID）
    BRAC_SO_CORESDK_DEVICEMODE: 130,                // 设备模式控制（局域网设备之间可以互相通信，不依赖服务器；参数为int型，0 关闭[默认]，1 开启）
    BRAC_SO_CORESDK_SCREENCAMERACTRL: 131,          // 桌面共享功能控制（参数为：int型， 0 关闭[默认]， 1 开启）
    BRAC_SO_CORESDK_UPLOADLOGINFO: 134,             // 上传日志信息到服务器（参数为：int型，0 关闭[默认]， 1 开启）
    BRAC_SO_CORESDK_WRITELOG: 135,                  // 写入调试信息到本地日志文件中
    BRAC_SO_CORESDK_NEWLOGFILE: 136,                // 产生新的日志文件
    BRAC_SO_CORESDK_SUPPORTVIDEOCODEC: 210,         // 设置支持的视频编码器
    BRAC_SO_CORESDK_SUPPORTAUDIOCODEC: 211,         // 设置支持的音频编码器
    BRAC_SO_CORESDK_DISABLEMEDIACONSUL: 212,        // 禁止媒体协商
    BRAC_SO_CORESDK_QUERYTIMEOUTTIME: 213,          // 信息查询超时时间（参数为：int型，单位：ms，默认值1000）
    BRAC_SO_CORESDK_REMOTEASSISTHWND: 214,          // 远程协助窗口句柄
    BRAC_SO_CORESDK_REMOTEASSISTXPOS: 215,          // 远程协助窗口滚动条位置（X）
    BRAC_SO_CORESDK_REMOTEASSISTYPOS: 216,          // 远程协助窗口滚动条位置（Y）
    BRAC_SO_CORESDK_DISABLEDNSCONNECT: 219,         // 屏蔽DNS寻址
    BRAC_SO_CORESDK_LOGFILEROOTPATH: 220,           // 日志文件保存根路径（日志重定向，参数为字符串，绝对路径）
    BRAC_SO_CORESDK_LOGFILERULE: 221,               // 客户端日志文件保存规则（参数为int型，0 自动覆盖[默认] 1 按日期保存，不覆盖）
    BRAC_SO_CORESDK_FILEENCANDDEC: 222,             // 文件加解密控制（参数为字符串类型，JSON格式）
    BRAC_SO_CORESDK_PPTHELPERINIT: 223,             // PPT播报环境初始化
    BRAC_SO_CORESDK_PPTFILECTRL: 224,               // PPT文件控制

    BRAC_SO_UDPTRACE_MODE: 160,                     // UDP数据包跟踪模式
    BRAC_SO_UDPTRACE_PACKSIZE: 161,                 // UDP数据包跟踪的大小，单位：BYTE
    BRAC_SO_UDPTRACE_BITRATE: 162,                  // UDP数据包跟踪的包速率，单位：bps
    BRAC_SO_UDPTRACE_START: 163,                    // UDP数据包跟踪控制（参数为int型，1 启动， 0 停止）
    BRAC_SO_UDPTRACE_LOCALRECVNUM: 164,             // UDP数据包跟踪本地接收包数量
    BRAC_SO_UDPTRACE_SERVERRECVNUM: 165,            // UDP数据包跟踪服务器接收包数量
    BRAC_SO_UDPTRACE_SOURCESENDNUM: 166,            // UDP数据包跟踪源发包数量
    BRAC_SO_UDPTRACE_SENDUSERID: 167,               // UDP数据包跟踪源用户ID

    // 用户多媒体流参数定义（API：BRAC_GetUserStreamInfo 传入参数）
    BRAC_STREAMINFO_VIDEOWIDTH: 180,                // 视频流宽度
    BRAC_STREAMINFO_VIDEOHEIGHT: 181,               // 视频流高度
    BRAC_STREAMINFO_VIDEOFPS: 182,                  // 视频流帧率
    BRAC_STREAMINFO_VIDEOBITRATE: 183,              // 视频流码率，单位：bps
    BRAC_STREAMINFO_VIDEOCODECID: 184,              // 视频流编码器ID
    BRAC_STREAMINFO_VIDEOPACKLOSSRATE: 185,         // 视频流丢包率
    BRAC_STREAMINFO_ADUIOCHANNELS: 190,             // 音频流通道数
    BRAC_STREAMINFO_AUDIOSAMPLERATE: 191,           // 音频流采样率
    BRAC_STREAMINFO_AUDIOBITRATE: 192,              // 音频流码率，单位：bps
    BRAC_STREAMINFO_AUDIOCODECID: 193,              // 音频流编码器ID
    BRAC_STREAMINFO_AUDIOPACKLOSSRATE: 194,         // 音频流丢包率

    BRAC_SO_OBJECT_INITFLAGS: 200,                  // 业务对象身份初始化
    BRAC_SO_CLOUD_APPGUID: 300,                     // 云平台应用GUID（参数为：字符串类型，连接服务器之前设置）

    BRAC_SO_ENABLEWEBSERVICE: 11002,                // 启动本地Web服务
    BRAC_SO_LOCALPATH2URL: 11003,                   // 将本地路径转换为URL地址
    BRAC_SO_GETTASKPATHNAME: 11004,                 // 根据传输任务ID获取文件路径
    BRAC_SO_VIDEOBKIMAGE: 11006,                    // 设置视频背景图片

    // 传输任务信息参数定义（API：BRAC_QueryTransTaskInfo 传入参数）
    BRAC_TRANSTASK_PROGRESS: 1,                     // 传输任务进度查询（参数为：DOUBLE型，返回值0.0 ~ 100.0， 或参数为：DWORD型，返回值0 ~ 100）
    BRAC_TRANSTASK_BITRATE: 2,                      // 传输任务当前传输码率（参数为：int型，单位：bps）
    BRAC_TRANSTASK_STATUS: 3,                       // 传输任务当前状态（参数为：int型）
    BRAC_TRANSTASK_SAVEASPATH: 4,                   // 文件传输任务另存为路径设置，含文件名（参数为字符串TCHAR类型）

    // 录像功能标志定义（API：BRAC_StreamRecordCtrl 传入参数）
    BRAC_RECORD_FLAGS_VIDEO: 0x00000001,            // 录制视频
    BRAC_RECORD_FLAGS_AUDIO: 0x00000002,            // 录制音频
    BRAC_RECORD_FLAGS_SERVER: 0x00000004,           // 服务器端录制
    BRAC_RECORD_FLAGS_MIXAUDIO: 0x00000010,         // 录制音频时，将其它人的声音混音后录制
    BRAC_RECORD_FLAGS_MIXVIDEO: 0x00000010,         // 录制视频时，将其它人的视频迭加后录制
    BRAC_RECORD_FLAGS_ABREAST: 0x00000100,          // 录制视频时，将其它人的视频并列录制
    BRAC_RECORD_FLAGS_STEREO: 0x00000200,           // 录制音频时，将其它人的声音混合为立体声后录制
    BRAC_RECORD_FLAGS_SNAPSHOT: 0x00000400,         // 拍照
    BRAC_RECORD_FLAGS_LOCALCB: 0x00000800,          // 触发本地回调
    BRAC_RECORD_FLAGS_STREAM: 0x00001000,           // 对视频流进行录制（效率高，但可能存在视频方向旋转的问题）
    BRAC_RECORD_FLAGS_USERFILENAME: 0x00002000,     // 用户自定义文件名

    // 客户端、服务器端录制标志定义保持统一
    ANYCHAT_RECORD_FLAGS_VIDEO: 0x00000001,
    ANYCHAT_RECORD_FLAGS_AUDIO: 0x00000002,
    ANYCHAT_RECORD_FLAGS_SERVER: 0x00000004,
    ANYCHAT_RECORD_FLAGS_MIXAUDIO: 0x00000010,
    ANYCHAT_RECORD_FLAGS_MIXVIDEO: 0x00000010,
    ANYCHAT_RECORD_FLAGS_ABREAST: 0x00000100,
    ANYCHAT_RECORD_FLAGS_STEREO: 0x00000200,
    ANYCHAT_RECORD_FLAGS_SNAPSHOT: 0x00000400,
    ANYCHAT_RECORD_FLAGS_LOCALCB: 0x00000800,
    ANYCHAT_RECORD_FLAGS_STREAM: 0x00001000,
    ANYCHAT_RECORD_FLAGS_USERFILENAME: 0x00002000,

    // 视频裁剪模式定义
    ANYCHAT_VIDEOCLIPMODE_AUTO: 0,                  // 默认模式，以最大比例进行裁剪，然后再整体拉伸，画面保持比例，但被裁剪画面较大
    ANYCHAT_VIDEOCLIPMODE_OVERLAP: 1,               // 重叠模式，只取最大有效部分，对边缘进行裁剪
    ANYCHAT_VIDEOCLIPMODE_SHRINK: 2,                // 缩小模式，缩小到合适的比例，不进行裁剪
    ANYCHAT_VIDEOCLIPMODE_STRETCH: 3,               // 平铺模式，不进行裁剪，但可能导致画面不成比例
    ANYCHAT_VIDEOCLIPMODE_DYNAMIC: 4,               // 动态模式，由上层应用根据分辩率来调整显示表面，保持画面不变形

    // 组播策略定义
    BRAC_MCPOLITIC_DISABLE: 0,                      // 执行服务器路由策略，禁止所有组播发送[默认]
    BRAC_MCPOLITIC_ONLYLOCALMC: 1,                  // 忽略服务器路由策略，只向客户端本地组播组广播媒体流
    BRAC_MCPOLITIC_SERVERANDLOCALMC: 2,             // 执行服务器路由策略，同时在客户端本地发送组播数据
    BRAC_MCPOLITIC_ONLYSERVERMC: 3,                 // 忽略服务器路由策略，只向服务器本地组播组广播媒体流
    BRAC_MCPOLITIC_SERVERANDSERVERMC: 4,            // 执行服务器路由策略，同时在服务器端发送组播数据

    // 组播功能标志定义
    BRAC_MCFLAGS_JOINGROUP: 0x00000001,             // 加入多播组
    BRAC_MCFLAGS_LEAVEGROUP: 0x00000002,            // 离开多播组
    BRAC_MCFLAGS_SENDDATA: 0x00000010,              // 数据发送标志，指示该多播组用于发送数据
    BRAC_MCFLAGS_RECVDATA: 0x00000020,              // 数据接收标志，指示该多播组用于接收数据

    // 用户状态标志定义（API：BRAC_QueryUserState 传入参数）
    BRAC_USERSTATE_CAMERA: 1,                       // 用户摄像头状态（参数为DWORD型）
    BRAC_USERSTATE_HOLDMIC: 2,                      // 用户音频设备状态（参数为DWORD型，返回值：0 音频采集关闭， 1 音频采集开启）
    BRAC_USERSTATE_SPEAKVOLUME: 3,                  // 用户当前说话音量（参数为DOUBLE类型（0.0 ~ 100.0））
    BRAC_USERSTATE_RECORDING: 4,                    // 用户录像（音）状态（参数为DWORD型）
    BRAC_USERSTATE_LEVEL: 5,                        // 用户级别（参数为DWORD型）
    BRAC_USERSTATE_NICKNAME: 6,                     // 用户昵称（参数为字符串TCHAR类型）
    BRAC_USERSTATE_LOCALIP: 7,                      // 用户本地IP地址（内网，参数为字符串TCHAR类型）
    BRAC_USERSTATE_INTERNETIP: 8,                   // 用户互联网IP地址（参数为字符串TCHAR类型）
    BRAC_USERSTATE_VIDEOBITRATE: 9,                 // 用户当前的视频码率（参数为DWORD类型，Bps）
    BRAC_USERSTATE_AUDIOBITRATE: 10,                // 用户当前的音频码率（参数为DWORD类型，Bps）
    BRAC_USERSTATE_P2PCONNECT: 11,                  // 查询本地用户与指定用户的当前P2P连接状态（参数为DWORD类型，返回值：0 P2P不通， 1 P2P连接成功[TCP]，2 P2P连接成功[UDP]，3 P2P连接成功[TCP、UDP]）
    BRAC_USERSTATE_NETWORKSTATUS: 12,               // 查询指定用户的网络状态（参数为DWORD类型，返回值：0 优良，1 较好，2 一般，3 较差，4 非常差），注：查询间隔需要>1s
    BRAC_USERSTATE_VIDEOSIZE: 13,                   // 查询指定用户的视频分辨率（参数为DWORD类型，返回值：低16位表示宽度，高16位表示高度）
    BRAC_USERSTATE_PACKLOSSRATE: 14,                // 查询指定用户的网络流媒体数据丢包率（参数为DWORD类型，返回值：0 - 100，如：返回值为5，表示丢包率为5%）
    BRAC_USERSTATE_DEVICETYPE: 15,                  // 查询指定用户的终端类型（参数为DWORD类型，返回值：0 Unknow， 1 Windows，2 Android，3 iOS，4 Web，5 Linux，6 Mac，7 Win Phone，8 WinCE）

    // SDK消息定义（用于OnNotifyMessage事件中判断事件的类型）
    WM_GV: 0x0400 + 200,
    WM_GV_CONNECT: WM_GV + 1,                       // 客户端连接服务器，wParam（BOOL）表示是否连接成功
    WM_GV_LOGINSYSTEM: WM_GV + 2,                   // 客户端登录系统，wParam（INT）表示自己的用户ID号，lParam（INT）表示登录结果：0 成功，否则为出错代码，参考出错代码定义
    WM_GV_ENTERROOM: WM_GV + 3,                     // 客户端进入房间，wParam（INT）表示所进入房间的ID号，lParam（INT）表示是否进入房间：0成功进入，否则为出错代码
    WM_GV_MICSTATECHANGE: WM_GV + 4,                // 用户的音频设备状态变化消息，wParam（INT）表示用户ID号，lParam（BOOL）表示该用户是否已打开音频采集设备
    WM_GV_USERATROOM: WM_GV + 5,                    // 用户进入（离开）房间，wParam（INT）表示用户ID号，lParam（BOOL）表示该用户是进入（TRUE）或离开（FALSE）房间
    WM_GV_LINKCLOSE: WM_GV + 6,                     // 网络连接已关闭，该消息只有在客户端连接服务器成功之后，网络异常中断之时触发，wParam（INT）表示连接断开的原因
    WM_GV_ONLINEUSER: WM_GV + 7,                    // 收到当前房间的在线用户信息，进入房间后触发一次，wParam（INT）表示在线用户数（包含自己），lParam（INT）表示房间ID
    WM_GV_CAMERASTATE: WM_GV + 11,                  // 用户摄像头状态发生变化，wParam（INT）表示用户ID号，lParam（INT）表示摄像头的当前状态，定义为：GV_CAMERA_STATE_XXXX
    WM_GV_CHATMODECHG: WM_GV + 12,                  // 用户聊天模式发生变化，wParam（INT）表示用户ID号，lParam（INT）表示用户的当前聊天模式
    WM_GV_ACTIVESTATE: WM_GV + 13,                  // 用户活动状态发生变化，wParam（INT）表示用户ID号，lParam（INT）表示用户的当前活动状态
    WM_GV_P2PCONNECTSTATE: WM_GV + 14,              // 本地用户与其它用户的P2P网络连接状态发生变化，wParam（INT）表示其它用户ID号，lParam（INT）表示本地用户与其它用户的当前P2P网络连接状态
    WM_GV_PRIVATEREQUEST: WM_GV + 21,               // 用户发起私聊请求，wParam（INT）表示发起者的用户ID号，lParam（INT）表示私聊请求编号，标识该请求
    WM_GV_PRIVATEECHO: WM_GV + 22,                  // 用户回复私聊请求，wParam（INT）表示回复者的用户ID号，lParam（INT）为出错代码
    WM_GV_PRIVATEEXIT: WM_GV + 23,                  // 用户退出私聊，wParam（INT）表示退出者的用户ID号，lParam（INT）为出错代码
    WM_GV_VIDEOFULLSCREEN: WM_GV + 32,              // 用户视频全屏通知，wParam（INT）表示用户ID，lParam(DWORD)表示当前视频是否全屏显示
    WM_GV_SDKWARNING: WM_GV + 41,                   // SDK警告信息，当SDK在运行过程中自检发现异常状态时，将向上层发送该消息，wParam（INT）表示警告代码，定义为：GV_ERR_WARNING_XXXX
    WM_GV_USERINFOUPDATE: WM_GV + 16,               // 用户信息更新通知，wParam（INT）表示用户ID号，lParam（INT）表示更新类别
    WM_GV_FRIENDSTATUS: WM_GV + 17,                 // 好友在线状态变化，wParam（INT）表示好友用户ID号，lParam（INT）表示用户的当前活动状态：0 离线， 1 上线
    WM_GV_VIDEOSIZECHG: WM_GV + 15,                 // 用户视频分辩率发生变化，wParam（INT）表示用户ID号，lParam（INT）表示用户的视频分辨率组合值（低16位表示宽度，高16位表示高度）

    // 视频呼叫事件类型定义（API：BRAC_VideoCallControl 传入参数、VideoCallEvent回调参数）
    BRAC_VIDEOCALL_EVENT_REQUEST: 1,                // 呼叫请求
    BRAC_VIDEOCALL_EVENT_REPLY: 2,                  // 呼叫请求回复
    BRAC_VIDEOCALL_EVENT_START: 3,                  // 视频呼叫会话开始事件
    BRAC_VIDEOCALL_EVENT_FINISH: 4,                 // 挂断（结束）呼叫会话

    // 视频呼叫标志定义（API：BRAC_VideoCallControl 传入参数）
    BRAC_VIDEOCALL_FLAGS_AUDIO: 0x0001,             // 语音通话
    BRAC_VIDEOCALL_FLAGS_VIDEO: 0x0002,             // 视频通话
    BRAC_VIDEOCALL_FLAGS_FBSRCAUDIO: 0x0010,        // 禁止源（呼叫端）音频
    BRAC_VIDEOCALL_FLAGS_FBSRCVIDEO: 0x0020,        // 禁止源（呼叫端）视频
    BRAC_VIDEOCALL_FLAGS_FBTARAUDIO: 0x0040,        // 禁止目标（被呼叫端）音频
    BRAC_VIDEOCALL_FLAGS_FBTARVIDEO: 0x0080,        // 禁止目标（被呼叫端）视频
    BRAC_VIDEOCALL_FLAGS_ASSISTREQ: 0x0100,         // 请求目标用户远程协助
    BRAC_VIDEOCALL_FLAGS_CONTROLREQ: 0x0200,        // 请求控制目标用户

    // 出错代码定义
    GV_ERR_SUCCESS: 0, // 成功
    GV_ERR_PLUGINNOINSTALL: 1010000,                // 插件没有安装
    GV_ERR_PLUGINOLDVERSION: 1010001,               // 插件版本太低
    GV_ERR_SESSION_QUIT: 100101,                    // 源用户主动放弃会话
    GV_ERR_SESSION_OFFLINE: 100102,                 // 目标用户不在线
    GV_ERR_SESSION_BUSY: 100103,                    // 目标用户忙
    GV_ERR_SESSION_REFUSE: 100104,                  // 目标用户拒绝会话
    GV_ERR_SESSION_TIMEOUT: 100105,                 // 会话请求超时
    GV_ERR_SESSION_DISCONNECT: 100106,              // 网络断线

    // 远程视频方向修正标志定义
    BRAC_ROTATION_FLAGS_MIRRORED: 0x1000,           // 图像需要镜像翻转
    BRAC_ROTATION_FLAGS_ROTATION90: 0x2000,         // 顺时针旋转90度
    BRAC_ROTATION_FLAGS_ROTATION180: 0x4000,        // 顺时针旋转180度
    BRAC_ROTATION_FLAGS_ROTATION270: 0x8000,        // 顺时针旋转270度

    // 用户信息控制类型定义（API：BRAC_UserInfoControl 传入参数）
    BRAC_USERINFO_CTRLCODE_ROTATION: 8,             // 让指定的用户视频在显示时旋转，wParam为旋转角度参数
    BRAC_USERINFO_CTRLCODE_DEBUGLOG: 9,             // 输出本地用户的调试日志，wParam为调试日志类型
    BRAC_USERINFO_CTRLCODE_LVORIENTFIX: 10,         // 本地视频采集方向修正，wParam为方向参数，lParam为修正角度

    // 服务器信息查询常量定义（API：BRAC_QueryInfoFromServer 传入参数）
    ANYCHAT_SERVERQUERY_USERIDBYNAME: 1,            // 根据用户昵称查询用户ID
    ANYCHAT_SERVERQUERY_USERIDBYSTRID: 2,           // 根据字符串ID查询用户ID
    ANYCHAT_SERVERQUERY_STRIDBYUSERID: 3,           // 根据用户ID查询字符串ID
    ANYCHAT_SERVERQUERY_QUEUEAGENTINFO: 100,        // 查询指定队列的坐席服务信息

    // 媒体播放事件类型定义
    ANYCHAT_STREAMPLAY_EVENT_START: 3,              // 播放开始事件
    ANYCHAT_STREAMPLAY_EVENT_FINISH: 4,             // 播放结束事件

    // 媒体播放标志定义（API：BRAC_StreamPlayInit 传入参数）
    ANYCHAT_STREAMPLAY_FLAGS_REPLACEAUDIOINPUT: 1,  // 播放音频流代替本地音频输入（Mic）
    ANYCHAT_STREAMPLAY_FLAGS_REPLACEVIDEOINPUT: 2,  // 播放视频流代替本地视频输入（Camera）

    // 媒体播放信息类型定义（API：BRAC_StreamPlayGetInfo 传入参数）
    ANYCHAT_STREAMPLAY_INFO_JSONVALUE: 1,           // 包含所有播放信息的Json字符串

    // 媒体播放控制类型定义（API：BRAC_StreamPlayControl 传入参数）
    ANYCHAT_STREAMPLAY_CTRL_START: 1,               // 开始播放
    ANYCHAT_STREAMPLAY_CTRL_PAUSE: 2,               // 暂停播放
    ANYCHAT_STREAMPLAY_CTRL_STOP: 3,                // 停止播放
    ANYCHAT_STREAMPLAY_CTRL_SEEK: 4,                // 位置拖动
    ANYCHAT_STREAMPLAY_CTRL_SPEEDCTRL: 5,           // 速度调整


    // CoreSDK事件类型定义（回调函数：BRAC_CoreSDKEvent_CallBack参数）
    ANYCHAT_CORESDKEVENT_STREAMPLAY: 30,            // 媒体播放事件

    // 视频显示插件设置参数
    ANYCHATWEB_VIDEO_SO_OVERLAY: 8,                 // 在视频上迭加文字、图片等内容
    ANYCHATWEB_VIDEO_SO_DISABLEFULLSCREEN: 9,       // 禁止双击视频全屏显示
    ANYCHATWEB_VIDEO_SO_EXTENDEDSCREEN: 10,         // 扩展屏显示视频
    ANYCHATWEB_VIDEO_SO_VIDEODISPMODE: 11,          // 视频显示模式
    ANYCHATWEB_VIDEO_SO_REMOTEASSIST: 12,           // 远程协助窗口


    //录像图片
    BRAC_SO_RECORD_INSERTIMAGE: 146,

    //文件控制命令定义常量：
    BRPPT_FILECTRL_DOWNLOAD: 0x01,                  // 下载文件
    BRPPT_FILECTRL_CANCEL: 0x02,                    // 取消下载
    BRPPT_FILECTRL_DELETE: 0x04,                    // 删除文件

    //文件信息查询定义常量：
    BRPPT_FILEINFO_DOWNLOAD_STATUS: 0x01,           // 下载状态
    BRPPT_FILEINFO_PPTDETAILS: 0x02,                // PPT详情
    ANYCHAT_SERVERQUERY_PPTFILEINFO: 10,            // PPT文件信息
    ANYCHAT_CORESDKEVENT_PPTHELPER: 31,             // PPTHelper事件

    // 对象类型定义
    ANYCHAT_OBJECT_TYPE_AREA: 4,		            // 服务区域
    ANYCHAT_OBJECT_TYPE_QUEUE: 5,		            // 队列对象
    ANYCHAT_OBJECT_TYPE_AGENT: 6,		            // 客服对象
    ANYCHAT_OBJECT_TYPE_CLIENTUSER: 8,		        // 客户端用户对象，用于与服务器交换数据
    ANYCHAT_OBJECT_TYPE_SKILL: 9,		            // 业务技能对象
    ANYCHAT_OBJECT_TYPE_QUEUEGROUP: 10,		        // 队列分组对象

    // 通用标识定义
    ANYCHAT_OBJECT_FLAGS_CLIENT: 0,		            // 普通客户
    ANYCHAT_OBJECT_FLAGS_AGENT: 2,		            // 坐席用户
    ANYCHAT_OBJECT_FLAGS_MANANGER: 4,		        // 管理用户
    ANYCHAT_OBJECT_FLAGS_AUTOMODE: 16,		        // 自动服务模式
    ANYCHAT_INVALID_OBJECT_ID: -1,		            // 无效的对象ID

    // 坐席服务状态定义
    ANYCHAT_AGENT_STATUS_CLOSEED: 0,		        // 关闭，不对外提供服务
    ANYCHAT_AGENT_STATUS_WAITTING: 1,		        // 等待中，可随时接受用户服务
    ANYCHAT_AGENT_STATUS_WORKING: 2,		        // 工作中，正在为用户服务
    ANYCHAT_AGENT_STATUS_PAUSED: 3,		            // 暂停服务
    ANYCHAT_AGENT_STATUS_OFFLINE: 10,		        // 离线

    /**
     *	对象属性定义
     */

    // 对象公共信息类型定义
    ANYCHAT_OBJECT_INFO_FLAGS: 7,		            // 对象属性标志
    ANYCHAT_OBJECT_INFO_NAME: 8,		            // 对象名称
    ANYCHAT_OBJECT_INFO_PRIORITY: 9,		        // 对象优先级
    ANYCHAT_OBJECT_INFO_ATTRIBUTE: 10,		        // 对象业务属性
    ANYCHAT_OBJECT_INFO_DESCRIPTION: 11,		    // 对象描述
    ANYCHAT_OBJECT_INFO_INTTAG: 12,		            // 对象标签，整型，上层应用自定义
    ANYCHAT_OBJECT_INFO_STRINGTAG: 13,		        // 对象标签，字符串，上层应用自定义
    ANYCHAT_OBJECT_INFO_GUID: 14,		            // 对象GUID
    ANYCHAT_OBJECT_INFO_STATUSJSON: 15,		        // 对象状态属性集合


    // 服务区域信息类型定义
    ANYCHAT_AREA_INFO_AGENTCOUNT: 401,	            // 服务区域客服用户数
    ANYCHAT_AREA_INFO_GUESTCOUNT: 402,	            // 服务区域内访客的用户数（没有排入队列的用户）
    ANYCHAT_AREA_INFO_QUEUEUSERCOUNT: 403,	        // 服务区域内排队的用户数
    ANYCHAT_AREA_INFO_QUEUECOUNT: 404,	            // 服务区域内队列的数量
    ANYCHAT_AREA_INFO_AGENTIDLIST: 405,	            // 服务区域客服ID列表
    ANYCHAT_AREA_INFO_IDLEAGENTCOUNT: 406,	        // 服务区域空闲坐席数量
    ANYCHAT_AREA_INFO_STATUSJSON: 407,	            // 服务区域状态信息，返回Json数据
    ANYCHAT_AREA_INFO_WAITINGCOUNT: 408,	        // 服务区域内等候服务用户数（出了队列，但没有坐席服务的用户）

    // 队列状态信息类型定义
    ANYCHAT_QUEUE_INFO_MYSEQUENCENO: 501,	        // 自己在该队列中的序号
    ANYCHAT_QUEUE_INFO_BEFOREUSERNUM: 502,	        // 排在自己前	面的用户数
    ANYCHAT_QUEUE_INFO_MYENTERQUEUETIME: 503,	    // 进入队列的时间
    ANYCHAT_QUEUE_INFO_LENGTH: 504,	                // 队列长度（有多少人在排队），整型
    ANYCHAT_QUEUE_INFO_WAITTIMESECOND: 508,	        // 自己在队列中的等待时间（排队时长），单位：秒
    ANYCHAT_QUEUE_INFO_AGENTINFO: 509,	            // 服务当前队列的坐席信息，返回Json数据

    // 客服状态信息类型定义
    ANYCHAT_AGENT_INFO_SERVICESTATUS: 601,	        // 服务状态，整型
    ANYCHAT_AGENT_INFO_SERVICEUSERID: 602,	        // 当前服务的用户ID，整型
    ANYCHAT_AGENT_INFO_SERVICEBEGINTIME: 603,	    // 当前服务的开始时间，整型
    ANYCHAT_AGENT_INFO_SERVICETOTALTIME: 604,	    // 累计服务时间，整型，单位：秒
    ANYCHAT_AGENT_INFO_SERVICETOTALNUM: 605,	    // 累计服务的用户数，整型
    ANYCHAT_AGENT_INFO_SERVICEUSERINFO: 606,	    // 当前服务用户信息，字符串
    ANYCHAT_AGENT_INFO_RELATEQUEUES: 607,	        // 关联队列List，字符串


    /**
     *	对象方法定义
     */

    // 对象公共参数控制常量定义
    ANYCHAT_OBJECT_CTRL_CREATE: 2,		            // 创建一个对象
    ANYCHAT_OBJECT_CTRL_SYNCDATA: 3,		        // 同步对象数据给指定用户，dwObjectId:-1，表示同步该类型的所有对象
    ANYCHAT_OBJECT_CTRL_DEBUGOUTPUT: 4,		        // 对象调试信息输出
    ANYCHAT_OBJECT_CTRL_DELETE: 5,		            // 删除对象
    ANYCHAT_OBJECT_CTRL_MODIFY: 6,		            // 修改对象信息

    // 服务区域控制常量定义
    ANYCHAT_AREA_CTRL_USERENTER: 401,	            // 进入服务区域
    ANYCHAT_AREA_CTRL_USERLEAVE: 402,	            // 离开服务区域

    // 队列参数控制常量定义
    ANYCHAT_QUEUE_CTRL_USERENTER: 501,	            // 进入队列
    ANYCHAT_QUEUE_CTRL_USERLEAVE: 502,	            // 离开队列

    // 客服参数控制常量定义
    ANYCHAT_AGENT_CTRL_SERVICESTATUS: 601,	        // 坐席服务状态控制（暂停服务、工作中、关闭）
    ANYCHAT_AGENT_CTRL_SERVICEREQUEST: 602,	        // 服务请求
    ANYCHAT_AGENT_CTRL_FINISHSERVICE: 604,	        // 结束服务
    ANYCHAT_AGENT_CTRL_EVALUATION: 605,	            // 服务评价，wParam为客服userid，lParam为评分，lpStrValue为留言

    /**
     *	对象异步事件定义
     */

    // 对象公共事件常量定义
    ANYCHAT_OBJECT_EVENT_UPDATE: 1,		            // 对象数据更新
    ANYCHAT_OBJECT_EVENT_SYNCDATAFINISH: 2,		    // 对象数据同步结束

    // 服务区域事件常量定义
    ANYCHAT_AREA_EVENT_STATUSCHANGE: 401,	        // 服务区域状态变化
    ANYCHAT_AREA_EVENT_ENTERRESULT: 402,	        // 进入服务区域结果
    ANYCHAT_AREA_EVENT_USERENTER: 403,	            // 用户进入服务区域
    ANYCHAT_AREA_EVENT_USERLEAVE: 404,	            // 用户离开服务区域
    ANYCHAT_AREA_EVENT_LEAVERESULT: 405,	        // 离开服务区域结果


    // 队列事件常量定义
    ANYCHAT_QUEUE_EVENT_STATUSCHANGE: 501,	        // 队列状态变化
    ANYCHAT_QUEUE_EVENT_ENTERRESULT: 502,	        // 进入队列结果
    ANYCHAT_QUEUE_EVENT_USERENTER: 503,	            // 用户进入队列
    ANYCHAT_QUEUE_EVENT_USERLEAVE: 504,	            // 用户离开队列
    ANYCHAT_QUEUE_EVENT_LEAVERESULT: 505,	        // 离开队列结果


    // 坐席事件常量定义
    ANYCHAT_AGENT_EVENT_STATUSCHANGE: 601,          // 坐席状态变化
    ANYCHAT_AGENT_EVENT_SERVICENOTIFY: 602,	        // 坐席服务通知（哪个用户到哪个客服办理业务）
    ANYCHAT_AGENT_EVENT_WAITINGUSER: 603,	        // 暂时没有客户，请等待
    ANYCHAT_AGENT_EVENT_ISREADY: 604,	            // 坐席准备好，可以发起呼叫

}

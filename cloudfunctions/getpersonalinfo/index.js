// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init(
  {
   throwOnNotFound:false
  }
)

// 云函数入口函数
const db = cloud.database()
const wxContext = cloud.getWXContext() 
exports.main = async (event, context) => {
  return await db.collection('personaljabc').where({
    openid: wxContext.OPENID // 填入当前用户 openid
  }).get()

}
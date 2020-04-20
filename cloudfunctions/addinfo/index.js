// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const  wxContext = cloud.getWXContext()
  try {
    db.collection('personaljabc').add({
     // data 字段表示需新增的 JSON 数据
     data: {
      _openid:wxContext.OPENID
     }
   })
 } catch (e) {
   console.error(e)
 }
  
}
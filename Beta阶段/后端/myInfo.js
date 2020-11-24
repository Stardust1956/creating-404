const app = getApp()
const db=wx.cloud.database()
let QQ =''
let tel=''
let openId = ''
Page({

  data: {
    name:'',
    QQ: '',
    TEL:'',
    Email:''
  },
  
  getQQ(event) {
    // event.detail 为当前输入的值
    QQ=event.detail.value;
    console.log(event.detail);
  },
  gettel(event) {
    // event.detail 为当前输入的值
    tel=event.detail.value;
    console.log(event.detail);
  },
 


  
  updatemyInfo(event){
    // db.collection('evaluate').where({
    //   _openid: app.globalData.openid,
    // }).get({
    //   success: function(res) {
    //       let id = res[0]["_id"]
    //       db.collection('user').doc(id).update({
    //         data: {
    //           score: _.inc(parseInt(score)),
    //         },
    //         success: function(res) {
    //         }
    //       })
    //     }
    //   }
    // )
  
    QQ = parseInt(QQ)
    tel = parseInt(tel)
    console.log(QQ)
    console.log(tel)
    console.log(isFinite(QQ))
    console.log(isFinite(tel))
    if(isFinite(QQ)&&isFinite(tel)&&QQ.toString().length<13&&tel.toString().length<12){
      db.collection("user").where({_openid:app.globalData.openid}).update({
        data:{
          qq:QQ,
          tel : tel
        },
        success(res){
          console.log("修改成功")
          wx.showToast({
            title: '修改成功',
            icon: 'success',
            duration: 2000
          })
          
        },
        fail(res){
          console.log("修改失败")
        }
      })}else{
        console.log("修改失败")
        wx.showToast({
          title: '请检查输入',
          icon: 'loading',
          duration: 500
        })
      }
    }})
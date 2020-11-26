const app = getApp()
const db=wx.cloud.database()
let QQ =''
let tel=''
Page({

  data: {
    QQ: '',
    TEL: '',
  },
   onLoad: function (options) {
    if(app.globalData.openid){
      db.collection('user').where({
        _openid: app.globalData.openid,
      })
      .get({
        success: res=> {
          console.log(res.data["0"]["qq"])
          console.log(res.data["0"]["tel"])
          this.setData({
            QQ:res.data["0"]["qq"],
            TEL:res.data["0"]["tel"],
          })
        }
      })
    }
    else{
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
    
  },
  onShow(){
  },
  getQQ(event) {
    // event.detail 为当前输入的值
    QQ=event.detail.value;
  },
  gettel(event) {
    // event.detail 为当前输入的值
    tel=event.detail.value;
  },

  updatemyInfo(event){
    QQ = parseInt(QQ)
    tel = parseInt(tel)
    if(isFinite(QQ)&&isFinite(tel)&&QQ.toString().length<13&&tel.toString().length<12){
      db.collection('user').where({
        _openid: app.globalData.openid // 填入当前用户 openid
      }).get().then(res => {
        console.log(res.data[0]["_id"])
        db.collection('user').doc(res.data[0]["_id"]).update({
          // data 传入需要局部更新的数据
          data: {
            qq:QQ,
            tel : tel
          },
          success: function(res) {
            console.log(res.data)
            wx.showToast({
              title: '修改成功',
              icon: 'success',
              duration: 1000
            })
          },
          fail(res){
            console.log("修改失败")
          }
        })
      }) 
      }
      else{
        console.log("修改失败")
        wx.showToast({
          title: '请检查输入',
          icon: 'loading',
          duration: 500
        })
      }
    }})
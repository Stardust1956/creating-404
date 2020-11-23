const db = wx.cloud.database()
const app = getApp()
Page({
 
  data: {
      userinfo:{},
      avatarUrl: '../imag/head.png',
      nickname:'',
      loginname:'登录',
      score:''
  },
  onLoad: function (options) {
    wx.showToast({
      title: '请先登录',
      icon: 'none',
      duration: 1000
    })
  },
  onShow(){
    db.collection('user').where({"_openid":app.globalData.openid}).get({
      success: res => {
        this.setData({
          score:res.data[0]["score"]
        })
      },
      fail:function(err){
        console.log(err)
      }
    });
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({userinfo})
  },
  logintest:function(){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log("登录成功")
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      },
      

    })
    db.collection('user').where({"_openid":app.globalData.openid}).get({
      success: res => {
        if(res.data.length===0)    
        {
          wx.navigateTo({
            url: '../login/login'
          })
        }
      },
      fail:function(err){
        console.log(err)
      }
    });
    wx.getUserInfo({
      success: res => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          nickname:res.userInfo.nickName,
          loginname:'已登录'
        })
      }
    })

  },
})

const app = getApp()
Page({

  data: {
      userinfo:{},
      avatarUrl: '../imag/head.png',
      nickname:'未登录'
  },
  onShow(){
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({userinfo})
  },
  logintest:function(){
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          userInfo: res.userInfo,
          nickname:res.userInfo.nickName
        })
      }
    })

  },
})
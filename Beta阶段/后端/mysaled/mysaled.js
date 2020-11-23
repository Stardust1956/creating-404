// pages/mysale/mysale.js
const db = wx.cloud.database()
const app = getApp()
let qq = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],
    qq:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.openid){
    db.collection('order').where({"_openid":app.globalData.openid}).get({
      success: res => {
        this.setData({
          booklist:res.data
        });
        console.log(booklist)

      },
      fail:function(err){
        console.log(err)
      }
    });
    }
    else{
      wx.switchTab({
        url: '/pages/my/my'
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  gosale(){}
})
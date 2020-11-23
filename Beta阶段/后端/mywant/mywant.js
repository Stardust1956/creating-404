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
    qq:'',
    id:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.openid){
      db.collection('mywant').where({"_openid":app.globalData.openid}).get({
        success: res => {
          this.setData({
            booklist:res.data
          });
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
    db.collection('mywant').where({"_openid":app.globalData.openid}).get({
      success: res => {

        this.setData({
          booklist:res.data
        });
      },
      fail:function(err){
        console.log(err)
      }
    });
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


  gosale(){},
  connection:function(event){
    let id= event.currentTarget.dataset.value
    let openid =event.currentTarget.dataset.id
    console.log(openid);
    wx.navigateTo({
      url: '../sellerInfo/sellerInfo?id='+id+'&openid='+openid,
    })
  },
  delsale:function(event){
    var that=this;
    let id= event.currentTarget.dataset.value
    db.collection('mywant').doc(id).remove({
      success: function(res) { 
        that.onShow();
        console.log("删除成功")
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
  
})
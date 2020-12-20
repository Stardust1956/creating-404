// pages/purchase/purchase.js
const db= wx.cloud.database();
const app = getApp();
var qq = "";
var openId = "";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_list:[]
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    if(app.globalData.openid){
      db.collection('user').where({"_openid":app.globalData.openid}).get({
        success: res => {
          // this.setData({
          //   booklist : res.data
          // });
        //  console.log(res.data);
          qq = res.data[0]["qq"]
          console.log(qq)
  
          db.collection('buy').where({"qq":qq}).get({
            success: res => {
              this.setData({
                book_list : res.data
              });
             console.log(res.data);

            },
            fail:function(err){
              console.log(err)
            }
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
  connection:function(event)
  {
    console.log(event.currentTarget.dataset.orderid)
    let id= event.currentTarget.dataset.value;
    let orderid = event.currentTarget.dataset.orderid;
    console.log(id);
    wx.redirectTo({
      url: '../evaluate/evaluate?id='+id+"&orderid="+orderid,
    })
  }
})
// pages/mysale/mysale.js

const db = wx.cloud.database()
const app = getApp()
var bookname=''
var author=''
var apperance=''
var position=''
var price=''
var nowprice=''
var pic = ''
// let orderId = ''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(app.globalData.openid){
      db.collection('upload').where({"_openid":app.globalData.openid}).get({
        success: res => {
          this.setData({
            booklist : res.data
          });
        //  console.log(res.data);
          
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
    console.log(app.globalData.openid)
    db.collection('upload').where({"_openid":app.globalData.openid}).get({
      success: res => {
        this.setData({
          booklist : res.data
        });
       console.log(res.data);
        
      },
      fail:function(err){
        console.log(err)
      }
    })
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


  addorder:function(event){
    var that=this;
    let id= event.currentTarget.dataset.value
    //插入订单
    db.collection('upload').doc(id).get({
      success: function(res) {
        bookname=res.data["title"]
        author=res.data["author"]
        apperance=res.data["appearance"]
        position=res.data["position"]
        price=res.data["price"]
        nowprice=res.data["nowprice"]
        pic = res.data["pic"]
        db.collection('order').add({
          data:{
            bookname:bookname,
            author:author,
            apperance:apperance,
            position:position,
            price:price,
            nowprice:nowprice,
            pic :pic
          }
        }).then(res=>{
          console.log(res["_id"])
          app.globalData.orderId = res["_id"]
          console.log(app.globalData.orderId)
        }).catch(err=>{
          console.log(err)
        })
      }
    })
     //删除upload 
    db.collection('upload').doc(id).remove({
      success: function(res) { 
        console.log(res)
        that.onShow();
        console.log("删除成功")
      },
      fail:err=>{
        console.log(err)
      }
    })
    // console.log(orderId)
    wx.redirectTo({
      
      url: '../buyerInfo/buyerInfo',
    })
  },
  delsale:function(event){
    var that=this;
    let id= event.currentTarget.dataset.value
    db.collection('upload').doc(id).remove({
      success: function(res) { 
        console.log(res)
        that.onShow();
        console.log("删除成功")
      },
      fail:err=>{
        console.log(err)
      }
    })
  }
})
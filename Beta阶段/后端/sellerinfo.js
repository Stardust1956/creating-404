// pages/sellerInfo/sellerInfo.js
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      qq:'',
      name:'',
      tel:'',
      email:'',
      score:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bookid = options["id"]
    let openid = options["openid"]
    db.collection("upload").where({
      "bookid":bookid,
      "_openid":openid,
  }).get(
      {
        success:res => {
          //console.log(res.data[0])
          this.setData({
            qq:res.data[0]["qq"],
            tel:res.data[0]["tel"],
            email:res.data[0]["qq"]+"@qq.com",
            name:res.data[0]["name"]
          })
        },
        fail: err => {
          return err
      }
      }
    );
    var t = 0
    console.log(openid)
    db.collection('evaluate').where({
      "sell_id": openid
    })
    .get({
      success: function(res) {
        console.log(res)
        if(res.data.length===0){
            t = 0;
        }
        else{
          for(var i=0;i<res.data.length;i++)  {
              t+=res.data[i]['freq']
          }
        console.log(t)  
        }
      }
    })
    db.collection('user').where({"_openid":openid}).get({
      success: res => {
        console.log(res.data); 
        if(t===0){
          this.setData({
            score:0
          })
        }
        else{
          console.log(t)
          t = (res.data[0]["score"]/t).toFixed(1)
          this.setData({
            score:t
          })
        } 
      },
      fail:function(err){
        console.log(err)
      }
    });

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

  }
})
// pages/ebooks/ebooks.js
// pages/goods/goods.js
const app = getApp()
const db =wx.cloud.database()
var t = 0
Page({
  data: {
    activeName:['1'],
    times: 0,
    link:'1231241',
    code:'1234',
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    t = 0;
    console.log(app.globalData.openid)
    db.collection('evaluate').where({
      "sell_id": app.globalData.openid
    })
    .get({
      success: res=> {
        if(res.data.length===0){
            t = 0;
        }
        else{
          for(var i=0;i<res.data.length;i++)  {
              t+=res.data[i]['freq']
          }
        }
        this.setData({
          times:t
        })
        console.log(this.data.times)
        if(t==0){
          this.setData({
            link :'快去卖书获取次数吧！',
            code :'加油！'
          })
        }
        else if(t>0&&t<4){
          this.setData({
            link :'https://pan.baidu.com/s/13Sl7p9dKuZoF3oMfRD6CPw',
            code :'fuzb'
          })
        }
        else if (t<7){
          this.setData({
            link :'https://pan.baidu.com/s/14psWw44tBNhXim4UT3Bp9A',
            code :'fzu2'
          })
        }
        else{
          this.setData({
            link :'https://pan.baidu.com/s/1uhIYOu20f4O85qVe5akp3g',
            code :'fzub'
          })
        }
        console.log(this.data.link)
        console.log(this.data.code)
        
      }
    })
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
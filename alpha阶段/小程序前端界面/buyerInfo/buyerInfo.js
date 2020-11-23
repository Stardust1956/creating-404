// pages/buyerInfo/buyerInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QQ: '',
    tel: '',
  },

  getQQ(event) {
    // event.detail 为当前输入的值
    this.setData(QQ)
    console.log(event.detail);
  },
  gettel(event) {
    // event.detail 为当前输入的值
    this.setData(tel)
    console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      
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

  update(event){
    let id= event.currentTarget.dataset.value
    //console.log(id);
    wx.navigateTo({
      url: '../mysale/mysale?id='+id,
    })
  }
})
// pages/searchAns/searchAns.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:'',
      search_book:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索' + this.data.value);
  },
  onClick() {
    console.log('搜索' + this.data.value);
    db.collection('upload').where({"title":db.RegExp({
      regexp:".*"+this.data.value+".*"
  })}).get({
      success: res => {
        this.setData({
          search_book : res.data
        });
        console.log(res.data);
        
      },
      fail:function(err){
        console.log(err)
      }
    });

  },

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
  connection:function(event){
    let id= event.currentTarget.dataset.value
    //console.log(id);
    wx.navigateTo({
      url: '../sellerInfo/sellerInfo?id='+id,
    })
  }
})
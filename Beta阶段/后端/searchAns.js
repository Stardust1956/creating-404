// pages/searchAns/searchAns.js
const db = wx.cloud.database()
var t=[];
Page({

  /**
   * 页面的初始数据
   */
  data: {
      value:'',
      search_book:[],
      option1: [
        { text: '全部商品', value: 0 }
      ],
      option2: [
        { text: '默认排序', value: 'a' },
        { text: '价格排序', value: 'b' },
        { text: '新旧排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(value)
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
    let openid =event.currentTarget.dataset.id
    console.log(openid);
    wx.navigateTo({
      url: '../sellerInfo/sellerInfo?id='+id+'&openid='+openid,
    })
  },
  want:function(event){
    let bookid= event.currentTarget.dataset.value
    let openid =event.currentTarget.dataset.id
    db.collection("upload").where({
      "bookid":bookid,
      "_openid":openid,
  }).get(
      {
        success:res => {
          console.log(res.data[0])
          db.collection('mywant').add({
            data:{
              name:res.data[0]["name"],
              qq:res.data[0]["qq"],
              appearance:res.data[0]["appearance"],
              bookid :res.data[0]["bookid"],
              nowprice : res.data[0]["nowprice"],
              position :res.data[0]["position"],
              title : res.data[0]["title"],
              author: res.data[0]["author"],
              college : res.data[0]["college"],
              pic : res.data[0]["pic"],
              price : res.data[0]["price"],
              tel : res.data[0]["tel"]
            },
          }).then(res =>{
            wx.showToast({
              title: '收藏成功',
              icon: 'success',
              duration: 1000
            })
           })
        },
        fail: err => {
          return err
      }
      }
    )
    
  },
  changesort(e){

    db.collection('upload').where({"title":db.RegExp({
      regexp:".*"+this.data.value+".*"
  })}).get({
      success: res => {
        this.setData({
          search_book : res.data
        });
        t  = res.data
        // console.log(t);
        let type = e.detail
    console.log(type);
    console.log(t);
    if(type === "b")
    {
      
      t.sort(this.compareb);
      console.log(t)
      this.setData({
        search_book : t
      });
    }
    if(type === "c")
    {
      
      t.sort(this.comparec);
      console.log(t)
      this.setData({
        search_book : t
      });
    }
      },
      fail:function(err){
        console.log(err)
      }
    });
    
  },
  comparec:function (a, b) {

    // console.log("比较")

    // return value1 - value2;
    // return (a["nowprice"] < b["nowprice"]) ? 1 : -1;
    return (a["appearance"] < b["appearance"]) ? 1 : -1;
    },
  compareb:function (a, b) {

      // console.log("比较")
  
      // return value1 - value2;
      return (a["nowprice"] > b["nowprice"]) ? 1 : -1;
      // return (a["appearance"] < b["appearance"]) ? 1 : -1;
      }
    
    

})
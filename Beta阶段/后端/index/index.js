const db = wx.cloud.database()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */

  data: {
    book_list:[],
    img: [
      '/img/zcyl.jpg',
      '/img/byyl.jpg',
    ],
    cateslist:[
      {
        id:'数计学院',
        name:'数计学院',
        url: '/icons/shuji.png'
      },
      { id:'人文学院',
        name:'人文学院',
        url:'/icons/renwen.png'
      },
      { id:'经管学院',
        name:'经管学院',
        url:'/icons/jinguan.png'
      },
      {
        id:'全部分类',
        name:'全部分类',
        url:'/icons/qb.png'
      }
    ],
    indicatordots:true,
    //是否显示面板指示点
    autoplay:true,
    //是否自动切换
    interval: 5000,
    //自动切换时间间隔
    duration: 500,
    //滑动动画时长
    color:'#ffffff',
    //当前选中的指示点颜色
    height:'',
    //swiper高度
    searchvalue:''
  },
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
  },
  goheight:function (e) {
    var width = wx.getSystemInfoSync().windowWidth
    //获取可使用窗口宽度
    var imgheight = e.detail.height
    //获取图片实际高度
    var imgwidth = e.detail.width
    //获取图片实际宽度
    var height = width * imgheight / imgwidth +"px"
    //计算等比swiper高度
    this.setData({
      height: height
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this =this;
    db.collection('upload').get({
      success: res =>{
        //console.log(res.data)
        this.setData({
          book_list:res.data
        })
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
    if(app.globalData.openid){
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
    }
    else{
      wx.showToast({
        title: '请先登录',
        icon: 'loading',
        duration: 2000
      })
    }
   
    
  }
})
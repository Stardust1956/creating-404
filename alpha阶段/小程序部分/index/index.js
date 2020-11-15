const db = wx.cloud.database()
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
        name:'数计学院',
        url: '/icons/shuji.png'
      },
      { name:'人文学院',
        url:'/icons/renwen.png'
      },
      { name:'经管学院',
        url:'/icons/jinguan.png'
      },
      {
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
    //console.log(id);
    wx.navigateTo({
      url: '../sellerInfo/sellerInfo?id='+id,
    })
  }
})
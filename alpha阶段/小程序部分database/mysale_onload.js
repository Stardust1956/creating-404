onLoad: function (options) {
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
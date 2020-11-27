onShow(){
    t = 0
    console.log(app.globalData.openid)
    db.collection('evaluate').where({
      "sell_id": app.globalData.openid
    })
    .get({
      success:res =>  {
        console.log(res)
        if(res.data.length===0){
            t = 0;
        }
        else{
          for(var i=0;i<res.data.length;i++)  {
              t+=res.data[i]['freq']
          } 
        }
        console.log(t) 
        db.collection('user').where({"_openid":app.globalData.openid}).get({
          success: res => {
            console.log(res.data); 
            console.log(t)
            if(t===0){
              console.log("bug")
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
        })
      }
    })
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({userinfo})
  }
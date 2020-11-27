update(event){
  db.collection('user').where({
    _openid: app.globalData.openid,
  })
  .get({
    success: function(res) {
      console.log(res.data)
      Qq = res.data[0]["qq"]
      console.log(Qq)
    }
  })
  console.log(Qq)
  db.collection('order').doc(app.globalData.orderId).get({
    success: function(res) {
      bookname=res.data["title"]
      author=res.data["author"]
      apperance=res.data["apperance"]
      position=res.data["position"]
      price=res.data["price"]
      nowprice=res.data["nowprice"]
      pic = res.data["pic"]
      if( qq != Qq){
        db.collection('buy').add({
          data:{
          bookname:bookname,
          author:author,
          appearance:apperance,
          position:position,
          price:price,
          nowprice:nowprice,
          pic :pic,
          qq:qq,
          tel:tel,
          orderId:app.globalData.orderId,
          iscommon:false
          }
        }).then(res=>{
          console.log(res["_id"])
          app.globalData.orderId = res["_id"]
          console.log(app.globalData.orderId)
        }).catch(err=>{
          console.log(err)
        })
        console.log("交易成功")
          wx.showToast({
            title: '交易成功',
            icon: 'success',
            duration: 1000
          })
          wx.redirectTo({
            url: '../mysale/mysale'
          })
      }
      else{
        console.log("修改失败")
        wx.showToast({
          title: '请检查输入',
          icon: 'loading',
          duration: 1000
        })
      }   
    }
  })  
}
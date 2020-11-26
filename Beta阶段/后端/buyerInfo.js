  update(event){
    console.log(qq)
    db.collection('user').where({
      "qq": parseInt(qq),
      "tel":parseInt(tel)
    })
    .get({
      success: function(res) {
        // res.data 是包含以上定义的两条记录的数组
        console.log(res.data)
        if(res.data.length === 0)
        {
            wx.showToast({
              title: '信息不匹配',
            icon: 'none',
            duration: 2000
            })
        }
        else{
          db.collection('order').doc(app.globalData.orderId).get({
            success: function(res) {
              bookname=res.data["title"]
              author=res.data["author"]
              apperance=res.data["apperance"]
              position=res.data["position"]
              price=res.data["price"]
              nowprice=res.data["nowprice"]
              pic = res.data["pic"]
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
            }
          }) 
          wx.redirectTo({
            url: '../mysale/mysale'
          })
        }
      }
    })

  }
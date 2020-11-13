addorder:function(event){
    var that=this;
    let id= event.currentTarget.dataset.value
    //插入订单
    db.collection('upload').doc(id).get({
      success: function(res) {
        bookname=res.data["title"]
        author=res.data["author"]
        apperance=res.data["apperance"]
        position=res.data["position"]
        price=res.data["price"]
        nowprice=res.data["nowprice"]
        db.collection('order').add({
          data:{
            bookname:bookname,
            author:author,
            apperance:apperance,
            position:position,
            price:price,
            nowprice:nowprice
          }
        }).then(res=>{
          console.log(res)
        }).catch(err=>{
          console.log(err)
        })
      }
    })
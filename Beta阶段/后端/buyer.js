// pages/buyerInfo/buyerInfo.js
const db = wx.cloud.database();
const app = getApp();
var bookname=''
var author=''
var appearance=''
var position=''
var price=''
var nowprice=''
var pic = ''
let qq=''
let tel=''
var Qq =''
var id = ''
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
    this.setData({QQ:event.detail})
    qq = event.detail
    console.log(event.detail);
  },
  gettel(event) {
    // event.detail 为当前输入的值
    this.setData({tel:event.detail})
    tel = event.detail
    console.log(event.detail);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    id = options["id"];

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

    console.log(qq)
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
              title: 'qq和电话不匹配',
            icon: 'none',
            duration: 2000
            })
        }
        else{
            console.log("111")
          db.collection('order').doc(app.globalData.orderId).get({
            success: function(result) {
              bookname=result.data["title"]
              author=result.data["author"]
              appearance=result.data["appearance"]
              position=result.data["position"]
              price=result.data["price"]
              nowprice=result.data["nowprice"]
              pic = result.data["pic"]
              console.log(qq);
              console.log(Qq);
              if( parseInt(qq) != Qq){
                
                console.log("qq不同")
                              //////////////////////////////
    console.log(1)
    // let id= event.currentTarget.dataset.value
    //插入订单
    console.log(id)
    db.collection('upload').doc(id).get({
      success: function(res0) {
        bookname=res0.data["title"]
        author=res0.data["author"]
        appearance=res0.data["appearance"]
        position=res0.data["position"]
        price=res0.data["price"]
        nowprice=res0.data["nowprice"]
        pic = res0.data["pic"]
        db.collection('order').add({
          data:{
            bookname:bookname,
            author:author,
            appearance:appearance,
            position:position,
            price:price,
            nowprice:nowprice,
            pic :pic
          }
        }).then(res00=>{
          app.globalData.orderId = res00["_id"]
          console.log(app.globalData.orderId)
          db.collection('upload').doc(id).remove({
            success: function(res01) { 
              console.log(res01)
              console.log("删除成功")
              that.onShow();

            },
            fail:err=>{
              console.log(err)
            }
          })
        }).catch(err0=>{
          console.log(err0)
        })


      },fail:err1=>{
        console.log(err1)
      }
    })
     //删除upload 
   
    // console.log(orderId)

    //////////////////////////////////////////
                db.collection('buy').add({
                    data:{
                    bookname:bookname,
                    author:author,
                    appearance:appearance,
                    position:position,
                    price:price,
                    nowprice:nowprice,
                    pic :pic,
                    qq:qq,
                    tel:tel,
                    orderId:app.globalData.orderId,
                    iscommon:false
                    }
                }).then(res2=>{
                    console.log(res["_id"])
                    app.globalData.orderId = res2["_id"]
                    console.log(app.globalData.orderId)
                }).catch(err3=>{
                    console.log(err3)
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
                    title: '买家不能是自己',
                    icon: 'loading',
                    duration: 2000
                })
            }  
            }
          }) 
        }
      }
    })
  }
})
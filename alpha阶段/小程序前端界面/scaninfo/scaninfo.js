// pages/scancode/scancode.js
const app = getApp()
const db=wx.cloud.database().collection('client')
let qq=''
let tel=''
let area=''
let appearance=''
let college=''
let name=''
let price=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookdata :{},
    scandata:[{
      addvalue:'',
      newvalue:'',
      xueyuanvalue:'',
      namevalue: '',
      pricevalue:'',
      QQvalue:'',
      TELvalue:'',
    }],
  
  },
 namechange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  newchange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  addchange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  xueyuanchange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
 
 pricechange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  bookadd(event){

  },
  publish(event){

  },
  QQchange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  TELchange(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },
  handleName(event){
    name=event.detail.value;
  },
  handleQQ(event){
  qq=parseInt(event.detail.value);
  },
  handleTel(event){
  tel=parseInt(event.detail.value);
  },
  handlePrice(event){
  price=parseInt(event.detail.value);
  }, 
  handleCollege(event){
    college=event.detail.value;
  },
  handleArea(event){
    area=event.detail.value;
  }, 
  handleAppearance(event){
    appearance=event.detail.value;
  }, 

  handleAddClient(){
  db.add({
    data:{
      name:name,
      qq:qq,
      tel:tel,
      price:price,
      appearance:appearance,
      area:area,
      college:college,
    },
    success(res){
      console.log("成功添加"),
      console.log('_id:',res._id)
    },
    fail(res){
      console.log("添加失败")
    }
  })
  },

  scanCode:function(event){
    //扫码
    wx.scanCode({
      onlyFromCamera: true,
      scanType:['barCode'],
      //成功
      success:res =>{
        var isbn = res.result;
        //查询
        db.collection("bookinf").where({"isbn":isbn}).get(
          {
            success:res => {
              //成功
              console.log(res.data["length"])
              //库中不存在
              if(res.data["length"] === 0){
                wx.cloud.callFunction({
                  // 要调用的云函数名称
                  name: 'bookinfo',
                  // 传递给云函数的参数
                  data: {
                    isbn: isbn,
                  },
                  success: res => {
                    var bookmes = res["result"]["result"];
                    //插入数据库
                    db.collection('bookinf').add({
                      data:{
                        title : bookmes["title"],
                        price : bookmes["price"],
                        isbn : bookmes["isbn"],
                        pic : bookmes["pic"],
                        publisher : bookmes["publisher"],
                        author :  bookmes["author"]
                      }
                    }).then(res =>{
                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                      })
                    }).catch(err=>{
                      console.error(err)
                    })
                    
                  },
                  fail: err => {
                    console.error(err)
                  }
                })
              }
            },
            fail: err => {
              console.log(err)
          }
          }
        )
        //
        db.collection("bookinf").where({"isbn":isbn}).get(
          {
            success:res => {
              this.setData({
                bookdata:res.data[0]
              })
              console.log(bookdata)
            },
            fail: err => {
              return err
          }
          }
        )



      },
      fail: err =>{
        console.log(err)
      }
    })
    //返回信息
   
  }
})
// pages/scancode/scancode.js
const app = getApp()
const db=wx.cloud.database()
let qq=''
let tel=''
let area=''
let appearance=''
let college="数计"
let name=''
let bookid=''
let bookname = ''
let pic =''
let author = ''
let price =''
let nowprice = ''
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
    // optionadd: [
    //   { text: '生活一区', value: 0 },
    //   { text: '生活二区', value: 1 },
    //   { text: '生活三区', value: 2 },
    //   { text: '生活四区', value: 3 },
    //   { text: '其他', value: 4 },
    // ],
    // optionnew: [
    //   { text: '一成新', value: 5 },
    //   { text: '二成新', value: 6 },
    //   { text: '三成新', value: 7 },
    //   { text: '四成新', value: 8 },
    //   { text: '五成新', value: 9 },
    //   { text: '六成新', value: 10 },
    //   { text: '七成新', value: 11 },
    //   { text: '八成新', value: 12 },
    //   { text: '九成新', value: 13 },
    //   { text: '全新', value: 14 },
    // ],
    // optionxueyuan: [
    //   { text: '经管学院', value: 15 },
    //   { text: '数计学院', value: 16 },
    //   { text: '物信学院', value: 17 },
    //   { text: '环资学院', value: 18 },
    //   { text: '生工学院', value: 19 },
    // ],
    // add:0 ,
    // new:5 ,
    // xueyuan:15,
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
  nowprice=parseInt(event.detail.value);
  }, 
  handleCollege(event){
    college=event.detail.value;
  },
  handleArea(event){
    area=event.detail.value;
  }, 
  handleAppearance(event){
    appearance=parseInt(event.detail.value);
  }, 

  handleAddClient(){
  db.collection("client").add({
    data:{
      name:name,
      qq:qq,
      tel:tel,
      //price:price,
      //appearance:appearance,
      //area:area,
      //college:college,
    },
    success(res){
      console.log("成功添加")
    },
    fail(res){
      console.log("添加失败")
    }
  })
  db.collection("upload").add({
    data:{
      name:name,
      qq:qq,
      appearance:appearance,
      bookid :bookid,
      nowprice : nowprice,
      position :area,
      title : bookname,
      author: author,
      college : college,
      position: area,
      pic : pic,
      price : price,
      tel : tel
    },
    success(res){
      console.log("成功添加")
      wx.showToast({
        title: '成功',
        icon: 'success',
        duration: 2000
      })
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
                        author :  bookmes["author"],
                        college :college
                      }
                    }).then(res =>{
                      wx.showToast({
                        title: '成功',
                        icon: 'success',
                        duration: 2000
                      })
                      db.collection("bookinf").where({"isbn":isbn}).get(
                        {
                          success:res => {
                            console.log(res.data[0]["_id"])
                            bookid = res.data[0]["_id"]
                            bookname = res.data[0]["title"]
                            pic = res.data[0]["pic"]
                            author = res.data[0]["author"]
                            price = res.data[0]["price"]
                            this.setData({
                              bookdata:res.data[0]
                            })
                            
                          },
                          fail: err => {
                            console.log(err)
                        }
                        }
                      )
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
              console.log(res.data[0]["_id"])
              bookid = res.data[0]["_id"]
              bookname = res.data[0]["title"]
              pic = res.data[0]["pic"]
              author = res.data[0]["author"]
              price = res.data[0]["price"]
              this.setData({
                bookdata:res.data[0]
              })
              console.log(bookdata)
            },
            fail: err => {
              console.log(err)
          }
          }
        )



      },
      fail: err =>{
        console.log(err)
      }
    })
    //返回信息
   
  },
  getopenid:function(){
   console.log(app.globalData.openid)
  },
  
})
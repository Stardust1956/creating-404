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
      bnamevalue:'',
      authorvalue:'',
      pricevalue:''
    }]
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
  authorchange(event){
    console.log(event.detail);
  },
  nowpricechange(event){
    console.log(event.detail);
  },
  booknamechange(event){
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
  handleauthor(event){
    author=event.detail.value;
  }, 
  handlenowprice(event){
    nowprice=event.detail.value;
  }, 
  handlebookname(event){
    bookname=event.detail.value;
  }, 
  handleSave(){},

  handleAddClient(){
    wx.showModal({
      title: '提示',
      content: '是否确认发布',
      success (res) {
      if (res.confirm) {
        // console.log("tel",isFinite(tel))
    // console.log("qq",isFinite(qq))
    // console.log("a",isFinite(parseInt("a")))
    // console.log("nowprice",isFinite(nowprice))
    // console.log(name!='')
    // console.log(appearance!='')
    var flag = 1
    if(isFinite(tel)&&isFinite(qq)&&isFinite(appearance)&&isFinite(nowprice)&&tel!=''&&qq!=''&&appearance!=''&&area!=''&&name!=''){

    }
    else{
      flag=0;
    }
    if(college=="数计学院"||college=="经管学院"||college=="人文学院"||college=="电气学院"||college=="物信学院"||college=="化学学院"||college=="生工学院"||college=="土木学院"){
    }
    else{
      flag=0;
    }
    console.log(flag)
  if(flag==1){
 
      // db.collection("client").add({
      //   data:{
      //     name:name,
      //     qq:qq,
      //     tel:tel,
      //     //price:price,
      //     //appearance:appearance,
      //     //area:area,
      //     //college:college,
      //   },
      //   success(res){
      //     console.log("成功添加")
      //   },
      //   fail(res){
      //     console.log("添加失败")
      //   }
      // })
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
          pic : '../../img/none.png',
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
    }
  else{
    console.log("添加失败")
    wx.showToast({
      title: '请检查输入',
      icon: 'loading',
      duration: 500
    })
  }
      console.log('用户点击确定')
      } else if (res.cancel) {
      console.log('用户点击取消')
      }}})
    
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
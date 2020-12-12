// pages/scancode/scancode.js
const app = getApp()
const db=wx.cloud.database()
let qq=''
let tel=''
let name=''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookdata :{},
    scandata:[{
      namevalue: '',
      TELvalue:'',
      QQvalue:'',
    }],

  },
  
 namechange(event) {
    // event.detail 为当前输入的值
    name=event.detail;
    console.log(event.detail);
  },
  QQchange(event) {
    // event.detail 为当前输入的值
    qq=parseInt(event.detail);
    console.log(event.detail);
  },
  TELchange(event) {
    // event.detail 为当前输入的值
    tel=parseInt(event.detail);
    console.log(event.detail);
  },
  publish:function(){
    if(name===''||tel===NaN||qq==NaN||qq.toString().length<8||qq.toString().length>11||tel.toString().length!==11){
      wx.showToast({
        title: '请检查输入',
        icon: 'none',
        duration: 2000
      })
    }else{
      db.collection("user").add({
        data:{
          name:name,
          tel:tel,
          qq:qq,
          score:0
        },
        success(res){
          console.log("成功添加")
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 2000
          })
          wx.switchTab({
            url: '../my/my',
          })
        },
        fail(res){
          console.log("添加失败")
        }
      })
    }
  
  },
  getopenid:function(){
   console.log(app.globalData.openid)
  },
  
})
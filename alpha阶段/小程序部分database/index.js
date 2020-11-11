//index.js
const app = getApp()
const db=wx.cloud.database().collection("information")
let ����=''
let QQ��=''
let �ֻ�����=''
let ����=''
Page({
  data: {

  },
  handleName(event){
    ����=event.detail.value;
  },
  handleQQ(event){
  QQ��=event.detail.value;
  },
  handleTel(event){
  �ֻ�����=event.detail.value;
  },
  handleEmail(event){
  ����=event.detail.value;
  }, 
  handleAdd(){
  db.add({
    data:{
      ����:����,
      QQ��:QQ��,
      �ֻ�����:�ֻ�����,
      ����:����
    },
    success(res){
      console.log("�ɹ����")
    },
    fail(res){
      console.log("���ʧ��")
    }
  })
  },

  onLoad: function() {
    if (!wx.cloud) {
      wx.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }

    // ��ȡ�û���Ϣ
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // �Ѿ���Ȩ������ֱ�ӵ��� getUserInfo ��ȡͷ���ǳƣ����ᵯ��
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.data.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
    // �����ƺ���
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[�ƺ���] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[�ƺ���] [login] ����ʧ��', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },

  // �ϴ�ͼƬ
  doUpload: function () {
    // ѡ��ͼƬ
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        wx.showLoading({
          title: '�ϴ���',
        })

        const filePath = res.tempFilePaths[0]
        
        // �ϴ�ͼƬ
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[�ϴ��ļ�] �ɹ���', res)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath
            
            wx.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[�ϴ��ļ�] ʧ�ܣ�', e)
            wx.showToast({
              icon: 'none',
              title: '�ϴ�ʧ��',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },

})

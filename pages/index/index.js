//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    result: '',
    username: '',
    passwd: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  inputName: function (e) {	// 用于获取输入的账号
    this.setData({
      username: e.detail.value	//将获取到的账号赋值给username变量
    })
  },

  inputPwd: function (e) {		// 用于获取输入的密码
    this.setData({
      passwd: e.detail.value	//将获取到的账号赋值给passwd变量
    })
  },

  log: function (e) {		//与服务器进行交互
    wx.request({
      url: 'http://127.0.0.1:8000/login/',	//获取服务器地址，此处为本地地址
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
        username: this.data.username,
        passwd: this.data.passwd
      },
      success: res => {
        // console.log(res.statusCode)
        if (res.statusCode == 200) {
          //转成json字符串
          var r = res.data
          var citystr = JSON.stringify(r)

          //转成json对象
          var cityjson = JSON.parse(citystr);
          wx.setStorageSync('studentdata', res.data.stud)
          this.setData({
            result: res.data,	//服务器返回的结果
          })
          wx.redirectTo({
            url: '../main/main'
          })
          // var str = res.data.stud
          // var obj = new Function('return ' + str)();
          // console.log(obj.name);
          console.log(typeof (res.data.stud))
        }
      }
      
      // success:wx.redirectTo({
      //   url: '../education/index',
      //   success: function(res) {
      //     this.setData({
      //       result: res.data	//服务器返回的结果
      //     })
      //   },
      //   fail: function(res) {},
      //   complete: function(res) {},
      // })
    })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})

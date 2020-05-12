// pages/weather/weather.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:"",
    course_number:"",
    username:""
  },
  fanhui: function (event) {
    wx.navigateTo({
      url: '../main/main',
    })

  },
  takePhoto() {
    const ctx = wx.createCameraContext()
    
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        s: res.tempImagePath
        // wx.uploadFile({
        //   url: 'http://example.weixin.qq.com/upload', //仅为示例，非真实的接口地址
        //   filePath: tempFilePaths[0],
        //   name: 'file',
        //   formData: {
        //     'user': 'test'
        //   },
        //   success: function (res) {
        //     var data = res.data
        //     //do something
        //   }
        // })

        this.setData({
          src: res.tempImagePath
        })
        this.localhostimgesupdata(res.tempImagePath)
        

      }
    })
  },
  localhostimgesupdata: function (imgPath) {
    var course_number = wx.getStorageSync('course_number')
    var username = wx.getStorageSync('username')

       var that =this  //需加上否则返回不了数据
    　　console.log("图片上传")
    console.log(course_number)
    　　wx.uploadFile({
             url:"http://127.0.0.1:8000/jugleface", // 图片上传服务器真实的接口地址
      　　　　filePath: imgPath,
      　　　　name: "imgFile",
              formData: {		//向服务器发送的信息
                course_number: course_number,
                username: username
             },
        success: res => {
              console.log(res.data)
        　　　　　　wx.showToast({
          　　　　　　　　title: "图片正在识别",
          　　　　　　　　icon: "success",
          　　　　　　　　duration: 2000
        　　　　　　})
                  that.setData({
                    result: res.data,	//服务器返回的结果
                  })
          


      　　　　}
    　　})
  },
  error(e) {
    console.log(e.detail)
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var course = wx.getStorageSync('course')

    this.setData({
      course: course
      // list: cityjson
    })
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

  
  goback() {
    wx.navigateBack({
    })
  }
})
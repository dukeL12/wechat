// pages/main2/main2.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '/images/1.jpg',
      '/images/2.jpg',
    ],
    result5:[],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    indicatorcolor: "#FFFFFF",
    indicatoractivecolor: "#FF7F50",
    circular: true,
  },

  onLoad: function (options) {
    var result5 = wx.getStorageSync('result5')
    this.setData({
      result5: result5
    })
    console.log(result5)
  },

  banjikaoqin: function (event) {
    wx.setStorageSync('banji', event.currentTarget.dataset.s)
    console.log(event.currentTarget.dataset.s)
    wx.navigateTo({
      url: '../banjikaoqin/banjikaoqin',
    })

  },
  kaoqin: function () {
    wx.navigateTo({
      url: '../Statistics/Statistic',
    })
  },
  jinrikaoqin: function () {
    wx.navigateTo({
      url: '../Calendar/Calendar',
    })
  },
  luru: function () {
    wx.navigateTo({
      url: '../Input/Input',
    })
  },
  mosheng: function () {
    wx.navigateTo({
      url: '../strange/strange',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {

  // },

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

  }
})
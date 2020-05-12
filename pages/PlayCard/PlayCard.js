// pages/PlayCard/PlayCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseforme:[],
    course:"",
    in_year:0,
    in_month: 0,
    cur_year: 0,
    cur_month: 0,
    in_day: 0,
    cur_day: 0

  },
  renlianshibie: function (e) {
    // var course = e.currentTarget.dataset.id;
    wx.setStorageSync('course_number', e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var courseforme = wx.getStorageSync('courseforme')
    var in_year = wx.getStorageSync('in_year')
    var in_month = wx.getStorageSync('in_month')
    var in_day = wx.getStorageSync('in_day')
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getUTCDate();
    console.log("天数")
    console.log(cur_day)


    this.setData({
      courseforme: courseforme,
      // list: cityjson
      in_year: in_year,
      in_month: in_month,
      cur_year: cur_year,
      cur_month: cur_month,
      in_day: in_day,
      cur_day: cur_day
    })
    console.log(typeof (courseforme))
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

  }
})
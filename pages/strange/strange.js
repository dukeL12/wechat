// pages/strange/strange.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '2019-12-09',
    index: 0,

    list: [{
        "id": 1,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:51"
      },
      {
        "id": 2,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:52"
      },
      {
        "id": 3,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:53"
      },
      {
        "id": 4,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:54"
      },
      {
        "id": 5,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:55"
      },
      {
        "id": 6,
        "img": "/images/9.jpg",
        "time": "2019-12-09 13:56"
      }
    ]
  },

  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
    this.setData({
      list:this.data.list
    })
  },

  previewImage: function(e) {
    var id = e.currentTarget.dataset.id;
    var imagelists = []
    var imglist = this.data.list
    for (var i = 0; i < imglist.length; i++) {
      var imgs = imglist[i]
      var img = imgs['img']
      imagelists.push(img)
    }
    console.log(imagelists[id - 1])
    console.log(id)
    wx.previewImage({
      current: imagelists[id-1], // 当前显示图片的http链接
      urls: imagelists // 需要预览的图片http链接列表
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
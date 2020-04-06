// pages/map/map.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  // key: 'BZ6BZ-MAKW4-DOXUZ-D7YB3-VXC6V-Q4BZI'
  key: 'T67BZ-VNWCW-74HRS-OKA4P-VPSGK-DWFXR'
});
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lat:0,
    lon:0,
    markers: [],
    polyline: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getLocation({
      success: function(res) {
        console.log(res);
        that.setData({
          lat:res.latitude,
          lon:res.longitude,
          markers:[{
            iconPath: '/images/qz.jpg',
            id:0,
            latitude:res.latitude,
            longitude:res.longitude,
            width:30,
            height:30
          },
            {
              iconPath: '/images/qz.jpg',
              id: 1,
              latitude: res.latitude + 0.01,
              longitude: res.longitude,
              width: 30,
              height: 30
            }
          ],
          polyline: [{
            points: [{
              latitude: res.latitude,
              longitude: res.longitude,
            },
            {
              latitude: res.latitude + 0.01,
              longitude: res.longitude,
            }],
            color: "#ff00ff",
            width: 2,
            dottedLine: false,//虚实线
          }],

        });
        qqmapsdk.reverseGeocoder({
          location:{
            latitude: that.data.lat,
            longitude: that.data.lon
          },
          success:function(res){
            console.log(res);
          }
        });
      },
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
  
  }
})
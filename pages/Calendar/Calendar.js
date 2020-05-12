// pages/Calendar/Calendar.js
//打卡日历页面
var util = require('../../utils/util.js');
var Bmob = require('../../utils/bmob.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    objectId:'',
    days:[],
    signUp:[],
    real_month:0,
    cur_year:0,
    cur_month:0,
    cur_day:0,
    count:0,
    in_day:0,
    in_month:0,
    username:"",
    in_year:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({objectId : options.objectId}); 
    
    //获取当前年月
    // const real_month = date.getMonth() + 1;  
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const cur_day = date.getUTCDate();
    const real_month = date.getMonth() + 1; 
    console.log(cur_day)
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    //获取当前用户当前任务的人签到状态
    
    // this.onGetSignUp();
    // console.log("1000")
    this.setData({
      real_month,
      cur_year,
      cur_month,
      cur_day,
      weeks_ch
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
  huoquyuefen: function (e) {		// 用于获取输入的密码
    this.setData({
      in_day: e.detail.value	//将获取到的账号赋值给passwd变量
    })
    console.log(this.data.day)
  },
  renlianshibie: function (e) {
    // var that = this;
    var username = wx.getStorageSync('username')
    var in_day = e.currentTarget.dataset.id;
    console.log(username)
    this.setData({
      in_day: e.detail.value	//将获取到的账号赋值给passwd变量
    })
    var in_month = this.data.cur_month;
    var in_year = this.data.cur_year;
    wx.setStorageSync('in_year', in_year)
    wx.setStorageSync('in_month', in_month)
    wx.setStorageSync('in_day', in_day)
    wx.request({
      url: 'http://127.0.0.1:8000/findkecheng/',	//获取服务器地址，此处为本地地址
      header: {
        "content-type": "application/x-www-form-urlencoded"		//使用POST方法要带上这个header
      },
      method: "POST",
      data: {		//向服务器发送的信息
        in_year: this.data.cur_year,
        username:username,
        in_day: in_day,
        in_month: this.data.cur_month
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
          wx.setStorageSync('courseforme', res.data.courseforme)
          this.setData({
            result: res.data.courseforme	//服务器返回的结果
          })
          wx.redirectTo({
            url: '../PlayCard/PlayCard'
          })
          // var str = res.data.stud
          // var obj = new Function('return ' + str)();
          // console.log(obj.name);
          console.log(res.data.courseforme)
        }
      }

    })
    console.log("kais")
    console.log(in_day)
    console.log(in_month)
    // wx.navigateTo({
    //   url: '../PlayCard/PlayCard',
    // })
  },

  // 获取当月共多少天
  getThisMonthDays:function(year, month){
      return new Date(year, month, 0).getDate()
  },
    
  // 获取当月第一天星期几
  getFirstDayOfWeek:function(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  // 计算当月1号前空了几个格子，把它填充在days数组的前面
  calculateEmptyGrids:function(year, month) {
    var that = this;
    //计算每个月时要清零
    that.setData({days:[]});
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);    
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        var obj  = {
          date:null,
          slemonth:month,
          isSign:false
        }
        that.data.days.push(obj);
      }
      this.setData({
        days:that.data.days
      });
    //清空
    } else {
      this.setData({
        days: []
      });
    }
  },

  // 绘制当月天数占的格子，并把它放到days数组中
  calculateDays:function(year, month) {
    var that = this;
    const thisMonthDays = this.getThisMonthDays(year, month);
    for (let i = 1; i <= thisMonthDays; i++) {
      var obj = {
        date: i,
        slemonth: month,
        isSign: false
      }
      that.data.days.push(obj);
    }
    this.setData({
      days:that.data.days
    });
  },

  //匹配判断当月与当月哪些日子签到打卡
  onJudgeSign:function(){
    var that = this;
    var signs = that.data.signUp;
    var daysArr = that.data.days;
    for (var i=0; i < signs.length;i++){
      var current = new Date(signs[i].date.replace(/-/g, "/"));
      var year = current.getFullYear();
      var month = current.getMonth()+1;
      var day = current.getDate();
      day = parseInt(day);
      for (var j = 0; j < daysArr.length;j++){
        //年月日相同并且已打卡
        if (year == that.data.cur_year && month == that.data.cur_month && daysArr[j].date == day && signs[i].isSign == "今日已打卡"){
          daysArr[j].isSign = true;
        }
      }
    }
    that.setData({days:daysArr});
  },

  // 切换控制年月，上一个月，下一个月
  handleCalendar:function(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      // this.onGetSignUp();      
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }
      this.calculateEmptyGrids(newYear, newMonth);
      this.calculateDays(newYear, newMonth);
      // this.onGetSignUp();      
      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      })
    }
  },

  //获取当前用户该任务的签到数组
  onGetSignUp:function(){
    var that = this;
    var Task_User = Bmob.Object.extend("task_user");
    var q = new Bmob.Query(Task_User);
    q.get(that.data.objectId, {
      success: function (result) {
        that.setData({
          signUp : result.get("signUp"),
          count : result.get("score")
        });
        //获取后就判断签到情况
        that.onJudgeSign();
      },
      error: function (object, error) {
      }
    });   
  }
})
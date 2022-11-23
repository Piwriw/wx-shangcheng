// 引入fetch文件
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
Page({
  data: {
    list:getApp().list,
    avatarUrl: defaultAvatarUrl,
    isDig:false,
  },
  onLoad: function (options) {
    wx.showLoading({
      title: "努力加载中"
    })
    // 设置小程序导航栏标题文字内容
    wx.setNavigationBarTitle({
      title: '消费记录'
    })
    this.setData({
      listData:{
        "record":[
          {
            "record_id":1,
            "summoney":40.00,
            "date": "2017-07-15",
            "time": "12:00"
          },
          {
            "record_id":2,
            "summoney":30.00,
            "date": "2017-08-10",
            "time": "11:40"
          },
          {
            "record_id":3,
            "summoney":30.00,
            "date": "2017-08-10",
            "time": "11:40"
          }
        ]
      }
    })
    wx.hideLoading()
  },
  goUserinfo(){
    if (this.data.avatarUrl==defaultAvatarUrl||this.data.nickName==""){
          this.setData({
            isDig:!this.data.isDig
          })
    }else{
      const user = {
        avatarUrl:this.data.avatarUrl,
        nickName:this.data.nickName
      }
      wx.navigateTo({
        url:'/pages/userinfo/userinfo?avatarUrl='+this.data.avatarUrl+'&nickName='+this.data.nickName
      })
    }

  },
  getNickName(e){
   this.setData({
     nickName:e.detail.value
   })
  },
  callOffer(){
    wx.makePhoneCall({
      phoneNumber:"123456",
      success:(res=>{
        console.log("拨打电话成功")
      }),
      fail:(err=>{
        console.log(err,"拨打电话失败")
      })
    })
  },
  onChooseAvatar(e) {
    const {avatarUrl} = e.detail
    this.setData({
      avatarUrl,
    })
  },
})

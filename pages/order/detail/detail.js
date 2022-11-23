const fetch = require('../../../utils/fetch.js')
const util = require("../../../utils/util");
const app = getApp()
Page({
    data: {
        orderTime: null,
    },
    onLoad: async function (e) {
        // 取出缓存的note值
        var note = wx.getStorageSync('note')
        wx.setNavigationBarTitle({
            title: '订单详情'
        })
        console.log(e)
        const address = e.address
        const orderInfo = JSON.parse(e.orderInfo)
        const order_id = e.order_id
        // console.log(address)
        // console.log(orderInfo)
        // console.log(order_id)
        let sum = 0
        let sendList = ""
        orderInfo.forEach(item => {
            sum += item.price * item.number
            sendList += item.name
        })
        const payTime = util.formatTime(new Date())
        // console.log(payTime)
        this.setData({
            order: orderInfo,
            sumMonney: sum,
            note,
            order_id,
            payTime,
            address
        })


          wx.request({
              url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx16276e84c41b8e15&secret=f379711350fe6d4340a0804a96bdb854',
              method: 'GET',
              success: res => {
                  const access_token = res.data.access_token
                  const thing4="请尽快来取!"
                  // console.log("thing4",thing4)
                  // console.log("app.OPENID",app.OPENID)
                  wx.request({
                      url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + access_token,
                      method: 'POST',
                      data: {
                          "touser": app.OPENID,
                          "template_id": "YzYxqCNDd1delpjLVdJVjdOD67ZMdz-MfLBxpJbbTZI",
                          "page": "index",
                          "miniprogram_state": "formal" +
                              "",
                          "lang": "zh_CN",
                          "data": {
                              "character_string1": {
                                  "value": order_id
                              },
                              "time2": {
                                  "value": payTime
                              },
                              "thing3": {
                                  "value": sendList
                              },
                              "thing4": {
                                  "value": thing4
                              }
                          }
                      },
                      success: res => {
                          console.log("requestSubscribeMessage", res)
                      },
                      fail(res) {
                          console.log('error', res)
                      }
                  })
              }

          //      fail:res=>{
            //          console.log('ERROR  requestSubscribeMessage ', res)
            //      }
            // })
            // fetch('food/order', { order_id: options.order_id }).then((res) => {
            //   var foods = res.data.foods
            //   //算总价
            //   var sum = 0;
            //   for (var i in foods) {
            //     sum += foods[i].price * foods[i].num
            //   }
            //   if (res.data.promotion.length > 0 && sum > res.data.promotion.discount) {
            //     sum -= res.data.promotion.discount
            //   }
            //   this.setData({
            //     order: res.data,
            //     sumMonney: sum,
            //     note: note
            //   })
            // })
        })
    },

    getUserProfile(e) {
        wx.getUserProfile({
            desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        })

    },
    onUnload: function () {
        var app = getApp();
        // 支付成功之后调到订单页面，通知订单页刷新
        app.isReloadOrderList = true
        wx.switchTab({
            url: '/pages/order/list/list'
        })
    }
})

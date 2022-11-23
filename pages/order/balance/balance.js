const fetch = require('../../../utils/fetch.js')

Page({
    data: {
        sumMonney: 0,
        cutMonney: 0,
        note: '',
        max: '20',
        taken: '',
        location: '收货地址',
        latitude: "39.915351",
        longitude: "116.403613",
        markers: []

    },
    onLoad: function (e) {

        const cartList = JSON.parse(e.cartList)
        const order_id = e.order_id
        this.setData({
            order_id,
            cartList
        })
        let sum = 0
        cartList.forEach(item => {
            sum += item.price * item.number
        })
        this.setData({
            order: cartList,
            sumMonney: sum
        })
        // 请求订单接口
        // fetch('food/order', { order_id: options.order_id}).then((res) => {
        //   var foods = res.data.foods
        //   // 计算总价
        //   var sum = 0;
        //   for (var i in foods) {
        //     sum += foods[i].price * foods[i].num
        //   }
        //   if (res.data.promotion.length > 0 && sum > res.data.promotion.discount) {
        //     sum -= res.data.promotion.discount
        //   }
        //   this.setData({
        //     order: res.data,
        //     sumMonney: sum
        //   })
        // })
    },
    getLocation() {
        let plugin;
        try {
            // eslint-disable-next-line no-undef
            plugin = requirePlugin("wx-chooseLocation");
        } catch (error) {
            console.error(error);
        }
        plugin &&
        plugin
            .getChooseLocation()
            .then((res) => {
                console.log(res)
                if (res.address == '') {
                    wx.lin.showMessage({
                        content: '你还没有选择收货地址'
                    })
                    return
                }
                const markers = [{
                    iconPath: '/icons/my.png',
                    longitude: res.longitude,
                    latitude: res.latitude,
                    id: 0,
                    width: 34,
                    height: 49,
                    label: {
                        content: res.address,
                        color: '#FF0202',
                    }
                }]
                this.setData({
                    location: res.address,
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers,
                })
            })
            .catch((e) => {
                wx.lin.showMessage({
                    content: '你还没有选择收货地址'
                })
            });
    },
    // 实时监控textarea值，采用同步的方式存储note值（'key',value）
    listenerTextarea: function (e) {
        var note = e.detail.value;
        wx.setStorageSync('note', note)
    },


    // 点击“去支付”
    gotopay: async function (e) {
        if (this.data.location == '收货地址') {
            wx.lin.showMessage({
                content: '你还没有选择收货地址'
            })
            return
        }
        wx.requestSubscribeMessage({
            tmplIds: ['YzYxqCNDd1delpjLVdJVjdOD67ZMdz-MfLBxpJbbTZI'],
            success:res=> {
                // const map=_objToStrMap(res)
                // const isAc=map[YzYxqCNDd1delpjLVdJVjdOD67ZMdz-MfLBxpJbbTZI]
                // console.log("accc",isAc)
                // if (isAc=='reject'){
                //     wx.lin.showMessage({
                //         content: '您刚刚拒绝了模板消息'
                //     })
                //     return
                // }
                var order_id = this.data.order_id
                wx.navigateTo({
                    url: '../detail/detail?order_id=' + order_id + '&orderInfo=' + JSON.stringify(this.data.cartList) + '&address=' + this.data.location
                })
            },
            fail:res=>{
                console.log('error', res)

            },
        })

        // 请求支付接口，把订单号传给后台，返回数据{error: 0, order_id: 1}
        // var method = 'POST'
        // fetch('food/pay', {order_id: order_id}, method).then((res) => {
        //     if (res.data.error !== 0) {
        //         wx.showModal({
        //             title: '支付失败',
        //             content: '请您重新尝试',
        //         })
        //         return
        //     }
        //     wx.showToast({
        //         title: '支付成功',
        //         icon: 'success',
        //         duration: 2000,
        //         success: function () {
        //             setTimeout(function () {
        //                 wx.navigateTo({
        //                     url: '../detail/detail?order_id=' + res.data.order_id
        //                 })
        //             })
        //         }
        //     })
        // });
    }
})

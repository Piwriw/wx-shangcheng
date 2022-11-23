//app.js
App({
    //定义全局变量：是否刷新页面。为false不执行刷新
    isReloadOrderList: false,
    list: [
        {
            "selectedIconPath": "/icons/index-selected.png",
            "iconPath": "/icons/index.png",
            "pagePath": "/pages/index/index",
            "text": "首页",
        },
        {
            "selectedIconPath": "/icons/order-selected.png",
            "iconPath": "/icons/order.png",
            "pagePath": "/pages/order/list/list",
            "text": "订单",
            "redDot": 99
        },
        {
            "selectedIconPath": "/icons/user-selected.png",
            "iconPath": "/icons/user.png",
            "pagePath": "/pages/record/record",
            "text": "我的",
            "redDot": 66
        }
    ],
    OPENID: "",
    APPID: "wx16276e84c41b8e15",
    APPSECRET: "f379711350fe6d4340a0804a96bdb854",
    async onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
        const APPID = "wx16276e84c41b8e15"
        const SECRET = "f379711350fe6d4340a0804a96bdb854"
        // 登录
        await wx.login({
            success: res => {
                const code = res.code
                wx.request({
                    url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx16276e84c41b8e15&secret=f379711350fe6d4340a0804a96bdb854&js_code=' + code + '&grant_type=authorization_code',
                    method: 'GET',
                    success: res => {
                        wx.setStorageSync('openid', res.data.openid)
                    }
                })
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
            }
        })
        const openid = await wx.getStorageSync('openid')
        const app=getApp()
        app.OPENID=openid

    },

})

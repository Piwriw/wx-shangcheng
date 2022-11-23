// pages/home/home.js
const fetch = require('../../utils/fetch.js')
const app=getApp()
Page({
    data: {
        // 显示面板指示点
        indicatorDots: true,
        // 图片自动切换
        autoplay: true,
        // 自动切换时间间隔
        interval: 5000,
        // 滑动动画时长
        duration: 1000,
        list: getApp().list,
        vid: "s0034y4ajqn"
    },
    onLoad: async function (options) {

        // 显示模态对话框
        wx.showLoading({
            title: "努力加载中"
        })
        this.setData({
            listData: [
                {
                    "imgUrls": [{
                        "id": 1,
                        "src": "https://s1.ax1x.com/2022/11/16/zZRYN9.png",
                    },
                        {
                            "id": 2,
                            "src": "https://s1.ax1x.com/2022/11/16/zZRthR.png"

                        },
                        {
                            "id": 3,
                            "src": "https://s1.ax1x.com/2022/11/16/zZRa1x.png"
                        },
                        {
                            "id": 4,
                            "src": "https://s1.ax1x.com/2022/11/16/zZRwjK.png"
                        }],
                    "image_ad": "../../images/image_ad.png",
                    "image_bottom": [{
                        "id": 1,
                        "src": "https://s1.ax1x.com/2022/11/16/zZfQwF.png"
                    },
                        {
                            "id": 2,
                            "src": "https://s1.ax1x.com/2022/11/16/zZfMeU.png"
                        },
                        {
                            "id": 3,
                            "src": "https://s1.ax1x.com/2022/11/16/zZfuLT.png"
                        }, {
                            "id": 4,
                            "src": "https://s1.ax1x.com/2022/11/16/zZfQwF.png"
                        }
                    ]
                }
            ]
        })

        wx.hideLoading()
        // // 请求数据
        // fetch('food/index').then((res) => {
        //   // 请求成功，关闭对话框
        //   console.log(res)
        //   wx.hideLoading();
        //   // 把接口返回数据setData给listData
        //   this.setData({
        //     listData: res.data,
        //   })
        // },() => {
        //   // 请求失败，关闭对话框，执行fetch.js文件中的fail方法
        //   wx.hideLoading();
        // });


    },
    gostart: function () {
        wx.navigateTo({
            url: "../list/list",
        })
    }
})

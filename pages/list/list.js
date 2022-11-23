const fetch = require('../../utils/fetch.js')
Page({
    data: {
        activeIndex: 0,
        toView: "a0",
        cartList: [],
        currentType: 0,
        currentIndex: 0,
        sumMonney: 0, // 总价钱
        cupNumber: 0, // 购物车里商品的总数量
        showCart: false, // 是否展开购物车
        loading: false,
        containerH: '',
        heightArr: [] // 数组:查找到的所有单元的内容高度
    },
    onLoad: function (options) {
        // 显示模态对话框
        wx.showLoading({
            title: "努力加载中"
        })
        this.setData({
            listData: [{
                "name": "热销推荐",
                "icon_src": "/icons/hot.png",
                "foods": [{
                    "image_url": "https://s1.ax1x.com/2022/11/16/zZR4u8.jpg",
                    "name": "栗子忌廉饼",
                    "price": "38",
                },
                    {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZRfjf.jpg",
                        "name": "白桃软心草莓蛋糕",
                        "price": "48",
                    },
                    {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZRIHg.jpg",
                        "name": "泰式绿豆糕",
                        "price": "18",
                    },
                    {
                        "image_url": "/images/fruittea/fruittea-1.png",
                        "name": "爆柠青梅白茶",
                        "price": "11",
                    },
                    {
                        "image_url": "/images/fruittea/fruittea-2.png",
                        "name": "蜜桃养乐多",
                        "price": "15",
                    },
                    {
                        "image_url": "/images/fruittea/fruittea-3.png",
                        "name": "香橙柠檬茶",
                        "price": "14",
                    },

                    {
                        "image_url": "/images/coffee/coffee-1.png",
                        "name": "浓缩咖啡",
                        "price": "14",
                    },
                    {
                        "image_url": "/images/coffee/coffee-2.png",
                        "name": "玛奇朵",
                        "price": "13",
                    }
                ]
            },
                {
                    "name": "精选蛋糕",
                    "icon_src": "/icons/cake.png",
                    "foods": [{
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZRIHg.jpg",
                        "name": "绿豆饼",
                        "price": "14",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZRR3t.jpg",
                        "name": "榛子芭菲",
                        "price": "19",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZR5DS.jpg",
                        "name": "蜂蜜梨毛士蛋糕",
                        "price": "58",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZR5DS.jpg",
                        "name": "韩日绿茶饼",
                        "price": "68",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/16/zZRTEQ.jpg",
                        "name": "芒果千层",
                        "price": "48",
                    },

                    ]
                },
                {
                    "name": "提神咖啡",
                    "icon_src": "/icons/coffee.png",
                    "foods": [{
                        "image_url": "/images/coffee/coffee-4.png",
                        "name": "美式咖啡",
                        "price": "14",
                    }, {
                        "image_url": "/images/coffee/coffee-5.png",
                        "name": "康宝蓝",
                        "price": "18",
                    }, {
                        "image_url": "/images/coffee/coffee-6.png",
                        "name": "卡布奇诺",
                        "price": "19",
                    }, {
                        "image_url": "/images/coffee/coffee-7.png",
                        "name": "爱尔兰咖啡",
                        "price": "21",
                    }, {
                        "image_url": "/images/coffee/coffee-8.png",
                        "name": "维也纳咖啡",
                        "price": "23",
                    },

                    ]
                },
                {
                    "name": "水果茶",
                    "icon_src": "/icons/fruittea.png",
                    "foods": [{
                        "image_url": "/images/fruittea/fruittea-4.png",
                        "name": "柠檬水果茶",
                        "price": "14",
                    }, {
                        "image_url": "/images/fruittea/fruittea-5.png",
                        "name": "缤纷百香果",
                        "price": "18",
                    }, {
                        "image_url": "/images/fruittea/fruittea-6.png",
                        "name": "百香果柠檬茶",
                        "price": "19",
                    }, {
                        "image_url": "/images/fruittea/fruittea-7.png",
                        "name": "葡萄芋圆啵啵",
                        "price": "21",
                    }, {
                        "image_url": "/images/fruittea/fruittea-8.png",
                        "name": "金桔柠檬",
                        "price": "23",
                    },

                    ]
                },
                {
                    "name": "奶茶",
                    "icon_src": "/icons/naicha.png",
                    "foods": [{
                        "image_url": "https://s1.ax1x.com/2022/11/18/zn2Nb8.jpg",
                        "name": "桂花冻奶茶",
                        "price": "14",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/18/zn2aVS.jpg",
                        "name": "咖啡冻奶茶",
                        "price": "16",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/18/zn2tDf.jpg",
                        "name": "焦糖珍珠奶茶",
                        "price": "17",
                    }, {
                        "image_url": "https://s1.ax1x.com/2022/11/18/zn2D8s.jpg",
                        "name": "西瓜芝芝",
                        "price": "21",
                    },

                    ]
                },

            ],
            loading: true
        })
        wx.hideLoading();
        // 请求数据
        // fetch('food/list').then((res) => {
        //   wx.hideLoading();
        //   this.setData({
        //     listData: res.data,
        //     loading: true
        //   })
        // })
    },

    // 点击左侧菜单项选择
    selectMenu: function (e) {
        let index = e.currentTarget.dataset.index
        console.log(index)
        this.setData({
            activeIndex: index,
            toView: "a" + index,
        })
    },
    // 加入购物车
    addToCart: function (e) {
        console.log(e)
        var type = e.currentTarget.dataset.type;
        var index = e.currentTarget.dataset.index;
        const data = e.currentTarget.dataset.data;

        this.setData({
            currentType: type,
            currentIndex: index,
        });
        var a = this.data
        let addItem = {
            "name": data.name,
            "price": data.price,
            "number": 1,
        }
        let sumMonney = this.data.sumMonney + parseInt(data.price)
        // 把新数组(addItem) push到 原数组cartList
        var cartList = this.data.cartList;
        cartList.push(addItem);
        this.setData({
            cartList: cartList,
            showModalStatus: false,
            cupNumber: a.cupNumber + 1,
            sumMonney
        });
    },
    // 展开购物车
    showCartList: function () {
        if (this.data.cartList.length != 0) {
            this.setData({
                showCart: !this.data.showCart,
            });
        }
    },
    // 购物车添加商品数量
    addNumber: function (e) {
        var index = e.currentTarget.dataset.index;
        var cartList = this.data.cartList;
        cartList[index].number++;
        var sum = parseInt(this.data.sumMonney) + parseInt(cartList[index].price);
        cartList[index].sum += cartList[index].price;
        this.setData({
            cartList: cartList,
            sumMonney: sum,
            cupNumber: this.data.cupNumber + 1
        })
    },
    // 购物车减少商品数量
    decNumber: function (e) {
        var index = e.currentTarget.dataset.index;
        var cartList = this.data.cartList;
        var sum = this.data.sumMonney - cartList[index].price;
        cartList[index].sum -= cartList[index].price;
        cartList[index].number == 1 ? cartList.splice(index, 1) : cartList[index].number--;
        this.setData({
            cartList: cartList,
            sumMonney: sum,
            showCart: cartList.length == 0 ? false : true,
            cupNumber: this.data.cupNumber - 1
        });
    },
    // 清空购物车
    clearCartList: function () {
        this.setData({
            cartList: [],
            showCart: false,
            sumMonney: 0,
            cupNumber: 0
        });
    },
    // 点击"选好了"，缓存购物车的值
    goBalance: function (e) {
        if (this.data.sumMonney == 0) {
            return
        }
        const order_id = "testid-1"
        const cartList = this.data.cartList
        wx.navigateTo({
            url: '../order/balance/balance?order_id=' + order_id + '&cartList=' + JSON.stringify(cartList)
        })
        // 请求接口返回参数{error: 0（错误代码）, order_id: 1}}
        // var order_id = this.data.order_id
        // var method = "POST"
        // fetch("food/order", {id: 1,num: 1}, method).then(function(res) {
        //   if (res.data.error !== 0) {
        //     wx.showModal({
        //       title: '下单失败',
        //       content: '操作失败请重试',
        //     })
        //     return
        //   }
        //   // 请求成功后跳转到订单确认页面，把返回的order_id订单编号传过去
        //   wx.navigateTo({
        //     url: '../order/balance/balance?order_id=' + res.data.order_id
        //   })
        // })

    }
})

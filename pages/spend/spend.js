// pages/spend/spend.js
import * as echarts from '../../component/ec-canvas/echarts'

const listData={
    "record": [
        {
            "record_id": 1,
            "summoney": 40.00,
            "date": "2022-10-11",
            "time": "12:00"
        },
        {
            "record_id": 2,
            "summoney": 30.00,
            "date": "2022-10-12",
            "time": "11:40"
        },
        {
            "record_id": 3,
            "summoney": 30.00,
            "date": "2022-10-12",
            "time": "11:40"
        },
        {
            "record_id": 1,
            "summoney": 18.00,
            "date": "2022-10-16",
            "time": "12:00"
        },
        {
            "record_id": 2,
            "summoney": 36.00,
            "date": "2022-10-18",
            "time": "11:40"
        },
        {
            "record_id": 3,
            "summoney": 50.00,
            "date": "2022-10-19",
            "time": "11:40"
        }
    ]
}

function initChart(canvas, width, height, dpr) {
    let chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr // new
    });
    canvas.setChart(chart);
    let x = []
    let y = []
    console.log(listData)

    listData.record.forEach(item => {
        x.push(item.date)
        y.push(item.summoney)
    })

    const option = {
        title: {
            text: '月度消费记录',
            x:'center'
        },

        xAxis: {
            type: 'category',
            data: x,
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: y,
                type: 'line'
            }
        ],
    };

    chart.setOption(option);
    return chart;
}

Page({
    data: {
        ec: {
            onInit:initChart
        },
        listData: []
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            listData: {
                "record": [
                    {
                        "record_id": 1,
                        "summoney": 40.00,
                        "date": "2017-07-15",
                        "time": "12:00"
                    },
                    {
                        "record_id": 2,
                        "summoney": 30.00,
                        "date": "2017-08-10",
                        "time": "11:40"
                    },
                    {
                        "record_id": 3,
                        "summoney": 30.00,
                        "date": "2017-08-10",
                        "time": "11:40"
                    },
                    {
                        "record_id": 1,
                        "summoney": 18.00,
                        "date": "2022-10-16",
                        "time": "12:00"
                    },
                    {
                        "record_id": 2,
                        "summoney": 36.00,
                        "date": "2022-10-18",
                        "time": "11:40"
                    },
                    {
                        "record_id": 3,
                        "summoney": 50.00,
                        "date": "2022-10-19",
                        "time": "11:40"
                    }
                ]
            }
        })


    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})

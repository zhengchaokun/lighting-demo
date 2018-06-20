var radarOptions = {
    legend: {
        bottom: 5,
        data: ['个人', '团队', '部门'],
        itemGap: 20,
        itemWidth: 12,
        itemHeight: 12,
        padding: [20, 10],
        textStyle: {
            color: '#909090',
            fontSize: 14
        },
        bottom: -20,
        borderRadius: 10,
        selectedMode: 'multiple'
    },
    radar: {
        axisTick: {
            show: true
        },
        axisLabel: {
            // show: true,
            margin: 10
        },
        background: 'transparent',
        name: {
            textStyle: {
                color: '#909090',
                backgroundColor: 'transparent',
            }
        },
        splitNumber: 3,
        splitArea: {
            show: false
        },
        indicator: [
            { name: '引用', max: 12 },
            { name: '热度', max: 12 },
            { name: '贡献', max: 12 },
            { name: '产量', max: 12 },
            { name: '口碑', max: 12 }
        ]
    },
    series: [{
        name: '个人',
        type: 'radar',
        itemStyle: {
            normal: {
                color: '#0AA9F1'
            }
        },
        symbol: 'none',
        data: [
            {
                value: [10, 7, 5, 4, 8],
                name: '个人'
            }
        ]
    }, {
        name: '团队',
        type: 'radar',
        symbol: 'none',
        itemStyle: {
            normal: {
                color: '#FACC14'
            }
        },
        data: [{
            value: [3, 1, 3, 6, 9],
            name: '团队'
        }]
    }, {
        name: '团队',
        type: 'radar',
        symbol: 'none',
        itemStyle: {
            normal: {
                color: '#2FC25B'
            }
        },
        data: [{
            value: [4, 7, 5, 6, 1],
            name: '部门'
        }]
    }]
};

var options = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
    }]
};

var pieOptions = [
    {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['家用电器', '食用酒水', '个护健康', '服饰箱包', '母婴产品', '其他']
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '24',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 28.79, name: '家用电器' },
                    { value: 21.04, name: '食用酒水' },
                    { value: 19.73, name: '个护健康' },
                    { value: 14.83, name: '服饰箱包' },
                    { value: 7.80, name: '母婴产品' },
                    { value: 7.80, name: '其他' }
                ]
            }
        ]
    },
    {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['家用电器', '食用酒水', '个护健康', '服饰箱包', '母婴产品', '其他']
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '24',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 7.80, name: '家用电器' },
                    { value: 28.79, name: '食用酒水' },
                    { value: 19.73, name: '个护健康' },
                    { value: 14.83, name: '服饰箱包' },
                    { value: 7.80, name: '母婴产品' },
                    { value: 21.04, name: '其他' }
                ]
            }
        ]
    },
    {
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {d}%"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['家用电器', '个护健康', '服饰箱包', '母婴产品', '其他']
        },
        series: [
            {
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '24',
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    { value: 10.41, name: '家用电器' },
                    { value: 19.77, name: '个护健康' },
                    { value: 36.17, name: '服饰箱包' },
                    { value: 26.81, name: '母婴产品' },
                    { value: 6.83, name: '其他' }
                ]
            }
        ]
    }
]

exports.radarOptions = radarOptions;
exports.pieOptions = pieOptions;
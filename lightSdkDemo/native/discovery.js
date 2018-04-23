module.exports = {
  "inputParams": {
    "title":"首页"
  },
  "navigationbar": {
    "show": false,
    "immersiveMode": true
  },
  "menu": {
    "show": true
  },
  "style": {
  },
  "config": {
    "components": ["component1", "component2", "component3", "component4"],
    "componentsLib": {
      "component1": {
        "display": {
          "type": "banner"
        },
        "dataSource": {
          "action": "getBanners"
        }
      },
      "component2": {
        "display": {
          "type": "gridView"
        },
        "dataSource": {
          "action": "getHotComponents"
        }
      },
      "component3": {
        "header": "人气组合",
        "showHeader": true,
        "display": {
          "type": "squareView"
        },
        "dataSource": {
          "action": "getPortfolios"
        }
      },
      "component4": {
        "header": "今日要闻",
        "showHeader": true,
        "display": {
          "type": "listView"
        },
        "dataSource": {
           "action": "getListItems"
        }
      }
    }
  },
  "pages": [
    {
      "pageid": "discover",
      "inputParams": {
        "title":"发现"
      },
      "config": {
        "components": ["component1", "component2"]
      }
    }
  ]
}

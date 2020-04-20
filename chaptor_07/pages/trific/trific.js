Page({
  data: {
    latitude: 26.009362,
    longitude: 119.455,
    markers: [{
      id: 1,
      latitude: 26.009362,
      longitude: 119.455,
      name: 'T.I.T 创意园'
    }],
    covers: [{
      latitude: 26.009362,
      longitude: 119.455,
      iconPath: '/image/location.png'
    }, {
        latitude: 26.009362,
        longitude: 119.455,
      iconPath: '/image/location.png'
    }]
  },
  onReady: function (e) {
    this.mapCtx = wx.createMapContext('myMap')
  },
  getCenterLocation: function () {
    this.mapCtx.getCenterLocation({
      success: function (res) {
        console.log(res.longitude)
        console.log(res.latitude)
      }
    })
  },
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },
  translateMarker: function () {
    this.mapCtx.translateMarker({
      markerId: 1,
      autoRotate: true,
      duration: 1000,
      destination: {
        latitude: 26.009362,
        longitude: 119.455,
      },
      animationEnd() {
        console.log('animation end')
      }
    })
  },
  includePoints: function () {
    this.mapCtx.includePoints({
      padding: [10],
      points: [{
        latitude: 26.009362,
        longitude: 119.455,
      }, {
          latitude: 26.009362,
          longitude: 119.455,
      }]
    })
  }
})

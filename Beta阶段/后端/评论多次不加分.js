db.collection('user').where({
        _openid: openid
      })
      .get({
        success: function(res) {
          console.log(res.data)
          id = res.data[0]["_id"]
          const _ = db.command
          db.collection('evaluate').where({
            "buy_id":app.globalData.openid,
            "sell_id":openid
          })
          .get({
            success: function(res) {
              if(res.data.length===0){
                db.collection('evaluate').add({
                  data: {
                    "buy_id":app.globalData.openid,
                    "sell_id":openid,
                    "freq":1
                  },
                  success: function(res) {
                    console.log(res)
                  }
                })
              }
              else{
                if(res.data[0]["freq"]<=3){
                  db.collection('evaluate').doc(res.data[0]["_id"]).update({
                    data: {
                      freq:_.inc(1)
                    },
                    success: function(res) {
                    }
                  })
                  db.collection('user').doc(id).update({
                    data: {
                      score: _.inc(parseInt(score))
                    },
                    success: function(res) {
                    }
                  })
                }
                else{
                  wx.showToast({
                    title: '请勿刷单',
                    icon: 'none',
                    duration: 2000
                  })
                }
              }
            }
          })
        }
      })
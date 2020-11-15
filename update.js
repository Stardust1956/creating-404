update:function(event){
  const _ = db.command
  let id= event.currentTarget.dataset.value
  db.collection('client').doc(id).update({
    data: {
      inergration:_.inc(2)
    },
    success: function(res) {
      console.log(res.data)
    },
    fail: function(res){
      console.log(err)
    }
}
update:function(event){
  const _ = db.command
  let id= event.currentTarget.dataset.value
  db.collection('user').doc(id).update({
    data: {
      score:_.inc(5)
    },
    success: function(res) {
      console.log(res.data)
    },
    fail: function(res){
      console.log(err)
    }
}
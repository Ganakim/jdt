FlowRouter.notFound={
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', '404')
  }
}

FlowRouter.route('/', {
  action(){
    FlowRouter.go('/home')
  }
})

FlowRouter.route('/home', {
  action(params, queryParams) {
    console.log(params, queryParams)
    Session.set('content', 'home')
  }
})

FlowRouter.route('/auth', {
  action(params, queryParams) {
    console.log(params, queryParams)
    Meteor.call('discordPOST', queryParams.code, (err, res)=>{
      if(err){
        console.log(err)
      }else{
        Meteor.call('discordMe',res,(err, res)=>{
          user = res.data
          Meteor.call('findUser',user.id,(err, res)=>{
            if(err){
              console.log(err)
            }else{
              if(res){
                Meteor.loginWithPassword({id:res}, 'aaaaaa')
              }else{
                Meteor.call('newUser',user,(err, res)=>{
                  Meteor.loginWithPassword({id:res}, 'aaaaaa')
                })
              }
            }
          })
        })
      }
    })
    Session.set('content', 'home')
  }
})
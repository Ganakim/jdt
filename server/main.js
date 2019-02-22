import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

Meteor.startup(() => {
  // code to run on server at startup
})

Meteor.methods({
  loginD(){
    return HTTP.get('https://discordapp.com/api/oauth2/authorize',{
      params:{
        client_id:'548252166217924623',
        scope:'identify'
      }
    })
  },
  discordPOST(code){
    return HTTP.post(`https://discordapp.com/api/oauth2/token?client_id=548252166217924623&client_secret=Rhy%5FIl0lE8QPCQLI7BsCQHnxlrEasv3T&grant_type=client%5Fcredentials&scope=identify&code=${code}&redirect_uri=http%3A%2F%2F192.168.1.12%3A3000%2Fhome`)
  },
  discordMe(res){
    return HTTP.get(`https://discordapp.com/api/users/@me`,{
      headers:{
        'Authorization': `Bearer ${res.data.access_token}`
      }
    })
  },
  findUser(discordId){
    var user = Meteor.users.findOne({discordId:discordId})
    return user ? user._id : false
  },
  newUser(user){
    return Accounts.createUser({username:user.username, password:'aaaaaa', profile:{
      discordId:user.id,
      local:user.locale,
      avatar:`cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
    }})
  }
})

Meteor.publish('users',()=>{
  return Meteor.users.find({},{
    fields:{
      local:1,
      avatar:1
    }
  })
})

Accounts.onCreateUser((options, user) => {
  if (options.profile) {
    user.discordId = options.profile.discordId
    user.local = options.profile.local
    user.avatar = options.profile.avatar
  }
  return user;
})

Accounts.validateLoginAttempt(()=>{
  return true
})

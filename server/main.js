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
  }
})

import { Meteor } from 'meteor/meteor'
import { HTTP } from 'meteor/http'

Meteor.startup(() => {//Allow for future months is VERY difficult
  Dates.update({},{$set:{current:false}},{multi:true})
  Array(35).fill(0).map((n, i) => {
    currentDay = moment().startOf('month').startOf('week').clone().add(i, 'day').valueOf()
    if(!Dates.findOne({date:currentDay})){
      Dates.insert({date:currentDay, props:[], current:true});
    }else{
      if(moment(currentDay).isAfter(moment().subtract(1,'d'))){
        Dates.update({date:currentDay},{$set:{current:true}})
      }else{
        Dates.update({date:currentDay},{$set:{current:true,props:[]}})
      }
    }
  })
  Dates.remove({current:false})
})

Meteor.methods({
  discordPOST(code){
    return HTTP.post(`https://discordapp.com/api/oauth2/token?client_id=548252166217924623&client_secret=${process.env.Client_Secret}&grant_type=client%5Fcredentials&scope=identify%20guilds&code=${code}&redirect_uri=http%3A%2F%2Fjdt.herokuapp%3A3000%2Fhome`)
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
  },
  addRaid(date){
    Dates.find().fetch().map((day)=>{
      if(moment(day.date).isSame(date, 'day')){
        Dates.update(day._id,{$push:{props:{date:date,players:[]}}})
      }
    })
  },
  joinRaid(date, leave){
    update = {}
    update[leave ? '$pull' : '$push'] = {}
    var present = false
    Dates.findOne({date:moment(moment(date).format('YYYY-MM-DD')).valueOf()}).props.map((prop, i)=>{
      if(prop.date == date){
        update[leave ? '$pull' : '$push'][`props.${i}.players`] = this.userId
        present = prop.players.includes(this.userId)
      }
    })
    if((!present && !leave) || (present && leave)){
      Dates.update({date:moment(moment(date).format('YYYY-MM-DD')).valueOf()},update)
    }
  }
})

Meteor.publish('Users',()=>{
  return Meteor.users.find({},{
    fields:{
      type:1,
      local:1,
      avatar:1
    }
  })
})

Meteor.publish('Dates',()=>{
  return Dates.find({},{
    fields:{
      
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

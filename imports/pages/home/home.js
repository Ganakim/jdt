import './home.html'

Template.home.helpers({
  
})

Template.player.helpers({
  homeOptions(){
    return [
      {path:`sheet/${Meteor.user().username}`, text:'View my character sheet'},
      {path:'compendium', text:'Compendium'},
      {path:'messages', text:'Messages'},
      {path:'settings', text:'Settings'},
    ]
  }
})

Template.dm.helpers({
  homeOptions(){
    var options = []
    for(var user of Meteor.users.find().fetch()){
      options.push({path:`sheet/${user.username}`, text:user.username == Meteor.user().username ? 'NPC\'s' : user.username, color:user.theme})
    }
    options.push({path:'messages', text:'Messages', color:Meteor.user().theme},{path:'compendium', text:'Compendium', color:Meteor.user().theme},{path:'settings', text:'Settings', color:Meteor.user().theme})
    return options
  }
})

Template.home.events({
  'click .homeOption': function(e){
    FlowRouter.go(`/${this.path}`)
  },
})
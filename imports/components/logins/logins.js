import './logins.html'

Template.logins.events({
  'click #loginBtn':function(){
    window.location.href = 'https://discordapp.com/api/oauth2/authorize?response_type=code&client_id=548252166217924623&scope=identify'
  }
})
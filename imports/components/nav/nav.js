import './nav.html'

Template.nav.events({
  'click #logoutBtn': function(){
    AccountsTemplates.logout((err)=>{
      if(err){
        $('.loginErrors').text(err.reason)
      }else{
        if(!$('.navDrop').next('.dropdown').hasClass('flat')){
          $('.navDrop').next('.dropdown').addClass('flat')
          $('.navDrop').find('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
        }
      }
    })
    FlowRouter.go('/home')
  },
  'click #loginBtn':function(){
    window.location.href = 'https://discordapp.com/api/oauth2/authorize?client_id=548252166217924623&scope=identify'
  }
})
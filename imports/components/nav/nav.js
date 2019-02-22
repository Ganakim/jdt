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
})
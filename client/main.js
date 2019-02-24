import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { HTTP } from 'meteor/http'

import './main.html'
import './imports.js'

Template.main.helpers({
  content(){
    return Session.get('content');
  }
})

Template.main.events({
  'click .dropdownTrigger': function(e){
    var target = $(e.target).hasClass('dropdownTrigger') ? $(e.target) : $(e.target).parent()
    var flat = target.next('.dropdown').hasClass('flat')
    setTimeout(()=>{
      if(flat){
        target.next('.dropdown').removeClass('flat')
      }else{
        target.next('.dropdown').addClass('flat')
      }
      target.children('.dropdownIndicator-left, .dropdownIndicator-right').toggleClass('flat')
    })
    $('.chatBoxToggle').addClass('far').removeClass('fas')
    $('#chatBox').addClass('hidden', 100)
  },
  'click *':function(e){
    if(!$.contains($('.navDrop')[0], e.target) && !$.contains($('.navDrop').next('.dropdown')[0], e.target)){
      if(!$('.navDrop').next('.dropdown').hasClass('flat')){
        $('.navDrop').next('.dropdown').addClass('flat')
        $('.navDrop').find('.dropdownIndicator-left, .dropdownIndicator-right').addClass('flat')
      }
    }
  }
})

Meteor.subscribe('Users')
Meteor.subscribe('Dates')
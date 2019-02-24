import './home.html'

Session.set('selectedDate', moment().valueOf())

Template.home.helpers({
  selectedDate(){
    return Session.get('selectedDate')
  },
  okDate(){
    return moment(Session.get('selectedDate')).isAfter(moment().subtract(1,'d'))
  },
  currentProps(){
    if(Dates.findOne({date:moment(moment(Session.get('selectedDate')).format('YYYY-MM-DD')).valueOf()})){
      return Dates.findOne({date:moment(moment(Session.get('selectedDate')).format('YYYY-MM-DD')).valueOf()}).props
    }
  }
})

Template.home.events({
  'click #prop .fa-angle-up, click #prop .fa-angle-down':function(e){
    if($(e.target).parent().attr('id').substr(-1) == 'a'){
      Session.set('selectedDate', moment(Session.get('selectedDate')).format('a') == 'am' ? moment(Session.get('selectedDate')).add(12, 'h').valueOf() : moment(Session.get('selectedDate')).subtract(12, 'h').valueOf())
    }else{
      Session.set('selectedDate', $(e.target).hasClass('fa-angle-up') ? moment(Session.get('selectedDate')).add(1, $(e.target).parent().attr('id').substr(-1)).valueOf() : moment(Session.get('selectedDate')).subtract(1, $(e.target).parent().attr('id').substr(-1)).valueOf())
    }
  },
  'input #prop input':function(e){
    if(e.target.value){
      Session.set('selectedDate', moment(`${moment(this.date).format('YYYY-MM-DD')} ${$(e.target).parent().next('div').attr('id') == 'proph' ? `${moment(Session.get('selectedDate')).format('a') == 'am' ? e.target.value : parseInt(e.target.value) + 12}:${moment(Session.get('selectedDate')).format('mm')}`:`${moment(Session.get('selectedDate')).format('k')}:${e.target.value.length > 1 ? e.target.value : `0${e.target.value}`}`}`).valueOf())
    }
  },
  'submit #prop':function(e){
    e.preventDefault()
    Meteor.call('addRaid', Session.get('selectedDate'))
  },
  'click #joinRaid':function(e){
    Meteor.call('joinRaid',this.date)
  },
  'click #leaveRaid':function(e){
    Meteor.call('joinRaid',this.date, true)
  }
})
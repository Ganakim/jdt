import './calendar.html'

Template.calendar.helpers({
  week(index){
    return Dates.find().fetch().slice(7*index,(7*index)+7)
  },
  outOfMonth(day){
    return moment(day).isBefore(moment().startOf('month')) || moment(day).isAfter(moment().endOf('month'))
  },
  today(day){
    return moment(day).isSame(moment(), 'day')
  },
  isSelectedDate(day){
    return moment(day).isSame(Session.get('selectedDate'), 'day')
  }
})

Template.calendar.events({
  'click .day': function(e){
    Session.set('selectedDate', moment(`${moment(this.date).format('YYYY-MM-DD')} ${moment(Session.get('selectedDate')).format('k:mm')}`).valueOf())
  }
})
import './calendar.html'

Template.calendar.helpers({
  week(index){
    return Dates.find().fetch().slice(7*index,(7*index)+7)
  },
  avail(user, day){
    if(user.avail.includes(day.valueOf())){
      return true
    }else if(user.unavail.includes(day.valueOf())){
      return 'false'
    }
    //return true if day is in user's avail OR unavail
  },
  outOfMonth(day){
    return moment(day).isBefore(moment().startOf('month')) || moment(day).isAfter(moment().endOf('month'))
  },
  today(day){
    return moment(day).isSame(moment(), 'day')
  }
})

Template.calendar.events({
  'click .day>div': function(e){
    console.log(this, e.terget)
    console.log(this[e.target.id][Meteor.user()._id])
    var push = {}
    switch(this[e.target.id][Meteor.user()._id]){
      case true:
        //Dates.update(this._id,{})        
      case false:
        //Dates.update(this._id,{})
      default:
      //push[]
        //set change to the meter notation
        //Dates.update(this._id,{$push:{}})
    }
  }
})
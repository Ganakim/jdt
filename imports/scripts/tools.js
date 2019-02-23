Tools = {
  increment(a,b){
    return a + b
  },
  loop(a){
    return Array(a).fill(0)
  },
  capitalize(s){
    return s.replace(/^\w/, function (chr) {
      return chr.toUpperCase()
    });
  },
  pluralize(s){
    return s + 's'
  },
  random(a, b) {
    if(a.length > 0){
      var result = new Array(b),
        c = a.length,
        taken = new Array(c);
      if (b > c){
        console.log("not enough items");
        return a
      }
      while (b--) {
        var x = Math.floor(Math.random() * c);
        result[b] = a[x in taken ? taken[x] : x];
        taken[x] = --c in taken ? taken[c] : c;
      }
      return result;
    }
  },
  part(array, a, b){
    return array.slice(a, b)
  },
  log(s){
    console.log(s)
  },
  owner(id){
    return Meteor.userId() === id
  },
  is(a, b){
    return a === b
  },
  not(a){
    return !a
  },
  search(collection, where, id, part){
    var result
    if(id){
      result = Collections[collection].findOne(id)
    }else{
      result = Collections[collection].find(where ? where : {}, {many:true}).fetch()
    }
    if(result){
      if(part){
        return result[part]
      }else{
        return result
      }
    }
  },
  formatTime(time, format){
    return time ? moment(time).format(format) : moment().format(format)
  },
  targetArtist(){
    return Tools.search('Users', false, Session.get('targetArtist'))
  },
  arrayify(obj){
    result = [];
    for (var key in obj){
        result.push({name:key,value:obj[key]});
    }
    return result;
  },
}
for(var helper in Tools){
  Template.registerHelper(helper, Tools[helper])
}
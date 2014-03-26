Pomodoros = new Meteor.Collection("Pomodoros", {});

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to cherry-tomato.";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  
  Template.pomodorosList.helpers({
    allPomodoros: function () {
      return Pomodoros.find({}, {sort: {startDate: -1}});
    }
  });

  Template.pomodorosList.events({
    'submit #new-pomodoro' : function (e) {
      e.preventDefault();
      
      var pomodoro = {
        startDate: new Date(),
        goal: $(e.target).find('[name=goal]').val(),
      };
      
      Pomodoros.insert(pomodoro);
    },
  });

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
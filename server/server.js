Meteor.publish('messages', function () {
  const user = Meteor.users.findOne(this.userId)

  return Messages.find({ user: user.username }, { limit: 5, sort: { created: 1 }})
})

import { Meteor } from 'meteor/meteor'

Meteor.publish('messages', function () {
  return Messages.find({}, {
    limit: 5,
    sort: { date: -1 },
  })
})

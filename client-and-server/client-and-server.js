import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

Messages =  new Mongo.Collection('messages')

Meteor.methods({

  sendMessage(message) {
    const user = Meteor.user()

    if (!user) {
      throw new Meteor.Error('unauthorized!!!')
    }

    Messages.insert({
      text: message,
      date: new Date(),
      user: user.username,
    })
  },

  removeMessage(messageId) {
    const user = Meteor.user()
    const message = Messages.findOne(messageId)

    if (!user || user.username !== message.user) {
      throw new Meteor.Error('unauthorized!!!')
    }

    Messages.remove(messageId)
  },

})

import React, { Component } from 'react'
import { mount } from 'react-mounter'
import { Meteor } from 'meteor/meteor'
import { Accounts } from ''
import { createContainer } from 'meteor/react-meteor-data'
import Blaze from 'meteor/gadicc:blaze-react-component'

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
})

class App extends Component {

  constructor() {
    super()
    this.send = this.send.bind(this)
    this.state = { message: ''}
  }

  send(e) {
    e.preventDefault()
    Meteor.call('sendMessage', this.state.message)
    this.setState({ message: ''})
  }

  remove(id) {
    Meteor.call('removeMessage', id)
  }

  render() {

    const {
      messages,
      ready
    } = this.props

    if (!ready) {
      return <h2>LOADING!!!!</h2>
    }

    return (
      <div>
        <h2>Hello World!</h2>
        <Blaze template="loginButtons" />
        {messages.map((msg, i) => (
          <div key={i}>
            <p>{msg.user}: {msg.text}</p>
            <button onClick={() => this.remove(msg._id)}>remove</button>
          </div>
        ))}
        <form onSubmit={this.send}>
          <input
            value={this.state.val}
            onChange={(e) => {
              this.setState({ message: e.currentTarget.value })
            }}
          />
        </form>
      </div>
    )
  }

}

const AppContainer = createContainer(() => {

  const subscriptionHandle = Meteor.subscribe('messages')
  const messages = Messages.find().fetch()

  return {
    messages,
    ready: subscriptionHandle.ready(),
  }

}, App)

mount(AppContainer)

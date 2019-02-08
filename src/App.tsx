import React, { Component } from "react"
import { Route } from "react-router-dom"
import {Header} from './shared'
import { About, Home, Profile } from "./pages"

class App extends Component {
  render() {
    return (
      <div>
        <Header></Header>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
      </div>
    )
  }
}

export default App

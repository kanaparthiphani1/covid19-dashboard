import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import StateWiseCases from './components/StateWiseCases'
import About from './components/About'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateWiseCases} />
    <Route exact path="/about" component={About} />
  </Switch>
)

export default App

import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import StateWiseCases from './components/StateWiseCases'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/state/:stateCode" component={StateWiseCases} />
  </Switch>
)

export default App

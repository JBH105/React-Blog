import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home/Home'
import Sample  from './Pages/Home/Components/Sample';
import Login from './Pages/Home/Components/Login';
import SignUp from './Pages/Home/Components/SignUp';
import UserPost from './Pages/User/UserPost';
import Navigation from './Pages/Home/Components/Navigation';
function App() {
  return (
    <>
    <Navigation/>
    <Router>
    <Switch>
     
      <Route path="/" exact component={Home} />
      <Route path="/UserPost"  component={UserPost} />
      <Route path="/Home" component={Home}/>
      <Route path="/Login" component={Login}/>
      <Route path="/SignUp" component={SignUp}/>
      <Route path="/"/>

    </Switch>
  </Router>
  {/* <Home / > */}
  </>
  );
}

export default App;

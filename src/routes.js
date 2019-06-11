import React from "react";
import Home from './components/Home';
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import Floors from './components/Floors';
import FloorAccessed from './components/FloorAccessed';
import Footer from './sections/Footer';
import Tests from './components/Tests';
import SignIn from './components/SignIn';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { isAuthenticated } from "./services/auth";

const PrivateRoute = ({ component: Component = null, render: Render = null, ...rest }) => (
  <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          Render ? (
            Render(props)
          ) : Component ? (
            <Component {...props} />
          ) : null
        ) : (
          <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
        )
      }
    />
);

const Routes = ({i,increment,scrollTop}) => (
  <BrowserRouter>
    <Navigation i={i} />
    <Switch>
        <Route exact path="/" component={Landing}></Route>
        <Route exact path="/app" render={() => <Home i = {i} increment={increment}/>}></Route>
        <PrivateRoute path="/building/:name/:floor" render={() => <FloorAccessed scrollTop={scrollTop} i = {i} increment={increment}/>}></PrivateRoute>
        <PrivateRoute path="/building/:name" render={() => <Floors scrollTop={scrollTop} i = {i} increment={increment}/>}></PrivateRoute>
        <Route exact path="/tests" render={() => <Tests scrollTop={scrollTop} i = {i} increment={increment}/>}></Route>
        <Route exact path="/signin" render={() => <SignIn scrollTop={scrollTop} i = {i} increment={increment}/>}></Route>
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default Routes;
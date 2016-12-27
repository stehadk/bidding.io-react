import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Frontpage from './pages/Frontpage';
import Auction from './pages/Auction';
import './index.css';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Frontpage}/>
      <Route path="/auction/:aId" component={Auction}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

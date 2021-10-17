import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ElevateAppBar from './Components/Header/Header';
import Background from './Assets/bg_main.jpg';
import { Box } from '@mui/system';
import Details from './Components/MovieDetails/Details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

var style = {
  box: {
    backgroundImage: `url(${Background})`,
  }
}

ReactDOM.render(
  <React.StrictMode>
    <Box style={style.box}>
      <ElevateAppBar />
      <Router>
        <Switch>
          <Route exact path="/" children={<App />} />
          <Route path="/details/:id" children={<Details />} />
        </Switch>
      {/* <App /> */}
      {/* <Details /> */}
      </Router>
    </Box>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import './Header.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Container from '@mui/material/Container';
import ScrollZoomText from '../Utils/ScrollZoomText';
import Background from '../../Assets/bg_main.jpg';

function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    style: {
        backgroundColor: "transparent" ,
        backgroundImage: trigger ? "linear-gradient(to top, rgba(0,0,0,0), rgba(0,0,0,1))" : `url(${Background})`,
        color:  "white" ,
        transition: trigger ? "0.3s" : "0.5s",
        padding: "30px 5px",
        boxShadow: "none",
      }
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar  position="fixed" >
          <Toolbar style={{backgroundColor: "transparent"}}>
              <ScrollZoomText>
                <Typography variant="h6" component="div" >
                    Media Home
                </Typography>
            </ScrollZoomText>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}

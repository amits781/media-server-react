import './Header.css';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ScrollZoomText from '../Utils/ScrollZoomText';
import Background from '../../Assets/bg_main.jpg';
import { Box } from '@mui/system';
import { getCookie, setCookie, deleteCookie} from '../Utils/Utils';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

function ElevationScroll(props) {
  const { children, window } = props;
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
  window: PropTypes.func,
};

export default function ElevateAppBar(props) {
  const cookieValue = getCookie() === undefined ? false: getCookie();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(cookieValue);

  const handleChange = (event) => {
    setAuth(event.target.checked);
    if(event.target.checked)
      setCookie(event.target.checked);
    else
      deleteCookie();
    window.location.reload();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>
          <ScrollZoomText>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Media Home
          </Typography>
          </ScrollZoomText>
          <IconButton
            size="large"
            aria-label="display more actions"
            edge="end"
            color="inherit"
            onClick={handleMenu}
          >
            <MoreIcon />
          </IconButton>
          <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={auth}
                      onChange={handleChange}
                      aria-label="login switch"
                    />
                  }
                  label={auth ? 'Logout' : 'Login'}
                />
              </Menu>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
    </Box>
    </React.Fragment>
    
  );
}

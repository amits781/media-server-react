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
import { getCookie, setCookie, deleteCookie, setFilterCookie, getFilterCookie, deleteFilterCookie} from '../Utils/Utils';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Divider, Link } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import RefreshIcon from '@mui/icons-material/Refresh';
import Check from '@mui/icons-material/Check';
import ExplicitIcon from '@mui/icons-material/Explicit';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import {getServerIP} from "../Utils/Utils";

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
  const cookieValue = getCookie() === undefined ? false: true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [auth, setAuth] = React.useState(cookieValue);

  const handleFilterChange = (event) => {
    var filterName = event.target.parentElement.id;
    if(filterName === "sortnone"){
      deleteFilterCookie();
    } else {
      setFilterCookie(event.target.parentElement.id);
    }
    window.location.reload();
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
    if(event.target.checked)
      setCookie(event.target.checked);
    else{
      deleteCookie();
      window.location.assign("/")
    }
    // window.location.reload();
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRefreshList = () => {
    fetch(`http://${getServerIP()}:8080/process`)
      .then(res => res.json())
      .then(
        (result) => {
          console.log("Fetch Successfull:"+result);
        },
        (error) => {
          console.log("Error"+error);
        }
      )
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <ElevationScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>
          <ScrollZoomText addInfo={{"isMenu":false}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Media Home
          </Typography>
          </ScrollZoomText>
          {/* <ScrollZoomText addInfo={{"isMenu":true}}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Menu 1
          </Typography>
          </ScrollZoomText> */}
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
                 <Divider />
                 <MenuItem>
                  <ListItemIcon>
                    <RefreshIcon />
                  </ListItemIcon> 
                  <ListItemText
                    onClick={() => handleRefreshList()}
                  >
                        {'Refresh Movies'}
                  </ListItemText>
                </MenuItem>
                 <MenuItem>
                  <ListItemIcon>
                    <FamilyRestroomIcon />
                  </ListItemIcon> 
                  <ListItemText>
                      <Link  href="/" color="inherit" underline={window.location.pathname==="/"? "always" : "none"}>
                        {'All Movies'}
                      </Link>
                  </ListItemText>
                </MenuItem>
                
                {auth ? <MenuItem>
                  <ListItemIcon>
                    <ExplicitIcon />
                  </ListItemIcon> 
                  <ListItemText>
                    <Link href="/exp" color="inherit" underline={window.location.pathname==="/exp"? "always" : "none"}>
                      {'Exp Movies'}
                    </Link>
                  </ListItemText>
                </MenuItem>: ""}
                <Divider />
                <MenuItem>
                  {getFilterCookie()===undefined? 
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon> : "" 
                  }
                  <ListItemText  inset={getFilterCookie()!==undefined} id={'sortnone'} onClick={handleFilterChange}>None</ListItemText>
                </MenuItem>
                <MenuItem>
                  {getFilterCookie()==='dateasc'? 
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon> : "" 
                  }
                  <ListItemText inset={getFilterCookie()!=='dateasc'} id={'dateasc'} onClick={handleFilterChange}>Oldest First</ListItemText>
                </MenuItem>
                <MenuItem>
                  {getFilterCookie()==='datedesc'? 
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon> : "" 
                  }
                  <ListItemText inset={getFilterCookie()!=='datedesc'} id={'datedesc'} onClick={handleFilterChange}>Newest First</ListItemText>
                </MenuItem>
                <MenuItem>
                  {getFilterCookie()==='nameasc'? 
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon> : "" 
                  }
                  <ListItemText  inset={getFilterCookie()!=='nameasc'} id={'nameasc'} onClick={handleFilterChange}>Name Asc</ListItemText>
                </MenuItem>
                <MenuItem>
                  {getFilterCookie()==='namedesc'? 
                  <ListItemIcon>
                    <Check />
                  </ListItemIcon> : "" 
                  }
                  <ListItemText  inset={getFilterCookie()!=='namedesc'} id={'namedesc'} onClick={handleFilterChange}>Name Desc</ListItemText>
                </MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      </ElevationScroll>
    </Box>
    </React.Fragment>
    
  );
}

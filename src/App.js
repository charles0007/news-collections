import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Slide from './component/Slide'
import News from './component/News'
import defaultImg from './custom/img/bg.jpg'
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import image1 from "./custom/img/bg.jpg";

import { AppBar, Toolbar, Typography, Button, IconButton, Badge, MenuItem } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center",//backgroundImage:require(image1)
    // marginLeft: theme.spacing(50),
    //  marginRight:  theme.spacing(50)
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


function App() {

  const classes = useStyles();
  const [bgImage, setBgImage] = useState(defaultImg);
  const [notificationValue, setNotificationValue] = useState(0);
  const [info, setInfo] = useState([]);

  var callbackFunction = (childData) => {

    setBgImage(childData);
  }
  var callbackNotification = (notificationValue) => {

    setNotificationValue(notificationValue);
  }

  var callbackInfoFunction = (childInfo) => {

    setInfo(childInfo);
  }

  return (
    <div className="App">
      <div className={classes.root}>

        <AppBar className="app__bar" >
          <Toolbar>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              News Collection
    </Typography>
            {/* <Button color="inherit">Login</Button> */}

            <MenuItem>
              <IconButton aria-label={"show " + notificationValue + "new notifications"} color="inherit" >
                {notificationValue > 0 ?
                  <Badge badgeContent={"new"} color="secondary">
                    <NotificationsIcon />
                  </Badge>
                  : ""}
              </IconButton>
              {/* <p>Notifications</p> */}
            </MenuItem>

          </Toolbar>
        </AppBar>

        <div className="app__all">
          <div className="app__slider">
            <Slide items={info} bg_image={callbackFunction} />
          </div>
          <div className="app__news">

            <News info={callbackInfoFunction} notification_value={callbackNotification} />

          </div>

        </div>
      </div>

      {/* <div className="app__header" >
        News Collection
      </div>
      <div className="app__slider">
        <Slide items={info} bg_image={callbackFunction} />
      </div>
      <div className="app__news">

        <News info={callbackInfoFunction} notification_value={callbackNotification} />

      </div> */}

    </div>
  );
}

export default App;

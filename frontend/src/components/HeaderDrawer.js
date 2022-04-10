import React from 'react';
import { Link } from 'react-router-dom';
import {  useState, useEffect } from 'react';
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles';
import {  getCurrentUser } from './Auth';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import {
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemText,
} from '@material-ui/core';



const drawerWidth = 240;
const BackgroundColor = "#201133";

const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: BackgroundColor
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
  })
);

const HeaderDrawer = (props) => {
  const { open, handleDrawerToggle, drawerItem } = props;
   const [user, setCurrentUser] = useState([])
  const classes = useStyles();
  const theme = useTheme();

  const getCurrentUserData = async () => {
    const res = await getCurrentUser();
    setCurrentUser(res.data.data);
  };
 
  useEffect(() => {
    getCurrentUserData();
  });



  return (
    <Drawer
      className={classes.drawer}
      variant='temporary'
      anchor='left'
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerToggle} style={{color: "#FAFBFB"}}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon/>
          ) : (
            <ChevronRightIcon/>
          )}
        </IconButton>
      </div>
      <Divider />
      <List>
        <div className="image-drawer">
        </div>
        <div className="list-component">
        {drawerItem.map((item, index) => (
          <ListItem
            component={Link}
            to={item.path}
            key={index}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.label} style={{ color: "#ffffff"}} />
          </ListItem>
        ))}
        </div>
      </List>
    </Drawer>
  );
};
export default HeaderDrawer;
import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {NavLink} from 'react-router-dom';
import {withStyles} from '@material-ui/core';

import cx from 'classnames';

const styles = theme => ({
  icon: {
    color: 'white'
  },
  link : {
    color: 'white',
    textDecoration: 'none',
    '&.selected': {
      color: theme.palette.secondary['500'],
      fontWeight: 'bold'
    },
    '&.selected $icon': {
      color: theme.palette.secondary['500']
    }
  },
  
});

const MenuItems = props => {
  const {classes} = props;
  return (
    <List>
      {props.navigationRoutes.map((r, i) => {

        return (
          <NavLink className={classes.link} key={i} to={r.path} exact activeClassName="selected">
            <ListItem>
              <ListItemIcon className={classes.icon}>
                <r.icon/>
              </ListItemIcon>
              <ListItemText 
                disableTypography={true} 
                className={classes.label} 
                primary={r.name}></ListItemText>
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
}

export default withStyles(styles)(MenuItems);
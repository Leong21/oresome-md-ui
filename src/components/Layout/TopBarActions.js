import React from 'react';
import Settings from '@material-ui/icons/SettingsRounded';
import {IconButton} from '@material-ui/core';

const TopBarActions = props => {
  return (
    <React.Fragment>
      <IconButton 
        color="inherit"
        onClick={props.toggleSettings}
      >
        <Settings />
      </IconButton>
    </React.Fragment>
  );
}

export default TopBarActions;


import React, { Component } from 'react';
import { Drawer, Typography, Divider, withStyles, IconButton, Badge, Switch } from '@material-ui/core';
import ThemeColours from '../ThemeSelect/ThemeColours';
import { Consumer as LayoutConsumer } from '../Layout/LayoutContext';

const styles = theme => ({
  paper: {
    minWidth: '250px'
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '0 16px',
    ...theme.mixins.toolbar
  },
  settingItem: {
    marginBottom: '16px'
  },
  content: {
    padding: '16px',
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  switchWrapper: {
    display: 'flex',
    flexDirection: 'row',
    '& .label': {
      flex: 1,
      display: 'flex',
      alignItems: 'center'
    }
  },
});

 

class SettingPanel extends Component {
  toggleNightMode = (event) => {
    this.props.layoutContext.updateTheme('type', event.target.value === 'dark' ? 'light' : 'dark');
  }

  render() {
    const { classes, theme } = this.props;

    console.log(theme.palette.type);
    return (
      <LayoutConsumer>
        {context =>
          <Drawer
            variant={this.props.variant}
            anchor='right'
            open={this.props.open}
            onClose={this.props.onClose}
            classes={{ paper: classes.paper }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <div className={classes.toolbar}>
              <div className={classes.logo}>
                <Typography variant="subheading">Application Settings</Typography>
              </div>
            </div>
            <Divider />
            <div className={classes.content}>
              <div className={classes.settingItem}>
                <div><Typography variant="caption">Theme Colour</Typography></div>
                <ThemeColours />
              </div>
              <div className={classes.switchWrapper}>
                <div className={'label'}><Typography variant="caption">Night Mode</Typography></div>
                <Switch
                  checked={theme.palette.type === 'dark' ? true : false}
                  value={theme.palette.type}
                  onChange={this.toggleNightMode}
                ></Switch>
              </div>
            </div>
          </Drawer>
        }
      </LayoutConsumer>

    );
  }

};

const SettingPanelComponent = props => (
  <LayoutConsumer>
    {layoutContext => <SettingPanel {...props} layoutContext={layoutContext} />}
  </LayoutConsumer>
);

export default withStyles(styles, { withTheme: true })(SettingPanelComponent);
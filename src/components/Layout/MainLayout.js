import React, {Component} from 'react';
import { AppBar, Toolbar, IconButton, Typography, withStyles, Hidden } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SideBar from './SideBar';
import classNames from 'classnames';
import SettingPanel from '../Setting/SettingPanel';
import {Provider} from './LayoutContext';

const drawerWidth = '250px';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar : {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth})`,
    },
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    }
  },
  appToolBar: {
    paddingLeft: theme.spacing.unit * 3,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  }, 
  title: {
    flex: 1
  }, 
  hide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: '36px'
  }, 
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#252525',
    color: 'white',
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
    '& .menu-items': {
      '& .menu-item': {
        padding: '10px',
        marginRight: '15px',
        '& .menu-item-text': {
          visibility: 'hidden'
        }
      },
      '& .selected .menu-item': {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        '& .menu-icon': {
          color: theme.palette.primary.main
        }
      }
    }
  },
  logo: {
    flexGrow: 1,
    lineHeight: 0,
    marginLeft: '24px',
    color: 'white'
  },
  toolbarLabel: {
    color: "#fff",
  },
  contentWrapper: {
    flexGrow:1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.default    
  },
  content: {
    overflow: 'auto',
    padding: theme.spacing.unit * 3,
  },
  topBarActions: {
    marginRight: '12px'
  }
});

class MainLayout extends Component {
  constructor(props){
    super(props);

    this.state = {
      mobileSideBarOpen: false, 
      sideBarOpen: true,
      settingPanelOpen: false
    }
  }

  handleSettingPanelToggle = event => {
    this.setState(state => ({
      settingPanelOpen: !state.settingPanelOpen
    }));
  }

  handleDrawerToggle = event => {
    this.setState(state => ({ 
      mobileSideBarOpen: !state.mobileSideBarOpen,
      sideBarOpen: !state.sideBarOpen
    }));
  }

  toggleNightMode = () => {
    this.props.updateTheme('type', this.props.theme.palette.type === 'dark' ? 'light' : 'dark');
  }
  
  render(){
    const TopBarActions = this.props.topBarActions;
    const AppSettings = this.props.appSettings;
    const Logo = this.props.logo;
    const {classes, theme} = this.props;

    return (
      <Provider
        value={{
          updateTheme: this.props.updateTheme,
          colour: this.props.colour
        }}
      >
      <div className={classes.root}>
        <AppBar className={classNames(classes.appBar, this.state.sideBarOpen && classes.appBarShift)}>
          <Toolbar 
            disableGutters={true}
            className={classNames(this.state.sideBarOpen && classes.appToolBar)}>
            <IconButton
              className={classNames(classes.menuButton, this.state.sideBarOpen && classes.hide)}
              color="inherit"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon/>
            </IconButton>
            <Typography 
              className={classes.title}
              variant="title" 
              color="inherit">App Title</Typography>
              <div className={classes.topBarActions}>
                <TopBarActions toggleSettings={this.handleSettingPanelToggle} />
              </div>
            
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <SideBar 
            theme={theme}
            classes={classes}
            drawerClasses={{
              paper: classes.drawerPaper,
            }}
            open={this.state.mobileSideBarOpen}
            onClose={this.handleDrawerToggle}
            logo={<Logo/>}
            menuItems={this.props.menuItems}
          /> 
        </Hidden>
        <Hidden smDown implementation="css">
          <SideBar 
            variant="permanent"
            open={this.state.sideBarOpen}
            onClose={this.handleDrawerToggle}
            theme={theme}
            classes={classes}
            drawerClasses={{
              paper: classNames(classes.drawerPaper, !this.state.sideBarOpen && classes.drawerPaperClose),
            }}
            logo={<Logo/>}
            menuItems={this.props.menuItems}
          />
        </Hidden>
        <div className={classes.contentWrapper}>
          <div className={classes.toolbar} />
          <div className={classes.content}>
            {this.props.children}
          </div>
        </div>
        <SettingPanel
          variant="temporary"
          open={this.state.settingPanelOpen}
          onClose={this.handleSettingPanelToggle}
        >
        </SettingPanel>
      </div>
      </Provider>
    );
  }
}

export default withStyles(styles, {withTheme:true})(MainLayout);
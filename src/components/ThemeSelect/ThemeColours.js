import React, {Component} from 'react';
import { withStyles } from '@material-ui/core';
import Colours from './Colours';
import { Consumer as LayoutConsumer } from '../Layout/LayoutContext';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    width: '150px',
    marginTop: '6px',
    justifyContent: 'space-between'
  },
  square: {
    width: '16px',
    height: '16px',
    cursor: 'pointer'
  },
  orange: {
    backgroundColor: Colours.orange.primary['500'],
    '&:hover': {
      outline: `3px solid ${Colours.orange.secondary['300']}`
    },
    '&.selected': {
      outline: `3px solid ${Colours.orange.secondary['300']}`
    }
  },
  blue: {
    backgroundColor: Colours.blue.primary['500'],
    '&:hover': {
      outline: `3px solid ${Colours.blue.secondary['300']}`
    },
    '&.selected': {
      outline: `3px solid ${Colours.blue.secondary['300']}`
    }
  },
  green: {
    backgroundColor: Colours.green.primary['500'],
    '&:hover': {
      outline: `3px solid ${Colours.green.secondary['300']}`
    },
    '&.selected': {
      outline: `3px solid ${Colours.green.secondary['300']}`
    }
  },
  purple: {
    backgroundColor: Colours.purple.primary['500'],
    '&:hover': {
      outline: `3px solid ${Colours.purple.secondary['300']}`
    },
    '&.selected': {
      outline: `3px solid ${Colours.purple.secondary['300']}`
    }
  },
  turquoise: {
    backgroundColor: Colours.turquoise.primary['500'],
    '&:hover': {
      outline: `3px solid ${Colours.turquoise.secondary['300']}`
    },
    '&.selected': {
      outline: `3px solid ${Colours.turquoise.secondary['300']}`
    }
  }
});

class ThemeColours extends Component {

  handleClick = (event) => {
    console.log(this.props);
    this.props.layoutContext.updateTheme('colour', event.currentTarget.title);
  }

  isSelected = (colour) => {
    return colour === this.props.layoutContext.colour ? 'selected' : '';
  }
  
  render(){
    const {classes} = this.props;
    return (
      <LayoutConsumer>
        {(context) =>
          <div className={classes.root}>
            <div
              className={`${classes.square} ${classes.orange} ${this.isSelected('orange')}`}
              onClick={this.handleClick}
              title="orange"
            ></div>
            <div className={`${classes.square} ${classes.blue} ${this.isSelected('blue')}`}
              onClick={this.handleClick}
              title="blue"
            ></div>
            <div className={`${classes.square} ${classes.green} ${this.isSelected('green')}`}
              onClick={this.handleClick}
              title="green"  
            ></div>
            <div className={`${classes.square} ${classes.purple} ${this.isSelected('purple')}`}
              onClick={this.handleClick}
              title="purple"
            ></div>
            <div className={`${classes.square} ${classes.turquoise} ${this.isSelected('turquoise')}`}
              onClick={this.handleClick}
              title="turquoise"
            ></div>
          </div>
        }
      </LayoutConsumer>
  
    );
  }

  
}

const ThemeColoursComponent = props => (
  <LayoutConsumer>
    {layoutContext => <ThemeColours {...props} layoutContext={layoutContext} />}
  </LayoutConsumer>
);

export default withStyles(styles, { withTheme: true })(ThemeColoursComponent);
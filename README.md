# oresome-md-ui

> Extended Material UI components

[![NPM](https://img.shields.io/npm/v/oresome-md-ui.svg)](https://www.npmjs.com/package/oresome-md-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save oresome-md-ui
```

## Usage

```jsx
import React, { Component } from 'react'
import { MuiThemeProvider, CssBaseline, createMuiTheme } from '@material-ui/core';
import Routes, { navigationRoutes } from './Routes';
import {Provider as AppProvider, defaultContext} from './AppProvider';

import { MainLayout, MenuItems, TopBarActions, Colours } from 'oresome-md-ui';

const Logo = props => (
  <div>Logo</div>
);

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...defaultContext
    }
  }

  handleConfigChange = (name, value) => {
    this.setState({
      [name]: value
    });
  }

  render() {
    const theme = createMuiTheme({
      palette: {...Colours[this.state.colour], type: this.state.type},
      
    })

    return (
      <AppProvider
        value={{
          ...this.state,
          handleConfigChange: this.handleConfigChange
        }}>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <MainLayout
            menuItems={<MenuItems navigationRoutes={navigationRoutes} />}
            topBarActions={TopBarActions}
            logo={Logo}
            updateTheme={this.handleConfigChange}
            colour={this.state.colour}
          >
            <Routes />
          </MainLayout>
        </MuiThemeProvider>
      </AppProvider>
    )
  }
}
```

## License

MIT © [Leong21](https://github.com/Leong21)

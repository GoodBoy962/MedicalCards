import React from 'react';
import PropTypes from 'prop-types';
import Screen from '../../lib/screen';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { withStyles } from 'material-ui/styles';

const Welcome = ({classes, children}) => (
  <div className={ classes.root }>
    <div className={ classes.appFrame }>
      <AppBar className={ classes.appBar }>
        <Toolbar>
          <Typography type="title" color="inherit" noWrap>
            Медицинский цифровой паспорт
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={ classes.content }>
        { children }
      </main>
    </div>
  </div>
);

Welcome.propTypes = {
  classes: PropTypes.object.isRequired
};

const drawerWidth = 240;
const styleSheet = theme => ({
  root: {
    width: '100%',
    height: Screen.height,
    zIndex: 1,
    overflow: 'hidden',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  appBar: {
    position: 'absolute',
    width: `100%`,
    marginLeft: drawerWidth,
    justifyContent: 'center',
  },
  content: {
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: Screen.height - 56,
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      marginTop: 64,
      height: Screen.height - 64
    }
  }
});

export default withStyles(styleSheet)(Welcome);
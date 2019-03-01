import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
//Images
import thunderstorm from '../images/Thunderstorm.png'
import drizzle from '../images/Drizzle.png'
import rain from '../images/Rain.png'
import snow from '../images/Snow.png'
import atmosphere from '../images/Atmosphere.png'
import clear from '../images/Clear.png'
import clouds from '../images/Cloudy.png'
import extreme from '../images/Extreme.png'


const styles = theme => ({
  flex: {
    display: 'flex',
    flexWrap: 'wrap'
 },
  root: {
    // textAlign: 'center',
    // paddingTop: theme.spacing.unit * 20,
    flexGrow : 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 200,
    width: 100
  },
  control: {
    padding: theme.spacing.unit * 2
  }
});


class Index extends React.Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
      <Grid container spacing={24}>
      {[0, 1, 2, 3, 4].map(value => (
        <Grid item s>
        <Paper className={classes.paper}>
        <Typography type="display1">
          dia
        </Typography>
        {/* <img src={`${weatherIcon}`} alt="WeatherIcon" height="64" width="64" /> */}
        <Typography type="subheading" >
          "max min"
        </Typography>
              </Paper>
            </Grid>
            ))}
        
      </Grid>
    </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

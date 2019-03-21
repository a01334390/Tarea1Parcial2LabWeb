import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import 'typeface-lato'

//Images
import thunderstorm from '../images/Thunderstorm.png'
import drizzle from '../images/Drizzle.png'
import rain from '../images/Rain.png'
import snow from '../images/Snow.png'
import atmosphere from '../images/Atmosphere.png'
import clear from '../images/Clear.png'
import clouds from '../images/Cloudy.png'
import extreme from '../images/Extreme.png'

//Flux stuff
var WeatherStore = require('../stores/WeatherStore')
var WeatherActions = require('../actions/WeatherActions')

const styles = theme => ({
  flex: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: 20,
    marginRight: 20,
  },
  container: {

  },
  root: {
    flexGrow: 1,
    // fontfamily: 'Lato, sans-serif',
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    background: 'inherit',
    height: '18rem',
    width: '10rem',
    marginTop: '10%',
  },
  control: {
    padding: theme.spacing.unit * 2
  },
  styles: {
    width: '100%',
    fontsize: '4em',
    fontfamily: 'Lato, sans-serif',
    textAlign: 'center',

  },
  textField: {
    marginLeft: theme.spacing.unit * 5,
    width: 300,
  },
  Typography: {
    fontfamily: 'Lato, sans-serif',
    textAlign: 'center'
  }
});

const styleBox = {
  marginTop: '5rem',
}


class Index extends React.Component {

  componentDidMount() {
    WeatherStore.addChangeListener(this.onChange)
    var uri = window.location.pathname.replace('/', '')
    if (uri !== "") {
      this.sttHandleSubmit(uri)
    }
  }

  componentDidUnmount() {
    WeatherStore.removeListener(this.onChange);
  }

  constructor(props) {
    super(props);
    this.state = {
       value: '', 
       cities: WeatherStore.getList().list,
       open: false
     };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this)
  }

  onChange(){
    this.setState({cities: WeatherStore.getList().list})
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
    this.forceUpdate()
  }

  sttHandleSubmit(uri) {
    WeatherStore.clearList();
    this.setState({ value: uri })
    WeatherActions.getRandom(uri)
  }

  handleSubmit(event) {
    WeatherStore.clearList();
    window.history.pushState(this.state.value, this.state.value + '\'s forecast', '/' + this.state.value);
    WeatherActions.getRandom(this.state.value);
    event.preventDefault();
  }

  toggleImage(weather) {
    switch ((((weather.replace("\"", "")).replace("\\\"", "")).replace("\"", "")).replace("\\\"", "")) {
      case 'Thunderstorm': case "thunderstorm with light rain": case "thunderstorm with rain": case "thunderstorm with heavy rain": case "light thunderstorm": case "thunderstorm": case "heavy thunderstorm": case "ragged thunderstorm": case "thunderstorm with light drizzle": case "thunderstorm with drizzle": case "thunderstorm with heavy drizzle":
        return thunderstorm
      case 'Drizzle': case "light intensity drizzle": case "drizzle": case "heavy intensity drizzle": case "light intensity drizzle rain": case "drizzle rain": case "heavy intensity drizzle rain": case "shower rain and drizzle": case "heavy shower rain and drizzle": case "shower drizzle":
        return drizzle
      case 'Rain': case "light rain": case "moderate rain": case "heavy intensity rain": case "very heavy rain": case "extreme rain": case "freezing rain": case "light intensity shower rain": case "shower rain": case "heavy intensity shower rain": case "ragged shower rain":
        return rain
      case 'Snow': case "light snow": case "snow": case "heavy snow": case "sleet": case "shower sleet": case "light rain and snow": case "rain and snow": case "light shower snow": case "shower snow": case "heavy shower snow":
        return snow
      case 'Atmosphere': case "mist": case "smoke": case "haze": case "sand, dust whirls": case "fog": case "sand": case "dust": case "volcanic ash": case "squalls": case "tornado":
        return atmosphere
      case 'Clear': case "clear sky":
        return clear
      case 'Clouds': case "broken clouds": case "overcast clouds": case "scattered clouds": case "few clouds":
        return clouds
      case 'Extreme':
        return extreme
      default:
        return rain
    }
  }

  render() {
    const { classes } = this.props;
    const { cities } = this.state
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Weather App using Flux
          </Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={24}
          justify="center"
          alignItems="center"
          style={styleBox}
        >
          <Grid container spacing={12}
            justify="center"
            alignItems="center">
            <Typography className={classes.root} component="h2" variant="h1" gutterBottom align="center">
              Consulta de clima
      </Typography>
          </Grid>
          <Grid container spacing={6}
            justify="center"
            alignItems="center"
            direction="column">
            <Grid item s>
              <form onSubmit={this.handleSubmit}>

                <TextField
                  id="city"
                  label="Ciudad"
                  margin="normal"
                  value={this.state.value}
                  onChange={this.handleChange}
                >
                </TextField>

              </form>

            </Grid>
            <Grid item s style={{ margin: 10 }}>
              <Button variant="contained" onClick={this.handleSubmit}>
                Submit
          </Button>
            </Grid>
            
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={24}
        >
          {cities.map(value => (
            <Grid item s>
              <Paper className={classes.paper}>
                <Typography type="display1">
                  {new Date(JSON.stringify(value.datetime).substring(3, 21)).toUTCString()}
                </Typography>
                <img alt="climate state" style={{ height: "5rem", width: "5rem" }} src={this.toggleImage(JSON.stringify(value.description))}></img>
                <Typography type="subheading" style={{ fontWeight: "bold" }}>
                  Minima:
        </Typography>
                <Typography type="subheading" style={{ fontWeight: "lighter" }}>
                  {JSON.stringify(value.temp_min).replace("\"", "").replace("\"", "") + "°"}
                </Typography>
                <Typography type="subheading" style={{ fontWeight: "bold" }}>
                  Maxima:
        </Typography>
                <Typography type="subheading" style={{ fontWeight: "lighter" }}>
                  {JSON.stringify(value.temp_max).replace("\"", "").replace("\"", "") + "°"}
                </Typography>
                <Typography type="subheading" style={{ fontWeight: "bold" }}>
                  Condicion:
        </Typography>
                <Typography type="h4" style={{ fontWeight: "lighter" }}>
                  {(((JSON.stringify(value.description).replace("\"", "")).replace("\\\"", "")).replace("\"", "")).replace("\\\"", "")}
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

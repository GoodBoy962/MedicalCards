import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
    color: theme.palette.text.secondary,
  },
  pos: {
    marginBottom: 12,
    color: theme.palette.text.secondary,
  },
});

function DoctorProfile(props) {
  const {classes, profile, address} = props;

  return (
    <div>
      <Card className={ classes.card }>
        <CardContent>
          <Typography className={ classes.title }>Медик</Typography>
          <Typography variant="headline" component="h2">
            { profile.name } { profile.surname }
          </Typography>
          <Typography className={ classes.pos }>{ address}</Typography>
          <Typography component="p">
            { profile.medClinic}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

DoctorProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  address: PropTypes.string.isRequired
};

export default withStyles(styles)(DoctorProfile);
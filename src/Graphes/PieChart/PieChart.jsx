import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { pieOptions, defaultPieOpt } from '../Shared/Utility';
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  },
  input: {
    display: 'none'
  }
}));

export default function PieChart() {
  const classes = useStyles();
  const [option, setOption] = useState(defaultPieOpt);
  const [selectedType, setSelectedType] = useState('GeographicalID');
  useEffect(() => {
    setOption(pieOptions(selectedType));
  }, [selectedType]);
  return (
    <>
      <Button
        variant="contained"
        className={classes.button}
        onClick={() => setSelectedType('Stores')}
      >
        Stores
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setSelectedType('GeographicalID')}
      >
        Geographical
      </Button>
      <Button
        variant="contained"
        color="secondary"
        className={classes.button}
        onClick={() => setSelectedType('DemoGraphicID')}
      >
        DemoGraphic
      </Button>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </>
  );
}

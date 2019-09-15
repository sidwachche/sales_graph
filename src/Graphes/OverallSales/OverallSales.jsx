import React, { useState, useEffect } from 'react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import drilldown from 'highcharts/modules/drilldown.js';
import { makeStyles } from '@material-ui/core/styles';
import InputSelect from '../InputSelect';
import {
  getInitialData,
  deriveOptionFromStore,
  defaultOpt,
  defaultInitialData,
  deriveOptionFromGeoDemo
} from '../Shared/Utility';

drilldown(Highcharts);
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}));

function OverallSales() {
  const classes = useStyles();
  const [option, setOption] = useState(defaultOpt);
  const [selectedStoreId, setSelectedStoreId] = useState(6877);
  const [selectedGeoId, setSelectedGeoId] = useState(null);
  const [selectedDemoId, setSelectedDemoId] = useState(null);
  const [initialData, setInitialData] = useState(defaultInitialData);
  const [selectedInfo, setSelectedInfo] = useState('');
  useEffect(() => {
    setInitialData(getInitialData());
  }, []);
  useEffect(() => {
    setOption(deriveOptionFromGeoDemo(selectedGeoId, 'GeographicalID'));
    setSelectedInfo('Selected Geographical ID: ' + selectedGeoId);
  }, [selectedGeoId]);
  useEffect(() => {
    setOption(deriveOptionFromGeoDemo(selectedDemoId, 'DemoGraphicID'));
    setSelectedInfo('Selected DemoGraphic ID: ' + selectedDemoId);
  }, [selectedDemoId]);
  useEffect(() => {
    setOption(deriveOptionFromStore(selectedStoreId));
    setSelectedInfo('Selected Store ID: ' + selectedStoreId);
  }, [selectedStoreId]);
  return (
    <>
      <form className={classes.root} autoComplete="off">
        <InputSelect
          setSelected={setSelectedStoreId}
          name="Store ID"
          id="StoreId"
          dataSet={initialData.allStores}
        />
        <InputSelect
          setSelected={setSelectedGeoId}
          name="Geographical ID"
          id="GeographicalID"
          dataSet={initialData.allGeoId}
        />
        <InputSelect
          setSelected={setSelectedDemoId}
          name="DemoGraphic ID"
          id="DemoGraphicID"
          dataSet={initialData.allDemoId}
        />
      </form>
      <h2>{selectedInfo}</h2>
      <HighchartsReact highcharts={Highcharts} options={option} />
    </>
  );
}

export default OverallSales;

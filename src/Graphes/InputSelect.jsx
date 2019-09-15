import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));
function InputSelect(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    id: 0,
    name: 0
  });
  function handleChange(event) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: event.target.value
    }));
    props.setSelected(event.target.value);
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel htmlFor={props.id}>{props.name}</InputLabel>
      <Select
        value={values.name}
        onChange={handleChange}
        inputProps={{
          id: props.id,
          name: 'name'
        }}
      >
        {props.dataSet.map(item => {
          return (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default InputSelect;

import React, {useState} from 'react';
import {useField, useFormikContext} from 'formik';
import TextField from '@mui/material/TextField';
import {FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  makeStyles,
  Theme,
 } from '@mui/material';


const useStyles:any = makeStyles((theme: Theme) => ({
  dateDiv: {
    paddingBottom: '15px',
  },
  '.MuiFormControlLabel-labelPlacementStart': {
    marginLeft: '5px',
    marginRight: '20px',
  },
  datePicker: {
    marginLeft: '20px',
  },
  errorMessage : {
    fontSize: 12,
    marginTop : '5px',
    marginLeft:'15px'
  }
}));

function FormikDate(props: any) {
  const classes = useStyles();
  const {name, label, additionalAction, values, visibility, options} = props;

  const meta = useField(name)[1];

  const {setFieldValue} = useFormikContext();

  const [selectedDate, setselectedDate] = useState();

  const handleChange = (event: any) => {
    if (additionalAction) {
      additionalAction(event);
    }
    const {value} = event.target;
    setFieldValue(name, value, true);
  };

  let errorMessage: string = '';

  const configFormControl = {error: false};

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
    errorMessage = meta.error;
  }

  const Visibility = () => visibility(values);

  if (visibility) {
    return (
      <div className={classes.dateDiv}>
        <FormControl {...configFormControl}>
          <FormGroup>
            <FormControlLabel
              label={label}
              className={classes['.MuiFormControlLabel-labelPlacementStart']}
              labelPlacement='start'
              control={
                <TextField
                    id="datetime-local"
                    onChange={handleChange}
                    label="Time Restore"
                    type="datetime-local"
                    defaultValue=""
                    sx={{ width: 300 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
              }
            />
          </FormGroup>
          <FormLabel component='legend' className={classes.errorMessage}>{errorMessage}</FormLabel>
        </FormControl>
      </div>
    );
  } else {
    return null;
  }
}

export default FormikDate;

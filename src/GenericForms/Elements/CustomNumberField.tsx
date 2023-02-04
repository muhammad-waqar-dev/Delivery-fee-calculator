import React from 'react';
import { useField } from 'formik';
import ErrorIcon from '@mui/icons-material/Error';
import { makeStyles, TextField, Typography, Tooltip } from '@mui/material';

const useStyles: any = makeStyles({
  root: { display: 'flex', width: '100%' },
  description: { width: '50%', padding: '0px 10px', marginTop: '-5px' },
});

function CustomNumberField(props: any) {

  const classes = useStyles();
  const {
    name,
    description,
    additionalAction,
    visibility,
    values,
    placeholderText,
    disabled,
    toolTipText,
    helperText,
    portRange,
    ...others
  } = props;

  const [field, mata] = useField(name);

  const configTextField = {
    ...field,
    ...others,
    fullWidth: true,
    variant: 'outlined',
    disabled: disabled,
    placeholder: placeholderText,
  };

  if (additionalAction) {
    configTextField.onChange = (event: any) => {
      additionalAction(event);
      field.onChange(event);
    };
  }

  if (helperText) {
    configTextField.helperText = helperText;
  }

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  if (helperText && !mata.error) {

    configTextField.helperText = helperText;
  }

  const titleContent = <Typography>Open Port Range (1 - 65535)<br/>
  1. Leave this blank to use any number of port.<br/>
  2. Specify a single port as (e.g: 80)<br/>
  3. Specify a port range as (eg: 80-90)</Typography>

  const Visibility = () => visibility(values);


  if (visibility) {
    return toolTipText ? (
      <>
        <Tooltip title={toolTipText}>
          <div className={classes.root}>
            <div style={{ width: description ? '50%' : '100%' }}>
              <TextField {...configTextField} />
            </div>
            {description ? (
              <div className={classes.description}>
                <strong>{name}</strong>
                <p>{description}</p>
              </div>
            ) : null}
          </div>
        </Tooltip>
      </>
    ) : (
      <>
        <div className={classes.root}>
          <div style={{ width: description ? '50%' : '100%' }}>
            <TextField {...configTextField} />
          </div>
          {portRange != undefined ? <Tooltip title={titleContent}><span style={{color: 'red'}}>{!portRange ? <ErrorIcon style={{margin:15}} /> : ''}</span></Tooltip> 
          : ''}
          {description ? (
            <div className={classes.description}>
              <strong>{name}</strong>
              <p>{description}</p>
            </div>
          ) : null}
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default CustomNumberField;

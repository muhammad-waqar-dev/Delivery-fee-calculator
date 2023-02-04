import React from 'react';
// import {makeStyles} from '@material-ui/core/styles';
import {Formik, Form} from 'formik';
// import {AppState} from '../../../redux/store';
import Components from './Elements';
import ServicesFooter from '.';
import {useDispatch, useSelector} from 'react-redux';
// import ProductListing from '../../../modules/ecommerce/Products/ProductListing';
// import {BrandingWatermark} from '@material-ui/icons';
import TextField from '@mui/material/TextField';
import { Grid,makeStyles, Theme } from '@mui/material';

const {
  CustomNumberField,
  CustomDateTime,
} = Components;

const useStyles:any = makeStyles((theme : Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: '30%',
  },
  inputGrid: {
    paddingBottom: '2em',
  },
  submitButton: {
    // float: 'right',
    paddingTop: '20px',
    // marginRight: '25%',
  },
  submitButtonForDrawer: {
    // float: 'right',
    paddingTop: '20px',
    // marginRight: '%',
  },
  common_footer: {
    // position: 'absolute',
    // bottom: '40px',
    // left: '0px',
    // margin: '0 auto',
    padding: '30px 32px 0',
    width: '100%',
  },
  custome_footer_styling: {
    position: 'fixed',
    right: 0,
    bottom: 0,
    // width: 'calc(100% - 19rem)',
    zIndex: 1,
    padding: 0,
    // zIndex: 1,
  },
  drawer_footer_styling: {
    // position: 'fixed',
    // right: 0,
    // bottom: 0,
    '@media only screen and (max-width: 600px)': {
      width: '100%',
    },

    /* Small devices (portrait tablets and large phones, 600px and up) */
    '@media only screen and (min-width: 600px)': {
      width: '100%',
    },

    /* Medium devices (landscape tablets, 768px and up) */
    '@media only screen and (min-width: 768px)': {
      width: '50%',
    },

    /* Large devices (laptops/desktops, 992px and up) */
    '@media only screen and (min-width: 992px)': {
      width: '33%',
    },

    /* Extra large devices (large laptops and desktops, 1200px and up) */
    '@media only screen and (min-width: 1200px)': {
      width: '33%',
    },
  },

  // zIndex: 1,
  // padding:0,
}));

const ServicesFooterFormik = (props: any) => {
  const {
    handleFormSubmit,
    handleVerifySubmit,
    formElements,
    initialValues,
    validationSchema,
    // visibilitySubmitBtn,
    submitText,
    // radioDefault,
    disabled,
    hideHeader,
    footerDetails = {isDrawer: false},
    id,
  } = props;

  const classes = useStyles();
//   const {operationId} = useSelector<AppState, AppState['Polling']>(
//     ({Polling}) => Polling,
//   );
//   const {nonPollingIds} = useSelector<AppState, AppState['NonPolling']>(
//     ({NonPolling}) => NonPolling,
//   );

//   let fetchLoading =
//     Object.keys(operationId).includes(id) || nonPollingIds.includes(id);

//   const styles = {
//     'common-footer': classes.common_footer,
//     'custom-footer': classes.custome_footer_styling,
//     'drawer-footer': classes.drawer_footer_styling,
//   };

//   let classNamesss = `${styles['common-footer']} ${styles['custom-footer']} ${
//     footerDetails.isDrawer ? styles['drawer-footer'] : null
//   }`;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        // console.log('formik click');
        handleFormSubmit(values, actions);

        // handleVerifySubmit(values, actions);
        // // actions.resetForm({
        // //   values: initialValues,
        // // });
      }}>
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        touched,
        errors,
      }) => {
        const defaultVisibilityFunction = (func: any) => {
          if (func) return func(values);
          return true;
        };
        console.log('values :', values);
        console.log('errors : ', errors);
        return (
          <Form>
            {formElements &&
              formElements.map((formElement: any) => {
                let Component: any;
                switch (formElement.type) {
                  case 'datetime':
                    Component = (
                      <CustomDateTime
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
                        values={values}
                        visibility={defaultVisibilityFunction(
                          formElement.visibility,
                        )}
                      />
                    );
                    break;
                  case 'number':
                    Component = (
                      <CustomNumberField
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
                        portRange={formElement.portRange}
                        description={formElement?.description}
                        type={formElement.type}
                        values={values}
                        placeholderText={
                          formElement.placeholderText
                            ? formElement.placeholderText
                            : ''
                        }
                        toolTipText={
                          formElement.toolTipText ? formElement.toolTipText : ''
                        }
                        helperText={
                          formElement.helperText ? formElement.helperText : ''
                        }
                        visibility={defaultVisibilityFunction(
                          formElement.visibility,
                        )}
                        onClick={formElement?.onClick}
                        disabled={formElement.disabled || false}
                      />
                    );
                    break;
                  default:
                    Component = (
                      <Grid 
                    //  className={classes.inputGrid}
                      >
                        <div>{formElement.type} is not defined</div>
                      </Grid>
                    );
                    //   Component = TextField;
                    break;
                }
                return (
                  <>
                    {defaultVisibilityFunction(formElement.visibility) ? (
                      <Grid
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        item
                        key={formElement.name}>
                        {/* <FormControlLabel
                        classes={classes}
                        label={showLabel ? formElement.label : ''}
                        labelPlacement='start'
                        control={Component }
                      /> */}
                        <Grid
                          item
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                       //   className={classes.inputGrid}
                          >
                          {Component}
                        </Grid>
                      </Grid>
                    ) : null}
                  </>
                );
              })}
            {/* <Divider /> */}

            <Grid
              item
              xs={hideHeader ? 12 : 8}
              sm={hideHeader ? 12 : 8}
              md={hideHeader ? 12 : 8}
              lg={hideHeader ? 12 : 8}
            //   className={
            //     hideHeader
            //       ? classes.submitButtonForDrawer
            //       : classes.submitButton
            //   }
              ></Grid>

            {footerDetails && (
              <div
              // className={`${classNamesss}`}
               >
                <ServicesFooter
                  submitText={submitText}
                  hideHeader={hideHeader}
                  footerDetails={{...footerDetails}}
                  handleFormSubmit={handleFormSubmit}
                  values={values}
                 // submitLoader={fetchLoading}
                />
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ServicesFooterFormik;

import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react'
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings'
import { Box, FormControl, Slider, TextField, Typography } from '@material-ui/core';
import mapStateToProps from '../../redux/mapStateToProps';
import mapDispatchToProps from '../../redux/mapDispatchToProps';

const ExpenseFilter = (props) => {

  // trocar para star rating value?
  const [ratingGTE, setRatingGTE] = useState(0)
  const [valueRange, setValueRange] = useState([0, 1000])

  // ------------------------------------------------------------
  return (
    <Box className="mt-3 p-3 bg-white shadow-sm rounded">
      <h4>Filters</h4>

      {/* PE 2/3 - tacar pra fora  */}
      <Formik
        initialValues={{
          name: ''
        }}

        validateOnChange
        validate={(values) => { props.filterExpenses({ ...values, valueRange, ratingGTE }) }}
      >
        {({ values, handleChange }) => (
          <Form>
            <div className="d-flex mt-3">

              <FormControl>
                <label>
                  Expense name
                </label>
                <TextField id="name" name="name"
                  variant="outlined" size="small"
                  autoComplete="off"
                  className="mr-5"
                  onChange={handleChange}
                  placeholder="Food, bills, clothing..."
                />
                <ErrorMessage name="name" component="div" />
                {/* remover? */}
              </FormControl>

              <div style={{ width: 200 }} className="mr-5">
                <label >
                  Value range
                </label>
                <Slider
                  value={valueRange}
                  onChange={(e, newValueRange) => {
                    // PE 2/3 - colocar pra fora 
                    setValueRange(newValueRange);
                    props.filterExpenses({ ...values, valueRange, ratingGTE })
                  }}
                  valueLabelDisplay="auto"
                  max={1000}
                  marks={[{ value: 0, label: '$0' }, { value: 1000, label: '$1000' },]}
                />
              </div>

              <div id="div-star-ratings-filter">
                <label >
                  Min rating
                </label>
                <Box style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <StarRatings
                    starDimension="24px"
                    starSpacing="0"
                    rating={ratingGTE}
                    starHoverColor="#169F8D"
                    starRatedColor="#169F8D"

                    // PE 2/3 jogar pra fora
                    changeRating={(newRating, name) => {
                      if (ratingGTE === newRating) {
                        newRating = 0
                      }
                      setRatingGTE(newRating)
                      props.filterExpenses({ ...values, valueRange, ratingGTE: newRating })
                    }}
                    className="mr-2" />

                  {ratingGTE ? <div>{ratingGTE}</div> : null}
                </Box>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Box >
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseFilter)
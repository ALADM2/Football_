import React, { useState, useEffect } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

/**
 * 
 * @param {*} props 
 * @returns New city or edited
 */
const AddEditCity = (props) => {
  const BASE_URL = 'https://footballdataserver.onrender.com'
  const [nameError, setNameError] = useState(false) // Used for name errors
  const [populationError, setPopulationError] = useState(false) // Used for population errors
  const [climateError, setClimateError] = useState(false) // Used for climate errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [countriesData, setCountriesData] = useState([])
  const [modal, setModal] = useState(props.modal)

  /**Fetch counties for the dropdown menu */
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/countries`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setCountriesData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCountriesData()
  }, [])

  /**
   * Set country options for the dropdown menu
   */
  const countryOptions = countriesData.map((d) => {
    return (
      <option className="option" value={`${d._id}`}>
        {d.name}
      </option>
    )
  })

  const [form, setValues] = useState({
    name: '',
    population: 0,
    climate: '',
    country: '629860a614a1674abcbff8ca',
  })

  /**
   * Change field values when the change in the form
   * @param {*} e 
   */
  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

    /**
   * Adding submit
   * @param {*} e 
   */
  const submitFormAdd = async (e) => {
    e.preventDefault()
    setNameError(false)
    setPopulationError(false)
    setClimateError(false)

    try {
      const format = /^[a-zA-Z. ]*$/
      let error = false

      if (!format.test(form.name)) {
        /**test if field 'name' has any symbol or number in it */
        setNameError(true)
        error = true
      }
      if (form.population == 0) {
        setPopulationError(true)
        error = true
      }
      if (!format.test(form.climate)) {
        /**test if field 'climate' has any symbol or number in it */
        setClimateError(true)
        error = true
      }
      if (error === false) {
        /**Post data to cities endpoint */
        const res = await axios.post(
          `${BASE_URL}/api/v1/cities`,
          {
            name: form.name,
            population: form.population,
            climate: form.climate,
            country: form.country,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )

        if (res.status === 201) {
          setNameError(false)
          setPopulationError(false)
          setClimateError(false)
          setModal(props.toggle)
          alert('City added')
        }
      }
    } catch (error) {
      console.log(error)

      if (error.response.status === 401) {
        //setAuthError(true);
      } else {
        setUnknownError(true)
      }
    }
  }

  /**
   * Edit submit
   * @param {*} e 
   */
  const submitFormEdit = async (e) => {
    e.preventDefault()
    setNameError(false)
    setPopulationError(false)
    setClimateError(false)

    try {
      const format = /^[a-zA-Z. ]*$/
      let error = false

      if (!format.test(form.name)) {
        /**test if field 'name' has any symbol or number in it */
        setNameError(true)
        error = true
      }
      if (form.population == 0) {
        setPopulationError(true)
        error = true
      }
      if (!format.test(form.climate)) {
        /**test if field 'climate' has any symbol or number in it */
        setClimateError(true)
        error = true
      }
      if (error === false) {
        /**Modify data in specific city */        
        const res = await axios.put(
          `${BASE_URL}/api/v1/cities/${props.item._id}`,
          {
            name: form.name,
            population: form.population,
            climate: form.climate,
            country: form.country,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )

        if (res.status === 201) {
          setNameError(false)
          setPopulationError(false)
          setClimateError(false)
          setModal(props.toggle)
          alert('City modified')
        }
      }
    } catch (error) {
      console.log(error)

      if (error.response.status === 401) {
        //setAuthError(true);
      } else {
        setUnknownError(true)
      }
    }
  }

  useEffect(() => {
    if (props.item) {
      const { name, population, climate, country } = props.item
      setValues({ name, population, climate, country })
    }
  }, [])

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          type="text"
          name="name"
          id="name"
          onChange={onChange}
          value={form.name === null ? '' : form.name}
          required
        />
      </FormGroup>
      {nameError ? (
        <Alert color="danger" height="15px">
          "Name" must contain only letters.
        </Alert>
      ) : null}
      <FormGroup>
        <Label for="population">Population</Label>
        <Input
          type="number"
          name="population"
          id="population"
          onChange={onChange}
          value={form.population === null ? '' : form.population}
          required
        />
      </FormGroup>
      {populationError ? (
        <Alert color="danger" height="15px">
          "Population" must be bigger that 0.
        </Alert>
      ) : null}
      <FormGroup>
        <Label for="climate">Climate</Label>
        <Input
          type="text"
          name="climate"
          id="climate"
          onChange={onChange}
          value={form.climate === null ? '' : form.climate}
          required
        />
      </FormGroup>
      {climateError ? (
        <Alert color="danger" height="15px">
          "Climate" must contain only letters.
        </Alert>
      ) : null}
      <FormGroup>
        <Label for="country">Country</Label>
        <div className="dropdown">
          <select
            className="dropdown-content"
            type="text"
            name="country"
            id="country"
            onChange={onChange}
            value={form.country === null ? '' : form.country}
          >
            {countryOptions} required
          </select>
        </div>
      </FormGroup>
      <Button color="success">Submit</Button>
    </Form>
  )
}

export default AddEditCity

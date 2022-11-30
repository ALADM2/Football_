import React, { useState, useEffect } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

/**
 * 
 * @param {*} props 
 * @returns New country or edited
 */
const AddEditCountry = (props) => {
  const BASE_URL = 'https://id607001-aladm1.herokuapp.com'
  const [nameError, setNameError] = useState(false) // Used for name errors
  const [populationError, setPopulationError] = useState(false) // Used for population errors
  const [continentError, setContinentError] = useState(false) // Used for continent errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [modal, setModal] = useState(props.modal)

  const [form, setValues] = useState({
    name: '',
    population: 0,
    continent: '',
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
    setContinentError(false)
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
      if (!format.test(form.continent)) {
        /**test if field 'continent' has any symbol or number in it */
        setContinentError(true)
        error = true
      }

      if (error === false) {
        /**Post data to countries endpoint */
        const res = await axios.post(
          `${BASE_URL}/api/v1/countries`,
          {
            name: form.name,
            population: form.population,
            continent: form.continent,
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
          setContinentError(false)
          setModal(props.toggle)
          alert('Country added')
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
    setContinentError(false)

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
      if (!format.test(form.continent)) {
        /**test if field 'continent' has any symbol or number in it */
        setContinentError(true)
        error = true
      }
      if (error === false) {
        /**Modify data in specific country */
        const res = await axios.put(
          `${BASE_URL}/api/v1/countries/${props.item._id}`,
          {
            name: form.name,
            population: form.population,
            continent: form.continent,
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
          setContinentError(false)
          setModal(props.toggle)
          alert('Country modified')
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
      const { name, population, continent } = props.item
      setValues({ name, population, continent })
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
        <Label for="continent">Continent</Label>
        <Input
          type="text"
          name="continent"
          id="continent"
          onChange={onChange}
          value={form.continent === null ? '' : form.continent}
          required
        />
      </FormGroup>
      {continentError ? (
        <Alert color="danger" height="15px">
          "Continent" must contain only letters.
        </Alert>
      ) : null}
      <Button color="success">Submit</Button>
    </Form>
  )
}

export default AddEditCountry

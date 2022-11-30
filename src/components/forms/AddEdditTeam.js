import React, { useState, useEffect } from 'react'
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap'
import axios from 'axios'

/**
 * 
 * @param {*} props 
 * @returns New team or edited
 */
const AddEditTeam = (props) => {
  const BASE_URL = 'https://id607001-aladm1.herokuapp.com'
  const [nameError, setNameError] = useState(false) // Used for name errors
  const [stadiumError, setStadiumError] = useState(false) // Used for stadium errors
  const [unknownError, setUnknownError] = useState(false) // Used for network errors
  const [citiesData, setCitiesData] = useState([])
  const [modal, setModal] = useState(props.modal)

    /**Fetch cities for the dropdown menu */
  useEffect(() => {
    const getCitiesData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/cities`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setCitiesData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCitiesData()
  }, [])

    /**
   * Set city options for the dropdown menu
   */
  const cityOptions = citiesData.map((d) => {
    return (
      <option className="option" value={`${d._id}`}>
        {d.name}
      </option>
    )
  })

  
  const [form, setValues] = useState({
    name: '',
    stadium: '',
    city: '',
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
    setStadiumError(false)
    try {
      const format = /^[a-zA-Z. ]*$/
      let error = false

      if (!format.test(form.name)) {
        /**test if field 'name' has any symbol or number in it */
        setNameError(true)
        error = true
      }
      if (!format.test(form.stadium)) {
        /**test if field 'stadium' has any symbol or number in it */
        setStadiumError(true)
        error = true
      }

      if (error === false) {
        const res = await axios.post(
          `${BASE_URL}/api/v1/teams`,
          {
            name: form.name,
            stadium: form.stadium,
            city: form.city,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )

        if (res.status === 201) {
          setNameError(false)
          setStadiumError(false)
          setModal(props.toggle)
          alert('Team added')
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
    setStadiumError(false)
    try {
      const format = /^[a-zA-Z. ]*$/
      let error = false

      if (!format.test(form.name)) {
        /**test if field 'name' has any symbol or number in it */
        setNameError(true)
        error = true
      }
      if (!format.test(form.stadium)) {
        /**test if field 'stadium' has any symbol or number in it */
        setStadiumError(true)
        error = true
      }

      if (error === false) {
        const res = await axios.put(
          `${BASE_URL}/api/v1/teams/${props.item._id}`,
          {
            name: form.name,
            stadium: form.stadium,
            city: form.city,
          },
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`,
            },
          }
        )

        if (res.status === 201) {
          setNameError(false)
          setStadiumError(false)
          setModal(props.toggle)
          alert('Team modified')
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
      const { name, stadium, city } = props.item
      setValues({ name, stadium, city })
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
        <Label for="stadium">Stadium</Label>
        <Input
          type="text"
          name="stadium"
          id="stadium"
          onChange={onChange}
          value={form.stadium === null ? '' : form.stadium}
          required
        />
      </FormGroup>
      {stadiumError ? (
        <Alert color="danger" height="15px">
          "Stadium" must contain only letters.
        </Alert>
      ) : null}
      <FormGroup>
        <Label for="city">City</Label>
        <div className="dropdown">
          <select
            className="dropdown-content"
            type="text"
            name="city"
            id="city"
            onChange={onChange}
            value={form.city === null ? '' : form.city}
          >
            {cityOptions} required
          </select>
        </div>
      </FormGroup>
      <Button color="success">Submit</Button>
    </Form>
  )
}

export default AddEditTeam

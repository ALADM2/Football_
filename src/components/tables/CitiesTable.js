import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'reactstrap'
import ModalForm from '../modals/Modal'
import Pagination from '../Pagination'
import '../main.css'
import { BASE_URL } from '../../utils/backendURL'

/**
 * 
 * @param {*} props 
 * @returns Cities table
 */
const CitiesTable = (props) => {

  const [currentPage, setCurrentPage] = useState(1)      /**Set initial page to 1 */
  const [entriesPerPage, setEntriesPerPage] = useState(5)/**Limit to 5 items per page */
  const [data, setData] = useState([])

  /**Fetch data */
  useEffect(() => {
    const getCitiesData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/cities`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getCitiesData()
  }, [data])

  /**Get current data */
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)

  /**Change page */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  /**
   * Deletes a city
   * @param {*} _id 
   */
  const deleteCity = async (_id) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${BASE_URL}/api/v1/cities/${_id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const displayCitiesData = currentEntries.map((d) => {
    return (
      <tr key={d._id}>
        <td>{d.name}</td>
        <td>{d.population}</td>
        <td>{d.climate}</td>
        <td>{d.country.name}</td>
        <td>
          <div>
            <ModalForm
              buttonLabel="Edit"
              name="City"
              item={d}
            />{' '}
            <Button color="danger" onClick={() => deleteCity(d._id)}>
              Del
            </Button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Population</th>
            <th>Climate</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>{displayCitiesData}</tbody>
      </Table>
      <ModalForm buttonLabel="Add City" name="City" />
      <Pagination
        entriesPerPage={entriesPerPage}
        totalEntries={data.length}
        paginate={paginate}
      />
    </>
  )
}

export default CitiesTable

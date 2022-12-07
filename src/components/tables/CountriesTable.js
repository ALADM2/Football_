import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'reactstrap'
import ModalForm from '../modals/Modal'
import Pagination from '../Pagination'
import '../main.css'

/**
 * 
 * @param {*} props 
 * @returns Countries table
 */
const CountriesTable = (props) => {
  const BASE_URL = 'https://footballdataserver.onrender.com'
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)       /**Set initial page to 1 */
  const [entriesPerPage, setEntriesPerPage] = useState(5) /**Limit to 5 items per page */
  const [data, setData] = useState([])

  /**Fetch data */
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`${BASE_URL}/api/v1/countries`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setData(res.data.data)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    getCountriesData()
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
   * Deletes a country
   * @param {*} _id 
   */
  const deleteCountry = async (_id) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${BASE_URL}/api/v1/countries/${_id}`, {
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

  const displayCountriesData = currentEntries.map((d) => {
    return (
      <tr key={d._id}>
        <td>{d.name}</td>
        <td>{d.population}</td>
        <td>{d.continent}</td>
        <td>
          <div>
            <ModalForm
              buttonLabel="Edit"
              name="Country"
              item={d}
            />{' '}
            <Button color="danger" onClick={() => deleteCountry(d._id)}>
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
            <th>Continent</th>
          </tr>
        </thead>
        <tbody>{displayCountriesData}</tbody>
      </Table>
      <ModalForm
        buttonLabel="Add Country"
        name="Country"
      />
      <Pagination
        entriesPerPage={entriesPerPage}
        totalEntries={data.length}
        paginate={paginate}
      />
    </>
  )
}

export default CountriesTable

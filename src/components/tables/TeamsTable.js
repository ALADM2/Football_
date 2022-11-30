import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'reactstrap'
import ModalForm from '../modals/Modal'
import Pagination from '../Pagination'
import '../main.css'

/**
 * 
 * @param {*} props 
 * @returns Teams table
 */
const TeamsTable = (props) => {
  const BASE_URL = 'https://id607001-aladm1.herokuapp.com'

  const [currentPage, setCurrentPage] = useState(1)       /**Set initial page to 1 */
  const [entriesPerPage, setEntriesPerPage] = useState(5) /**Limit to 5 items per page */
  const [data, setData] = useState([])

  /**Fetch data */
  useEffect(() => {
    const getTeamsData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/teams`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })

        setData(res.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    getTeamsData()
  }, [data])

  /**Get current data */
  const indexOfLastEntry = currentPage * entriesPerPage
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage
  const currentEntries = data.slice(indexOfFirstEntry, indexOfLastEntry)

/**
 * Change page
 * @param {any} pageNumber
 */
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  /**
   * Deletes a team from the table
   * @param {*} _id 
   */
  const deleteTeam = async (_id) => {
    let confirmDelete = window.confirm('Delete item forever?')
    if (confirmDelete) {
      try {
        const res = await axios.delete(`${BASE_URL}/api/v1/teams/${_id}`, {
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


  const displayTeamsData = currentEntries.map((d) => {
    return (
      <tr key={d._id}>
        <td>{d.name}</td>
        <td>{d.stadium}</td>
        <td>{d.city.name}</td> 
        <td>
          <div>
            <ModalForm
              buttonLabel="Edit"
              name="Team"
              item={d}
            />{' '}
            <Button color="danger" onClick={() => deleteTeam(d._id)}>
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
            <th>Stadium</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody>{displayTeamsData}</tbody>
      </Table>
      <ModalForm buttonLabel="Add Team" name="Team" />
      <Pagination
        entriesPerPage={entriesPerPage}
        totalEntries={data.length}
        paginate={paginate}
      />
    </>
  )
}

export default TeamsTable

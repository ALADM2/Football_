import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import AddEditCountry from '../forms/AddEdditCountry'
import AddEditCity from '../forms/AddEdditCity'
import AddEditTeam from '../forms/AddEdditTeam'

/**
 * 
 * @param {*} props 
 * @returns Modal form
 */
function ModalForm(props) {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = (
    <button className="close" onClick={toggle}>
      &times;
    </button>
  )
  const label = props.buttonLabel
  const name = props.name

  let button = ''
  let title = ''

  /**Edit button */
  if (label === 'Edit') {
    button = (
      <Button
        color="warning"
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        {label}
      </Button>
    )
    title = 'Edit Item'
  } else {
    /**Add button */
    button = (
      <Button
        color="success"
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        {label}
      </Button>
    )
    title = 'Add New Item'
  }

  /**
   * Checks what is the lable passed to select the propper form.
   */
  const formType =
    name === 'Country' ? (
      <AddEditCountry
        addItemToState={props.addItemToState}
        updateState={props.updateState}
        toggle={toggle}
        item={props.item}
      />
    ) : name === 'City' ? (
      <AddEditCity
        addItemToState={props.addItemToState}
        updateState={props.updateState}
        toggle={toggle}
        item={props.item}
      />
    ) : name === 'Team' ? (
      <AddEditTeam
        addItemToState={props.addItemToState}
        updateState={props.updateState}
        toggle={toggle}
        item={props.item}
      />
    ) : (
      <></>
    )

  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>{formType}</ModalBody>
      </Modal>
    </div>
  )
}

export default ModalForm

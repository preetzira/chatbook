
import React from 'react'
import Card from './sharedComponents/Card'
import Spinner from './sharedComponents/Spinner'
import Button from './sharedComponents/Button'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { joinGroupAction } from '../actions/index'

const Group = (props) => {
  const { data } = props
  return <div className="col-lg-3 col-md-4 col-sm-6 col-12 mt-5">
    <Card className="p-4"
      body={
        <>
          <h5 className="card-title name mb-2">{data.fullname}</h5>
          <small className="card-text category mb-3">{data.category}</small>
        </>
      }
      bottom={
          <Link to={`group/${data.fullname}`} className="btn btn-outline-info float-right">Join</Link>
      }
    />
  </div>
}

const Groups = (props) => {
  return props.groups.map(group=>{
    return <Group key={group._id} data={group} />
  })
}

function mapStateToProps({state}){
  const { isLoading } = state
  return { isLoading }
}

export default connect(mapStateToProps)(Groups)

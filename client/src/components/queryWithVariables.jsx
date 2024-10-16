import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_SINGLE_USER_DETAILS_AND_TRANSACTIONS } from '../graphql/queries/user.query'

export default function QueryWithVariables() {

    const {loading, data, error} = useQuery(GET_SINGLE_USER_DETAILS_AND_TRANSACTIONS,{
        variables:{
            userId:"670eeed0dcafb16e4f111a33"
        }
    })//This will trigger a network request to your GraphQL server.
    
    console.log(data)

  return (
    <h1>Query With Variables</h1>
  )
}

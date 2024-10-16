import { useMutation, useQuery } from '@apollo/client'
import './App.css'
import { GET_USERS } from './graphql/queries/user.query'
import { useEffect } from 'react'
import { SIGN_UP } from './graphql/mutation/user.mutation';
import QueryWithVariables from './components/queryWithVariables';

function App() {

  // const { loading, data, error } = useQuery(GET_USERS);//This is a React hook provided by Apollo Client that allows you to execute a GraphQL query within your React component. GET_USERS is the query that is defined and passed to useQuery. It fetches data from the GraphQL server according to the query's specifications.

  const[signup, { data, loading, error }] = useMutation(SIGN_UP);//signup is a function that you call to execute the SIGN_UP mutation.
  //signup is a function that you call when you want to trigger the SIGN_UP mutation.
  //SIGN_UP is the GraphQL mutation query that is defined and passed as an argument.


  // useEffect(() => {
  //   if (loading) {
  //     console.log("loading...")
  //   }
  //   if (error) {
  //     console.log("some error occured :\n", error)
  //     return
  //   }
  //   console.log(data)
  // }, [data])

  const handelFormSubmit = async(e)=>{
    e.preventDefault();
    const username = e.target.username.value
    const name = e.target.name.value
    const password = e.target.password.value
    const gender = e.target.gender.value

    const userDetails = {username, name, password, gender}
    console.log(userDetails)
    
    try {
      const user = await signup({
        variables:{
          input:userDetails
        }
      })
      console.log(user)
    } catch (error) {
      console.log("error signing up :\n",error)
    }
  }

  return (
    <>
      <h1 className='text-red-500 text-2xl mb-10'>sign up</h1>
      <form className='flex flex-col' onSubmit={(e)=>handelFormSubmit(e)}>
        <input className='text-blue-500 bg-slate-800' name='username' type="text" placeholder='username' />
        <input className='text-blue-500 bg-slate-800' name='name' type="text" placeholder='name' />
        <input className='text-blue-500 bg-slate-800' name='password' type="password" placeholder='password' />
        <div className='flex'>
          male<input type="radio" name='gender' value={"male"} />
          female<input type="radio" name='gender' value={"female"} />
        </div>
        <button className='bg-lime-500' type='submit'>sign up</button>
      </form>
      <QueryWithVariables/>
    </>
  )
}

export default App

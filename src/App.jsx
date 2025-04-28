import axios from 'axios'
import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import JsonFormatter from 'react-json-formatter'
import ListSelector from './components/ListSelector'

function App() {

  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [selectedParameter, setSelectedParameter] = useState('')
  const [fetchParameter, setFetchParameter] = useState('')

  const fetchJson = async (param) => {
    //fetch json based on param
    console.log('The chosen param is: ', param)

    //Set the endpoint URL
    let ENDPOINT_URL
    if (import.meta.env.MODE === "development") {
      if (param == 'staff') {
        ENDPOINT_URL = import.meta.env.VITE_STAFF_ENDPOINT_URL
      } else if (param == 'drugs-infusions') {
        ENDPOINT_URL = import.meta.env.VITE_INFUSIONS_ENDPOINT_URL
      } else if (param == 'drugs-boluses') {
        ENDPOINT_URL = import.meta.env.VITE_BOLUSES_ENDPOINT_URL
      } else if (param == 'drugs-cds') {
        ENDPOINT_URL = import.meta.env.VITE_CDS_ENDPOINT_URL
      } else if (param == 'hospitals') {
        ENDPOINT_URL = import.meta.env.VITE_HOSPITAL_ENDPOINT_URL
      } else if (param == 'drugs-consultant') {
        ENDPOINT_URL = import.meta.env.VITE_CONSULTANT_ENDPOINT_URL
      }
    } else {
      if (param === 'staff') {
        ENDPOINT_URL = 'https://access-jsongenerator-api.onrender.com/api/staff'
      } else if (param == 'drugs-infusions') {
        ENDPOINT_URL = 'https://access-jsongenerator-api.onrender.com/api/medications?type=Infusion'
      } else if (param == 'drugs-boluses') {
        ENDPOINT_URL = 'https://access-jsongenerator-api.onrender.com/api/medications?type=Bolus'
      } else if (param == 'drugs-cds') {
        ENDPOINT_URL = 'https://access-jsongenerator-api.onrender.com/api/medications?type=cds'
      } else if (param == 'hospitals') {
        ENDPOINT_URL = 'https://access-jsongenerator-api.onrender.com/api/hospitals'
      }
    }

    await axios({
      url: ENDPOINT_URL,
      method: 'GET',
      responseType: 'blob'
    }).then(res => {
      const file = new Blob([res.data])
      file.text()
        .then(val => setData(val))
        .catch(err => console.log("Couldn't generate the JSON: ", err))
      
      const url = window.URL.createObjectURL(file)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute('download', `${param}.json`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }).catch(err => {
        console.log("Error downloading file: ", err)
        setData(err)
    })
  }

  useEffect(() => {
    if (!fetchParameter) return

    setLoading(true)
    fetchJson(fetchParameter)

  }, [fetchParameter])

  // Handle dropdown selection change
  const handleSelectionChange = event => {
    setSelectedParameter(event.target.value)
  }

  // Handle form submission
  const handleSubmit = event => {
    event.preventDefault()
    setFetchParameter(selectedParameter)
  }

  return (
    <Container>
      <div>
        <Header>ACCESS Jotform JSON Generator</Header>
      </div>
      <OutputBox>
        {!data
          ?
            loading
            ? <WaitMessage>Please wait, JSON data is loading...</WaitMessage> : null
          : <JsonFormatter json={data} jsonStyle={jsonStyle} />
        }
      </OutputBox>
      <SelectorContainer>
        
        <ListSelector handleSelectionChange={handleSelectionChange} handleSubmit={handleSubmit} />
      </SelectorContainer>
    </Container>
  )
}

export default App

const jsonStyle = {
  propertyStyle: { color: 'red' },
  stringStyle: { color: 'blue' },
}

const Header = styled.h2`
  font-family: Arial, Helvetica, sans-serif ;
`

const Container = styled.div`
  display: flex ;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const OutputBox = styled.div`
  width: 50%;
  height: 400px;
  overflow-y: scroll ;
  border: 1pt solid black ;
  border-radius: 5px ;
`

const WaitMessage = styled.div`
  padding: 20px ;
  font-size: 26 ;
  font-family: Arial, Helvetica, sans-serif;
`

const SelectorContainer = styled.div`
  display: flex ;
  flex-direction: row ;
  align-items: center;
  justify-content: center;
  padding: 10px ;
`
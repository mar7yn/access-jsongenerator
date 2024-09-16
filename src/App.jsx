import axios from 'axios'
import { useState } from 'react'
import styled from '@emotion/styled'
import JsonFormatter from 'react-json-formatter'

function App() {

  const [data, setData] = useState()

  const downloadFile = async () => {
    await axios({
      url: "https://access-jsongenerator-api.onrender.com/api",
      method: "GET",
      responseType: "blob"
    }).then(res => {
      const file = new Blob([res.data])
      file.text()
        .then(val => setData(val))
        .catch(err => console.log("Couldn't generate the JSON: ", err))

      const url = window.URL.createObjectURL(file)
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "staff.json")

      document.body.appendChild(link)
      link.click()

      document.body.removeChild(link)

    }).catch(err => {
      console.log("Error downloading file: ", err)
    })
  }

  return (
    <Container>
      <div>
        <Header>ACCESS Jotform JSON Generator</Header>
      </div>
      <OutputBox>{!data ? null : <JsonFormatter json={data} jsonStyle={jsonStyle} />}</OutputBox>
      <Button onClick={downloadFile}>Generate Staff.JSON</Button>
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
const Button = styled.button`
  padding: 15px;
  margin-top: 10px ;
  background-color: #0239a1;
  color: white ;
  border-radius: 5px ;
  font-weight: bold ;
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
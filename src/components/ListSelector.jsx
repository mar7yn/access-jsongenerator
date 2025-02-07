import styled from '@emotion/styled'

const ListSelector = ({ handleSelectionChange, handleSubmit }) => {

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <select name="list" defaultValue='' onChange={handleSelectionChange}>
          <option value="">Select a List</option>
          <option value="staff">Staff</option>
          <option value="drugs-infusions">Drugs - Infusions</option>
          <option value="drugs-boluses">Drugs - Boluses</option>
          <option value="drugs-cds">Drugs - CDs</option>
          <option value="hospitals">Hospitals</option>
        </select>
        <button type='submit'>Generate JSON</button>
      </form>
    </div>
  )
}

const Button = styled.button`
  padding: 15px;
  margin-top: 10px ;
  background-color: #0239a1;
  color: white ;
  border-radius: 5px ;
  font-weight: bold ;
`

export default ListSelector
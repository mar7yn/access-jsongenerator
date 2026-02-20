const ListSelector = ({ handleSelectionChange, handleSubmit }) => {

  return (
    <div>
      <form method="post" onSubmit={handleSubmit}>
        <select name="list" defaultValue='' onChange={handleSelectionChange}>
          <option value="">Select a List</option>
          <option value="staff">Staff</option>
          <option value="drugs-infusions">Drugs - Infusions</option>
          <option value="drugs-boluses">Drugs - Boluses</option>
          <option value="drugs-consultant">Drugs - Consulant List</option>
          <option value="drugs-cds">Drugs - CDs</option>
          <option value="hospitals">Hospitals</option>
          <option value="equipment">Equipment</option>
        </select>
        <button type='submit'>Generate JSON</button>
      </form>
    </div>
  )
}

export default ListSelector
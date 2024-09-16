const JSONOutput = ({ data }) => {
  return (
    <div>
      {
        data.map(element => {
          return (
            <>
              <div>{element.name}</div>
              <div>{element.email}</div>
            </>
          )
        })
      }
    </div>
  )
}

export default JSONOutput
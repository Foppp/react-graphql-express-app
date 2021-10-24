import React from 'react'
import { useHistory } from 'react-router-dom'
const Test = () => {
  const history = useHistory();
  return (
    <div>
      <h1>TESTING PAGE 1</h1>
      <button type="button" onClick={() => history.goBack()}>Back</button>
    </div>
  )
}

export default Test

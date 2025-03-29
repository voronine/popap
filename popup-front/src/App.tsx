import { useState } from 'react'
import Popup from './components/Popup'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>
        Open Popup
      </button>
      {open && <Popup onClose={() => setOpen(false)} />}
    </>
  )
}

export default App

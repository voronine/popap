import { useState } from 'react'
import Popup from './components/Popup'
import { GlobalStyles } from './GlobalStyles'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <GlobalStyles />
      <button onClick={() => setOpen(true)}>
        Open Popup
      </button>
      {open && <Popup onClose={() => setOpen(false)} />}
    </>
  )
}

export default App

import './App.css';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/base';

function App() {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<dayjs.Dayjs|null>(dayjs());

  return (
    <div className="App">
      <Button onClick={() => setOpen(true)}>Open</Button>
      <p>{value?.toISOString()}</p>
      <MobileDatePicker
        label="Controlled picker"
        value={value}
        open={open}
        onClose={() => { setOpen(false); } }

        onChange={(newValue) => console.log("Change", newValue)}
        onAccept={(newValue) => {
          setValue(newValue);
          setOpen(false);
        }}
        slots={{
          dialog: (props) => {
            return <Dialog
              {...props}

              onClose = {(_, reason) => {
                if (reason == "backdropClick") {
                  setOpen(false)
                }
              }}
            />
          }
        }}
      />
    </div>
  );
}

export default App;

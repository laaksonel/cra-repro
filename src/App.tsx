import './App.css';
import React from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Dialog } from '@mui/material';
import { useState } from 'react';
import { Button } from '@mui/base';

function App() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<dayjs.Dayjs | null>(null);

  return (
    <div className="App">
      <div>
        <Button onClick={() => setOpen(true)}>Open</Button>
      </div>
      <p>{value?.toISOString()}</p>
      <div>
        <PrivateRoute value={value} setValue={setValue} open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

const PrivateRoute = (props: { value: dayjs.Dayjs | null, setValue: (x: dayjs.Dayjs | null) => void, open: boolean, setOpen: (open: boolean) => void }) => {
  const { open, setOpen, value, setValue } = props;

  return <div>{open && <Picker value={value} setValue={setValue} open={open} setOpen={setOpen} />}</div>
};

const Picker = (props: { value: dayjs.Dayjs | null, setValue: (x: dayjs.Dayjs | null) => void, open: boolean, setOpen: (open: boolean) => void }) => {
  const { open, setOpen, value, setValue } = props;
  console.log(`rerender with value ${value}`)

  return (<MobileDatePicker
    onAccept={(newValue) => {
      console.log('accept')
      setValue(null)
      setOpen(false);
    }}
    open={open}
    defaultValue={dayjs()}
    onClose={() => setOpen(false)}
    slots={{
      dialog: (props) => {
        return <Dialog
          {...props}

          onClose={(_, reason) => {
            if (reason == "backdropClick") {
              setOpen(false)
            }
          }}
        />
      }
    }}
  />);
}

export default App;

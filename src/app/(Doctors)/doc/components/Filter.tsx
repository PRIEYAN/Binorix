import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from "axios";

export default function Filter({ onHospitalSelect }: { onHospitalSelect: (name: string) => void }) {
  const [hospital, setHospital] = React.useState('');
  const [hospitalList, setHospitalList] = React.useState<{ name: string }[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = event.target.value as string;
    setHospital(selected);
    onHospitalSelect(selected);
  };

  React.useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const res = await axios.get("http://localhost:5050/doctor/auth/getHospital");
        if (res.data?.hospitalNames) {
          setHospitalList(res.data.hospitalNames);
        }
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  return (
    <Box sx={{ minWidth: 180 }}>
      <FormControl fullWidth>
        <InputLabel id="hospital-select-label">Hospital</InputLabel>
        <Select
          labelId="hospital-select-label"
          id="hospital-select"
          value={hospital}
          onChange={handleChange}
        >
          {hospitalList.map((h, index) => (
            <MenuItem key={index} value={h.name}>
              {h.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

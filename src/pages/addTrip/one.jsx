import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { CssTextField } from "../../components";
import styles from "./index.module.css";

export default function render(props) {
  return (
    <>
      <div className={styles.body}>
        <div className={styles.form}>
          <FormControl fullWidth>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              name="name"
              value={props.state.name}
              onChange={props.handleChange}
            />
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <FormControl fullWidth>
              <TimePicker
                label="StartTime"
                name="time"
                value={props.state.time}
                onChange={props.clockHandle}
                renderInput={(params) => <CssTextField {...params} />}
              />
            </FormControl>
          </LocalizationProvider>

          <FormControl variant="standard" fullWidth>
            <InputLabel id="demo-simple-select-label">Repeat</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              name="repeat"
              label="Repeat"
              value={props.state.repeat}
              onChange={props.handleChange}
            >
              <MenuItem value={"daily"}>Daily</MenuItem>
              <MenuItem value={"weekend"}>Weekend</MenuItem>
              <MenuItem value={"weekdays"}>WeekDays</MenuItem>
            </Select>
          </FormControl>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className={styles.calender}>
              <DatePicker
                displayStaticWrapperAs="desktop"
                onChange={props.calanderHandleFrom}
                value={props.state.from}
                renderInput={(params) => <CssTextField {...params} />}
              />
              <span className={styles.to}>To </span>
              <DatePicker
                displayStaticWrapperAs="desktop"
                onChange={props.calanderHandleTo}
                value={props.state.to}
                renderInput={(params) => <CssTextField {...params} />}
              />
            </div>
          </LocalizationProvider>
          <Divider orientation="vertical" />
        </div>
      </div>
    </>
  );
}

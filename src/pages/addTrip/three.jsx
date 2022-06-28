import { useState } from "react";
import { TextField, Stack, Button, Box } from "@mui/material";
import { Table } from "../../components";

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export default function Render(props) {
  var init = {
    id: generateString(10),
    name: "",
    time: 0,
    lat: "",
    long: "",
  };

  const [halt, setHalt] = useState(init);

  //const [tableData, setTableData] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setHalt({ ...halt, [name]: value });
  };

  const handleSubmit = (evtn) => {
    // setTableData([...tableData, halt]);
    props.onAddhalt(halt);

    setHalt({ ...init });
  };

  return (
    <>
      <div style={{ width: "80%", marginBottom: "5px", padding: "5px" }}>
        <h1>Add halts</h1>
        <Stack spacing={2} sx={{ width: "80%", mt: 2, mx: "auto" }}>
          <TextField
            name="name"
            value={halt.name}
            onChange={handleChange}
            label="Halt Name"
            variant="outlined"
          />
          <TextField
            name="id"
            value={halt.id}
            onChange={handleChange}
            label="Halt Id"
            variant="outlined"
          />
          <TextField
            type={"number"}
            name="time"
            value={halt.time}
            onChange={handleChange}
            label="Time Since Trip Start in M"
            variant="outlined"
          />
          <Box
            sx={{
              display: "flex",
              m: 1,
              alignItems: "center",
              "& > :not(style)": { m: 1, width: "25ch" },
            }}
          >
            <span>Location </span>
            <TextField
              name="long"
              label="Long"
              onChange={handleChange}
              value={halt.long}
              variant="outlined"
            />
            <TextField
              name="lat"
              label="Lat"
              onChange={handleChange}
              value={halt.lat}
              variant="outlined"
            />
          </Box>
        </Stack>
        <Button
          variant="contained"
          sx={{ mt: 3, mb: 3 }}
          style={{ float: "right" }}
          onClick={handleSubmit}
        >
          Add halt
        </Button>

        <Table state={props.state}></Table>
      </div>
    </>
  );
}

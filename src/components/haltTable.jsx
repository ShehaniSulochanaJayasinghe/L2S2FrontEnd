import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  tableCellClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useEffect } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function Render(props) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `http://127.0.0.1:3001/trip/${props.id}/hault/get-all?id=${props.id}`,
      {
        method: "get",
      }
    )
      .then((res) => res.json())
      .then((actualData) => {
        console.log(actualData);
        setData(actualData)
      })
      .catch((e) => {
        console.error(e);
      });
  }, [props.id]);
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 700, width: "80%" }}
          aria-label="customized table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell colSpan={5} align="center">
                Add Halts to {props.data.name}
              </StyledTableCell>
            </TableRow>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Time</StyledTableCell>
              <StyledTableCell align="right">Lat</StyledTableCell>
              <StyledTableCell align="right">Long</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row">
                  <i>#{row._id}</i> - <b>{row.name}</b>
                </StyledTableCell>
                <StyledTableCell align="right">{row.time}</StyledTableCell>
                <StyledTableCell align="right">
                  {row.location.coordinates[0]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {row.location.coordinates[1]}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

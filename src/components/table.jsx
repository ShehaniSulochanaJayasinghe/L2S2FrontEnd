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
  var data = props.state.halts;
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
                Add Halts to {props.state.name}
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
                <StyledTableCell align="right">{row.lat}</StyledTableCell>
                <StyledTableCell align="right">{row.long}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

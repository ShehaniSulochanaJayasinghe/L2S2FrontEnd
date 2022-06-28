import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssTextField = styled(TextField)(({ theme }) => ({
  "&": {
    backgroundColor: "#F5F5F5",
    width: "150px",
    display: "block",
    border: "none",
    outline: "none",
    fontSize: 16,
    borderRadius: "13px",
    marginBottom: "15px",
  },
  "& .MuiInputLabel-root": {
    display: "none",
  },
  "& fieldset": {
    display: "none",
  },
  "& input": {
    padding: "10px",
  },
  "& .MuiButtonBase-root": {
    color: "#6295FF",
  },
}));

export { CssTextField as default };

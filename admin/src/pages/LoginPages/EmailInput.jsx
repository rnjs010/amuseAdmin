import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

export default function EmailInput({ email, handleChangeEmail }) {
  return (
    <FormControl sx={{ m: 1, width: "400px" }} variant="standard">
      <TextField
        id="standard-basic"
        type="email"
        label="Email"
        variant="standard"
        value={email}
        onChange={handleChangeEmail}
        sx={{ width: "400px", bgcolor: "transparent" }}
      />
    </FormControl>
  );
}

import { Box, TextField } from "@mui/material";

export default function FilterBar({ search, setSearch }) {
  return (
    <Box mb={2}>
      <TextField
        label="Search by degree, year, or institution"
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Box>
  );
}

import React from "react";
import { useMutation, useQuery, gql } from '@apollo/client';

import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Grid from "@mui/material/Grid";
import SearchIcon from "@mui/icons-material/Search";
import {
  StyledTableCell,
  StyledTableRow,
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../StyledComponents.jsx";
import { artists } from '../../mocks/artistList'

export const GET_ALL_ARTISTS = gql`
  query {
    getArtists {
      id, name, age
    }
  }
`;

const Artists = ({ handleDialogOpen, handleModalOpen }) => {
  const { data, loading, error, refetch } = useQuery(GET_ALL_ARTISTS);
  // const [modalType, setModalType] = useState(null);
  // const [artistId, setArtistId] = useState(null);
  console.log(data);
  return (
    <>
      <Typography variant="h4" m={1} sx={{ textAlign: "center" }}>
        Artists
      </Typography>
      <Grid container>
        <Grid item xs={6}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
        </Grid>
        <Grid item sx={{ textAlign: "end" }} xs={6}>
          <IconButton
            aria-label="info"
            color="inherit"
            onClick={() => handleDialogOpen('artistAdd')}
          >
            <AddCircleOutlineRoundedIcon
              fontSize="large"
              sx={{ padding: "5px" }}
            />
          </IconButton>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="center">Age</StyledTableCell>
              <StyledTableCell align="center">Role</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artists.map((artist) => (
              <StyledTableRow key={artist.id}>
                <StyledTableCell component="th" scope="row">
                  {artist.name}
                </StyledTableCell>
                <StyledTableCell align="center">{artist.age}</StyledTableCell>
                <StyledTableCell align="center">{artist.role}</StyledTableCell>
                <StyledTableCell align="center">
                  <Typography
                    variant="caption"
                    sx={{ color: artist.status === "active" ? "green" : "red" }}
                  >
                    {artist.status}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <IconButton
                      aria-label="info"
                      size="small"
                      color="info"
                      onClick={() => handleDialogOpen("artistProfile", artist.id)}
                    >
                      <InfoOutlinedIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="info"
                      size="small"
                      color="error"
                      onClick={() => handleModalOpen(artist.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="info"
                      size="small"
                      color="secondary"
                      onClick={() => handleDialogOpen("artistEdit", artist.id)}
                    >
                      <ModeEditOutlineOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Artists;

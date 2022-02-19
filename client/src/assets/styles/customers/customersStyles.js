import { makeStyles } from "@mui/styles";

export default makeStyles({
  root: {
    alignText: 'center',
  },
  listWrapper: {
    transition: 'all 0.2s ease-in-out',
  },
  listPaper: {
    width: '100%',
    padding: '20px',
    borderRadius: '20px',
  },
  listActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  addButton: {
    margin: '15px 0'
  },
  serachField: {
    margin: '0 20px 20px 20px',
  },
  customersList: {
    width: '100%',
    height: '100%',
    bgcolor: 'background.paper',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  profilePaper: {
    width: '100%',
    height: '100%',
    padding: '20px',
    borderRadius: '20px',
  }
});
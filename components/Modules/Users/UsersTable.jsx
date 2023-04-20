import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import { Card } from '@mui/material';
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { setIsModal } from "../../../store/editUserSlice";
import styles from "./UsersTable.module.css";


export default function UsersTable( { usersData } ) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const dispatch = useDispatch();
  const openModal = () => {
    dispatch(setIsModal(true));
  }

  function createColumnsFromKeys(){
    const columns = [];
    function getKeys(){
      if(usersData[0] !== undefined)
        return Object.keys(usersData[0]);
      else
        return [];
    }

    const myKeys = getKeys();

    const columnToLabel = {
      id_user: 'ID',
      fullname: 'Nombre completo',
      username: 'Usuario/correo',
      password: 'Contraseña',
      hireDate: 'Contratación',
      company: 'Compañia',
      country: 'País',
      position: 'Posición',
      userProfile: 'Perfil de usuario',
      userState: 'Estado'
    }

    myKeys.forEach((element) => {
      columns.push(
        {
          id: element,
          label: columnToLabel[element] ?? element,
          minWidth: 50,
          align: 'left',
        }
      )
    });
    return columns;
  }

  const columns = createColumnsFromKeys();

  function createRows(){
    return usersData !== undefined ? (Array.isArray(usersData) ? usersData : [usersData]) : [];
  }
  let rows = []
  rows = createRows();

  const router = useRouter();

  return (
    <div style={{ height: '97vh',width: '95vw', display: 'grid', gridTemplateColumns: '1fr 20fr 1fr', gridTemplateRows: '1fr 17fr 1fr', gridGap: '5px' }}>
        <Card variant='outlined' style={{display: 'grid',height: "100%", gridTemplateRows: "21fr 1fr", alignItems: "center",gridRowStart: 2, gridRowEnd: 3, gridColumnStart: 2, gridColumnEnd: 3, borderRadius: '35px'}}>
          <TableContainer sx={{ height: '92%', overflow: "scroll", padding: '10px'}}>
            <Table aria-label="UsersTable">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows !== undefined ? (
                    rows.map((row, index) => (
                      <TableRow
                        key={`${row.id}${index}`}
                        sx={ { '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } } }
                        onClick={()=>{ router.push(`/users/${row.id_user}`)}}
                        >
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            >
                            <Chip
                              variant='outlined'
                              style={{ borderColor: '#547b0f' }}
                              label={row[column.id]}
                            />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow/>
                  )
                }
              </TableBody>
            </Table>
          </TableContainer>
          <div className={styles.tableFooter}>
            <Button
              onClick={openModal}
              className={styles.newUserBtn}
              sx={{
                color: '#ffffff',
                backgroundColor:'#547b0f',
                '&:hover': {
                  backgroundColor:'#6da41d'
                }
              }}
              variant="contained"
              startIcon={<AddCircleOutlineIcon/>}
            >
              CREAR USUARIO
            </Button>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
      </Card>
    </div>
  );
}

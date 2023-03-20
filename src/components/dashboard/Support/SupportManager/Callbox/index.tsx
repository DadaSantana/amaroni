//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../../redux/hooks/useAppSelector';
//import types and services
import { Support } from '../../../../../types/Support';
import * as SupportService from '../../../../../services/support';
//import table MUI
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
//import components 
import Box from '@mui/material/Box';
//import icons
import VisibilityIcon from '@mui/icons-material/Visibility';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { Content } from './styles';
import { Btn } from './styles';

type BtnProps = {
    id: string,
    fnEdit: (fnid?: string) => void,
    fnUpdate: () => void
}

const BtnAction = ({id, fnEdit, fnUpdate}:BtnProps) => {
    const handleViewCall = (id: string) => {
      fnEdit(id);
    }
  
    return(
        <Btn>
            <VisibilityIcon className='edit' onClick={() => {handleViewCall(id)}}/>
        </Btn>
    );
}

type Props = {
    fn: () => void
}

export const Callbox = ({fn}:Props) => {
    //get user redux
    const user = useAppSelector(state => state.user);
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };
    //Get attractions from firebase
    const [updateBtnState,setUpdateBtnState] = React.useState(false);
    const [call, setCall] = React.useState<Support[]>([]); 
    React.useEffect(()=>{
        handleClose();
        const getCall = async () => {      
            if (user.level.admin) {
                console.log(user.level.admin)
              setCall(await SupportService.getAllCalls());            
              return setOpen(false);
            } else {
              console.log(user.id)
              setCall(await SupportService.getCallByUserId(user.id));            
              return setOpen(false);
            }
        } 
        getCall();
    }, [updateBtnState]); 
    //column interface
    interface Column {
        id: 'date' | 'title' | 'progress' | 'user' | 'action';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
    }
    //column table
    const columns: Column[] = [
        { id: 'date', label: 'Data:', minWidth: 100 },
        { id: 'title', label: 'Oggetto della chiamata:', minWidth: 250 },
        {
          id: 'progress',
          label: 'Progress',
          minWidth: 200,
        },
        { id: 'user', label: 'Utente:', minWidth: 150 },
        {
          id: 'action',
          label: 'Azione',
          minWidth: 100,
          align: 'right',
        },
    ];
    //interface Data
    interface Data {
        date: string;
        title: string;
        progress: string;
        user: string;
        action: any;
    }
    //create Data
    function createData(
        date: string,
        title: string,
        progress: string,
        user: string,
        action: any
    ): Data {
        return { date, title, progress, user, action };
    }
    //create table
    const rows: Data[] = [];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(7);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleUpdateBtnState = () => {
        setUpdateBtnState(!updateBtnState);
    }
    //insert data from firebase support 
    call.forEach(element => {
        rows.push(createData(element.date, element.subject, element.progress, element.authorName, <BtnAction id={element.id} fnEdit={fn} fnUpdate={handleUpdateBtnState} />));
    });

    return(
        <Content>
            <Paper sx={{ width: '100%' }} >
              <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                      <TableRow style={{transform: 'translateY(-57px)'}}>
                      {columns.map((column) => (
                          <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ top: 57, minWidth: column.minWidth }}
                          >
                          {column.label}
                          </TableCell>
                      ))}
                      </TableRow>
                  </TableHead>
                  <TableBody className='table-body'>
                      {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                          return (
                          <TableRow className={row.progress} hover role="checkbox" tabIndex={-1} key={row.title}>
                              {columns.map((column) => {
                              const value = row[column.id];
                              return (
                                  <TableCell key={column.id} align={column.align}>
                                  {column.format && typeof value === 'number'
                                      ? column.format(value)
                                      : value}
                                  </TableCell>
                              );
                              })}
                          </TableRow>
                          );
                      })}
                  </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[7]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
        </Content>
    );
}
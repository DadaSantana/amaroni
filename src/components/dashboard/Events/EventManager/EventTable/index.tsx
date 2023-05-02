//import react
import * as React from 'react';
//import from libs
import { db } from '../../../../../libs/firebase';
//import services and types
import * as Annuncios from '../../../../../services/annuncios';
import { Annuncio } from '../../../../../types/Annuncio';
//import from Firebase
import { doc, deleteDoc } from "firebase/firestore";
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
//import icons
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Content, Btn } from './styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type Props = {
    en: boolean,
    fn: () => void
}
 

type BtnProps = {
    id: string,
    fnEdit: (fnid?: string) => void,
    fnUpdate: () => void
}

const BtnAction = ({id, fnEdit, fnUpdate}:BtnProps) => {

    const handleEditItem = (id: string) => {
      fnEdit(id);
    }
  
    const handleRemoveItem = async (id: string) => {
      let result = window.confirm("Vuoi davvero eliminare questa posizione?");
      if (result) {
        await deleteDoc(doc(db, "annuncios", id));
        fnUpdate();
      }     
    }
  
    return(
        <Btn>
            <EditIcon className='edit' onClick={() => {handleEditItem(id)}}/>
            <DeleteIcon className='remove' onClick={()=> {handleRemoveItem(id)}}/>
        </Btn>
    );
  }

export const EventTable = ({en, fn}:Props) => {
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };
    //Get all types of attractions
    const currencies = [
        {
            value: 'USD',
            label: 'Restaurante',
        },
        {
            value: 'EUR',
            label: 'Lazer',
        },
        {
            value: 'BTC',
            label: 'Mercado',
        },
        {
            value: 'JPY',
            label: 'Oficina',
        },
    ];

    //Creat table to show attractions
    interface Column {
        id: 'title' | 'action';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
      }
      
      const columns: Column[] = [
        { id: 'title', label: "Titolo dell'evento", minWidth: 250 },
        {
          id: 'action',
          label: 'Azione',
          minWidth: 100,
          align: 'right',
        },
      ];
      
      interface Data {
        title: string;
        action: any;
      }
      
      function createData(
        title: string,
        action: any
      ): Data {
        return { title, action };
      }

    const [getAnn,setGettAnn] = React.useState(false);
    const handleSetAnn = () => {
      setGettAnn(!getAnn);
    }
    //Get all annuncios from firebase
    const [ann, setAnn] = React.useState<Annuncio[]>([]); 
    React.useEffect(()=>{
        handleClose();
        const getAnn = async () => {            
            setAnn(await Annuncios.getAll());            
            return setOpen(false);
        } 
        
        getAnn();

    }, [getAnn]); 

    const rows: Data[] = [];
    
    ann.forEach(element => {
      rows.push(createData(element.name, <BtnAction id={element.id} fnEdit={fn} fnUpdate={handleSetAnn} />));
    });


      const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(7);
    
      const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    return(
        <Content>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Paper sx={{ width: '100%' }} className='table-content'>
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
                  <TableBody>
                      {rows
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => {
                          return (
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.title}>
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
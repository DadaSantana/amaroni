//import react
import * as React from 'react';
//import reducers from redux
import { useAppSelector } from '../../../../../redux/hooks/useAppSelector';
//import from libs
import { db } from '../../../../../libs/firebase';
//import services and types
import * as Attractions from '../../../../../services/attractions';
import { Attraction } from '../../../../../types/Attraction';
import { currencies } from '../index';
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
        await deleteDoc(doc(db, "attractions", id));
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

export const AttractionTable = ({en, fn}:Props) => {
    //get user redux
    const user = useAppSelector(state => state.user);
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };
    //Creat table to show attractions
    interface Column {
        id: 'name' | 'type' | 'address' | 'telephone' | 'author' | 'action';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
      }
      
      const columns: Column[] = [
        { id: 'name', label: 'Nome del luogo:', minWidth: 250 },
        { id: 'type', label: 'Tipo:', minWidth: 70 },
        {
          id: 'address',
          label: 'Indirizzo',
          minWidth: 200,
        },
        {
          id: 'telephone',
          label: 'Numero di telefono',
          minWidth: 70,
          align: 'right',
        },
        {
          id: 'author',
          label: 'Autore',
          minWidth: 100,
          align: 'right',
        },
        {
          id: 'action',
          label: 'Azione',
          minWidth: 100,
          align: 'right',
        },
      ];
      
      interface Data {
        name: string;
        type: string;
        address: string;
        telephone: string;
        author: string;
        action: any;
      }
      
      function createData(
        name: string,
        type: string,
        address: string,
        telephone: string,
        author: string,
        action: any
      ): Data {
        return { name, type, address, telephone, author, action };
      }

    const [getAtt,setGettAtt] = React.useState(false);
    const handleSetAtt = () => {
      setGettAtt(!getAtt);
    }
    //Get attractions from firebase
    const [att, setAtt] = React.useState<Attraction[]>([]); 
    React.useEffect(()=>{
        handleClose();
        const getAtt = async () => {      
            if (user.level.admin) {
              setAtt(await Attractions.getAll());            
              return setOpen(false);
            } else {
              console.log(user.id)
              setAtt(await Attractions.getAttByUser(user.id));            
              return setOpen(false);
            }
        } 
        
        getAtt();

    }, [getAtt]); 

    const rows: Data[] = [];
    
    att.forEach(element => {
      rows.push(createData(
        element.name, 
        element.type == 'Food' ? 'Dove Mangiare' :
        element.type == 'Square' ? 'Dove Dormire' :
        element.type == 'Marketplace' ? 'Associazioni' :
        element.type == 'Health' ? 'Salute' :
        element.type == 'Public Place' ? 'Luogo pubblico' : 'Tipo', 
        element.address,
        element.tel, 
        element.authorName, 
        <BtnAction id={element.id} fnEdit={fn} fnUpdate={handleSetAtt} />));
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

      const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        //create form data
        const formData =  new FormData(e.currentTarget);
        //get inputs value
        const name = formData.get('searchByName') as string;
        const type = formData.get('searchByType') as string;
      }

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
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.type}>
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
//import react
import * as React from 'react';
//import from libs
import { db } from '../../../../../libs/firebase';
//import services and types
import * as UserService from '../../../../../services/users';
import { Users } from '../../../../../types/Users';
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
import { Content, Btn, SelectInput } from './styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import KeyIcon from '@mui/icons-material/Key';
import BlockIcon from '@mui/icons-material/Block';
import SaveIcon from '@mui/icons-material/Save';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type BtnProps = {
    id: string,
    fnEdit: (fnid?: string) => void,
    fnUpdate: () => void,
    saveValue: boolean
}

const BtnAction = ({id, fnEdit, fnUpdate, saveValue}:BtnProps) => {

    const handleEditItem = (id: string) => {
      fnEdit(id);
    }
  
    const handleRemoveItem = async (id: string) => {
      let result = window.confirm("Deseja realmente exlcuir este local?");
      if (result) {
        await deleteDoc(doc(db, "annuncios", id));
        fnUpdate();
      }     
    }
  
    return(
        <Btn>
            <KeyIcon className='edit' onClick={() => {handleEditItem(id)}}/>     
            <BlockIcon className='block' onClick={()=> {handleRemoveItem(id)}}/>
            <SaveIcon className={saveValue ? 'save' : 'disable'}/>
        </Btn>
    );
}

type CurrentLevel = {
  current: string,
  id: string,
  name: string
}

const SelectLevel = ({current, id, name}:CurrentLevel) => {
  const currencies = [
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'member',
      label: 'Member',
    },
    {
      value: 'guest',
      label: 'Guest',
    }
  ];

  const handleUpdateUserLevel = async (id: string, name: string, level: string) => {
    await UserService.updateUserLevel(id,level);
    alert('As permissões para o usuário '+name+' foram atualizadas para '+level+'.');
  } 

  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
    <div>
      <TextField
        id="standard-select-currency"
        select  
        defaultValue={current}
        variant="standard"
        onChange={(e)=>{
          const level = e.target.value;
          handleUpdateUserLevel(id,name,level);
        }}
      >
        {currencies.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  </Box>
  );
}

type Props = {
    fn: () => void
}

export const UsersTable = ({fn}:Props) => {
    //Backdrop
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(!open);
    };

    //Creat table to show users
    interface Column {
        id: 'name' | 'email' | 'id' | 'level' | 'action';
        label: string;
        minWidth?: number;
        align?: 'right';
        format?: (value: number) => string;
      }
      
      const columns: Column[] = [
        { id: 'name', label: "User Name:", minWidth: 250 },
        { id: 'email', label: "User Email:", minWidth: 250 },
        { id: 'id', label: "UID:", minWidth: 150 },
        { id: 'level', label: "User Level:", minWidth: 150 },
        {
          id: 'action',
          label: 'Azione',
          minWidth: 100,
          align: 'right',
        },
      ];
      
      interface Data {
        name: string;
        email: string;
        id: string;
        level: any;
        action: any;
      }
      
      function createData(
        name: string,
        email: string,
        id: string,
        level: any,
        action: any
      ): Data {
        return { name, email, id, level, action };
      }

    const [getUsers,setGetUsers] = React.useState(false);
    const handleSetAnn = () => {
      setGetUsers(!getUsers);
    }
    //Get all annuncios from firebase
    const [users, setUsers] = React.useState<Users[]>([]); 
    const [userLevel, setUserLevel] = React.useState('')
    React.useEffect(()=>{
        handleClose();
        const getUsers = async () => {            
            setUsers(await UserService.getAll());
            return setOpen(false);
        } 
        
        getUsers();

    }, [getUsers]); 

    //create link between elements
    const [saveButtonState,setSaveButtonState] = React.useState(false);
    const handleSaveButtonState = () => {
      setSaveButtonState(true);
      console.log('mudou');
    }

    const rows: Data[] = [];
    
    users.forEach(element => {
      rows.push(createData(
        element.name, 
        element.email, 
        element.id, 
        <SelectLevel 
          current={
            element.levels.admin ? 'admin' :
            element.levels.member ? 'member' : 'guest'
          } 
          id={element.id}
          name={element.name}
        />,
        <BtnAction id={element.id} fnEdit={fn} fnUpdate={handleSetAnn} saveValue={saveButtonState} />));
    });

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
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
                          <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
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
                  rowsPerPageOptions={[5]}
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
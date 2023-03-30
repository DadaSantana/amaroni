//import react
import * as React from 'react';
//import from libs
import { db } from '../../../../../libs/firebase';
//import services and types
import * as UserService from '../../../../../services/users';
import * as AuthService from '../../../../../services/auth';
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
import { Content, Btn, SelectInput, Float } from './styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import KeyIcon from '@mui/icons-material/Key';
import BlockIcon from '@mui/icons-material/Block';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
//import components
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

type UserProps = {
  id: string,
  fn: () => void
}

const UserFloat = ({id, fn}:UserProps) => {
  const [user,setUser] = React.useState<Users>();
  const [loading,setLoading] = React.useState(true);

  React.useEffect(()=>{
    const getUser = async () => {
      setUser(await UserService.getUidData(id));
    }
    getUser();
  },[])

  React.useEffect(()=>{
    if (user != null) {
      setLoading(false);
    }
  },[user])

  return(
    <Float>
      <div className="user-content">
        {loading &&
        <CircularProgress className='progress' />
        }
        <div className='user-data'>

          {!loading && user != null &&
          <>
          <img src={user.photo} alt="" />
          <div className="user-details">
            <h4 style={{fontWeight: 'bold'}}>{user.name}</h4>
            <p><b>E-mail:</b> {user.email}</p>
            <p><b>Numero di telefono:</b> {user.phone}</p>
            <p>
              <b>Autorizzazioni:</b>              
              {
                user.levels.admin ? ' Amministratore' :
                user.levels.member ? ' Membro' : ' Ospite'
              }
            </p>
          </div>
          </>
          }
        </div>
        {!loading && user != null &&        
        <span onClick={fn}>Torna al menu precedente</span>
        }
      </div>
      
    </Float>
  );
}

type BtnProps = {
    id: string,
    fnEdit: (fnid?: string) => void,
    fnUpdate: () => void,
    saveValue: boolean
}

const BtnAction = ({id, fnEdit, fnUpdate, saveValue}:BtnProps) => {

    const handleSendRefinePassword = async (id: string) => {
      const userData = await UserService.getUidData(id);
      if (userData) {
        await AuthService.sendRedefinePassword(userData.email);
      }
    }

    const handleCloseUser = () => {
      setShowUser(false);
    }
  
    const handleRemoveItem = async (id: string) => {
      let result = window.confirm("Vuoi davvero eliminare questa posizione?");
      if (result) {
        await deleteDoc(doc(db, "annuncios", id));
        fnUpdate();
      }     
    }

    const [showUser,setShowUser] = React.useState(false)
  
    return(
        <Btn>
            {showUser &&
            <UserFloat id={id} fn={handleCloseUser} />
            }            
            <AssignmentIndIcon onClick={() => {setShowUser(true)}}/>
            <KeyIcon className='edit' onClick={() => {handleSendRefinePassword(id)}}/>     
            <BlockIcon className='block' onClick={()=> {handleRemoveItem(id)}}/>
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
        { id: 'name', label: "Nome utente:", minWidth: 250 },
        { id: 'email', label: "E-mail dell'utente:", minWidth: 250 },
        { id: 'id', label: "UID:", minWidth: 150 },
        { id: 'level', label: "Livello utente:", minWidth: 150 },
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
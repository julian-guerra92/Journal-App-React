import { useDispatch } from 'react-redux';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { startLogOut } from '../../store/auth';

export const NavBar = ({ drawerWidth = 240 }) => {

   const dispatch = useDispatch();

   const onLogout = () => {
      dispatch(startLogOut());
   }

   return (
      <AppBar
         position="fixed"
         sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
         }}
      >
         <Toolbar>
            <IconButton
               color='inherit'
               edge='start'
               sx={{ mr: 2, display: { md: 'none' } }}
            >
               <MenuOutlined />
            </IconButton>
            <Grid
               container
               direction='row'
               justifyContent='space-between'
               alignItems='center'
            >
               <Typography
                  variant='h6'
                  noWrap
                  component='div'
               >JournalApp
               </Typography>
               <IconButton color='error' onClick={onLogout}>
                  <LogoutOutlined />
               </IconButton>
            </Grid>
         </Toolbar>
      </AppBar>
   )
}

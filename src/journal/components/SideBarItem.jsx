import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TurnedInNot } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ note }) => {

   const dispatch = useDispatch();

   const newTitle = useMemo(() => {
      return note.title.length > 17
         ? note.title.substring(0, 17) + '...'
         : note.title;
   }, [note.title]);

   const onNoteSelected = () => {
      dispatch(setActiveNote(note));
   }

   return (
      <ListItem disablePadding onClick={onNoteSelected}>
         <ListItemButton>
            <ListItemIcon>
               <TurnedInNot />
            </ListItemIcon>
            <Grid container>
               <ListItemText primary={note.title} />
               <ListItemText secondary={note.body} />
            </Grid>
         </ListItemButton>
      </ListItem>
   )
}

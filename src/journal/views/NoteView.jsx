import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks';
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal';
import { ImageGallery } from '../components';

export const NoteView = () => {

   const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);

   const dispatch = useDispatch();

   const { body, title, date, onInputChange, formState } = useForm(note);

   const dateString = useMemo(() => {
      const newDate = new Date(date);
      return newDate.toDateString();
   }, [date])

   const fileInputRef = useRef();

   useEffect(() => {
      dispatch(setActiveNote(formState));
   }, [formState])

   useEffect(() => {
      if (messageSaved.length > 0) {
         Swal.fire('Updated Note', messageSaved, 'success');
      }
   }, [messageSaved])

   const onSaveNote = () => {
      dispatch(startSaveNote());
   }

   const onInputFileChange = ({ target }) => {
      if (target.files.length === 0) return;
      dispatch(startUploadingFiles(target.files));
   }

   const onDelete = () => {
      dispatch(startDeletingNote());
   }

   return (
      <Grid
         className='animate__animated animate__fadeIn animate__faster'
         container
         direction='row'
         justifyContent='space-between'
         sx={{ mb: 1 }}
      >

         <Grid item>
            <Typography fontSize={28} fontWeight='light'>{dateString}</Typography>
         </Grid>

         <Grid item>

            <input
               type="file"
               multiple
               ref={fileInputRef}
               onChange={onInputFileChange}
               style={{ display: 'none' }}
            />

            <Button
               color='primary'
               disabled={isSaving}
               onClick={() => fileInputRef.current.click()}
               sx={{ padding: 1, mb: 1, mr: 1 }}
            >
               <UploadOutlined sx={{ fontSize: 30, mr: 1 }} />
               Upload Images
            </Button>

            <Button
               disabled={isSaving}
               onClick={onSaveNote}
               color='primary'
               sx={{ padding: 1, mb: 1, mr: 1 }}
            >
               <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
               Save
            </Button>

            <Button
               disabled={isSaving}
               onClick={onDelete}
               color="error"
               sx={{ padding: 1, mb: 1, mr: 1 }}
            >
               <DeleteOutline sx={{ fontSize: 30, mr: 1 }} />
               Delete
            </Button>
         </Grid>

         <Grid container>
            <TextField
               type='text'
               variant='filled'
               fullWidth
               placeholder='Enter a Title'
               label='Title'
               sx={{ border: 'none', mb: 1 }}
               name="title"
               value={title}
               onChange={onInputChange}
            />

            <TextField
               type='text'
               variant='filled'
               fullWidth
               multiline
               placeholder='¿What happened today?'
               label='¿What happened today?'
               minRows={5}
               name="body"
               value={body}
               onChange={onInputChange}
            />
         </Grid>

         <ImageGallery images={note.imageUrls} />
      </Grid>
   )
}

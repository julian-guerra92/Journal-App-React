import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from '../../hooks';
import { startCreatingUserWithEmailPassword } from '../../store/auth';
import { AuthLayout } from '../layout/AuthLayout';

const formData = {
   email: '',
   password: '',
   displayName: ''
}

const formValidations = {
   email: [(value) => value.includes('@') && value.includes('.com'), 'Email not valid.'],
   password: [(value) => value.length >= 6, 'Password most be at least 6 characters.'],
   displayName: [(value) => value.length >= 1, 'Name is required.'],
}

export const RegisterPage = () => {

   const dispatch = useDispatch();

   const [formSubmitted, setFormSubmitted] = useState(false);

   const { status, errorMessage } = useSelector(state => state.auth);

   const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

   const {
      formState,
      onInputChange,
      displayName,
      email,
      password,
      isFormValid,
      displayNameValid,
      emailValid,
      passwordValid,

   } = useForm(formData, formValidations);

   const onSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true);
      if (!isFormValid) return;
      dispatch(startCreatingUserWithEmailPassword(formState));
   }

   return (
      <AuthLayout title='Create a Count'>
         <form onSubmit={onSubmit} className='animate__animated animate__fadeIn'>
            <Grid container>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Full Name"
                     type="text"
                     placeholder="Full Name"
                     fullWidth
                     name="displayName"
                     value={displayName}
                     onChange={onInputChange}
                     error={!!displayNameValid && formSubmitted}
                     helperText={formSubmitted && displayNameValid}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Email"
                     type="email"
                     placeholder="correo@google.com"
                     fullWidth
                     name="email"
                     value={email}
                     onChange={onInputChange}
                     error={!!emailValid && formSubmitted}
                     helperText={formSubmitted && emailValid}
                  />
               </Grid>

               <Grid item xs={12} sx={{ mt: 2 }}>
                  <TextField
                     label="Contraseña"
                     type="password"
                     placeholder="Password"
                     fullWidth
                     name="password"
                     value={password}
                     onChange={onInputChange}
                     error={!!passwordValid && formSubmitted}
                     helperText={formSubmitted && passwordValid}
                  />
               </Grid>

               <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                  <Grid
                     item
                     xs={12}
                     display={!!errorMessage ? '' : 'none'}
                  >
                     <Alert severity='error'>
                        {errorMessage}
                     </Alert>
                  </Grid>
                  <Grid item xs={12}>
                     <Button
                        variant="contained"
                        fullWidth
                        type='submit'
                        disabled={isCheckingAuthentication}
                     >
                        Create Count
                     </Button>
                  </Grid>
               </Grid>

               <Grid container direction="row" justifyContent="end">
                  <Typography sx={{ mr: 1 }}>¿Do you already have an account?</Typography>
                  <Link component={RouterLink} color="inherit" to="/auth/login">
                     Sign In
                  </Link>
               </Grid>

            </Grid>
         </form>
      </AuthLayout>
   )
}

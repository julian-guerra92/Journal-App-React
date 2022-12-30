import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { autehnticatedState, demoUser, initialState, notAutehnticatedState } from '../../fixtures/authFixtures';

describe('Pruebas en el authSlice', () => {

   test('Debe de regresar el estado inicial y llamarse "auth', () => {
      const state = authSlice.reducer(initialState, {});
      expect(authSlice.name).toBe('auth');
      expect(state).toEqual(initialState);
   })

   test('Debe de realizar la autenticación', () => {
      const state = authSlice.reducer(initialState, login(demoUser));
      expect(state).toEqual({
         status: 'authenticated',
         uid: demoUser.uid,
         email: demoUser.email,
         displayName: demoUser.displayName,
         photoURL: demoUser.photoURL,
         errorMessage: null,
      })
   })

   test('Debe de realizar el logout sin error', () => {
      const state = authSlice.reducer(autehnticatedState, logout());
      expect(state).toEqual({
         ...notAutehnticatedState,
         errorMessage: undefined,
      });
   })

   test('Debe de realizar el logout con mensaje de error', () => {
      const state = authSlice.reducer(autehnticatedState, logout('Error Message'));
      expect(state).toEqual({
         ...notAutehnticatedState,
         errorMessage: 'Error Message',
      });
   })

   test('Debe de cambiar el estado a "checkin"', () => {
      const state = authSlice.reducer(autehnticatedState, checkingCredentials());
      expect(state.status).toBe('checking');
   })

})
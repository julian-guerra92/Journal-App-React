import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from '../../../src/firebase/providers';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogOut } from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/journalSlice';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {

   const dispatch = jest.fn();
   beforeEach(() => jest.clearAllMocks());

   test('Debe de invocar el checkingCredentials', async () => {
      await checkingAuthentication()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
   })

   test('startGoogleSignIn debe de invocar checkingCredentials y login', async () => {
      const loginData = { ok: true, ...demoUser };
      await signInWithGoogle.mockResolvedValue(loginData);
      await startGoogleSignIn()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(loginData));
   })

   test('startGoogleSignIn debe de invocar checkingCredentials y logout con Error', async () => {
      const loginData = { ok: false, errorMessage: 'Un error en googleSingIn' };
      await signInWithGoogle.mockResolvedValue(loginData);
      await startGoogleSignIn()(dispatch);
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
   })

   test('startLoginWithEmailPassword debe de llamar checkingCredential y login - Éxito', async () => {
      const loginData = { ok: true, ...demoUser };
      const formData = { email: demoUser.email, password: '123456' };
      await loginWithEmailPassword.mockResolvedValue(loginData);
      await startLoginWithEmailPassword(formData)(dispatch);
      expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
      expect(dispatch).toHaveBeenCalledWith(login(demoUser));
   })

   test('startLogout debe de llamar logoutFireBase, clearNotes y logout', async () => {
      await startLogOut()(dispatch);
      expect(logoutFirebase).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
      expect(dispatch).toHaveBeenCalledWith(logout());
   })

})
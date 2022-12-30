export const initialState = {
   status: 'checking',
   uid: null,
   email: null,
   displayName: null,
   photoURL: null,
   errorMessage: null,
}

export const autehnticatedState = {
   status: 'authenticated',
   uid: '123ABC',
   email: 'demo@google.com',
   displayName: 'Demo User',
   photoURL: 'https://demo.jpg',
   errorMessage: null,
}

export const notAutehnticatedState = {
   status: 'not-authenticated',
   uid: null,
   email: null,
   displayName: null,
   photoURL: null,
   errorMessage: null,
}

export const demoUser = {
   uid: '123ABC',
   email: 'demo@google.com',
   displayName: 'Demo User',
   photoURL: 'https://demo.jpg'
}
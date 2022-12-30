import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
   cloud_name: 'dwhvmsbsc',
   api_key: '822116636488264',
   api_secret: 'XJERc4XsQatZyxJn2RZuFbTLlns',
   secure: true
})

describe('Pruebas en fileUpload', () => {

   test('Debe de subir el archivo correctamente a Cloudinary', async () => {
      const imageUrl = 'https://thumbs.dreamstime.com/b/paisajes-de-yosemite-46208063.jpg';
      const resp = await fetch(imageUrl);
      const blob = await resp.blob();
      const file = new File([blob], 'foto.jpg');
      const url = await fileUpload(file);
      expect(typeof url).toBe('string');
      const segments = url.split('/');
      const imageId = segments[segments.length - 1].replace('.jpg', '');
      await cloudinary.api.delete_resources(['journal-app/' + imageId], {
         resource_type: 'image'
      });
   })

   test('Debe de retornar null', async () => {
      const file = new File([], 'foto.jpg');
      const url = await fileUpload(file);
      expect(url).toBe(null);
   })

})
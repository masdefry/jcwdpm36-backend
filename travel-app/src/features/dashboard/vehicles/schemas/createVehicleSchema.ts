import * as Yup from 'yup';

export const createVehicleSchema = Yup.object().shape({
  type: Yup.string().required('Vehicle type is required'),
  totalSeat: Yup.number()
    .min(1, 'Total seat have minimum value is 1')
    .max(50, 'Total seat have minimum value is 50')
    .required('Total seat is required'),
  vehicleImages: Yup.array()
    .min(1, 'Select minimum 1 file')
    .max(3, 'Select maximum 3 files only')
    .of(
      Yup.mixed<File>()
        .test('filesize', 'Maximum file size is 2mb', (file) => {
          if (!file) return false;
          return file?.size < 2 * 1024 * 1024;
        })
        .test('formatFile', 'Format file not acceptable', (file) => {
          const acceptedFiles = ['webp', 'jpg', 'jpeg', 'png'];
          if (!file) return false;

          const fileNameLength = file?.name.split('.').length;
          const fileExtension = file?.name.split('.')[fileNameLength - 1];

          return acceptedFiles.includes(fileExtension);
        })
    ),
});

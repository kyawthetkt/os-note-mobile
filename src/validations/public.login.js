import * as Yup from 'yup';

export default Yup.object().shape({
  phone: Yup.string().required('This is required.'),
  password: Yup.string()
    .required('This is required.')
    .min(6, 'Betweem 6 and 20')
    .max(20, 'Betweem 6 and 20'),
});

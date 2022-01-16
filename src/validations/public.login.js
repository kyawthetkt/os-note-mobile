import * as Yup from 'yup';
import {validationLabelGrp} from '@label';

export default Yup.object().shape({
  phone: Yup.string().required(validationLabelGrp.required),
  password: Yup.string()
    .required(validationLabelGrp.required)
    .min(6, validationLabelGrp.betweemLetter(6, 20))
    .max(20, validationLabelGrp.betweemLetter(6, 20)),
});

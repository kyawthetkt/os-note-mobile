import * as Yup from 'yup';
import {validationLabelGrp} from '@label';

export default Yup.object().shape({
  password: Yup.string()
    .required(validationLabelGrp.required)
    .min(6, validationLabelGrp.minLetter(6))
    .max(20, validationLabelGrp.maxLetter(20)),
  confirm_password: Yup.string()
    .required(validationLabelGrp.required)
    .min(6, validationLabelGrp.minLetter(6))
    .max(20, validationLabelGrp.maxLetter(20))
    .test('passwords-match', validationLabelGrp.samePassword, function (value) {
      return this.parent.password === value;
    }),
});

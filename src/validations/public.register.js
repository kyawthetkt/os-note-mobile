import * as Yup from 'yup';
import {validationLabelGrp} from '@label';

export default Yup.object().shape({
  name: Yup.string().required(validationLabelGrp.required),
  email: Yup.string().optional().email(validationLabelGrp.invalidEmailFormat),
  phone: Yup.string().required(validationLabelGrp.required),
  confirm_phone: Yup.string()
    .required(validationLabelGrp.required)
    .test('phone-match', validationLabelGrp.samePhone, function (value) {
      return this.parent.phone === value;
    }),
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
  accept_tos: Yup.boolean().oneOf(
    [true],
    validationLabelGrp.acceptTermAndCondition,
  ),
});

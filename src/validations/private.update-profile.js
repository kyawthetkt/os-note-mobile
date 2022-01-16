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
});

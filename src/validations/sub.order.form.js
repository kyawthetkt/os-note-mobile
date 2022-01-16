import * as Yup from 'yup';
import {validationLabelGrp} from '@label';

export default Yup.object().shape({
  name: Yup.string().required(validationLabelGrp.required),
  size: Yup.string(),
  color: Yup.string(),
  quantity: Yup.string()
    // .typeError(validationLabelGrp.numberOnly)
    .required(validationLabelGrp.required),
  sub_total_price: Yup.string()
    // .typeError(validationLabelGrp.numberOnly)
    .required(validationLabelGrp.required),
  // shop_name: Yup.string().required(required),
  // customer_name: Yup.string().required(required),

  // delivery_fee: Yup.number().typeError(numberOnly),

  // ordered_at: Yup.string().when('status', {
  //   is: val => val == 'ORDERED' || val == 'DELIVERED' || val == 'COMPLETE',
  //   then: Yup.string().required(required),
  // }),

  // delivered_at: Yup.string().when('status', {
  //   is: val => val == 'DELIVERED' || val == 'COMPLETE',
  //   then: Yup.string().required(required),
  // }),

  // complete_at: Yup.string().when('status', {
  //   is: 'COMPLETE',
  //   then: Yup.string().required(required),
  // }),
});

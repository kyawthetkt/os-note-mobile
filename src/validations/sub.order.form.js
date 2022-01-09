import * as Yup from 'yup';

const required = 'ဖြည့်ရန်လိုအပ်ပါသည်';
const numberOnly = 'နံပါတ်သာ';

export default Yup.object().shape({
  name: Yup.string().required(required),
  size: Yup.string(),
  color: Yup.string(),
  quantity: Yup.number().typeError(numberOnly).required(required),
  sub_total_price: Yup.number().typeError(numberOnly).required(required),
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

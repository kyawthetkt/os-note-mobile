import * as Yup from 'yup';
import {validationLabelGrp} from '@label';

export const mainOrderFormSchema = Yup.object().shape({
  product_detail: Yup.array().min(1, validationLabelGrp.required), //Yup.array().length(1, validationLabelGrp.required),
  // .of(
  //   Yup.object().shape({
  //     name: Yup.string().required(required),
  //     size: Yup.string(),
  //     color: Yup.string(),
  //     quantity: Yup.number().typeError(navigationLabelGrp.numberOnly).required(required),
  //     sub_total_price: Yup.number().typeError(navigationLabelGrp.numberOnly).required(required),
  //   }),
  // )
  // .required(required),
  shop_name: Yup.string().required(validationLabelGrp.required),
  customer_name: Yup.string().required(validationLabelGrp.required),

  // delivery_fee: Yup.number()
  //   .notRequired()
  //   .typeError(validationLabelGrp.numberOnly),

  ordered_at: Yup.string().when('status', {
    is: val => val === 'ORDERED' || val === 'DELIVERED' || val === 'COMPLETE',
    then: Yup.string().required(validationLabelGrp.required),
  }),

  delivered_at: Yup.string().when('status', {
    is: val => val === 'DELIVERED' || val === 'COMPLETE',
    then: Yup.string().required(validationLabelGrp.required),
  }),

  complete_at: Yup.string().when('status', {
    is: 'COMPLETE',
    then: Yup.string().required(validationLabelGrp.required),
  }),
});

export const subOrderFormSchema = Yup.object().shape({
  name: Yup.string().required(validationLabelGrp.required),
  color: Yup.string(),
  size: Yup.string(),
  quantity: Yup.number()
    .typeError(validationLabelGrp.numberOnly)
    .required(validationLabelGrp.required),
  sub_total_price: Yup.number()
    .typeError(validationLabelGrp.numberOnly)
    .required(validationLabelGrp.required),
});

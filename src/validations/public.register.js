import * as Yup from 'yup';

const required = 'ဖြည့်ရန်လိုအပ်ပါသည်';
const samePassword = 'Password တူညီစွာဖြည့်ပါ';
const samePhone = 'Phone No. တူညီစွာဖြည့်ပါ';
const invalidEmailFormat = 'အီးမေးလ် Format မမှန်ပါ';
const acceptTermAndCondition = 'လက်ခံရန်လိုအပ်ပါသည်';

export default Yup.object().shape({
  name: Yup.string().required(required),
  email: Yup.string().optional().email(invalidEmailFormat),
  phone: Yup.string().required(required),
  confirm_phone: Yup.string()
    .required(required)
    .test('phone-match', samePhone, function (value) {
      return this.parent.phone === value;
    }),
  password: Yup.string().required(required).min(6, 'Min 6').max(20, 'Max 20'),
  confirm_password: Yup.string()
    .required(required)
    .min(6, 'Min 6')
    .max(20, 'Max 20')
    .test('passwords-match', samePassword, function (value) {
      return this.parent.password === value;
    }),
  accept_tos: Yup.boolean().oneOf([true], acceptTermAndCondition),
});

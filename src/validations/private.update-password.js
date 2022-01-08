import * as Yup from 'yup';

const required = 'ဖြည့်ရန်လိုအပ်ပါသည်';
const samePassword = 'Password တူညီစွာဖြည့်ပါ';

export default Yup.object().shape({
  password: Yup.string().required(required).min(6, 'Min 6').max(20, 'Max 20'),
  confirm_password: Yup.string()
    .required(required)
    .min(6, 'Min 6')
    .max(20, 'Max 20')
    .test('passwords-match', samePassword, function (value) {
      return this.parent.password === value;
    }),
});

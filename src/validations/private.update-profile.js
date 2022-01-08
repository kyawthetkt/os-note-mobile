import * as Yup from 'yup';

const required = 'ဖြည့်ရန်လိုအပ်ပါသည်';
const samePhone = 'Phone No. တူညီစွာဖြည့်ပါ';
const invalidEmailFormat = 'အီးမေးလ် Format မမှန်ပါ';

export default Yup.object().shape({
  name: Yup.string().required(required),
  email: Yup.string().optional().email(invalidEmailFormat),
  phone: Yup.string().required(required),
  confirm_phone: Yup.string()
    .required(required)
    .test('phone-match', samePhone, function (value) {
      return this.parent.phone === value;
    }),
});

export const validationLabelGrp = {
  required: 'ဖြည့်ရန်လိုအပ်ပါသည်',
  numberOnly: 'နံပါတ်သာ',
  samePassword: 'စကားဝှက် တူညီစွာဖြည့်ပါ',
  samePhone: 'ဖုန်းနံပါတ် တူညီစွာဖြည့်ပါ',
  invalidEmailFormat: 'အီးမေးလ်ပုံစံ မမှန်ပါ',
  acceptTermAndCondition: 'လက်ခံရန်လိုအပ်ပါသည်',
  betweemLetter: function (min, max) {
    return 'စာလုံးအရေအတွက် (' + min + ') နှင့် (' + max + ')ကြားရိုက်ထည့်ပါ။';
  },
  minLetter: function (counter) {
    return 'အနည်းဆုံး(' + counter + ')လုံးရိုက်ထည့်ပါ။';
  },
  maxLetter: function (counter) {
    return 'အများဆုံး(' + counter + ')လုံးရိုက်ထည့်ပါ။';
  },
};

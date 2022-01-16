export const orderLabelGrp = {
  switchOrderStatus: function (orderStatus) {
    if (orderStatus === 'ORDERED') {
      return 'မှာယူအခြေအနေ';
    }
    if (orderStatus === 'DELIVERED') {
      return 'ပို့ဆောင်အခြေအနေ';
    }
    return 'အောင်မြင်အခြေအနေ';
  },
  switchOrderDateStatus: function (orderStatus) {
    if (orderStatus === 'ORDERED') {
      return 'မှာယူသောနေ့';
    }
    if (orderStatus === 'DELIVERED') {
      return 'ပို့ဆောင်သောနေ့';
    }
    return 'အောင်မြင်သောနေ့';
  },
  switchDeliveryMethod: function (method) {
    if (method === 'BY_COURIER') {
      return 'Delivery ကုမ္ပဏီဖြင့်';
    }
    if (method === 'BY_BUS') {
      return 'ဘက်စကားဖြင့်';
    }
    return 'အခြားနည်းလမ်းဖြင့်';
  },
  searchLabel: 'ရှာဖွေမည်',
  totalOrderCount: 'စုစုပေါင်း', //*
  deliveredOrderCount: 'ပို့ဆောင်ထားသောအော်ဒါများ',
  orderedOrderCount: 'အော်ဒါအသစ်များ',
  completeOrderCount: 'အောင်မြင်သောအော်ဒါများ',
  shopName: 'ဆိုင်အမည် ', //*
  shopDescription: 'ဆိုင်အကြောင်း(လိပ်စာ, ဖုန်းနံပါတ်) ',
  customerName: 'ဝယ်သူအမည် ', //*
  customerPhone: 'ဝယ်သူဖုန်း ',
  customerAddress: 'ဝယ်သူလိပ်စာ ',
  orderedDate: 'မှာယူသောနေ့ ', //*
  deliveredDate: 'ပို့ဆောင်သောနေ့ ',
  completeDate: 'အောင်မြင်သောနေ့',
  deliveryType: 'ပို့ဆောင်မှုနည်းလမ်း ',
  deliveryFee: 'ပို့ဆောင်ခ',
  status: 'အခြေအနေ',
  remark: 'မှတ်ချက်',
  attachmentFile: 'Attched Files',
  voucher: 'ဘောင်ချာ',
  subOrderName: 'ပစ္စည်းအမည်',
  subOrderSize: 'ဆိုဒ်',
  subOrderColor: 'အရောင်',
  subOrderQuantity: 'အရေအတွက်',
  subOrderSubTotalAmount: 'စုစုပေါင်း ကျသင့်ငွေ',
  subOrderList: 'အော်ဒါများ',
  editOrderLabel: 'ပြင်ဆင်မည်',
  deleteOrderLabel: 'ဖျကိမည်',
  saveButtonLabel: 'သိမ်းဆည်းမည်',
  totalAmount: 'စုစုပေါင်း ကျသင့်ငွေ',
  createNewOrder: 'အော်ဒါအသစ်ထည့်မည်',
  quantity: 'အရေအတွက်',
  subTotalAmount: 'စုစုပေါင်း ကျသင့်ငွေ',
  emptyOrderDetailText: 'အော်ဒါများမရှိပါ',
  saveOrderDetail: 'အော်ဒါသိမ်းဆည်းမည်',
  paginationNextLabel: 'နောက်သို့',
  paginationPreviousLabel: 'ရှေ့သို့',
  noOrderFoundLabel: 'အော်ဒါများမရှိသေးပါ',
  pleaseWaitLabel: 'ကျေးဇူးပြု၍စောင့်ပါ',
};

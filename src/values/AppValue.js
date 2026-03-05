/**
 * @author: lai van
 * @date: 2018-12-10 20:34:48
 *  code-push-standalone release-react opvshop android --mandatory --rollout 100 --deploymentName Staging 
 *  code-push-standalone release-react Sonha-i  ios --mandatory --rollout 100 --deploymentName Staging 
┌────────────┬────────────────────────────────────────┐
│ Name       │ Deployment Key                         │
├────────────┼────────────────────────────────────────┤
│ Production │ 6dkAuFoUi0ilo9sEeqyMsadc3lu34kZcJfI2Ze │
├────────────┼────────────────────────────────────────┤
│ Staging    │ bROcoX1vm46QydjZDn6eBDW4nY1-4kZcJfI2Ze │
└────────────┴────────────────────────────────────────┘
 * /////////////TEST copdepush 9.5 / thật  1.0
 */

const MODEAPP = 'R'; //R/
export default {
  disableYellowBox: true, // MODEAPP == 'R' ? true : false, // hide warning eror
  API_URL:
    MODEAPP === 'R'
      ? 'http://dms.opv.vn:9999/ServiceShop/ServiceShop.asmx'
      : 'http://113.163.141.21:9999/OPVSHOP/ServiceShop.asmx',

  MODE: MODEAPP,
  VSAPPINFO: {
    vs_code: 20240524,
    vs_name: '1.1',
    puclic_day: '2024-05-26.2',
  },
  Size_Font_Large: 18,
  Size_Font: 17,
  Size_Font_Small: 16, 
  NoImagUrl: 'http://118.69.168.124:8089/AnhChupPDA/VifonShop/sanpham/NA',
  NoImagUrl2: 'http://118.69.168.124:8089/AnhChupPDA/VifonShop/sanpham/NOIMAGEGESO',
  ListTypeGift: [
    { id: 1, label: 'Voucher tiền mặt' },
    { id: 2, label: 'Giftset  ' },
    { id: 3, label: 'Combo  ' },
    { id: 4, label: 'Thẻ balance  ' },
    { id: 5, label: 'Thẻ điện thoại ' },
    { id: 7, label: 'Thẻ điểm ' },
    { id: 8, label: 'Topup điểm ' },
    { id: 9, label: 'Vật lý  ' },
    { id: 10, label: 'Item (Sản phẩm cụ thể)' },
    { id: 11, label: 'Voucher khuyến mãi' },
    { id: 12, label: 'Bảo hiểm ' },
    { id: 14, label: 'Lượt quay số ' },
    { id: 15, label: 'Premium Service ' },
    { id: 16, label: 'Deal  ' },
    { id: 19, label: 'Link quà UrCard ' },
  ]
};

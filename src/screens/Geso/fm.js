import 'intl';
import 'intl/locale-data/jsonp/en';
const formatter = new Intl.NumberFormat('de-DE'
// , {
//     style: 'currency',
//     currency: 'VND',
//     minimumFractionDigits: 2,
//     // the default value for minimumFractionDigits depends on the currency
//     // and is usually already 2
// }
);

export default formatter;
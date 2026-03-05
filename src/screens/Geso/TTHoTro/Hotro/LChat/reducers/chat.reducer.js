
const initState = {
  test: 0,
  messages: [
   
  ],
  maxsms: 1000,
  isnewnotify: false,
  isnewnotifywebtintuc: false,
  isScrenchatactive: false,
};
let listmsg; 
export default function (state = initState, action) {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: 10,
      };
    case 'SetisScrenchatactive':
    {
      return {
        ...state,
        isScrenchatactive: action.isScrenchatactive,
      }; 
    }
    case 'reviceSmS':
      if (action.loai == '2') {
        return {
          ...state,
          isnewnotifywebtintuc: true,

        };
      } else {
        const sms = action.messages;
        sms._id = state.maxsms - 1;
        //alert(state.isScrenchatactive)
        if (state.isScrenchatactive)
               
        {return {
          ...state,
          messages: [sms, ...state.messages,],
          maxsms: (state.maxsms - 1),
          //isnewnotify: true
          //[...state.arr, action.newItem]
        };}
        else
        {return {
          ...state,
          isnewnotify: true,
          //[...state.arr, action.newItem]
        };}
      }

    case 'onSend':
      return {
        ...state,
        messages: action.messages,

        //[...state.arr, action.newItem]
      };
    case 'setnotify':
      return {
        ...state,
        isnewnotify: action.setnotify,
        //[...state.arr, action.newItem]
      };
    case 'setnotify2':
      return {
        ...state,
        isnewnotifywebtintuc: action.setnotify,
        //[...state.arr, action.newItem]
      };
    case 'MessageList':
      listmsg = [];
      action.data.map((item,index) => {
        const x = {
          _id: index,//state.maxsms + index,
          text: item.message,
          createdAt: item.thoidiem ,
         // image:'',//item.messageImage !== 'http://dms1.bibica.com.vn:8084/AnhChupBibicaShop/message/'? item.messageImage: '',
          user: {
            _id: item.nvId+'',//,item.type == 0 ? 'ttnt' : item.nvId + '',
            name: item.nvTen,
            avatar: item.type == 1?'http://118.69.168.124:8089/AnhChupPDA/VifonShop/lg.png':'http://118.69.168.124:8089/AnhChupPDA/VifonShop/lg.png', //item.nvImage !== 'http://dms1.bibica.com.vn:8084/AnhChupBibicaShop/message/NOIMAGEGESO'?item.nvImage:'https://placeimg.com/140/140/any',
          },
         
        };
        listmsg.push(x);
      });
      //console.log( 'xxxxxxxxxxxxx:'+listmsg);
      return {
        ...state,
        messages: listmsg,
        maxsms: (state.maxsms - listmsg.length),
      };
    default:
      return state;
  }
}

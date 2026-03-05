
const initState = {
  test: 0,
  page: 'HomeScreen',
  searchKeyword: '',
  Listgiohang: [],
  tongtien: 0,
  appKm: true,
  Iddonhang: null,
  DiemTLKH: 0,
  ListVideo: []
};

export default function (state = initState, action) {
  switch (action.type) {
    case 'test':
      return {
        ...state,
        test: 10,
      };

    case 'gotab':
      return {
        ...state,
        page: action.tabname,
      };
    case 'searchKeyword':
      return {
        ...state,
        searchKeyword: action.searchKeyword,
      };
    case 'setDiemTLKH':
      return {
        ...state,
        DiemTLKH: action.DiemTLKH,
      };
    case 'themspgiohang':
      const x = state.Listgiohang.filter((w) => w.pk_seq !== action.sanpham.pk_seq);
      return {
        ...state,
        Listgiohang: [...x, action.sanpham,],

      };
    case 'HuyUpdateDonhang':
      return {
        ...state,
        Listgiohang: [],
        Iddonhang: null,//action.Iddonhang
      };
    case 'xoaspgiohang':
      const sp = state.Listgiohang.filter((w) => w.pk_seq !== action.pk_seq);

      return {
        ...state,
        Listgiohang: sp,
      };
    case 'addsoluong':
      let sptam = state.Listgiohang;
      sptam.map((s) => {
        if (s.pk_seq == action.pk_seq) {
          s.soluong++;
        }
      });
      return {
        ...state,
        Listgiohang: sptam,
      };
    case 'trusoluong':
      sptam = state.Listgiohang;
      sptam.map((s) => {
        if (s.pk_seq == action.pk_seq) {
          s.soluong--;
          if (s.soluong < 1) { s.soluong = 1; }
        }
      });
      return {
        ...state,
        Listgiohang: sptam,
      };
    case 'addsoluonginput':
      sptam = state.Listgiohang;
      sptam.map((s) => {
        if (s.pk_seq == action.pk_seq) {
          s.soluong = action.soluong;
          //if (s.soluong < 1)
          //  s.soluong = 1
        }
      });
      return {
        ...state,
        Listgiohang: sptam,
      };

    case 'tinhtien':
      let tt = 0;
      sptam = state.Listgiohang;
      sptam.map((s) => {
        tt += s.soluong * s.dongia;
      });


      return {
        ...state,
        tongtien: tt,
        appKm: true,
      };
    case 'AppKMDH':
      return {
        ...state,
        appKm: false,
      };
    case 'Createdonhang':
      return {
        ...state,
        Listgiohang: [],
        appKm: true,
        Iddonhang: null,
        searchKeyword: '',
      };
    case 'addIddonhang':
      return {
        ...state,
        Iddonhang: action.Iddonhang,
      };
    case 'addKMToStore':
      return {
        ...state,
        CtkmList: action.CtkmList,
      };
    case 'setListVideo':
      return {
        ...state,
        ListVideo: action.ListVideo,
      };
    case 'updateItemListVideo':
      let vd = state.Listgiohang;
      let index =vd.findIndex(r=>r.id=action.item.id)  
      vd[index].daxem = 1

      return {
        ...state,
        ListVideo: vd,
      };
    default:
      return state;
  }
}

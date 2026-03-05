
import { StatusBar, } from 'react-native';
import { Navigation, } from 'react-native-navigation';
import IDs from './ScreenIDs';
import HomeScreen from './Geso/home';
import MarketScreen from './market';
import TradeScreen from './trade';
import FundScreen from './fund';
import AccountScreen from './account';
import LoginScreen from './login';
import OverlayComponent from './overlay';
import RegisterUser from './Geso/customers/create/CreateContainer';
import LoginGeso from './Geso/login';
import SplashScreen from './Geso/SplashScreen';

import SearchScreen from './Geso/search';
import SearchScreenGift from './Geso/SearchScreenGift';

import ChitietSP from './Geso/ChitietSP/ChitietSP.contain';
import KmScreen from './Geso/KM';
import Allnhom from './Geso/AllNhom';
import Profile from  './Geso/Profile/Profile';
import ListDH from './Geso/ListDH';
import DonHangChiTiet from './Geso/Donhang';
import TTTK from './Geso/TTTK';
import Giohang from './Geso/Giohang/Giohang';
import TTHotro from './Geso/TTHoTro'
import ChatLive from './Geso/TTHoTro/Hotro'
import KhaoSat from './Geso/TTHoTro/Khaosat'
import TraloiKSTT from './Geso/TTHoTro/Khaosat/TraloiKS'
import ViewVideo from './Geso/TTHoTro/VideoView/ViewVideo'
import ThongBaoKM from './Geso/ThongBao'
import Notify from '../utils/Notify';
import ViewDetailPromotion from './Geso/ViewDetailPromotion'
import ViewDetailGift from './Geso/ViewDetailGift'

import ViewDetailTL from './Geso/ViewDetailTL'
import NhomSp from './Geso/NhomSp'
import ViewDetailTB from './Geso/ViewDetailTB';
import XemThongbao from './Geso/XemThongbao';
import XemWebFile from './Geso/XemWebFile'
import ScanQrcode from './Geso/ScanQrcode'
import TaoPhieuQrcode from './Geso/TaoPhieuQrcode/Giohang'
import Quatang from './Geso/Quatang'
import ChitietGQuaTang from './Geso/ChitietGQuaTang'
import MyGift from './Geso/MyGift'
import ListSuDiem from './Geso/ListSuDiem'
import UpdateAddressCus from './Geso/UpdateAddressCus'
import CttbScene from './Geso/ChupHinhTb/index';
import SceneQuaOPV from './Geso/SceneQuaOPV/index';
import QuenMatKhau from './Geso/QuenMatKhau/index';
import SceneTl from './Geso/SceneTl/index';

const screens = {
  [IDs.ListSuDiem]: ListSuDiem,
  [IDs.MyGift]: MyGift,
  [IDs.ChitietGQuaTang]: ChitietGQuaTang,
  [IDs.Quatang]: Quatang,
  [IDs.TaoPhieuQrcode]: TaoPhieuQrcode,
  [IDs.ScanQrcode]: ScanQrcode,
  [IDs.Home]: HomeScreen,
  [IDs.Market]: MarketScreen,
  [IDs.Trade]: TradeScreen,
  [IDs.Fund]: FundScreen,
  [IDs.Account]: AccountScreen,
  [IDs.Login]: LoginScreen,
  [IDs.OverlayComponent]: OverlayComponent,
  [IDs.RegisterUser]: RegisterUser,
  [IDs.LoginGeso]: LoginGeso,
  [IDs.SplashScreen]: SplashScreen,
  [IDs.SearchScreen]: SearchScreen,
  [IDs.SearchScreenGift]: SearchScreenGift,
  
  [IDs.ChitietSP]: ChitietSP,
  [IDs.KmScreen]: KmScreen,
  [IDs.Allnhom]: Allnhom,
  [IDs.Profile]: Profile,
  [IDs.ListDH]:ListDH,
  [IDs.DonhangChitiet]:DonHangChiTiet,
  [IDs.TTTK]:TTTK,
  [IDs.Giohang]:Giohang,
  ///Trung tam ho tro
  [IDs.TTHotro]:TTHotro,
  [IDs.ViewVideo]:ViewVideo,
  [IDs.ChatLive]:ChatLive,
  [IDs.Khaosat]:KhaoSat,
  [IDs.TraloiKSTT]:TraloiKSTT,

  ///Chat cũ bỏ đi tách thành tt hỗ trợ


  [IDs.ThongBaoKM]:ThongBaoKM,
  [IDs.Notify]:Notify,
  [IDs.ViewDetailPromotion]:ViewDetailPromotion,
  [IDs.ViewDetailGift]:ViewDetailGift,
  [IDs.NhomSp]:NhomSp,
  [IDs.ViewDetailTL]:ViewDetailTL,
  [IDs.ViewDetailTB]:ViewDetailTB,
  [IDs.XemThongbao]:XemThongbao,
  [IDs.XemWebFile]:XemWebFile,
  [IDs.UpdateAddressCus]:UpdateAddressCus,
  [IDs.CttbScene]:CttbScene,
  [IDs.SceneQuaOPV]:SceneQuaOPV,
  [IDs.QuenMatKhau]:QuenMatKhau,
  [IDs.SceneTl]:SceneTl,
  
  
};

const registerScreens = (enhancers: Function = (a) => a, store: Object, Provider: Object) => {
  // Loop through the array and register every screen in it.
  Object.keys(screens).map((screenID) => {
    Navigation.registerComponentWithRedux(screenID, () => enhancers(screens[screenID]), Provider, store);
    // Navigation.registerComponent(screenID, () => enhancers(screens[screenID]), store, Provider);
  });
};

// const registerScreens = (store: Object, Provider: Object) => {
//   Navigation.registerComponentWithRedux(ScreenIDs.Home, ()=> HomeScreen, Provider, store);
// }

StatusBar.setBarStyle('light-content');

export { registerScreens, IDs };
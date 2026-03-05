/**
 * @author: Lai.do
 * @date: 2018-12-07 22:50:58 
 *  
 * 
 */
import {Navigation,} from 'react-native-navigation';
import { Platform}from 'react-native'
import { IDs, } from '../screens';
import { Fonts, Colors, } from '../theme';
import ScreenIDs from '../screens/ScreenIDs';
import { Icon } from 'react-native-vector-icons/FontAwesome';

const showCommonDialog = ({
  title,
  desc,
  cancelText,
  submitText,
  onCancel,
  onSubmit,
  renderContent,
  tapToDismiss = true,
}) => {
  Navigation.showOverlay({
    component: {
      id:'1',
      name: IDs.OverlayComponent,
      passProps: {
        tapToDismiss,
        title,
        desc,
        cancelText,
        submitText,
        onCancel,
        onSubmit,
        renderContent,

      },
      options: {
        overlay: {
          interceptTouchOutside: false,
          shouldShow: true
        },
        layout: {
          backgroundColor:'transparent',
          componentBackgroundColor: 'transparent',
  
        },
      },
    },
  });
};

const dismissOverlay = (componentID) => {
  Navigation.dismissOverlay(componentID);
};

const showModal = (params) => {
  Navigation.showModal({
    stack: {
      children: [{
        component: {
          options: {
            topBar: {
              visible: false,
            },
          },
          ...params,
        },
      },],
    },
  });
};

const dismissModal = (componentID) => {
  Navigation.dismissModal(componentID);
};
const dismissAllModals=()=>{
  Navigation.dismissAllModals();
};

const changeTab = (tabIndex) => {
  Navigation.mergeOptions('BottomTabsId', {
    bottomTabs: {
      currentTabIndex: tabIndex,
    },
  });
};
const changeBage = (number,ScreenIDs='Giohang') => {
  if(!isNaN(number) )
  Navigation.mergeOptions(ScreenIDs, {
    bottomTab: {
      badge:parseInt(number) <=0 ?  '' :number+'',
      badgeColor: 'red',
    },
  });
};

const setDefaultOptions = () => {
  Navigation.setDefaultOptions({
    topBar: {
      buttonColor: '#fff',
     // visible: Platform.OS=='android'?true:false,
      background: {
        color: Colors.backgroundL1,
      },
      title: {
        color: '#fff',
        fontFamily: Fonts.Default.bold,
      },
      backButton: {
        color: '#fff',     
      },
    },
    layout: {
      backgroundColor: Colors.backgroundL3,
      orientation: ['portrait'],
    },
    bottomTab: {
      iconColor: Colors.blurWhite,
      textColor: Colors.blurWhite,
      
      selectedTextColor: Colors.selectedColor,
      fontFamily: Fonts.Default.regular,
    },
    bottomTabs: {
      titleDisplayMode: 'alwaysShow',
      hideOnScroll: true,
      backgroundColor: Colors.backgroundL1,
    },
    // setDefaultOptions: {
    //   // push: {
    //   //   content: {
    //   //     translationX: {
    //   //       from: require('react-native').Dimensions.get('window').width,
    //   //       to: 0,
    //   //       duration: 300
    //   //     }
    //   //   }
    //   // },
    //   // pop: {
    //   //   content: {
    //   //     translationX: {
    //   //       from: 0,
    //   //       to: -require('react-native').Dimensions.get('window').width,
    //   //       duration: 300
    //   //     }
    //   //   }
    //   // }
    // }
  });
};

export {
  showCommonDialog,
  dismissOverlay,
  showModal,
  dismissModal,
  changeTab,
  setDefaultOptions,
  dismissAllModals,
  changeBage
};
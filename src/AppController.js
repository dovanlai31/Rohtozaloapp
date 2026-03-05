/**
 * @author: thai.nguyen
 * @date: 2018-11-29 17:29:22
 *
 *
 */

import { Navigation, } from 'react-native-navigation';
import ScreenIDs from './screens/ScreenIDs';
import { Colors, } from './theme';
import { BottomBarAssets, } from './assets';

export const startlogin =()=>{
  Navigation.setRoot({
    root: {
        stack: {    
          children: [
            // {
            //   component: {
            //     id: ScreenIDs.RegisterUser,
            //     name: ScreenIDs.RegisterUser,
            //   },
            //   options: {
            //     layout: {
            //       orientation: ['portrait'],
            //     },
            //     topBar: {
            //       visible: false,
            //       _height: 0,
            //       drawBehind: true,
                
            //     },
            //   },
            // },
            {
              component: {
                id: ScreenIDs.LoginGeso,
                name: ScreenIDs.LoginGeso,
                options: {
                  layout: {
                    orientation: ['portrait'],
                  },
                  topBar: {
                    visible: false,
                    _height: 0,
                    drawBehind: true,                
                  },
                },
              },

            },
          ],
        },
      }
  });


};






export const startSplashScreen =()=>{
  Navigation.setRoot({
    root: {
      component: {
        name:ScreenIDs.SplashScreen,
        options: {
          layout: {
            orientation: ['portrait'],
          },
        },
      },
    },
  });

};


export const startHome = () => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: ScreenIDs.Home,
                  },
                },
              ],
              options: {
                layout: {
                  orientation: ['portrait'],
                },
                statusBar: {
                  backgroundColor: Colors.statusBar,
                  //drawBehind: true,
                  visible: true,
                },
                topBar: {
                  visible: false,
                  _height: 0,
                  drawBehind: true,
                },
                bottomTab: {
                  text: 'Trang Chủ',
                  icon: BottomBarAssets.home,
                  selectedIcon: BottomBarAssets.home_solid,
                  iconInsets: { top: 0, left: 0, bottom: 0, right: 0, },
                  selectedIconColor: Colors.selectedColor,
                  selectedTextColor: Colors.selectedColor,
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ScreenIDs.Quatang,
                    passProps: {
                      text: 'stack with one child',
                    },
                  },
                },
              ],
              options: {
                layout: {
                  orientation: ['portrait'],
                },
                statusBar: {
                  backgroundColor: Colors.statusBar,
                  //drawBehind: true,
                  visible: true,
                },
                topBar: {
                  visible: false,
                  _height: 0,
                  drawBehind: true,
                },
                bottomTab: {
                  text: 'Quà tặng',
                  icon: BottomBarAssets.gift,
                  selectedIcon: BottomBarAssets.gift_solid,
                  iconInsets: { top: 0, left: 0, bottom: 0, right: 0, },
                  selectedIconColor: Colors.selectedColor,
                  selectedTextColor: Colors.selectedColor,
                },
              },
            },
          },
          {
            component: {
              id: ScreenIDs.Giohang,
              name: ScreenIDs.Giohang,
              options: {
                layout: {
                  orientation: ['portrait'],
                },
                statusBar: {
                  backgroundColor: Colors.statusBar,
                  //drawBehind: true,
                  visible: true,
                },
                topBar: {
                  visible: false,
                  _height: 0,
                  drawBehind: true,
                },
                bottomTab: {
                  text: 'Giỏ Hàng',
                  icon: BottomBarAssets.market,
                  selectedIcon: BottomBarAssets.market_solid,
                  iconInsets: { top: 0, left: 0, bottom: 0, right: 0, },
                  selectedIconColor: Colors.selectedColor, 
                  selectedTextColor: Colors.selectedColor,
                  badge: null,
                  badgeColor: 'red',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ScreenIDs.TTHotro,
                  },
                },
              ],
              options: {
                layout: {
                  orientation: ['portrait'],
                },
                statusBar: {
                  backgroundColor: Colors.statusBar,
                  //drawBehind: true,
                  visible: true,
                },
                topBar: {
                  visible: false,
                  _height: 0,
                  drawBehind: true,
                },
                bottomTab: {
                  text: 'Khách hàng',
                  icon: BottomBarAssets.chat,
                  selectedIcon: BottomBarAssets.chat_solid,
                  iconInsets: { top: 0, left: 0, bottom: 0, right: 0, },
                  selectedIconColor: Colors.selectedColor,
                  selectedTextColor: Colors.selectedColor,
                  badge: null,
                  badgeColor: 'red',
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: ScreenIDs.Profile,
                  },
                },
              ],
              options: {
                layout: {
                  orientation: ['portrait'],
                },
                statusBar: {
                  backgroundColor: Colors.statusBar,
                  //drawBehind: true,
                  visible: true,
                },
                topBar: {
                  visible: false,
                  _height: 0,
                  drawBehind: false,
                },
                bottomTab: {
                  drawBehind :false,
                  text: 'Tài Khoản',
                  icon: BottomBarAssets.Account,
                  selectedIcon: BottomBarAssets.Account_solid,
                  iconInsets: { top: 0, left: 0, bottom: 0, right: 0, },
                  selectedIconColor: Colors.selectedColor,
                  selectedTextColor: Colors.selectedColor,
                },
              },
            },
          },
        ],
      },
    },
  });
};

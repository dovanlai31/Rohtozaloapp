/**
 * @author [author]
 * @email Dovanlai31@gmail.com
 * @create date 2019-01-25 10:05:00
 * @modify date 2019-01-25 10:05:00
 * @desc [description]
 */

import React  from 'react';
import { StyleSheet,View,TouchableOpacity,FlatList, Dimensions,Platform,Image } from 'react-native';
import { connect, } from 'react-redux';
import {Navigation,} from 'react-native-navigation';
import { TextCmp, } from '../../../common-components';
import { Colors, } from '../../../theme';
import { CommonIcons, } from '../../../assets';
import { AppNavigation, } from '../../../app-navigation';
import { IDs } from '../..';

const {width,}= Dimensions.get('window');

//Danh mục sản phẩm
class ViewAllNhomSP extends React.Component {
    static options = {
      statusBar: {
        backgroundColor: Colors.statusBar,
        // drawBehind: true,
        visible: true,
      },
      topBar: {
        visible: true,
        background: {
          color: Colors.HeaderColor,
        },
        leftButtons: [
          {
            id: 'allnhom_BACK',
            icon: CommonIcons.back2,
          },
        ],
        title: {
          text: 'Danh mục sản phẩm',
        },
      },
    };
    constructor(props) {
      super(props);
      Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    }
      
    navigationButtonPressed({ buttonId, }) {
      if(buttonId==='allnhom_BACK')
      {this.props.navigator._pop();}
    }


    shouldComponentUpdate(listChungloai){
      return listChungloai!=this.props.listChungloai;
    }
    gosearch(t){

      //console.log("tim kiem ", t)

      this.props.dispatch({ type: 'searchKeyword', searchKeyword: t.ten + '', });
      this.props.dispatch({ type: 'setsDataSearch', searchKeyword: t.ten + '',});
      const { navigator, } = this.props;
     return navigator._push({
        name: IDs.SearchScreen,
        options: {
          topbar: {
            statusBar: {
              backgroundColor: Colors.statusBar,
              //drawBehind: true,
              visible: true,
            },
            background: {
              color: Colors.HeaderColor,
            },
            leftButtons: [
              {
                id: 'btntop',
                icon: CommonIcons.back,
              },
            ],
          },
          bottomTabs: {
            visible: false,
            ...Platform.select({ android: { drawBehind: true, }, }),
          },
        },
        passProps: {
          showback: true,
        },
  
      });









      this.props.navigator._pop();
    
      // navigator._push({
      //   name: IDs.NhomSp,
      //   options: {
      //     topbar: {
      //       statusBar: {
      //         backgroundColor: Colors.statusBar,
      //         //drawBehind: true,
      //         visible: true,
      //       },
      //       background: {
      //         color: Colors.HeaderColor,
      //       },
      //       leftButtons: [
      //         {
      //           id: 'btntop',
      //           icon: CommonIcons.back,
      //         },
      //       ],
      //     },
      //     // bottomTabs: {
      //     //   visible: false,
      //     //   ...Platform.select({ android: { drawBehind: true, }, }),
      //     // },
      //   },
      //   passProps: {
      //     nhomsp: t,
      //   },
  
      // });



      AppNavigation.changeTab(1);
     

    }
    renderItem = ({ item }) => {
      return (
        <TouchableOpacity style={styles.item} onPress={() => this.gosearch(item)}>
          <Image resizeMode='contain' source={{ uri: item.HinhAnh }} style={styles.image} />
          {/* <View style={styles.separatorContainer}>
          <View style={styles.separator}></View>
        </View> */}
          <TextCmp style={styles.itemText}>{item.ten}</TextCmp>
        </TouchableOpacity>
      );
    }
    render(){
      const {listChungloai,} = this.props;
      // alert(JSON.stringify(listChungloai))
      return(
        <View style={styles.container}>
          {/* <View style= {styles.title}>
            <View><TextCmp>Tất cả danh mục sản phẩm</TextCmp></View>             
          </View> */}
        <FlatList
          data={listChungloai}
          keyExtractor={(item) => item.pk_seq}
          renderItem={this.renderItem}
          numColumns={2}
          contentContainerStyle={styles.contentContainer}
          removeClippedSubviews={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
          windowSize={5}
        />
          <TextCmp></TextCmp>
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundL1,
    paddingHorizontal: 10,
    paddingTop: Platform.select({
      ios: 10,
      android: 70,
    }),
  },
  contentContainer: {
    paddingBottom: 10,
  },
  separatorContainer: {
    alignItems: 'center', // separator
  },
  separator: {
    width: '50%', 
    height: 1,
    backgroundColor: '#ccc',
  },
  item: {
    flex: 1,
    borderRadius: 5,
    marginHorizontal: 5,
    marginBottom: 10,
    backgroundColor: '#fff',
    elevation: 2,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  itemText: {
    padding: 10,
    textAlign: 'center',
    backgroundColor:Colors.backgroundL3,
  },
});
export default connect((state) => ({
  // ShopControl: state.ShopControl
}), (dispatch) => ({ dispatch, }))(ViewAllNhomSP);
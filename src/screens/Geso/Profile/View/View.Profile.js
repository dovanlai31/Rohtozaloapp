import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import formatter from './../../fm';
import { Colors } from '../../../../theme';
import { TextCmp } from '../../../../common-components';
import { HomeICon, ImgOPV } from '../../../../assets';
import ViewAllKm from '../../KM/index';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

export default class ViewTabThongbao extends React.Component {
  // shouldComponentUpdate(p) {
  //   return p.SoLuongDonHang != this.props.SoLuongDonHang;
  // }
  render() {
    const {
      ThongtinTK,
      setModalVisible,
      SoLuongDonHang,
      logout,
      dataLogin,
      dataImgs,
      changeAvatar,
      DoanhSo,
      DoanhSoNam,
      capdo,
      DiemTLKH,
      Press_lsdiem,
      OpenSceneTB,
      OpenSceneQuaOPV,
      OpenSceneTl
    } = this.props;
    let choice = [0, 0, 0];
    if (SoLuongDonHang) choice = SoLuongDonHang.split('-');

    let listTL = [];
    if (DoanhSo.TICHLUY) {
      listTL = DoanhSo.TICHLUY;
    }

    return (
      <>
        <SafeAreaView style={{ flex: 0, backgroundColor: Colors.grayMain }} />
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.backgroundL1 }} />
        <View style={styles.fill}>

          <ScrollView showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            showsHorizontalScrollIndicator={false} style={styles.scrollcontaint}>

            <View style={{ flex: 1, backgroundColor: 'white', fontSize: RFValue(14), borderRadius: 5, paddingTop: 30, }}>
              {/* <TextCmp style={{fontWeight:'bold', margin: 15,}}>
                Tài Khoản
            </TextCmp> */}
            </View>
            <View style={styles.HeaderUserInfo}>

              <TouchableOpacity onPress={changeAvatar} style={styles.avatar}>
                {dataImgs['img1'] ? (
                  <Image style={styles.img} source={dataImgs['img1']} />
                ) : (
                  <Image style={styles.img} source={{ uri: dataLogin.avatar }} />
                )}
                <Icon
                  color="gray"
                  style={{ position: 'absolute', bottom: 0, right: 0 }}
                  size={20}
                  name="camera"
                />
              </TouchableOpacity>
              <View style={styles.titlelUser}>
                <TextCmp  style={styles.textUser}>
                  {dataLogin.ten}
                </TextCmp>
                <TextCmp
                  style={{
                    fontSize: RFValue(14),
                    fontWeight: 'bold',
                    textAlign: 'left',
                    color: Colors.text,
                    paddingVertical: 10,
                  }}>
                  {dataLogin.dienthoai}
                </TextCmp>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

                  <TouchableOpacity style={[styles.titleGrouptwo, { color: Colors.textOPVGreen }]} onPress={ThongtinTK}>
                    <TextCmp
                      style={{
                        fontSize: RFValue(12),

                        textAlign: 'left',
                        color: Colors.text,

                      }}>
                      Khách hàng


                    </TextCmp>

                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.titleGrouptwo} onPress={logout}> 
                <TextCmp
                  style={{
                    fontSize: RFValue(12),
              
                    textAlign: 'left',
                    color:Colors.textOPVRed,
                
                  }}>
                  Đăng xuất
                </TextCmp>

               </TouchableOpacity> */}

                </View>

              </View>
            </View>
            <View style={styles.BoxCardRow}>
              <View style={[styles.BoxCardItem, { height: 80, borderColor: Colors.backgroundL1, backgroundColor: '#f1f5ff' }]}>
                <TextCmp style={[styles.CardItemTitle, { flex: 1 / 2, }]}>
                  Đơn hàng
                </TextCmp>
                <TextCmp style={[styles.CardItemContent, { flex: 1 / 2, color: Colors.textOPVRed, fontWeight: 'bold', fontSize: RFValue(16) }]}>
                  {DoanhSo.SODONHANG ? DoanhSo.SODONHANG : 0}
                </TextCmp>
              </View>
              <View style={[styles.BoxCardItem, { htextOPVCopper2eight: 80, borderColor: Colors.backgroundL1, backgroundColor: Colors.Analogus }]}>
                <TextCmp style={[styles.CardItemTitle, { flex: 1 / 2 }]}>
                  Sản phẩm

                </TextCmp>
                <TextCmp style={[styles.CardItemContent, { flex: 1 / 2, color: Colors.textOPVCopper2, fontWeight: 'bold', fontSize: RFValue(16) }]}>
                  {DoanhSo.SOSANPHAM ? DoanhSo.SOSANPHAM : 0}
                </TextCmp>
              </View>
              <View style={[styles.BoxCardItem, { height: 80, borderColor: Colors.backgroundL1, backgroundColor: '#f3f8fe' }]}>
                <TextCmp style={[styles.CardItemTitle, { flex: 1 / 2 }]}>
                  Tổng Tiền
                </TextCmp>
                <TextCmp style={[styles.CardItemContent, { flex: 1 / 2, color: Colors.textOPVGreen, fontWeight: 'bold', fontSize: RFValue(16) }]}>
                  {formatter.format(DoanhSo.TONGSOTIEN)}
                </TextCmp>
              </View>
            </View>
            <View style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
                    {/* <Icon size={20} name='book'></Icon> */}
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {'Doanh số - điểm'}
                    </TextCmp>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true, 0)}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <TextCmp style={{ fontSize: RFValue(12) }}>Cấp độ :  {capdo}</TextCmp>
                    </View>
                    {/* <View style={styles.txtrowMain}>
                      <View  style={styles.txtrowbottom} >
                      <TextCmp style={styles.txtinrow3}>{choice[0]}</TextCmp>
                      </View>
                     
                    </View> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={Press_lsdiem}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <TextCmp style={{ fontSize: RFValue('14') }}><Icon2 size={20} name="coins" color='gold'></Icon2> {formatter.format(DiemTLKH)} điểm</TextCmp>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={''} >

                        <Image
                          source={ImgOPV.backR}
                          style={styles.arrowRight}
                        />
                      </View>

                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { '' }}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <TextCmp style={{ fontSize: RFValue(12) }}>Doanh thu trong tháng {DoanhSoNam ? DoanhSoNam[0].Column1 : ''}: {DoanhSoNam ? formatter.format(DoanhSoNam[0].doanhthu) : '0'} VNĐ </TextCmp>
                    </View>
                    {/* <View style={styles.txtrowMain}>
                      <View  style={styles.txtrowbottom} >
                      <TextCmp style={styles.txtinrow3}>{choice[0]}</TextCmp>
                      </View>
                     
                    </View> */}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => { '' }}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <TextCmp style={{ fontSize: RFValue(12) }}>Doanh số năm {DoanhSoNam ? DoanhSoNam[1].Column1 : ''}: {DoanhSoNam ? formatter.format(DoanhSoNam[1].doanhthu) : '0'} VNĐ</TextCmp>
                    </View>
                    {/* <View style={styles.txtrowMain}>
                      <View  style={styles.txtrowbottom} >
                      <TextCmp style={styles.txtinrow3}>{choice[0]}</TextCmp>
                      </View>
                     
                    </View> */}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
                    {/* <Icon size={20} name='book'></Icon> */}
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {'Quản lý đơn'}
                    </TextCmp>
                  </View>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true, 0)}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon size={16} color={Colors.textOPVBlue} name="layer-group" />
                        </View>


                        <TextCmp style={{ fontSize: RFValue(12) }}>Đơn chưa giao</TextCmp>

                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={styles.txtrowbottom} >
                        <TextCmp style={styles.txtinrow3}>{choice[0]}</TextCmp>
                      </View>

                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true, 1)}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon size={16} color={Colors.textOPVBlue} name="dolly-flatbed" />
                        </View>

                        <TextCmp style={{ fontSize: RFValue(12) }}>Đơn hàng đã giao</TextCmp>
                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={styles.txtrowbottom} >
                        <TextCmp style={styles.txtinrow3}>{choice[1]}</TextCmp>
                      </View>

                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true, 2)}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVRed, // Màu viền
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon size={16} color={Colors.textOPVBlue} name="dolly" />
                        </View>

                        <TextCmp style={{ fontSize: RFValue(12) }}>Đơn hàng đã hủy</TextCmp>
                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={styles.txtrowbottom} >
                        <TextCmp style={styles.txtinrow3}>{choice[2]}</TextCmp>
                      </View>

                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* <View style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
               
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      Chương trình tích lũy
                    </TextCmp>
                  </View>
                  {DoanhSo.TRUNGBAY &&
                    JSON.parse(DoanhSo.TRUNGBAY).map(data => {
                      {
                        data && (
                          <View
                            key={data.diengiai}
                            style={styles.itemSectionTrungBay}>
                            <View style={styles.txtinview3}>
                              <TextCmp style={{ fontSize: RFValue(12) }}>{' ' + data}</TextCmp>
                            </View>
                            <View style={styles.txtrowMain}>
                              <View style={styles.txtrowbottom} >
                                <TextCmp style={styles.txtinrow3}>{''}</TextCmp>
                              </View>

                            </View>
                          </View>
                        );
                      }
                    })}
                </View>
              </View>
            </View> */}
            <View  style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
                    {/* <Icon size={20} name='book'></Icon> */}
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      Quà OPV
                    </TextCmp>
                  </View>
                  <TouchableOpacity
                   onPress={OpenSceneQuaOPV} 
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon size={16} color={Colors.textOPVBlue} name="gift" />
                        </View>


                        <TextCmp style={{ fontSize: RFValue(12) }}>Đổi quà từ OPV</TextCmp>

                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={''} >

                        <Image
                          source={ImgOPV.backR}
                          style={styles.arrowRight}
                        />
                      </View>

                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View  style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
                    {/* <Icon size={20} name='book'></Icon> */}
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      Chương trình
                    </TextCmp>
                  </View>
                  <TouchableOpacity
                     onPress={OpenSceneTB}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon size={16} color={Colors.textOPVBlue} name="image" />
                        </View>

                        <TextCmp style={{ fontSize: RFValue(12) }}>Tham gia trưng bày</TextCmp>

                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={''} >

                        <Image
                          source={ImgOPV.backR}
                          style={styles.arrowRight}
                        />
                      </View>

                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={OpenSceneTl}
                    style={styles.itemSection}>
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVBlue,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#f1f5ff'
                        }}>
                          <Icon2 size={16} color={Colors.textOPVBlue} name="cubes" />
                        </View>

                        <TextCmp style={{ fontSize: RFValue(12) }}>Đăng ký tích lũy</TextCmp>

                      </View>
                    </View>
                    <View style={styles.txtrowMain}>
                      <View style={''} >

                        <Image
                          source={ImgOPV.backR}
                          style={styles.arrowRight}
                        />
                      </View>

                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.ContainerSection}>
              <View style={styles.ContainerSectionWrap}>
                <View style={styles.contentSection}>
                  <View style={styles.titleSection}>
                    {/* <Icon size={20} name='book'></Icon> */}
                    <TextCmp
                      style={{
                        fontSize: RFValue(14),
                        fontWeight: 'bold',
                        textAlign: 'left',
                      }}>
                      {'Tài khoản'}
                    </TextCmp>
                  </View>
                  <TouchableOpacity
                    onPress={logout}
                    style={[styles.itemSection, {borderBottomWidth: 0,}]}> 
                    <View style={styles.txtinview3}>
                      <View style={styles.groupDonhang}>
                        <View style={{
                          marginRight: 10,
                          borderRadius: 10,
                          borderWidth: 1,
                          borderColor: Colors.textOPVRed,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: ''
                        }}>
                          <Icon size={16} color={Colors.textOPVRed} name="power-off" />
                        </View>
                        <TextCmp style={{ fontSize: RFValue(12), fontWeight: '500', color: Colors.textOPVRed }}>Đăng xuất</TextCmp>

                      </View>
                    </View>
                    <View style={styles.txtrowMain}>


                    </View>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
            {/* <View onPress={logout} style={styles.EndScroll}>
              
            </View> */}
          </ScrollView>

        </View>
      </>

    );
  }
}

const styles = StyleSheet.create({
  fill: {
    height,
    backgroundColor: Colors.backgroundL3,
    width: width - 20,
    margin: 10,
   paddingBottom: Platform.OS === 'ios' ? 70 : 0,
  },

  scrollcontaint: { flex: 1, marginBottom:  70},
  HeaderUserInfo: {
    //backgroundColor:'yellow',
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',

    // backgroundColor: 'yellow'
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.grayMain,
    borderColor: Colors.backgroundL1,
    borderWidth: 2,
    alignSelf: 'flex-start',
    marginHorizontal: 10,

  },

  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    margin: 8,
  },

  titlelUser: {
    alignSelf: 'flex-start',
    width: '80%',
    flexWrap: 'wrap',
    //backgroundColor: 'green',
  },

  textUser: {
    fontSize: RFValue(12),
    color: Colors.textOPVGreen,
    fontWeight: 'bold',
    textAlign: 'left',
     width: '80%',
    flexWrap: 'wrap',   
   // backgroundColor:'red',
  },

  ///Box card
  BoxCard: {
    backgroundColor: 'white',
    borderRadius: 10,

  },
  BoxCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: 'white',


  },
  BoxCardItem: {
    width: '30%',
    flexDirection: 'column',
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    padding: 10,
  },
  CardItemTitle: {
    textAlign: 'center',

    fontSize: RFValue(12),
    marginBottom: 5,
  },
  CardItemContent: {
    textAlign: 'center',

    //backgroundColor:'blue'
  },
  //section
  ContainerSection: {
    width: '100%',
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  ContainerSectionWrap: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  itemSection: {
    padding: 10,
    borderBottomWidth: 0.3,
    borderBottomColor: '#d3d3d3',
    justifyContent: 'space-between',
    flexDirection: 'row',
    //backgroundColor:'red',
    margin: 1,
  },
  groupDonhang: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  itemSectionTrungBay: {
    padding: 10,
    // borderBottomWidth: 0.5,
    // borderBottomColor: '#d3d3d3',
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 1,
  },

  btntop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    backgroundColor: Colors.HeaderColor,
    borderRadius: 2,
  },
  view2: {
    height: 50,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 5,
    marginVertical: 10,
    borderColor: 'gray',
  },
  inrowView2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '33%',
    backgroundColor: '#F6F8FA',
  },

  inrowView3: {
    padding: 10,
    borderBottomWidth: 0.5,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 1,
    borderColor: 'gray',
    alignItems: 'center',
  },
  txtinview3: { justifyContent: 'center', width: '80%' },
  txtrowbottom: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.HeaderColor,
    justifyContent: 'center',
    alignContent: 'center',
    borderColor: 'white',
    borderWidth: 2,
  },
  txtrowMain: {
    width: '20%',
    height: '100%',
    // flexDirection:'row',
    alignItems: 'flex-end',


    //backgroundColor:'yellow'
  },
  btnrowbottom: {
    padding: 10,
    borderBottomWidth: 0.3,
    justifyContent: 'center',
    flexDirection: 'row',
    margin: 1,
    borderColor: 'white',
  },
  txtinrow3: {
    color: 'white',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 10,
  },

  btnQuatoi: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: null,
  },
  textpoint: { fontWeight: '700' },

  arrowRight: {
    width: 14,
    height: 14,


  },
  titleGrouptwo: {

    paddingHorizontal: 10,

    borderColor: Colors.backgroundL3,
    borderWidth: 0.4,
    borderRadius: 5,
    marginRight: 5,
    backgroundColor: Colors.backgroundL1,
  },
  EndScroll: {
    //height: 30,
  }
});


import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Platform,
    Image,
    ScrollView,
    Dimensions,
    FlatList,
    SectionList,
    ActivityIndicator
} from 'react-native';
import { ErrorMessage, TextCmp, } from '../../../../common-components';
import Icon from 'react-native-vector-icons/AntDesign';
import { Colors, } from '../../../../theme';
import { BottomBarAssets } from '../../../../assets';
import ViewDanhmucUrbox from './viewDanhmucUrbox';
import formatter from '../../fm';
import { RFValue } from 'react-native-responsive-fontsize';
const { width } = Dimensions.get('window')
export default class ViewListGif extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasScrolled: false,
            page: 0,
            loading: true,
            activePageIndex: 0,
            totalPages:0,
        }
    }
    componentDidMount() {
        this.calculateTotalPages();

    }

    componentDidUpdate(prevProps) {
        if (prevProps.LitstDanhmucUrbox !== this.props.LitstDanhmucUrbox) {
            this.calculateTotalPages();
        }
    }
    handleLoadMore = () => {
        if (!this.state.loading) { 
            this.setState({loading: false})
            return null; 
        }

        this.setState({
            page: this.state.page + 1,
            loading: false
        });
        //here load data from your backend
        // console.log('load more', 'xxxxxxx' + this.state.page)

    }
    loadProducts(catId, userkey) {
        this.setState({
            loading: false
        });
    }

    renderItem = (item, index, searchclisk) => {

        // const item = this.props.dataSectionList.data[index];
        // const nextItem = this.props.dataSectionList.data[index + 1];
        return (
            <View key={index.toString()}
                style={{}}
            >
                <TouchableOpacity
                    style={[styles.itemCL, { backgroundColor: '#fff' }]}
                    key={item.title}
                    onPress={() => searchclisk(item, 0)}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            resizeMode="cover"
                            source={{ uri: item.image ? item.image : '' }}
                            style={styles.image}
                        />
                    </View>

                    <View

                    style={{
                        position: 'absolute', height: 90, 
                
                        bottom: 0, width: wCol  + 60, textAlign: 'center',  justifyContent: 'center',backgroundColor : '#fff'
                    }}>

                        <TextCmp numberOfLines={2} textAlign='center' style={styles.textt}>{item.title.replace(/\[(.*?Urbox.*?)\]/gi, "").replace("&amp;", "&")}</TextCmp>
                        {/* <TextCmp textAlign='center' style={[styles.textnote, { color: 'gray' }]}>{item.expire_duration}</TextCmp> */}
                        {/* <TextCmp textAlign='center' style={styles.textnote}>{formatter.format(item.price)} <TextCmp textAlign='center' style={{color:Colors.textOPVRed, fontSize: RFValue(10)}}> VND</TextCmp></TextCmp> */}
                        <View
                            style={styles.boxGia}> 
                            <View
                            style={styles.textGiatien}>
                            <TextCmp style={{  fontWeight: 'bold',fontSize: RFValue(12),marginRight: 2, padding: 2 ,color:Colors.textOPVRed,   }}>
                             {formatter.format(item.price)}  
                            {<TextCmp style={{  fontWeight: '500', backgroundColor: null,
                            fontSize: RFValue(10), paddingHorizontal: 10 ,color:Colors.textOPVGreen, borderRadius: 5, }}>
                            {'  VNĐ '}</TextCmp>}</TextCmp>              
                            </View>     

                        </View>
                    </View>

                </TouchableOpacity>
                {/* <TouchableOpacity
                    style={[styles.itemCL, { backgroundColor: 'white' }]}
                    key={nextItem.title}
                    onPress={() => searchclisk(nextItem, 0)}
                >
                    <Image resizeMode='cover'
                        source={{ uri: nextItem.image ? nextItem.image : '', }}
                        style={styles.imgG} />
                    <View style={{ padding: 5, }}>
                        <TextCmp numberOfLines={2} textAlign='center' style={styles.textt}>{nextItem.title}</TextCmp>
                     
                        <TextCmp textAlign='center' style={styles.textnote}>{formatter.format(nextItem.price)} vnđ</TextCmp>

                    </View>

                </TouchableOpacity> */}


            </View>)






    };
    handlePageChangeDot = (index) => {
        this.props.handlePageChangeDot(index)
        this.setState({ activePageIndex: index });
        
      };
      tinhActivePageIndex = (event) => {
      

        console.log('eventx', event);
        this.setState({ activePageIndex: event });
    }; 
    calculateTotalPages = () => {
        const { width } = Dimensions.get('window');
        const { LitstDanhmucUrbox } = this.props;
        const itemWidth = width  / 4 // Width -> muc FlatList
        let totalItems = LitstDanhmucUrbox?LitstDanhmucUrbox.length/2:1;
        const totalPages = Math.ceil(totalItems * itemWidth / width);
        this.setState({ totalPages });
    };
    render() {
        const { listsGiftUrbox, searchclisk, LitstDanhmucUrbox, dataSectionList, ErrorMessageText, onPress1 , onPress2, selectedDanhMuc } = this.props;
        const { activePageIndex, totalPages } = this.state;
      //  console.log('xxxyy',ErrorMessageText );
        return (
            <View style={styles.content}>
            <ViewDanhmucUrbox 
                activePageIndex={activePageIndex}  
                totalPages ={totalPages} 
                handlePageChangeDot={this.handlePageChangeDot } 
                tinhActivePageIndex={(e)=>this.tinhActivePageIndex(e)} searchclisk={(t) => searchclisk(t, 1)} 
                LitstDanhmucUrbox={LitstDanhmucUrbox}
                selectedDanhMuc={selectedDanhMuc}
            >
            </ViewDanhmucUrbox>
            {ErrorMessageText!== '' && (
                <View style={styles.wrappCard}>

                    <ErrorMessage
                      message={ErrorMessageText}
                      onPress1={onPress1}
                      onPress2={onPress2}
                      action1Label="Để sau"
                      action2Label="Cập nhật"
                      // action3Label="Action 3"
                    />
              
                </View>
              )}
           
                {/* <View style={{ width }}>
                    <TextCmp>  Doanh mục</TextCmp>
                </View> */}
                {/* <SectionList
                    onEndReached={this.handleLoadMore}
                    // horizontal
                    // pagingEnabled={true}
                    // showsHorizontalScrollIndicator={false}               
                    ListHeaderComponent={() => <ViewDanhmucUrbox searchclisk={(t) => searchclisk(t, 1)}
                        LitstDanhmucUrbox={LitstDanhmucUrbox}></ViewDanhmucUrbox>}
                    // numColumns={2}
                    legacyImplementation={false}
                    sections={dataSectionList}
                    renderItem={({ item, index }) => this.renderItem( item, index, searchclisk)}
                    renderSectionHeader={({ section: { title } }) => (
                        <View style={styles.ViewTT} >
                            <Text style={styles.header}>{title}</Text>
                        </View>

                    )}
                    keyExtractor={item => item.id}

                //style={{ width: SCREEN_WIDTH + 5, height: '100%' }}
                /> */}
               <View style={styles.titleText}>
                    {/* <View style={styles.titleGrouptwo}>            
                    <View style = {styles.styleOtwo}>
                    <Icon style ={{}}  size={16} color={Colors.textOPVCopper} name = 'gift'></Icon>        
                    </View>
                    <TextCmp style={styles.txtAll}> Quà tặng </TextCmp>               
                    </View> */}
                </View>

                <FlatList
                    onEndReached={() => this.handleLoadMore()}
                    // horizontal
                    // pagingEnabled={true}
                    // showsHorizontalScrollIndicator={false}
                    // initialNumToRender={30}
                    // maxToRenderPerBatch={20}
                    numColumns={2}
                    legacyImplementation={false}
                    data={listsGiftUrbox}
                    renderItem={({ item, index }) => this.renderItem(item, index, searchclisk)}
                    keyExtractor={item => item.id}
                    nestedScrollEnabled={true}
                //style={{ width: SCREEN_WIDTH + 5, height: '100%' }}
                />
                {/* {this.state.loading && <ActivityIndicator />} */}
            </View>
        );
    }
}
const wCol = width / 2 - 20;
const styles = StyleSheet.create({
    content: {
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.BackgrondLightOPV,
        //marginBottom: 85,



    },
    header: { color: 'white', fontWeight: '700' },
    ViewTT: {
        padding: 10,
        height: 45,
        backgroundColor:  Colors.HeaderColor,justifyContent:'center'
    },
    titleText: {
        justifyContent: 'space-between', flexDirection: 'row',
        alignItems: 'stretch', width: width - 10, 
        marginBottom: 20,
    },

    itemCL: {
        width: wCol,
        //alignItems: 'center',
        backgroundColor: '#ffff',
        //borderRadius:2,
        borderColor: 'gray',
        borderWidth: 0.3,
        margin: 5,
        borderRadius: 5,
        //padding:3,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 4,
        height: width /2 +30 ,
        overflow:'hidden'


    },
    row: {
        // justifyContent: 'space-around',

        // flexDirection: 'row',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // flexWrap: 'wrap'

    },


    txtTitle: { width: wCol, marginLeft: 12, textAlign: 'left', fontWeight: 'bold', },
    txtAll: {  textAlign: 'center', color: Colors.textOPVCopper, marginRight: 5,  },
    textnote: { fontSize: RFValue(12), width: wCol,  fontWeight: 'bold',textAlign: 'center', color: Colors.textOPVGreen },
    textt: {
         textAlign: 'center', fontSize: RFValue(12), fontWeight: '300', padding: 5, width: wCol-8,
        // color: Colors.upColor,
    },
    imgG: { width: wCol, height: width / 2 + 60 , borderRadius: 4,  },
    imageContainer: {
        width: wCol,
        height: wCol ,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        backgroundColor: 'white',
        overflow: 'hidden',
      },
    image: { width: '100%', height: '100%' , },
    titleGrouptwo: {
        margin: 10,
        
        alignSelf:'flex-start',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    
        paddingHorizontal: 5,
        borderColor: Colors.Analogus2,
        borderWidth: 2,
        borderRadius: 5,
        marginRight: 5,
        backgroundColor: Colors.Analogus,
      },
      styleOtwo: {
      
        justifyContent: 'center',
        alignItems: 'center',
        width: 20,
        height: 20,
        backgroundColor: Colors.Analogus,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
      },
      boxGia :{

        borderColor: Colors.backgroundL3,
        borderTopWidth: 2,
        width: wCol -30,
        alignSelf: 'center',
        marginRight:  60,
       // backgroundColor:'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        //backgroundColor:'yellow'

      
      },
      textGiatien : 
        {
          fontSize: RFValue(12),
          color: Colors.textOPVGreen,            
          alignItems:'center',
          marginVertical: 5,
        }
})
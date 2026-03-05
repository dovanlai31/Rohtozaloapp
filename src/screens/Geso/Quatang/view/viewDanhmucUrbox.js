
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
    FlatList
} from 'react-native';
import { TextCmp, } from '../../../../common-components';
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import { Colors, } from '../../../../theme';
import { BottomBarAssets } from '../../../../assets';
import { RFValue } from 'react-native-responsive-fontsize';
const { width } = Dimensions.get('window')
export default class ViewDanhmucUrbox extends React.Component {
    updateActivePageIndex = (event) => {
        const { width } = Dimensions.get('window');
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        const pageIndex = Math.floor(contentOffsetX / width + 0.5)
        this.props.tinhActivePageIndex(pageIndex);
    };
    handlePageChange = (index) => {
        //  this.setState({ currentPage: index });
        //  this.flatListRef.scrollToIndex({ animated: true, index });
        //nhấn vào scroll page
    };
    renderItem = (item, index, searchclisk) => {
        const {LitstDanhmucUrbox, selectedDanhMuc}= this.props
        const a =parseInt(LitstDanhmucUrbox.length/2) 
        if(index>a) return <></>
        let vt2 = a+index
        console.log("xxxxxxxxxxxx"+vt2,LitstDanhmucUrbox.length)
        if(!item.title) return <></>
        if(!LitstDanhmucUrbox[vt2]) return <></>
        return (
            <View>
                <TouchableOpacity
                    style={[styles.itemCL]}
                    key={item.title}
                    onPress={() => searchclisk(item)}
                >
                    <View style={[styles.imageContainer, selectedDanhMuc == item?.id && styles.active]}>
                        <Image source={{ uri: item.images, }}
                            style={styles.imgG} />
                    </View>
                    <View style={{ padding: 5, }}>
                        <TextCmp textAlign='center' numberOfLines={1} style={styles.textt(selectedDanhMuc == item?.id)}>{item.title}</TextCmp>
                    </View>
                </TouchableOpacity>
                {LitstDanhmucUrbox[vt2].title&&<TouchableOpacity
                    style={[styles.itemCL,]}
                    key={LitstDanhmucUrbox[vt2].title}
                    onPress={() => searchclisk(LitstDanhmucUrbox[vt2])}
                >
                    <View style={[styles.imageContainer, selectedDanhMuc == LitstDanhmucUrbox[vt2]?.id && styles.active]}>
                        <Image source={{ uri: LitstDanhmucUrbox[vt2].images, }}
                            style={styles.imgG} />
                    </View>
                    <View style={{ padding: 5, }}>
                        <TextCmp textAlign='center' numberOfLines={1} style={styles.textt(selectedDanhMuc == LitstDanhmucUrbox[vt2]?.id)}>{LitstDanhmucUrbox[vt2].title}</TextCmp>
                    </View>
                </TouchableOpacity>}
            </View>

        );
    };
    render() {
        const { LitstDanhmucUrbox, searchclisk, activePageIndex, totalPages } = this.props;
        return (
            <View style={styles.content}>
                <View style={styles.titleText}>
                    <View style={{ flexDirection: 'row' }}>
                        <View style={styles.titleGrouptwo}>
                            <View style={styles.styleOtwo}>
                                <Icon style={{}} size={16} color={Colors.textOPVCopper} name='columns'></Icon>
                            </View>
                            <TextCmp style={styles.txtAll}> Danh mục | </TextCmp>
                            <Icon style={{}} size={16} color={Colors.textOPVCopper} name='gift'></Icon>
                            <TextCmp style={styles.txtAll}>  Quà tặng </TextCmp>

                        </View>

                    </View>

                    <View style={styles.pageIndicatorContainer}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <TouchableOpacity
                                key={index.toString()}
                                onPress={() => this.handlePageChange(index)}
                                style={[
                                    styles.pageIndicator,
                                    index === activePageIndex && styles.activePageIndicatorStyle,
                                ]}
                            />
                        ))}
                    </View>

                </View>

                <FlatList
                    ref={(ref) => (this.flatListRef = ref)}
                    style={{ marginBottom: 10 }}
                    horizontal
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={LitstDanhmucUrbox}
                    renderItem={({ item, index }) => this.renderItem(item, index, searchclisk)}
                    keyExtractor={item => item.id}
                    onScroll={(event) => this.updateActivePageIndex(event)}

                //style={{ width: SCREEN_WIDTH + 5, height: '100%' }}
                />

                {/* <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                >
                      <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 1, alignItems: 'flex-start', }}>
                        {LitstDanhmucUrbox && LitstDanhmucUrbox.map((item, index) => this.renderItem(item, index, searchclisk))}
                    </View>

                </ScrollView> */}


            </View>
        );
    }
}
const margin = 5;

const styles = StyleSheet.create({
    content: {


        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: Colors.HeaderColor,
        backgroundColor: 'white',
        marginBottom: 30,


    },
    titleText: {
        justifyContent: 'space-between', flexDirection: 'row',
        alignItems: 'stretch', width: width - 10,
        marginBottom: 20,
    },
    itemCL: {
        width: width / 4,
        alignItems: 'center',
        //backgroundColor:'#ffff'  ,
        //borderRadius:2,
        borderRightColor: 'gray',
        // marginVertical: 30,
        borderRadius: 2,
        //backgroundColor: Colors.HeaderColor,


    },
    pageIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,

    },
    pageIndicator: {
        backgroundColor: Colors.inActiveBtmTabColor,
        width: 10,
        height: 5,
        borderRadius: 3,
        marginHorizontal: 5
    },
    activePageIndicatorStyle: {
        backgroundColor: Colors.textOPVGreen,
    },
    txtAll: { textAlign: 'center', color: Colors.textOPVGreen, marginRight: 5, fontSize: RFValue('12') },

    txtTitle: { width: width / 2 - 10, marginLeft: 12, textAlign: 'left', fontWeight: 'bold', },
    textt: (isSelected) => ({
        textAlign: 'center',
        fontSize: RFValue('11'),
        fontWeight: isSelected ? 'bold' : '200',
        padding: 2,
        width: width / 4,
        color: Colors.text
    }),
    imageContainer: {
        width: width / 8 + 16,
        height: width / 8 + 16,
        borderRadius: 18,
        borderColor: Colors.Analogus,
        backgroundColor: Colors.Analogus2,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgG: {
        width: width / 8, height: width / 8,
        borderRadius: 16
        //tintColor:'white'
    },
    titleGrouptwo: {
        margin: 10,

        alignSelf: 'flex-start',
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
    active: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,

        backgroundColor: Colors.HeaderColor,
    }
});


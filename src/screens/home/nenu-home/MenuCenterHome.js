import React from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import Swiper from 'react-native-swiper';

import { TextCmp, } from '../../../common-components';
import { Logg, } from '../../../utils';
import { Colors, } from '../../../theme';
import { HomeICon } from '../../../assets';

const logg = Logg.create('banner UI');
const { width } = Dimensions.get('window')
// const coins = [

// ]

export default class HomeMenu extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    renderSliderCoin1() {

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.style1}>
                    <TouchableOpacity style={styles.blockmenu}>
                        <View style={styles.btnmenu}>
                            <Image source={HomeICon.support} style={styles.icon} />
                        </View>
                        <TextCmp style={styles.text}> Support</TextCmp>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockmenu}>
                        <View style={styles.btnmenu}>
                            <Image source={HomeICon.starbox} style={styles.icon} />
                        </View>
                        <TextCmp style={styles.text}> Favorites</TextCmp>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockmenu}>
                        <View style={styles.btnmenu}>
                            <Image source={HomeICon.deposit} style={styles.icon} />
                        </View>
                        <TextCmp style={styles.text}> Deposit</TextCmp>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.blockmenu}>
                        <View style={styles.btnmenu}>
                            <Image source={HomeICon.Withdrawal} style={styles.icon} />
                        </View>
                        <TextCmp style={styles.text}> Withdrawal</TextCmp>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.style2}>
                    <Image source={HomeICon.chessqueen} style={[styles.icon,{tintColor:Colors.blurWhite}]} />
                    <TextCmp style={styles.text}> BTC 24h Volumn Top </TextCmp>
                    <Image source={HomeICon.right} style={[styles.icon,{position:'absolute',right:10}]} />

                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 4,
        height: 110,

    },
    style1: {
        flexDirection: 'row',
        height: 70,
        backgroundColor: Colors.backgroundL1,
    },
    style2: {
        flexDirection: 'row',
        marginTop: 4,
        height: 40,
        backgroundColor: Colors.backgroundL1,
        paddingHorizontal: 10,
        alignItems:'center'
    },

    blockmenu: {
        width: width / 4,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnmenu: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: Colors.blurWhite

    },
    icon: {
        alignContent: 'center',
        width: 20,
        height: 20,

    },
    text: {
        color: Colors.blurWhite,
        fontSize: 14,
        margin: 3,
    }

});
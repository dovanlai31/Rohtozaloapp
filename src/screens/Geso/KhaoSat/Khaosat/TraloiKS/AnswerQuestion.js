import React from 'react';
import {
  View, TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

import { Logg, } from '../../../../../utils';
import { TextCmp, } from '../../../../../common-components';
import { CommonIcons, } from '../../../../../assets';
import state from './../../../TTTK/index';
import { Colors, } from '../../../../../theme';


export default class AnserQuestion extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      isshow:false,
    };
  }

  render(){
    const{
      question,
      answers,
      indexQuestion,
      saveQuestion,
    }= this.props;
    let answerData = answers[indexQuestion];
    let listAnswer = question.DAPAN;
    const {isshow,}= this.state;
    Logg.info('listAnswer -1 '+JSON.stringify(listAnswer));
  
    listAnswer = listAnswer.split(';');
    let textInput = '';
    // let id = listAnswer[0];
    if (listAnswer.length == 1) {
      listAnswer = new Array(6);
    }
    let answer1 = 'Chọn đáp án';
    if (!answerData) {
      answerData = [];
      answerData = ['',];
      for (let i = 1; i < listAnswer.length; i++) {
        answerData.push('');
      }
    } else {
      answerData.map((value, index) => {
        if (index != 0) {
          if (value) {
            answer1 = value;
          }
        } else {
          textInput = value;
        }
      });
    }
    //Logg.info('listAnswer1 '+JSON.stringify(listAnswer));
    listAnswer = [...listAnswer.slice(1),];
    listAnswer = listAnswer.map((value,index) => {
      index+=1;
      return {
        label:JSON.parse(question.DAPAN)[0]['LUACHON'+index],
      };
    });
    switch (question.LOAICAUHOI) {
      case '0':
        return <TextInput
          underlineColorAndroid="transparent"
          style={[styles.selectQuestion, { fontSize: 16, },]}
          placeholder="Nhập trả lời"
          value={textInput}
          onChangeText={(text) => {
            answerData[0] = text;
            answers[indexQuestion] = answerData;
            saveQuestion(answers);
          }}
        />;
      case '1':
        // Logg.info('answers '+JSON.stringify(answers));

        return(<View>
          <TouchableOpacity style={styles.selectQuestion} onPress={
            () => {this.setState({isshow: ! isshow,});}
          }>
            <TextCmp>{answer1 && answer1 || 'Chọn đáp án'}</TextCmp>
            {!isshow && <Image source={CommonIcons.down} style={styles.image}></Image>}
          </TouchableOpacity>
          {isshow && <View>
            {listAnswer.map((x, index)=>{
              if(x.label!=='---')
              {return  <TouchableOpacity  key={x.label} style = {styles.rowsview}  onPress={ () => {
                answerData = answerData.map((value, index) => {
                  if (index != 0) {
                    value = '';
                  }
                  return value;
                });
                answerData[index + 1] = x.label;
                answers[indexQuestion] = answerData;
                saveQuestion(answers);
                this.setState({isshow: ! isshow,});
              }}>
                <TextCmp>{x.label}</TextCmp></TouchableOpacity>  ;}
            })}
          
          </View>}
        </View>) ;
      case '2':
        return <View style={{ marginTop: 10, }}>
          {/* {listAnswer.map((answer, index) =>
            <RowCheck key={index}
              label={answer.label}
              onChangeValue={(value) => {
                answerData[index + 1] = value && 1 || '';
                answers[indexQuestion] = answerData;
                saveQuestion(answers);
              }} value={answerData[index + 1] && true || false} />
          )} */}
        </View>;
    }


  }
}


const styles = StyleSheet.create({
  selectQuestion: {
    backgroundColor: '#eff0f2',
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    flexDirection:'row', justifyContent: 'space-between',
    alignItems:'center',
  },
  image:{width:25,height:25,tintColor:'gray',},
  rowsview:{height:35,borderBottomWidth:1,borderColor:Colors.backgroundL1, justifyContent:'center', paddingHorizontal:5,},
});
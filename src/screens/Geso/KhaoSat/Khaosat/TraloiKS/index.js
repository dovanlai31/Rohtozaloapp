
import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import { Colors, } from '../../../../../theme';
import { CommonIcons, } from '../../../../../assets';
import { Navigation, } from 'react-native-navigation';
import { TextCmp, } from '../../../../../common-components';
import { post, } from '../../../../../utils/netwworking';
import { AppNavigation, } from '../../../../../app-navigation';
import { Logg, SnackBar, } from '../../../../../utils';
import AnserQuestion from './AnswerQuestion';
import { connect, } from 'react-redux';

const{width,}= Dimensions.get('window');
class FundScreen extends React.Component {
    static options = {
      statusBar: {
        backgroundColor:  Colors.statusBar,
        // drawBehind: true,
        visible: true,
      },
      topBar: {
        visible: true,
        background: {
          color: Colors.HeaderColor,
        },
        // leftButtons: [
        //   {
        //     id: '_BACK',
        //     icon: CommonIcons.back2,
        //   },
        // ],
        rightButtons: [
          {
            id: 'save',
            icon: CommonIcons.done,
          },
        ],
        backButton: {
          color: '#fff',
        },
        title: {
          text: 'Khảo Sát',
        },
      },
    };
    constructor(props) {
      super(props); 
      Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
      this.state={
        tabIndex: 0,
        indexQuestion: 0,
        infoInput: ['', '', 1, '', '', '', '', '',],
        questionInput: [],
        showKeyboard: false,
        questions: [],
        loadingQuestion: true,
      };

    }
    componentDidMount(){
      post('KhaoSat_GetCauHoiList', {
        ksId: this.props.item.PK_SEQ,
      })
        .then(({ data, error, }) => {
          if (!error && Array.isArray(data)) {
            Logg.info('KhaoSat_GetCauHoiList: '+ data);
  
            let questionInput = new Array(data.length);
            this.setState({
              questions: data,
              loadingQuestion: false,
              questionInput,
            });
          } else {
            AppNavigation.showCommonDialog({
              title: 'Lỗi',
              desc: 'Tải câu hỏi thất bại',
            });
          }
        })
        .catch((e) => {
          AppNavigation.showCommonDialog({
            title: 'Lỗi',
            desc: 'Tải câu hỏi thất bại '+e,
          });
        });
    }
    navigationButtonPressed({ buttonId, }) {
      if(buttonId==='_BACK')
      {this.props.navigator._pop();}
      if(buttonId==='save'){
        this.save();
      }
    }
    save(){
      if(this.props.item.TRANGTHAI==1)
      {return Alert.alert('Thông báo','Bạn đã thực hiện khảo sát này');}
      

      let thongtinkhachhang = '';
      let { infoInput, questionInput, questions, } = this.state;
      Logg.info('questionInput: '+JSON.stringify(questionInput));

      let dataAnswerJSON=[];
      let errors = [];
      for (let i = 0; i < infoInput.length; i++) {
        if (!infoInput[i]) {
          // errors.push(inputField[i].label + ' không được rỗng');
          break;
        } else {
          let item = ((i != 0 && '#') || '') + infoInput[i];
          thongtinkhachhang += item;
        }
      }
      let dataAnswer = '';
      for (let i = 0; i < questionInput.length; i++) {
        if (!questionInput[i]) {
          errors.push('Vui lòng trả lời hết các câu hỏi');
          break;
        } else {

          let numberAnser = 0;
          let data = '';
        

          questionInput[i].map((value, index) => {

            if (index != 0 && value) {
              numberAnser++;
            }
            if (index == 0) {
              data += '#' + value;
            } else {
              data += '#' + ((value && '1') || '0');
              let luachon;
              if(value.length>0){
                let t={
                  'daTraLoi': true,
                  'id': '',
                  'ksch': {
                    'cauhoi': '',
                    'dapan': {
                     
                      'id': questions[i].PK_SEQ ,
                      'luachon1': '',
                      'luachon2': '',
                      'luachon3': '',
                      'luachon4': '',
                      'luachon5': '',
                      'traloi': '',
                    },
                    'huongdantraloi': '',
                    'id': questions[i].PK_SEQ ,
                    'loai': '1',
                    'stt': index+1,
                  },
                  'luachon1': index===1?'1':'0',
                  'luachon2': index===2?'1':'0',
                  'luachon3': index===3?'1':'0',
                  'luachon4': index===4?'1':'0',
                  'luachon5': index===5?'1':'0',
                  'traloi': '',
                };
                dataAnswerJSON.push(t);
              }
            }
            // data += '#' + ( index == 0 && (value + '') || (value&&'1' ||'0' )))
          });
          //
          if (numberAnser == 0 && questions[i].LOAICAUHOI != '0') {
            errors.push('Vui lòng trả lời hết các câu hỏi');
            break;
          } else {
            dataAnswer +=
                ((i != 0 && ';') || '') + questions[i].PK_SEQ + data;
          }
        }
      }
      if (errors.length > 0) {
        AppNavigation.showCommonDialog({title:'Thông báo lỗi', desc: errors[0],});
      } else {
        let { userID, } = this.props;
        //Logg.info('let dataAnswerJSON= ' +JSON.stringify(dataAnswerJSON));
        post('KhaoSat_Luu', {
          userId: userID,
          thongtinkhachhang: JSON.stringify(dataAnswerJSON), //dataAnswer,
          ksId: this.props.item.PK_SEQ,
        })
          .then(({ data, error, }) => {
            if (!error && data[0].RESULT == '1') {
              SnackBar.showSuccess('Thành công');
              
            } else {
              AppNavigation.showCommonDialog({title:'Lưu thất bại', desc: errors+data[0].MSG,});
            }
          })
          .catch((e) => {
            SnackBar.showError('error');
          });
      }
    }
    
    next=()=>{
      let { indexQuestion, } = this.state;
      if (indexQuestion < this.props.item.SOCAUHOI - 1) {
        this.setState({ indexQuestion: indexQuestion + 1, });
      }
    }
    back=()=>{
      let { indexQuestion, } = this.state;
      if (indexQuestion > 0) {
        this.setState({ indexQuestion: indexQuestion - 1, });
      }
    }
    render(){
      const {item,}=this.props;
      const {questions,questionInput,indexQuestion,}= this.state;
      let question = questions[indexQuestion];
      
      return (
        <View style={styles.contain}>
          <TextCmp style={styles.textnote}>Vui lòng chọn lưu khi kết thúc </TextCmp>
          <View style ={styles.top}>
            <TextCmp  numberOfLines={2}>Tiêu đề: {item.TIEUDE}</TextCmp>
            <TextCmp  numberOfLines={2}>Nội dung: {item.DIENGIAI}</TextCmp>
            <TextCmp numberOfLines={2}>Số câu hỏi: {item.SOCAUHOI} câu hỏi </TextCmp>
            <TextCmp numberOfLines={1}>Bộ phận: {item.BOPHAN} </TextCmp>
          </View>
          {this.state.loadingQuestion?<ActivityIndicator size="small" color={Colors.HeaderColor} />:
            <ScrollView>
              <View style={{ backgroundColor: '#ffff', padding: 15,width, }}>
                <TextCmp style={styles.textcauhoi}>CÂU HỎI SỐ {question.STT}</TextCmp>
                <TextCmp style={styles.textcauhoi}>{question.CAUHOI}</TextCmp>
                <AnserQuestion  question={question} answers = {questionInput} indexQuestion={indexQuestion} saveQuestion={(answer)=>{
                  this.setState({questionInput: answer,});
                }}/>
              </View>
            </ScrollView>
          }
          <View style={styles.viewBottom}>
            <View style ={styles.btnbottom}>
              <TouchableOpacity onPress ={this.back}>
                <TextCmp style ={styles.txtnextback}>{indexQuestion > 0?'<< Back':''}</TextCmp>
              </TouchableOpacity>
              
              <TouchableOpacity  onPress ={this.next}>
                <TextCmp  style ={styles.txtnextback}>{indexQuestion < this.props.item.SOCAUHOI - 1?'Next >>':''} </TextCmp>
              </TouchableOpacity> 
            </View>
          </View>
         
          
        </View>
      );
    }
}
const styles = StyleSheet.create({
  contain:{
    //marginTop:60,
    flex:1,
    alignItems:'center',
  },
  top:{
    backgroundColor:Colors.backgroundL1,
    padding:5,

  },
  textnote:{color:Colors.HeaderColor,fontWeight:'bold',alignItems:'center',margin:3,},
  textcauhoi:{color:Colors.mainColor,alignItems:'center',},
  viewBottom:{
    position: 'absolute', bottom:0,left:0,right:0,
    height:40,backgroundColor:Colors.backgroundL1,
  },
  btnbottom:{   flexDirection:'row', justifyContent: 'space-between',},
  txtnextback:{color:Colors.HeaderColor,alignItems:'center',margin:3, padding:5,},
});
export default  connect((state) => ({
  userID: state.login.userID,
}), (dispatch) => ({ dispatch, }))(FundScreen);
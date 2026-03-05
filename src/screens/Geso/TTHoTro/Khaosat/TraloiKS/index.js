
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
import Icon from 'react-native-vector-icons/dist/FontAwesome5';
import AnserQuestion from './AnswerQuestion';
import { connect, } from 'react-redux';
import { RFValue } from 'react-native-responsive-fontsize';
import { BarIndicator, PulseIndicator } from 'react-native-indicators';

const { width, } = Dimensions.get('window');
class FundScreen extends React.Component {
  static options = {
    // statusBar: {
    //   backgroundColor:  Colors.statusBar,
    //   // drawBehind: true,
    //   visible: true,
    // },
    topBar: {
      visible: true,
      background: {
        color: Colors.HeaderColor,
      },
      leftButtons: [
        {
          id: '_BACK',
          icon: CommonIcons.back2,
        },
      ],
      // rightButtons: [
      //   {
      //     id: 'save',
      //     icon: CommonIcons.done,
      //   },
      // ],
      title: {
        text: 'Khảo Sát',
      },
    },
  };
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
    this.state = {
      tabIndex: 0,
      indexQuestion: 0,
      infoInput: ['', '', 1, '', '', '', '', '',],
      questionInput: [],
      showKeyboard: false,
      questions: [],
      loadingQuestion: true,
    };

  }
  componentDidMount() {
    post('KhaoSat_GetCauHoiList', {
      ksId: this.props.item.PK_SEQ,
    })
      .then(({ data, error, }) => {
        if (!error && Array.isArray(data)) {
          Logg.info('KhaoSat_GetCauHoiList: ' + data);

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
          desc: 'Tải câu hỏi thất bại ' + e,
        });
      });
  }
  navigationButtonPressed({ buttonId, }) {
    if (buttonId === '_BACK') { this.props.navigator._pop(); }
    // if (buttonId === 'save') {
    //   this.save();
    // }
  }
  save() {
    if (this.props.item.TRANGTHAI == 1) { return Alert.alert('Thông báo', 'Bạn đã thực hiện khảo sát này'); }


    let thongtinkhachhang = '';
    let { infoInput, questionInput, questions, } = this.state;
    Logg.info('questionInput: ' + JSON.stringify(questionInput));

    let dataAnswerJSON = [];
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
    let data = '';
    for (let i = 0; i < questionInput.length; i++) {
      if (!questionInput[i]) {
        errors.push('Vui lòng trả lời hết các câu hỏi');
        break;
      } else {

        let numberAnser = 0;
    


        //Logg.info('infoInput: '+infoInput);
        Logg.info(' questionInput[i]: ' + i, questionInput[i]);

        questionInput[i].map((value, index) => {
          // Logg.info(' questions[i].PK_SEQ :value '+index , value);
          
          if (value != '') {
            Logg.info(' questions[i].PK_SEQ :value ' + index, value);
            let t = {
              'daTraLoi': true,
              'id': '',
              'ksch': {
                'cauhoi': '',
                'dapan': {
                  'id': questions[i].PK_SEQ,
                  'luachon1': '',
                  'luachon2': '',
                  'luachon3': '',
                  'luachon4': '',
                  'luachon5': '',
                  'traloi': '',
                },
                'huongdantraloi': '',
                'id': questions[i].PK_SEQ,
                'loai': '1',
                'stt': index + 1,
              },
              'luachon1': index === 1 ? '1' : '0',
              'luachon2': index === 2 ? '1' : '0',
              'luachon3': index === 3 ? '1' : '0',
              'luachon4': index === 4 ? '1' : '0',
              'luachon5': index === 5 ? '1' : '0',
              'traloi': value,//input
            };
            dataAnswerJSON.push(t);

            if (index != 0 && value) {
              numberAnser++;
            }
            if (index == 0) {
              data += '#' + value;
            } else {
              data += '#' + ((value && '1') || '0');
              let luachon;

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

    //  return 
    if (errors.length > 0) {
      AppNavigation.showCommonDialog({ title: 'Thông báo lỗi', desc: errors[0], });
    } else {

      let { userID, } = this.props;
      Logg.info('let dataAnswerJSON data = ' +data);
      this.setState({loadingQuestion: true})
      post('KhaoSat_Luu', {
        userId: userID,
        thongtinkhachhang: JSON.stringify(dataAnswerJSON), //dataAnswer,
        ksId: this.props.item.PK_SEQ,
      })
        .then(({ data, error, }) => {
          if (!error && data[0].RESULT == '1') {
            ///SnackBar.showSuccess('Thành công');
            Alert.alert("Thông báo","Khảo sát thành công,")
            this.setState({loadingQuestion: false})
            this.props.navigator._pop();
          } else {
            this.setState({loadingQuestion: false})
            AppNavigation.showCommonDialog({ title: 'Lưu thất bại', desc: errors + data[0].MSG, });
          }
        })
        .catch((e) => {
          this.setState({loadingQuestion: false})
          SnackBar.showError('error');
        });
    }
  }

  next = () => {
    let { indexQuestion, } = this.state;
    if (indexQuestion < this.props.item.SOCAUHOI - 1) {
      this.setState({ indexQuestion: indexQuestion + 1, });
    }
  }
  back = () => {
    let { indexQuestion, } = this.state;
    if (indexQuestion > 0) {
      this.setState({ indexQuestion: indexQuestion - 1, });
    }
  }
  render() {
    const { item, } = this.props;
    const { questions, questionInput, indexQuestion, } = this.state;
    let question = questions[indexQuestion];

    return (
      <View style={styles.contain}>
       
        <View style={styles.top}>
       
          <TextCmp numberOfLines={2} style={{color: Colors.textOPVBlue, fontSize: RFValue(14),  textTransform: 'uppercase'}}>{item.TIEUDE}</TextCmp>
          <TextCmp numberOfLines={2}>Nội dung: {item.DIENGIAI}</TextCmp>
     
          <TextCmp numberOfLines={2}>Số câu hỏi: {item.SOCAUHOI} câu hỏi </TextCmp>
          <TextCmp numberOfLines={1}>Bộ phận: {item.BOPHAN} </TextCmp>
          <View style={{ borderBottomWidth: 1, borderBottomColor:Colors.BackgrondLightOPV5, marginBottom: 5 }} />
          <TextCmp style={styles.textnote}>* Vui lòng chọn lưu khi kết thúc </TextCmp>
        </View>
        {this.state.loadingQuestion ?   <BarIndicator style={{alignItems:'center',}} size={20} color={Colors.textOPVBlue} /> :
          <ScrollView>
            <View style={[styles.cauhoi,{ backgroundColor: '#ffff', padding: 15, width: width -10, }]}>
              <TextCmp style={styles.textcauhoi}>CÂU HỎI SỐ {question.STT}</TextCmp>
              <TextCmp style={styles.textcauhoi}>{question.CAUHOI}</TextCmp>
              <AnserQuestion question={question} answers={questionInput} indexQuestion={indexQuestion} saveQuestion={(answer) => {
                this.setState({ questionInput: answer, });
              }} />
            </View>
            <View style={styles.viewBottom}>
          <View style={styles.btnbottom}>
            <TouchableOpacity onPress={this.back}>
              <TextCmp style={styles.txtnextback}>

              {indexQuestion > 0 ? (
                    <>
                      {/* <Icon size={18} color={'#f3650f'} name='arrow-circle-left' /> */}
                      {' Câu hỏi trước'}
                    </>
                  ) : (
                    ''
              )}
              </TextCmp>
            </TouchableOpacity>
            {indexQuestion < this.props.item.SOCAUHOI - 1 ? (
                <TouchableOpacity style={''} onPress={this.next}>
                  <TextCmp style={styles.txtnextback}> Câu hỏi tiếp theo <Icon size={18} color={'#f3650f'} name='arrow-circle-right' /></TextCmp>
                </TouchableOpacity>
              ) : null}
              
              {indexQuestion == this.props.item.SOCAUHOI - 1 ? (
                <TouchableOpacity onPress={()=>this.save()}>
                  <TextCmp style={[styles.txtnextback, {color: Colors.textOPVBlue}]}>Hoàn thành </TextCmp>
                </TouchableOpacity>
              ) : null
                }
          </View>

        </View>
          </ScrollView>
        }



      </View>
    );
  }
}
const styles = StyleSheet.create({
  contain: {
    paddingTop: 20,
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: Colors.backgroundL3

  },
  top: {
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'flex-start',
    margin: 5,
    borderRadius: 5,
    // ...Platform.select({
    //   android: { elevation: 3 },
    //   ios: {
    //     shadowColor: '#d3d3d3',
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     shadowOffset: {
    //       width: 2,
    //       height: 2,
    //     },
    //   },
    // }),

  },
  cauhoi: {
    padding: 20,
    backgroundColor: Colors.Analogus,
 
    margin: 5,
  
    borderRadius: 5,
    // ...Platform.select({
    //   android: { elevation: 3 },
    //   ios: {
    //     shadowColor: '#d3d3d3',
    //     shadowOpacity: 1,
    //     shadowRadius: 3,
    //     shadowOffset: {
    //       width: 2,
    //       height: 2,
    //     },
    //   },
    // }),

  },
  textnote: { color: Colors.text0PV, fontStyle:'italic', fontSize: RFValue(10), fontWeight: 'bold', alignSelf: 'flex-start', marginVertical: 3, },
  textcauhoi: { color: Colors.text, alignItems: 'center', fontSize:RFValue(12) },
  viewBottom: {
 
    height: 40, backgroundColor: Colors.backgroundL1,
  },
  btnbottom: { flexDirection: 'row', justifyContent: 'space-between',  },
  txtnextback: { color: Colors.HeaderColor, alignItems: 'center', margin: 3, padding: 5,  fontWeight:'bold', fontSize:RFValue(16) },
});
export default connect((state) => ({
  userID: state.login.userID,
}), (dispatch) => ({ dispatch, }))(FundScreen);
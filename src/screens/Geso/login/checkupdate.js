import React from 'react';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import codePush from 'react-native-code-push';
import { Modal, View,Text ,Dimensions, ActivityIndicator,} from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
import { Colors,  } from '../../../theme';

const barWidth = Dimensions.get('screen').width - 80;
const progressCustomStyles = {
  backgroundColor: Colors.HeaderColor, 
  borderRadius: 5,
  borderColor: 'green',
};
console.disableYellowBox = true;
export default class Checkupdate  extends React.Component {
  constructor(){
    super();
    this.state={
      showLoading:true,
      code_push:'',
      sms:'Kiểm tra dữ liệu'
      ,maxValue:100
      ,value:0,
    };
  }
  componentDidMount(){

    codePush.sync({ updateDialog: false, },
      (status) => {
        console.log('Update installed.xxxxxxxxxxxxxxxxx ',status);
        switch (status) {
          
          case codePush.SyncStatus.UP_TO_DATE:
            // Show "downloading" modal
            //this.props.dispatch(appActions.showLoading(true));
            //Toast.show('Downloading package', Toast.POSITION.BOTTOM, Toast.LENGTH.SHORT);
            this.setState({code_push:'Installing update.',showLoading:false,});
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            // Show "downloading" modal
            //this.props.dispatch(appActions.showLoading(true));
            //Toast.show('Downloading package', Toast.POSITION.BOTTOM, Toast.LENGTH.SHORT);
            this.setState({code_push:'Kiểm tra dữ liệu',showLoading:true,});
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            // Hide "downloading" modal
            //this.props.dispatch(appActions.showLoading(true));
            //Toast.show('Installing update.', Toast.POSITION.BOTTOM, Toast.LENGTH.SHORT);
            this.setState({code_push:'Kiểm tra dữ liệu',showLoading:false,});
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            console.log('Update installed.');
            this.setState({code_push:'Kiểm tra dữ liệu',showLoading:false,});
            break;
          default :
          setTimeout(() => {
            this.setState({showLoading:false,})
          }, 1000);
          
        }
      },
      ({ receivedBytes, totalBytes, }) => {
        let p=(receivedBytes/totalBytes)*100.0 + ' %';
        let v=(receivedBytes/totalBytes)*100;
        this.setState({sms:p,maxValue:100,value:v,});
  
      }
    );


  }
  render(){
    let {showLoading,code_push,maxValue,value,sms,}=this.state;
    return (
      // <View></View>
       <Modal   animationType="fade"   transparent={true} visible={showLoading} onRequestClose={()=>{}}>
        <View
          style={{
            flex: 1,
            // backgroundColor: "rgba(0,0,0,0.3)",
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {showLoading && 
                  <View style={{
                    // borderRadius:5,
                    // shadowOffset: { width: 0, height: 6, },
                    // shadowOpacity: 0.5,
                    // shadowRadius: 2,
                    alignItems:'center',
                    justifyContent:'center',
                    height:70,
                    width:'90%',
              
                    padding:15,
                    position:'absolute',
                    bottom:50,
                    
                    
                  }}>
                    {/* <ProgressBarAnimated
                      {...progressCustomStyles}
                      width={barWidth}
                      height={10}
                      maxValue={maxValue}
                      value={value}
                    /> */}
                      <BarIndicator size={20} color={Colors.textOPVGreen} />

                   {/* <Text style={{margin:3,color:Colors.textOPVGreen,}}>{sms}</Text> */}
			              <Text style={{margin:3,color:'gray',}}>{code_push}</Text>
                  </View>
                 
                
          }
        </View>
      </Modal>
    );
  }
}
 
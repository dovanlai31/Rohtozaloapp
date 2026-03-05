import React from 'react';
import { connect, } from 'react-redux';
import {
  View,
  Text,
  StyleSheet, TouchableOpacity,
} from 'react-native';

import { setnnvbh, setnpp, resetdatasearch, } from './Search.action';
import { AppNavigation, } from '../../../app-navigation';
import { TextCmp, } from '../../../common-components';
import ViewDialog from '../DialogView/DialogView';

class SearchData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      currentCustomer: null,
      branchDefault: 'Tất cả npp',
      listNpp: [
      ],
      listNvbh: [
      ],

      currentBranch: {
        action: 'Chọn nhà phân phối',
        Id: null,
        vungSearch: null,
        asmSearch: null,
        kvSearch: null,
        gsbhSearch: null,
      },
      currentSale: {
        action: 'Chọn Nvbh',
        Id: null,
        vungSearch: null,
        asmSearch: null,
        kvSearch: null,
        gsbhSearch: null,
        nppSearch: null,
      },
    };

  }
  getAlert() {
    alert('clicked');
  }
  componentDidMount() {
    const { listNpp, listNvbh, } = this.state;
    //npp
    const datasv = JSON.parse(this.props.listBranch.NPPLIST);
    datasv.map((item) => {
      item2 = {
        ten: item.ten,
        id: item.pk_seq,
      };
      listNpp.push(item2);
    });
    //nhanvienbh
    const datasvnv = JSON.parse(this.props.listBranch.SRLIST);
    datasvnv.map((item) => {
      item2 = {
        ten: item.ten,
        id: item.pk_seq,
        nppSearch:item.nppSearch,
      };
      listNvbh.push(item2);
    });
    //
    this.props.dispatch(resetdatasearch());

  }
    onPressListBranch = () => {

      let { listNpp, currentBranch,currentSale, } = this.state;
      
      AppNavigation.showCommonDialog({renderContent: ()=> 
        <ViewDialog  title={'Chọn Npp'} 
          content={listNpp} 
          onPressItem ={(item)=>
          {
            if ( item.id && item.id!=currentBranch.Id) {
              //nvbh
              currentSale.action = 'Chọn nhân nvbh';
              currentSale.Id = null;
              this.props.dispatch(setnnvbh(null));
              //npp
              currentBranch.action = item.ten;
              currentBranch.Id = item.id;
              this.props.dispatch(setnpp(item.id));
              //set lại nvbh
              let listNvbh= [];
              let datasvnv = JSON.parse(this.props.listBranch.SRLIST);
              datasvnv.map((item) => {
                item2 = {
                  ten: item.ten,
                  id: item.pk_seq,
                  nppSearch:item.nppSearch,
                };
                if(item2.nppSearch==currentBranch.Id)
                {listNvbh.push(item2);}
              });
              this.setState({listNvbh,});
            }
            else{
              //set lại nvbh
              let listNvbh= [];
              let datasvnv = JSON.parse(this.props.listBranch.SRLIST);
              datasvnv.map((item) => {
                item2 = {
                  ten: item.ten,
                  id: item.pk_seq,
                  nppSearch:item.nppSearch,
                };
                //if(item2.nppSearch==currentBranch.Id)
                listNvbh.push(item2);
              });
              this.setState({listNvbh,});
              this.props.dispatch(setnpp(null));
            }
        
          } 
          }
        />
        ,  });

      
    };
    onPressListSale = () => {
      let { listNvbh, currentSale,listNpp, currentBranch, } = this.state;

      AppNavigation.showCommonDialog({renderContent: ()=> 
        <ViewDialog  title={'Chọn Nvbh'} 
          content={listNvbh} 
          onPressItem ={(item)=>{
            currentSale.action = 'Chọn Nvbh';
            currentSale.Id = null;
            if (item.id != null && item.id != currentSale.Id) {
              //nvbh
              currentSale.action = item.ten;
              currentSale.Id = item.id;
              this.props.dispatch(setnnvbh(item.id));
              //set lai npp
              listNpp.map((npp)=>{
                if(item.nppSearch==npp.id){
                  currentBranch.action = npp.ten;
                  currentBranch.Id = npp.id;
                  this.props.dispatch(setnpp(npp.id));
                }
              });
      
            }
            else
            {this.props.dispatch(setnnvbh(null));}
      
            return this.setState({ currentSale ,currentBranch,});

          }} />
        ,  });


    };
    render() {
      return (
        <View style={{}}>
          <TouchableOpacity
            style={styles.dropdownView}
            onPress={this.onPressListBranch}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, }}>{this.state.currentBranch.action}</TextCmp>
            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownView}
            onPress={this.onPressListSale}
          >
            <TextCmp style={{ textAlign: 'center', flex: 1, }}>{this.state.currentSale.action}</TextCmp>
            <Icons name="down-arrow" size={20} color="rgba(0,0,0,0.8)" />
          </TouchableOpacity>
        </View>
      );
    }
}
const styles = StyleSheet.create(
  {

    dropdownView: {
      height: 40,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.1)',
      borderRadius: 5,
      flexDirection: 'row',
      paddingHorizontal: 10,
      alignItems: 'center',
      marginTop: 5,
      //marginLeft: 10,
      // marginRight: 10,
    },
  }
);
export default connect((state) => ({
  listBranch: state.app.listBranch,
}), (dispatch) => ({ dispatch, }))(SearchData);
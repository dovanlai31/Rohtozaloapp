import React from 'react';
import { connect } from 'react-redux';
import ReportView from './Bc_ql_ctsp_Presenter';
import { report } from './Bc_ql_ctsp_action';
import { Notify } from '../../../modules/common';
import moment from 'moment';
import { branchDefault } from '../../../constants';

class Bc_ql_ctsp_container extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentBranch: branchDefault,
			visiblePanel: false,
			searchKeyword: '',
			currentCustomer: '',
			payload: {

				tungay: moment(new Date()).format('YYYY-MM-DD'),
				denngay: moment(new Date()).format('YYYY-MM-DD'),

			},
			report: '[]',
			ansearch:false,
			listtrangthai:[{id:0,label:'Chọn trạng thái'},{id:1,label:'Chưa chốt'},{id:2,label:'Đã chốt'}],
			currenttrangthai:{id:0,label:'Chọn trạng thái'}
		};
	}

	componentDidMount() {
		//this.getReport();
	}

	getReport = () => {
		//public DataTable BaocaodoanhsoSanPham(string trangthaidh, string trangthaitrave, string tungay, string denngay, string loai, string id,
		//string userId, string vungId, string asmId, string kvId, string gsbhId, string nppId, string ddkdId
        
		let params = {

			userId: this.props.listBranch.USERID,
			nvId:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
			id:this.props.listBranch.ID==null?'':this.props.listBranch.ID,
			ddkdId: this.props.SearchData.NvbhId ==null?'':this.props.SearchData.NvbhId,
			tungay: this.state.payload.tungay,
			denngay: this.state.payload.denngay,
			nppId: this.props.SearchData.NppId ==null?'':this.props.SearchData.NppId,
			trangthaidh:this.state.currentBranch.id ==null?'':this.state.currentBranch.id,
			idnhom:'',
			loai:this.props.listBranch.LOAI,
			vungId:'',kvId:'',asmId:'',gsbhId:'',
			trangthaitrave:''
		};
		//if (params.ddkdId) {
			const { dispatch } = this.props;
			//let { payload } = this.state;
			dispatch(report(params)).then((res) => {
				if (res && res.length > 0) {

					this.setState({ report: res });
				} else this.setState({ report: 'Không có dữ liệu.' });
			});
		//} else {
		//	Notify.show("Thông báo", "Vui lòng chọn nhân viên bán hàng")
		//}

	};



	setToTime = (date) => {
		const { payload } = this.state;
		payload.denngay = date;
		this.setState({ payload });
	};

	setFromTime = (date) => {
		const { payload } = this.state;
		payload.tungay = date;
		this.setState({ payload });
	};
	ansearch=()=>{
		const a=this.state.ansearch
		this.setState({ansearch:!a})
	}
	clicktrangthai(){
		let { listtrangthai,currenttrangthai, } = this.state;
        Notify.show('Chọn trạng thái', {
            items:listtrangthai,
            onPressItem: (item, index) => {
                currenttrangthai.label = 'Chọn trạng thái';
                currenttrangthai.Id = 0;
                if (item.id != null && item.id != currenttrangthai.id) {
                    //
                    currenttrangthai.label = item.label;
                    currenttrangthai.id = item.id;
                  
                  

                }
               

                return this.setState({ listtrangthai ,currenttrangthai});
            },
        });
	}
	render() {
		return (
			<ReportView
				onBack={this.props.navigation.state.params.callback}

				setToTime={this.setToTime}
				setFromTime={this.setFromTime}
				getReport={this.getReport}
				time={this.state.payload}
				report={this.state.report}
				ansearch={this.ansearch}
				isan={this.state.ansearch}
				clicktrangthai={()=>this.clicktrangthai()}
				listtrangthai={this.state.listtrangthai}
				currenttrangthai={this.state.currenttrangthai}
			/>
		);
	}
}

export default connect(
	(state) => ({
		listBranch: state.app.listBranch,
		SearchData: state.SearchData
	}),
	(dispatch) => ({ dispatch }),
)(Bc_ql_ctsp_container);

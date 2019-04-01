import React, {Component} from 'react';
import { connect } from 'react-redux';

import { message, Modal, notification} from 'antd';

import { noticeClear} from '../../actions/noticeActions';

class Notice extends Component{
    noticeClear(){
        setTimeout(()=>{
            this.props.noticeClear()
        }, 3000);
    }

    componentDidUpdate(){
        const key = `open${Date.now()}`;
        switch(this.props.notice.type){         
            case 'success':
                this.noticeClear();
                
                notification.success({
                    message: this.props.notice.title,
                    description: this.props.notice.text,
                    placement: 'topRight',
                    key,
                    duration: 3,
                });
                
                break;
            case 'success_modal':
                Modal.info({
                    title: this.props.notice.title,
                    content: this.props.notice.text,
                    iconType: 'info',
                    width: '550px',
                    onOk: this.props.noticeClear()
                })
                break;
            case 'info':
                this.noticeClear();
                
                notification.info({
                    message: this.props.notice.title,
                    description: this.props.notice.text,
                    placement: 'topRight',
                    key,
                    duration: 10,
                });
                
                break;
            case 'error':
                this.noticeClear();
                
                notification.error({
                    message: this.props.notice.title,
                    description: this.props.notice.text,
                    placement: 'topRight',
                    key,
                    duration: 5,
                });
                
                break;
            case 'warning':
                message.warning(this.props.notice.text, 5);
                this.noticeClear();
                break;

            default:
            break;
        }
    }

    render() {
        return ( 
            <div></div>
        )
    }    
}

const mapStateToProps = state => ({
    notice: state.notice
})

const mapDispatchToProps = dispatch => ({
    noticeClear: () => dispatch(noticeClear()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notice);
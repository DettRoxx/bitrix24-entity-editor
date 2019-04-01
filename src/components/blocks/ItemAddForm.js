import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Drawer, Upload, message, Row, Col} from 'antd';

import { addItem, itemAddFormChange, itemAddFormClose} from '../../actions/itemActions';

const FormItem = Form.Item;
const { TextArea } = Input;

class ItemAddForm extends Component {

    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';
        updatedSubmission['validation']['entity'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.item_add_form_data);

        event.target.id.search('property_') !== -1 
            ? updatedSubmission['properties'][event.target.id.split('_')[1]] = event.target.value
            : updatedSubmission[event.target.id] = event.target.value;
            
        updatedSubmission[event.target.id] = event.target.value;

        this.props.itemAddFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { 
            entity:ENTITY, 
            name:NAME, 
            preview_text:PREVIEW_TEXT, 
            detail_text:DETAIL_TEXT, 
            preview_picture:PREVIEW_PICTURE, 
            detail_picture:DETAIL_PICTURE, 
            properties:PROPERTY_VALUES,
            section:SECTION
        } = this.props.item_add_form_data;
        
        this.props.addItem({ENTITY, NAME, PREVIEW_TEXT, DETAIL_TEXT, PREVIEW_PICTURE, DETAIL_PICTURE, PROPERTY_VALUES, SECTION}); 
        this.props.itemAddFormClose();
    }

    addFormHasErrors(){
        if(Object.keys(this.props.item_add_form_data.validation).some(item=>this.props.item_add_form_data.validation[item].length>0))
            return true;

        if(this.props.item_add_form_data.name === '')
            return true;

        if(this.props.item_add_form_data.entity === '')
            return true;
    }

    getBase64(file, callback) {
        let reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    pitctureValidate(file) {
        let isJPG = file.type === 'image/jpeg';
        let isGIF = file.type === 'image/gif';
        let isPNG = file.type === 'image/png';
        
        let isValidFormat = (isJPG || isGIF || isPNG);

        if (!isValidFormat) {
          message.error('You can only upload JPG or GIF file!');
        }

        //let isLt5M = file.size / 1024 / 1024 < 5;

        return isValidFormat;
    }

    customRequest = ({ onSuccess, onError, file }) => {return};

    handleUploadChange = (...params) => {
        let item = params[0];
        let info = params[1];
        let fileName = params[1].file.name;

        if (info.file.status === 'uploading') {
            this.getBase64(info.file.originFileObj, (data)=>{
                let event = {};
                event.target = {};
                event.target.id = `${item}`;
                event.target.value = [];
                event.target.value.push(fileName);
                event.target.value.push(data.split('base64,')[1]);
                this.updateSubmission(event);
            });
        }
    }

    removeFile(item){
        let event = {};
        event.target = {};
        event.target.id = `${item}`;
        event.target.value = '';
        this.updateSubmission(event);
    }

    render(){
        return (
            <Drawer title={'ADD ITEM FORM'}
                visible={this.props.item_add_form_data.visible}
                onCancel={this.props.itemAddFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='700px'
                placement="right"
                mask={false}
                onClose={this.props.itemAddFormClose.bind(this)}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.item_add_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.item_add_form_data.validation.name}
        
                            >
                                <Input  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_add_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                        
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Preview text"
                            >
                                <TextArea  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_add_form_data.preview_text} onChange={this.updateSubmission.bind(this)} id="preview_text" disabled={false} type="text" placeholder = "" />
                        
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Detail text"
                            >
                                <TextArea  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_add_form_data.detail_text} onChange={this.updateSubmission.bind(this)} id="detail_text" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <FormItem 
                                label="Preview picture"
                            >

                                <Upload
                                    name="avatar"
                                    onChange={this.handleUploadChange.bind(this, 'preview_picture')}
                                    beforeUpload={this.pitctureValidate}
                                    multiple={false}
                                    showUploadList={false}
                                    customRequest={this.customRequest}
                                >
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Upload>

                                {
                                    this.props.item_add_form_data.preview_picture 
                                    ? 
                                        <div>
                                            <Icon type='file-jpg'/> 
                                            {this.props.item_add_form_data.preview_picture[0]}
                                            <Button onClick={this.removeFile.bind(this, 'preview_picture')}>
                                                <Icon type='delete'/> 
                                            </Button>
                                        </div>
                                    : null
                                }
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem 
                                label="Detail picture"
                            >

                                <Upload
                                    name="avatar"
                                    onChange={this.handleUploadChange.bind(this, 'detail_picture')}
                                    beforeUpload={this.pitctureValidate}
                                    multiple={false}
                                    showUploadList={false}
                                    customRequest={this.customRequest}
                                >
                                    <Button>
                                        <Icon type="upload" /> Upload
                                    </Button>
                                </Upload>

                                {
                                    this.props.item_add_form_data.detail_picture 
                                    ? 
                                        <div>
                                            <Icon type='file-jpg'/> 
                                            {this.props.item_add_form_data.detail_picture[0]}
                                            <Button onClick={this.removeFile.bind(this, 'detail_picture')}>
                                                <Icon type='delete'/> 
                                            </Button>
                                        </div>
                                    : null
                                }
                            </FormItem>
                        </Col>
                    </Row>
                    
                    {Object.keys(this.props.item_properties_dictonary).map((item,index)=>{
                        let propsDict = this.props.item_properties_dictonary[item];
                        let propsData = {...this.props.item_add_form_data.properties};

                        return (
                            <Row gutter={16} key={item}>
                                <Col span={24}>
                                    <FormItem
                                        key={item} 
                                        label={`Property: ${propsDict.NAME}`}
                                    >
                                    {
                                        propsDict.TYPE === 'F' 
                                        ?   
                                            /* property file handler will be here */
                                            null
                                        :   
                                            <Input 
                                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                                value={propsData[propsDict.PROPERTY]} 
                                                onChange={this.updateSubmission.bind(this)} 
                                                id={`property_${propsDict.PROPERTY}`} 
                                                type="text" 
                                            />
                                    } 
                                    </FormItem>
                                </Col>
                            </Row>
                        )   
                    })}
           
                    <Input id="entity" value={this.props.item_add_form_data.entity}  type="hidden"/>
                    <Input id="section" value={this.props.item_add_form_data.section}  type="hidden"/>
                </Form>

                <div
                    style={{
                        width: '100%',
                        padding: '10px 16px',
                        textAlign: 'right',
                        left: 0,
                        background: '#fff',
                        borderRadius: '0 0 4px 4px',
                    }}
                >
                    <Button 
                        onClick={this.submitSubmission.bind(this)} 
                        disabled={this.addFormHasErrors()}
                        placement="right"
                        type="primary"
                        icon="save"
                    >
                        ADD
                    </Button>
                </div>
            </Drawer>
        )
    }
}

const mapStateToProps = (state, ownParams) => ({
    item_add_form_data: state.item.item_add_form_data,
    item_properties_dictonary: state.item.item_properties_dictonary,
    ownParams
})

const mapDispatchToProps = dispatch => ({
    addItem: payload => dispatch(addItem(payload)),
    itemAddFormChange: payload => dispatch(itemAddFormChange(payload)),
	itemAddFormClose: () => dispatch(itemAddFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemAddForm);
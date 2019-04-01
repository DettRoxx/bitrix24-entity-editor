import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Drawer, Upload, message, TreeSelect, Row, Col} from 'antd';

import { updateItem, itemUpdateFormChange, itemUpdateFormClose} from '../../actions/itemActions';

const FormItem = Form.Item;
const { TextArea } = Input;

class ItemUpdateForm extends Component {
    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.item_update_form_data);

        event.target.id.search('property_') !== -1 
            ? updatedSubmission['properties'][event.target.id.split('_')[1]] = event.target.value
            : updatedSubmission[event.target.id] = event.target.value;

        this.props.itemUpdateFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { 
            id:ID, 
            entity:ENTITY, 
            name:NAME, 
            preview_text:PREVIEW_TEXT, 
            detail_text:DETAIL_TEXT, 
            preview_picture:PREVIEW_PICTURE, 
            detail_picture:DETAIL_PICTURE, 
            properties:PROPERTY_VALUES,
            section:SECTION
        } = this.props.item_update_form_data;

        let payload = {ID, ENTITY, NAME, PREVIEW_TEXT, DETAIL_TEXT, PREVIEW_PICTURE, DETAIL_PICTURE, PROPERTY_VALUES, SECTION};

        if(PREVIEW_PICTURE !== '' && !Array.isArray(PREVIEW_PICTURE))
            delete payload.PREVIEW_PICTURE;

        if(DETAIL_PICTURE !== '' && !Array.isArray(DETAIL_PICTURE))
            delete payload.DETAIL_PICTURE;
        
        this.props.updateItem(payload); 
        this.props.itemUpdateFormClose();
    }

    formHasErrors(){
        if(Object.keys(this.props.item_update_form_data.validation).some(item=>this.props.item_update_form_data.validation[item].length>0))
            return true;

        if(this.props.item_update_form_data.name === '')
            return true;
    }

    handleSectionChange = (section) => {
        let event = {};
        event.target = {};
        event.target.id = 'section';
        event.target.value = section;
        this.updateSubmission(event);
    }

    getSectionTreeData = (sections, inTree=[]) => {
        return sections.map(section => {
            if(inTree.includes(section.ID))
                return null;

            inTree.push(section.ID);

            let result = { 
                key: section.ID,
                title: section.NAME,
                value: section.ID
            }
            
            let children = this.getSectionTreeData(this.props.sections_all.filter(item => item.SECTION === section.ID), inTree);

            if(children.length > 0)
                result['children'] = children;

            return result;

        }).filter(item => item)
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

    customRequest({ onSuccess, onError, file }){
        return;
    }

    handleUploadChange = (...params) => {
        let item = params[0];
        let info = params[1];
        let fileName = params[1].file.name;

        if (info.file.status === 'uploading'){
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
        let previewPictureData = this.props.item_update_form_data.preview_picture || false;
        let detailPictureData = this.props.item_update_form_data.detail_picture || false;

        return (
            <Drawer title="ITEM UPDATE FORM"
                visible={this.props.item_update_form_data.visible}
                onCancel={this.props.itemUpdateFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='700px'
                placement="right"
                mask={false}
                onClose={this.props.itemUpdateFormClose.bind(this)}
            >
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.item_update_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.item_update_form_data.validation.name}

                            >
                                <Input  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_update_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                        
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Section"
                            >
                                <TreeSelect
                                    dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                                    placeholder="Please select section"
                                    treeData={[{key:0,title:'root section',value:''}, ...this.getSectionTreeData(this.props.sections_all)]}
                                    value={this.props.item_update_form_data.section ? this.props.item_update_form_data.section : ''}
                                    allowClear
                                    treeDefaultExpandAll
                                    onChange={this.handleSectionChange}
                                />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Preview text"
                            >
                                <TextArea  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_update_form_data.preview_text} onChange={this.updateSubmission.bind(this)} id="preview_text" disabled={false} type="text" placeholder = "" />
                        
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <FormItem 
                                label="Detail text"
                            >
                                <TextArea  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_update_form_data.detail_text} onChange={this.updateSubmission.bind(this)} id="detail_text" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={16}>
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
                                    this.props.item_update_form_data.preview_picture 
                                    ? 
                                        <div>
                                            {previewPictureData && Array.isArray(previewPictureData) 
                                                ? `${previewPictureData[0]}`  
                                                : <img alt="" src={previewPictureData} width='200' height='200' />
                                            }
        
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
                                    this.props.item_update_form_data.detail_picture 
                                    ? 
                                        <div>
                                            {detailPictureData && Array.isArray(detailPictureData) 
                                                ? `${detailPictureData[0]}`  
                                                : <img alt="" src={detailPictureData} width='200' height='200' />
                                            }
        
                                            <Button onClick={this.removeFile.bind(this, 'detail_picture')}>
                                                <Icon type='delete'/> 
                                            </Button>
                                        </div>
                                    : null
                                }
                            </FormItem>
                        </Col>
                    </Row>

                    {Object.keys(this.props.item_update_form_data.properties).map((item)=>{
                        let propsDict = this.props.item_properties_dictonary.filter(dict=>dict.PROPERTY === item)[0];
                        let propsData = {...this.props.item_update_form_data.properties};

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
                                                style={{ width:'400px' }} 
                                                prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} 
                                                value={propsData[item]} 
                                                onChange={this.updateSubmission.bind(this)} 
                                                id={`property_${item}`} 
                                                type="text" 
                                            />
                                    } 
                                    </FormItem>
                                </Col>
                            </Row>
                        )   
                    })}
                    <Input id="entity" value={this.props.item_update_form_data.entity}  type="hidden"/>
                    <Input id="id" value={this.props.item_update_form_data.id}  type="hidden"/>
                    <Input id="section" value={this.props.item_update_form_data.section}  type="hidden"/>
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
                        disabled={this.formHasErrors()}
                        placement="right"
                        type="primary"
                        icon="save"
                    >
                    UPDATE
                    </Button>
                </div>
            </Drawer>
        )
    }
}

const mapStateToProps = state => ({
    item_update_form_data: state.item.item_update_form_data,
    item_properties_dictonary: state.item.item_properties_dictonary,
    sections_all: state.section.sections_all
})

const mapDispatchToProps = dispatch => ({
    updateItem: payload => dispatch(updateItem(payload)),
    itemUpdateFormChange: payload => dispatch(itemUpdateFormChange(payload)),
	itemUpdateFormClose: () => dispatch(itemUpdateFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemUpdateForm);
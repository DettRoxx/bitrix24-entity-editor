import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Drawer, Row, Col} from 'antd';

import { addItemProperty, itemPropertyAddFormChange, itemPropertyAddFormClose} from '../../actions/itemPropertyActions';

const FormItem = Form.Item;

class ItemPropertyAddForm extends Component {

    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';
        //updatedSubmission['validation']['type'] = '';
        updatedSubmission['validation']['property'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        if(updatedSubmission['property'].length === 0 )
            updatedSubmission['validation']['property'] = 'should be filled';

        //if(updatedSubmission['type'].length == 0 )
            //updatedSubmission['validation']['type'] = 'should be filled';
        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.item_property_add_form_data);

        updatedSubmission[event.target.id] = event.target.value;

        this.props.itemPropertyAddFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { entity:ENTITY, name:NAME, type:TYPE, property:PROPERTY} = this.props.item_property_add_form_data;
        this.props.addItemProperty({ENTITY, NAME, TYPE:"S", PROPERTY}); 
        this.props.itemPropertyAddFormClose();
    }

    addFormHasErrors(){
        if(Object.keys(this.props.item_property_add_form_data.validation).some(item=>this.props.item_property_add_form_data.validation[item].length>0))
            return true;

        if(this.props.item_property_add_form_data.name === '')
            return true;

        if(this.props.item_property_add_form_data.entity === '')
            return true;
    }

    render(){
        return (
            <Drawer title={'PROPERTY ADD FORM'}
                visible={this.props.item_property_add_form_data.visible}
                onCancel={this.props.itemPropertyAddFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='400px'
                placement="right"
                onClose={this.props.itemPropertyAddFormClose.bind(this)}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.item_property_add_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.item_property_add_form_data.validation.name}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_add_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Property"
                                validateStatus={this.props.item_property_add_form_data.validation.property.length ? "error" : "success"}
                                help={this.props.item_property_add_form_data.validation.property}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_add_form_data.property} onChange={this.updateSubmission.bind(this)} id="property" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    {/*
                    <FormItem 
                        label="TYPE"
                        validateStatus={this.props.item_property_add_form_data.validation.type.length ? "error" : "success"}
                        help={this.props.item_property_add_form_data.validation.type}
                        {...formItemLayout}
                    >
                        <Input style={{ width:'400px' }} prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_add_form_data.type} onChange={this.updateSubmission.bind(this)} id="type" disabled={false} type="text" placeholder = "" />
                    </FormItem>
                    */}
                    <Input id="entity" value={this.props.item_property_add_form_data.entity}  type="hidden"/>
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
    item_property_add_form_data: state.property.item_property_add_form_data,
    ownParams
})

const mapDispatchToProps = dispatch => ({
    addItemProperty: payload => dispatch(addItemProperty(payload)),
    itemPropertyAddFormChange: payload => dispatch(itemPropertyAddFormChange(payload)),
	itemPropertyAddFormClose: () => dispatch(itemPropertyAddFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPropertyAddForm);
import React, { Component} from 'react';
import { connect } from 'react-redux';
import { updateItemProperty, itemPropertyUpdateFormChange, itemPropertyUpdateFormClose} from '../../actions/itemPropertyActions';
import { Form, Icon, Input, Button, Drawer, Row, Col} from 'antd';
const FormItem = Form.Item;

class ItemPropertyUpdateForm extends Component {
    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';
        updatedSubmission['validation']['type'] = '';
        updatedSubmission['validation']['property_new'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        if(updatedSubmission['type'].length === 0 )
            updatedSubmission['validation']['type'] = 'should be filled';

        if(updatedSubmission['property_new'].length === 0 )
            updatedSubmission['validation']['property_new'] = 'should be filled';

        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.item_property_update_form_data);

        updatedSubmission[event.target.id] = event.target.value;

        this.props.itemPropertyUpdateFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { entity:ENTITY, name:NAME, type:TYPE, property:PROPERTY, property_new:PROPERTY_NEW} = this.props.item_property_update_form_data;
        this.props.updateItemProperty({ENTITY, NAME, TYPE, PROPERTY, PROPERTY_NEW}); 
        this.props.itemPropertyUpdateFormClose();
    }

    formHasErrors(){
        if(Object.keys(this.props.item_property_update_form_data.validation).some(item=>this.props.item_property_update_form_data.validation[item].length>0))
            return true;

        if(this.props.item_property_update_form_data.name === '')
            return true;

        if(this.props.item_property_update_form_data.entity === '')
            return true;
    }

    render(){
        return (
            <Drawer title="PROPERTY UPDATE FORM"
                visible={this.props.item_property_update_form_data.visible}
                onCancel={this.props.itemPropertyUpdateFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='400px'
                placement="right"
                onClose={this.props.itemPropertyUpdateFormClose.bind(this)}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.item_property_update_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.item_property_update_form_data.validation.name}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_update_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Property code"
                                validateStatus={this.props.item_property_update_form_data.validation.property_new.length ? "error" : "success"}
                                help={this.props.item_property_update_form_data.validation.property_new}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_update_form_data.property_new} onChange={this.updateSubmission.bind(this)} id="property_new" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    {/*
                    <FormItem 
                        label="TYPE"
                        validateStatus={this.props.item_property_update_form_data.validation.type.length ? "error" : "success"}
                        help={this.props.item_property_update_form_data.validation.type}
                        {...formItemLayout}
                    >
                        <Input style={{ width:'400px' }} prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.item_property_update_form_data.type} onChange={this.updateSubmission.bind(this)} id="type" disabled={false} type="text" placeholder = "" />
                    </FormItem>
                    */}
                    <Input id="type" value="S" type="hidden"/>
                    <Input id="entity" value={this.props.item_property_update_form_data.entity}  type="hidden"/>
                    <Input id="property" value={this.props.item_property_update_form_data.property}  type="hidden"/>
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
    item_property_update_form_data: state.property.item_property_update_form_data,
})

const mapDispatchToProps = dispatch => ({
    updateItemProperty: payload => dispatch(updateItemProperty(payload)),
    itemPropertyUpdateFormChange: payload => dispatch(itemPropertyUpdateFormChange(payload)),
	itemPropertyUpdateFormClose: () => dispatch(itemPropertyUpdateFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPropertyUpdateForm);
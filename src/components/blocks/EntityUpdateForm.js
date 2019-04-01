import React, { Component} from 'react';
import { connect } from 'react-redux';
import { updateEntity, entityUpdateFormChange, entityUpdateFormClose} from '../../actions/entityActions';
import { Form, Icon, Input, Button, Drawer, Col, Row} from 'antd';
const FormItem = Form.Item;

class EntityUpdateForm extends Component {
    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';
        updatedSubmission['validation']['entity_new'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        if(updatedSubmission['entity_new'].length === 0 )
            updatedSubmission['validation']['entity_new'] = 'should be filled';

        if(updatedSubmission['entity_new'].length > 13 )
            updatedSubmission['validation']['entity_new'] = 'too long';

        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.entity_update_form_data);

        updatedSubmission[event.target.id] = event.target.value;

        this.props.entityUpdateFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { entity:ENTITY, name:NAME, entity_new:ENTITY_NEW} = this.props.entity_update_form_data;
        this.props.updateEntity({ENTITY, NAME, ENTITY_NEW}); 
        this.props.entityUpdateFormClose();
    }

    formHasErrors(){
        if(Object.keys(this.props.entity_update_form_data.validation).some(item=>this.props.entity_update_form_data.validation[item].length>0))
            return true;

        if(this.props.entity_update_form_data.name === '')
            return true;

        if(this.props.entity_update_form_data.entity === '')
            return true;
    }

    render(){
        return (
            <Drawer title="ENTITY UPDATE"
                visible={this.props.entity_update_form_data.visible}
                onCancel={this.props.entityUpdateFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='300px'
                placement="right"
                mask={false}
                onClose={this.props.entityUpdateFormClose.bind(this)}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="NAME"
                                validateStatus={this.props.entity_update_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.entity_update_form_data.validation.name}
                            >
                                <Input  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.entity_update_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="ENTITY"
                                validateStatus={this.props.entity_update_form_data.validation.entity_new.length ? "error" : "success"}
                                help={this.props.entity_update_form_data.validation.entity_new}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.entity_update_form_data.entity_new} onChange={this.updateSubmission.bind(this)} id="entity_new" disabled={false} type="text" placeholder = "" />
                                <Input id="entity" value={this.props.entity_update_form_data.entity}  type="hidden"/>
                            </FormItem>
                        </Col>
                    </Row>
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
    entity_update_form_data: state.entity.entity_update_form_data,
})

const mapDispatchToProps = dispatch => ({
    updateEntity: payload => dispatch(updateEntity(payload)),
    entityUpdateFormChange: payload => dispatch(entityUpdateFormChange(payload)),
	entityUpdateFormClose: () => dispatch(entityUpdateFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityUpdateForm);
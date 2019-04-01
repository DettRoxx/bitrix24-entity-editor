import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Drawer, Row, Col} from 'antd';

import { addEntity, entityAddFormChange, entityAddFormClose} from '../../actions/entityActions';

const FormItem = Form.Item;

class EntityAddForm extends Component {

    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';
        updatedSubmission['validation']['entity'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        if(updatedSubmission['entity'].length === 0 )
            updatedSubmission['validation']['entity'] = 'should be filled';

        if(updatedSubmission['entity'].length > 13 )
            updatedSubmission['validation']['entity'] = 'too long';
        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.entity_add_form_data);

        updatedSubmission[event.target.id] = event.target.value;

        this.props.entityAddFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        this.props.addEntity(this.props.entity_add_form_data); 
        this.props.entityAddFormClose();
    }

    addFormHasErrors(){
        if(Object.keys(this.props.entity_add_form_data.validation).some(item=>this.props.entity_add_form_data.validation[item].length>0))
            return true;

        if(this.props.entity_add_form_data.name === '')
            return true;

        if(this.props.entity_add_form_data.entity === '')
            return true;
    }

    render(){
        return (
            <Drawer title={'ENTITY ADD FORM'}
                visible={this.props.entity_add_form_data.visible}
                onCancel={this.props.entityAddFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='300px'
                placement="right"
                mask={false}
                onClose={this.props.entityAddFormClose.bind(this)}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.entity_add_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.entity_add_form_data.validation.name}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.entity_add_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Entity code"
                                validateStatus={this.props.entity_add_form_data.validation.entity.length ? "error" : "success"}
                                help={this.props.entity_add_form_data.validation.entity}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.entity_add_form_data.entity} onChange={this.updateSubmission.bind(this)} id="entity" disabled={false} type="text" placeholder = "" />
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
    entity_add_form_data: state.entity.entity_add_form_data,
    ownParams
})

const mapDispatchToProps = dispatch => ({
    addEntity: payload => dispatch(addEntity(payload)),
    entityAddFormChange: payload => dispatch(entityAddFormChange(payload)),
	entityAddFormClose: () => dispatch(entityAddFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityAddForm);
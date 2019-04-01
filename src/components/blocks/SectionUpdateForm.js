import React, { Component} from 'react';
import { connect } from 'react-redux';
import { updateSection, sectionUpdateFormChange, sectionUpdateFormClose} from '../../actions/sectionActions';
import { Form, Icon, Input, Button, Drawer, Row, Col} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class SectionUpdateForm extends Component {
    validation(updatedSubmission){
        updatedSubmission['validation']['name'] = '';

        if(updatedSubmission['name'].length === 0 )
            updatedSubmission['validation']['name'] = 'should be filled';

        return updatedSubmission;
    }

    updateSubmission(event){
        let updatedSubmission = Object.assign({}, this.props.section_update_form_data);

        updatedSubmission[event.target.id] = event.target.value;

        this.props.sectionUpdateFormChange(this.validation(updatedSubmission));
    }

    submitSubmission(){
        let { id:ID, entity:ENTITY, name:NAME, description:DESCRIPTION, section:SECTION} = this.props.section_update_form_data;
        this.props.updateSection({ID, ENTITY, NAME, DESCRIPTION, SECTION}); 
        this.props.sectionUpdateFormClose();
    }

    formHasErrors(){
        if(Object.keys(this.props.section_update_form_data.validation).some(item=>this.props.section_update_form_data.validation[item].length>0))
            return true;

        if(this.props.section_update_form_data.name === '')
            return true;
    }

    render(){
        return (
            <Drawer title="SECTION UPDATE FORM"
                visible={this.props.section_update_form_data.visible}
                onCancel={this.props.sectionUpdateFormClose.bind(this)}
                onOk={this.submitSubmission.bind(this)}
                width='500px'
                placement="right"
                onClose={this.props.sectionUpdateFormClose.bind(this)}
            >
                <Form layout="vertical">
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Name"
                                validateStatus={this.props.section_update_form_data.validation.name.length ? "error" : "success"}
                                help={this.props.section_update_form_data.validation.name}
                            >
                                <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.section_update_form_data.name} onChange={this.updateSubmission.bind(this)} id="name" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <FormItem 
                                label="Description"
                            >
                                <TextArea prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} value={this.props.section_update_form_data.description} onChange={this.updateSubmission.bind(this)} id="description" disabled={false} type="text" placeholder = "" />
                            </FormItem>
                        </Col>
                    </Row>
                    <Input id="entity" value={this.props.section_update_form_data.entity}  type="hidden"/>
                    <Input id="id" value={this.props.section_update_form_data.id}  type="hidden"/>
                    <Input id="section" value={this.props.section_update_form_data.section}  type="hidden"/>
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
    section_update_form_data: state.section.section_update_form_data,
})

const mapDispatchToProps = dispatch => ({
    updateSection: payload => dispatch(updateSection(payload)),
    sectionUpdateFormChange: payload => dispatch(sectionUpdateFormChange(payload)),
	sectionUpdateFormClose: () => dispatch(sectionUpdateFormClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionUpdateForm);
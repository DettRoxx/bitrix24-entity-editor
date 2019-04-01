import React, { Component} from 'react';
import { connect } from 'react-redux';

import {entityAddFormOpen} from '../../actions/entityActions';

import { Button, PageHeader } from 'antd';

class EntityControls extends Component{
    render(){
        return(
            <PageHeader
                title="Enities"
                subTitle="list"
                extra={[
                    <Button key="1" icon="plus-square" disabled={false}  onClick={this.props.entityAddFormOpen.bind(this)}>
                        add entity
                    </Button>
                ]}
            >
            </PageHeader>
        )
    }	
}

const mapStateToProps = state => ({
    entity_add_form_data: state.entity_add_form_data
})

const mapDispatchToProps = dispatch => ({
	entityAddFormOpen: () => dispatch(entityAddFormOpen())
});

export default connect(mapStateToProps, mapDispatchToProps)(EntityControls);
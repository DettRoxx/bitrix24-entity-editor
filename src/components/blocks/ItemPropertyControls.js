import React, { Component} from 'react';
import { connect } from 'react-redux';

import { itemPropertyAddFormOpen } from '../../actions/itemPropertyActions';

import { Button, PageHeader } from 'antd';

class ItemPropertyControls extends Component{
    render(){
        return(
            <PageHeader
                onBack={() => window.history.back()}
                title="Properties"
                subTitle="list"
                extra={[
                    <Button key="1" icon="plus-square" disabled={false}  onClick={this.props.itemPropertyAddFormOpen.bind(this, this.props.ownProps.entity)}>
                        add property
                    </Button>
                ]}
            >
            </PageHeader>
        )
    }	
}

const mapStateToProps = (state, ownProps) => ({
    item_property_add_form_data: state.property.item_property_add_form_data,
    ownProps
})

const mapDispatchToProps = dispatch => ({
	itemPropertyAddFormOpen: (payload) => dispatch(itemPropertyAddFormOpen(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPropertyControls);
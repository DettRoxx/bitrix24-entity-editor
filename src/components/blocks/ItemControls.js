import React, { Component} from 'react';
import { connect } from 'react-redux';

import { PageHeader, Button, Icon, Divider, TreeSelect} from 'antd';

import { itemAddFormOpen } from '../../actions/itemActions';
import { getSectionAll } from '../../actions/sectionActions';
import { getItem } from '../../actions/itemActions';

class ItemControls extends Component{
    componentDidMount(){
        let payload = {ENTITY: this.props.ownProps.params.entity, FILTER: {}};
        this.props.getSectionAll(payload);
    }

    openAddForm = (data) => {
        data.section = this.props.item.section;
        this.props.itemAddFormOpen(data)
    }

    handleFilterSectionChange = (section) => {
        let payload = {ENTITY:this.props.ownProps.params.entity, FILTER:{}};

        if(section)
            payload.FILTER = {SECTION_ID: section};

        if(section === 'root')
            payload.FILTER = {SECTION_ID: false};

        this.props.getItem(payload);
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

    render(){
        let curSection = this.props.item.section ? this.props.item.section : 'root';

        return(
            <PageHeader
                onBack={() => window.history.back()}
                title="Items"
                subTitle="list"
                extra={[
                    <Icon type="folder" key="1"/>,
                    <TreeSelect
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto'}}
                        placeholder="Please select section"
                        treeData={[{key:0, title:'Root Section', value:'root'}, ...this.getSectionTreeData(this.props.sections_all)]}
                        value={curSection}
                        allowClear
                        treeDefaultExpandAll
                        onChange={this.handleFilterSectionChange}
                        key="2"
                    />,
                    <Divider type="vertical" key="3"/>,
                    <Button key="4" icon="plus-square" onClick={this.openAddForm.bind(this,  {entity:this.props.entity, section:this.props.section})}>
                        add item
                    </Button>
                ]}
            >
            </PageHeader>
        )
    }	
}

const mapStateToProps = (state, ownProps) => ({
    item_add_form_data: state.item.item_add_form_data,
    sections: state.section.sections,
    section: state.section.section,
    sections_all: state.section.sections_all,
    entity: state.section.entity,
    item: state.item,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    itemAddFormOpen: (payload) => dispatch(itemAddFormOpen(payload)),
    getSectionAll: payload => dispatch(getSectionAll(payload)),
    getItem: payload => dispatch(getItem(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemControls);
import React, { Component} from 'react';
import { connect } from 'react-redux';

import { Button, TreeSelect, Divider, PageHeader, Icon} from 'antd';

import { sectionAddFormOpen, getSection, getSectionAll } from '../../actions/sectionActions';

class SectionControls extends Component{
    componentDidMount(){
        let payload = {ENTITY: this.props.ownProps.params.entity, FILTER: {}};
        this.props.getSectionAll(payload);
    }

    handleFilterSectionChange = (section) => {
        //let payload = {ENTITY:this.props.ownProps.params.entity, FILTER: {SECTION_ID: section}};

        console.log(section)
        let payload = {ENTITY:this.props.ownProps.params.entity, FILTER:{}};

        if(section)
            payload.FILTER = {SECTION_ID: section};

        if(section === 'root')
            payload.FILTER = {SECTION_ID: false};

        this.props.getSection(payload);
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
        let curSection = this.props.section ? this.props.section : 'root';

        return(
            <PageHeader
                onBack={() => window.history.back()}
                title="Secions"
                subTitle="list"
                extra={[
                    <Icon type="folder" key="1" />,
                    <TreeSelect
                        style={{ width: 300 }}
                        dropdownStyle={{ maxHeight: 700, overflow: 'auto' }}
                        placeholder="Please select section"
                        treeData={[{key:0,title:'Root Section',value:'root'}, ...this.getSectionTreeData(this.props.sections_all)]}
                        value={curSection}
                        allowClear
                        onChange={this.handleFilterSectionChange.bind(this)}
                        key="2"
                    />,
                    <Divider type="vertical" key="3"/>,
                    <Button icon="plus-square" key="4" onClick={this.props.sectionAddFormOpen.bind(this, {entity:this.props.entity, section:this.props.section})}>
                        add section
                    </Button>
                ]}
            >
            </PageHeader>
        )
    }	
}

const mapStateToProps = (state, ownProps) => ({
    section_add_form_data: state.section.section_add_form_data,
    sections: state.section.sections,
    section: state.section.section,
    sections_all: state.section.sections_all,
    entity: state.section.entity,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    sectionAddFormOpen: (payload) => dispatch(sectionAddFormOpen(payload)),
    getSection: payload => dispatch(getSection(payload)),
    getSectionAll: payload => dispatch(getSectionAll(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SectionControls);
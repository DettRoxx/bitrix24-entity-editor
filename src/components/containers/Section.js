import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { Table, Tag , Icon, Popconfirm, Divider, Empty, Button} from 'antd';

import { getSection, deleteSection, sectionUpdateFormOpen } from '../../actions/sectionActions';

import SectionAddForm from '../blocks/SectionAddForm';
import SectionUpdateForm from '../blocks/SectionUpdateForm';
import SectionControls from '../blocks/SectionControls';

class Section extends Component{
    componentDidMount(){
        if(this.props.ownProps.match.params.section !== this.props.section)
            this.getSection(this.props.ownProps.match.params.section);
    }

    getSection(section_id){
        let payload = {ENTITY: this.props.ownProps.match.params.entity, FILTER: {SECTION_ID: false}};

        if(section_id)
            payload.FILTER = {SECTION_ID: section_id}

        this.props.getSection(payload);
    }

    render() {
        const columns = [{
            title: 'NAME',
            dataIndex: 'NAME',
            key: 'NAME',
            width: '100px',
            render: (name, section) => (
                <div>
                    <Button size={'small'} onClick={()=>this.props.sectionUpdateFormOpen(section)}>
                        <Icon type="edit" />
                    </Button>            
                    &nbsp;{name} 
                </div>
            )
          },
          {
            title: '',
            key: 'NAV',
            width: '10px',
            render: (name, section) => (
                <div>
                    <Link to={`/items/${section.ENTITY}/${section.ID}`}><Icon type="bars" /></Link>   
                </div>
            )
          },
          {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: '50px',
            render: (id) => (
                <div>
                    {id}              
                </div>
            )
          },
          {
            title: 'ENTITY',
            dataIndex: 'ENTITY',
            key: 'ENTITY',
            width: '50px',
            render: (entity) => (
                <div>
                    {entity}               
                </div>
            )
          },
          {
            title: 'DEPTH_LEVEL',
            dataIndex: 'DEPTH_LEVEL',
            key: 'DEPTH_LEVEL',
            width: '20px',
            align: 'center',
            render: (depth_level) => (
                <div>
                    <Tag>{depth_level}</Tag>              
                </div>
            )
          },
          {
            title: '',
            key: 'ACTION',
            width: '60px',
            render: (name, section) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteSection({
                        ENTITY:section.ENTITY, ID:section.ID, SECTION:section.SECTION ? section.SECTION : false
                    })}>
                        <Icon type="delete" style={{ color: '#ff0000' }}/>
                    </Popconfirm>    
                </div>
            )
          }
        ];

        return ( 
            <div>

                <SectionControls params={this.props.ownProps.match.params}/>
                {(this.props.sections.length > 0) ? <Table rowKey="ID" columns={columns}  dataSource={this.props.sections} />: <Empty />}
                <SectionAddForm />
                <SectionUpdateForm />
			</div>
        )
    }    
}

const mapStateToProps = (state, ownProps) => ({
    sections: state.section.sections,
    section: state.section.section,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    getSection: payload => dispatch(getSection(payload)),
    deleteSection: payload => dispatch(deleteSection(payload)),
    sectionUpdateFormOpen: payload => dispatch(sectionUpdateFormOpen(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Section);

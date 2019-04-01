import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { Table, Icon, Popconfirm, Empty, Divider, Button} from 'antd';

import { getEntity, deleteEntity, entityUpdateFormOpen } from '../../actions/entityActions';

import EntityAddForm from '../blocks/EntityAddForm';
import EntityUpdateForm from '../blocks/EntityUpdateForm';
import EntityControls from '../blocks/EntityControls';

class Entity extends Component{
    componentDidMount(){
        this.props.getEntity('');
    }

    render() {
        const columns = [            
        {
            title: 'NAME',
            dataIndex: 'NAME',
            key: 'NAME',
            width: '200px',
            render: (name, entity) => (
                <div>
                    <Button size={'small'} type={'ghost'} onClick={()=>this.props.entityUpdateFormOpen(entity)}> 
                        <Icon type="edit" />
                    </Button>    
                    &nbsp;{name}           
                </div>
            )
        },
        {
            title: '',
            key: 'NAV',
            width: '60px',
            render: (name, entity) => (
                <div>
                    <Link to={`/sections/${entity.ENTITY}`}><Icon type="folder" /></Link>
                    <Divider type="vertical" /> 
                    <Link to={`/items/${entity.ENTITY}`}><Icon type="bars" /></Link>
                </div>
            )
        },
        {
            title: 'ID',
            dataIndex: 'ID',
            key: 'ID',
            width: '30px',
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
            width: '100px',
            render: (entity) => (
                <div>
                    {entity}               
                </div>
            )
        },
        {
            title: 'IBLOCK_TYPE_ID',
            dataIndex: 'IBLOCK_TYPE_ID',
            key: 'IBLOCK_TYPE_ID',
            width: '100px',
            render: (iblock_type_id) => (
                <div>
                    {iblock_type_id}               
                </div>
            )
        },
        {
            title: '',
            key: 'ACTION',
            width: '60px',
            render: (name, entity) => (
                <div>
                    <Link to={`/properties/${entity.ENTITY}`}><Icon type="setting" /></Link>     
                    <Divider type="vertical" /> 
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteEntity(entity.ENTITY)}>
                        <Icon type="delete" style={{ color: '#ff0000' }}/>
                    </Popconfirm>    
                </div>
            )
        }];

        return ( 
            <div>
				<EntityControls />
                {(this.props.entities.length > 0) ? <Table rowKey="ID" columns={columns}  dataSource={this.props.entities} /> : <Empty />}
                <EntityAddForm />
                <EntityUpdateForm />
			</div>
        )
    }    
}

const mapStateToProps = state => ({
    entities: state.entity.entities,
})

const mapDispatchToProps = dispatch => ({
    getEntity: payload => dispatch(getEntity(payload)),
    deleteEntity: payload => dispatch(deleteEntity(payload)),
    entityUpdateFormOpen: payload => dispatch(entityUpdateFormOpen(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Entity);

import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import { Table, Tag , Icon, Popconfirm, Empty, Button} from 'antd';

import { getItemProperty, deleteItemProperty, itemPropertyUpdateFormOpen } from '../../actions/itemPropertyActions';

import ItemPropertyAddForm from '../blocks/ItemPropertyAddForm';
import ItemPropertyUpdateForm from '../blocks/ItemPropertyUpdateForm';
import ItemPropertyControls from '../blocks/ItemPropertyControls';

class ItemProperty extends Component{
    componentDidMount(){
        this.props.getItemProperty({ENTITY:this.props.ownProps.match.params.entity});
    }

    render() {
        const columns = [
          {
            title: 'NAME',
            dataIndex: 'NAME',
            key: 'NAME',
            width: '200px',
            render: (name, item) => (
                <div>
                    <Button size={'small'} onClick={()=>this.props.itemPropertyUpdateFormOpen({ENTITY:this.props.ownProps.match.params.entity, ...item})}>
                        <Icon type="edit" />
                    </Button>     
                    &nbsp;{name}          
                </div>
            )
          },
          {
            title: 'PROPERTY CODE',
            dataIndex: 'PROPERTY',
            key: 'PROPERTY',
            width: '200px',
            render: (property) => (
                <div>
                    {property}               
                </div>
            )
          },
          {
            title: 'TYPE',
            dataIndex: 'TYPE',
            key: 'TYPE',
            width: '10px',
            align: 'center',
            render: (type) => (
                <div>
                    <Tag>{type}</Tag>               
                </div>
            )
          },
          {
            title: '',
            key: 'ACTION',
            width: '10px',
            render: (name, item) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteItemProperty({ENTITY:this.props.ownProps.match.params.entity, PROPERTY:item.PROPERTY})}>
                        <Icon type="delete" style={{ color: '#ff0000' }}/>
                    </Popconfirm>               
                </div>
            )
          }
        ];

        return ( 
            <div>
                <ItemPropertyControls entity={this.props.ownProps.match.params.entity}/>
                {(this.props.items.length > 0) ? <Table rowKey="ID" columns={columns}  dataSource={this.props.items} /> : <Empty />}
                <ItemPropertyAddForm />
                <ItemPropertyUpdateForm />
			</div>
        )
    }    
}

const mapStateToProps = (state, ownProps) => ({
    items: state.property.items,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    getItemProperty: payload => dispatch(getItemProperty(payload)),
    deleteItemProperty: payload => dispatch(deleteItemProperty(payload)),
    itemPropertyUpdateFormOpen: payload => dispatch(itemPropertyUpdateFormOpen(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemProperty);

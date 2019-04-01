import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Table, Icon, Popconfirm, Empty, Divider, Button} from 'antd';

import { getItem, deleteItem, itemUpdateFormOpen } from '../../actions/itemActions';

import ItemAddForm from '../blocks/ItemAddForm';
import ItemUpdateForm from '../blocks/ItemUpdateForm';
import ItemControls from '../blocks/ItemControls';

class Item extends Component{
    componentDidMount(){
        let payload = {ENTITY:this.props.ownProps.match.params.entity, FILTER: {SECTION_ID: false}};

        if(this.props.ownProps.match.params.section)
            payload.FILTER = {SECTION_ID: this.props.ownProps.match.params.section}

        this.props.getItem(payload);
    }

    render() {
        const columns = [{
            title: 'NAME',
            dataIndex: 'NAME',
            key: 'NAME',
            width: '200px',
            render: (name, item) => (
                <div>
                    <Button size={'small'} onClick={()=>this.props.itemUpdateFormOpen({
                        entity:item.ENTITY, 
                        id:item.ID, 
                        name:item.NAME, 
                        preview_text:item.PREVIEW_TEXT,
                        detail_text:item.DETAIL_TEXT,
                        preview_picture:item.PREVIEW_PICTURE, 
                        detail_picture:item.DETAIL_PICTURE, 
                        properties:{...item.PROPERTY_VALUES},
                        section:item.SECTION ? item.SECTION : false
                    })}>
                        <Icon type="edit" />
                    </Button>              
                    &nbsp;{name} 
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
            title: 'SECTION',
            dataIndex: 'SECTION',
            key: 'SECTION',
            width: '50px',
            render: (section) => (
                <div>
                    {section}               
                </div>
            )
          },
          {
            title: '',
            key: 'ACTION',
            width: '50px',
            render: (name, item) => (
                <div>
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteItem({
                        ENTITY:item.ENTITY, 
                        ID:item.ID, 
                        SECTION:item.SECTION ? item.SECTION : false
                    })}>
                        <Icon type="delete" style={{ color: '#ff0000' }}/>
                    </Popconfirm>              
                </div>
            )
          }
        ];

        return ( 
            <div>
                <ItemControls params={this.props.ownProps.match.params}/>
                <Divider />
                {(this.props.items.length > 0) ? <Table rowKey="ID" columns={columns}  dataSource={this.props.items} /> : <Empty />}
                <ItemAddForm />
                <ItemUpdateForm />
			</div>
        )
    }    
}

const mapStateToProps = (state, ownProps) => ({
    items: state.item.items,
    ownProps
})

const mapDispatchToProps = dispatch => ({
    getItem: payload => dispatch(getItem(payload)),
    deleteItem: payload => dispatch(deleteItem(payload)),
    itemUpdateFormOpen: payload => dispatch(itemUpdateFormOpen(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Item);

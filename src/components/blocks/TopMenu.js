import React, {Component} from 'react';
import { Link } from "react-router-dom";

import { Menu, Icon} from 'antd';

class TopMenu extends Component {
    render() {
        let closeApp = () => {
            window.document.getElementById('entity_editor').style.display='none';
        }

        return (
            <Menu mode="horizontal" selectable={false}>
                <Menu.Item key="home" >
                    <Link to="/"><Icon type="home" />Entities List</Link>
                </Menu.Item>    
                <Menu.Item key="close">
                    <Link to="/" onClick={closeApp.bind(this)}><Icon type="close" />Close Editor</Link>
                </Menu.Item>           
            </Menu>
        );
    }
}

export default TopMenu;
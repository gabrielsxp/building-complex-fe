import React from 'react';
import styled from 'styled-components';
import b1 from '../assets/b1.png';
import b2 from '../assets/b2.png';
import b3 from '../assets/b3.png';
import b4 from '../assets/b4.png';
import b5 from '../assets/b5.png';
import { withRouter } from 'react-router-dom';

const imgs = [
    b1, b2, b3, b4, b5
]

const Styles = styled.div`
    .building {
        display: flex;
        align-items: center;
        flex-flow: column;
    }
    .bTag {
        display: flex;
        box-sizing: border-box;
        flex-flow: column;
        justify-content: space-between;
        padding: 7px;
        background-color: #8f96ac;
        margin-top: 5px;
        color: #fff;
        text-align:left;
        border-radius: 3px;
        list-style: none;
    }
    .bTag li {
        display: block;
    }
    .building img {
        cursor: pointer;
    }
`;

class Building extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false
        }
    }
    render() {
        return <div>
            <Styles>
                <div className="building">
                    <img src={imgs[this.props.img]} alt="acessar" onClick={e => this.props.click(this.props.name)}></img>
                    <ul className="bTag">
                        <li>Nome: {this.props.name}</li><br />
                        <li>Andares: {this.props.floors}</li><br />
                        <li>Capacidade Total: {this.props.capacity}</li>
                    </ul>
                </div>

            </Styles>
        </div >
    }
}

export default withRouter(Building);
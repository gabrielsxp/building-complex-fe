import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Building from './Building';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import axios from '../axios';
import hrImg from '../assets/hr-12.png';
import {withRouter} from 'react-router-dom';
import { compareBuildings, getBuilding } from '../services/auth';
import * as s from '../constants/servers';

const Styles = styled.div`
    .top20 {
         margin-top: 20px!important;
    }
    .styledHr {
        height: 6px;
        background: url(${hrImg}) repeat-x 0 0;
        border: 0;
        max-width: 10rem;
    }
    .container-fluid {
        margin-top: 40px;
        margin-bottom: 40px;
        min-height: 100vh;
    }
`;

class Home extends React.Component {
    state = {
        show: false,
        error: null,
        name: '',
        capacity: 0,
        numberOfFloors: 1,
        floorsCapacity: 1,
        submit: false,
        buildings: [],
        currentBuildings: [], 
        currentPage: null, 
        totalPages: null
    }
    getAllBuildings = () => {
        axios.get(`${s.servers[this.props.i%s.servers.length]}/buildings`)
            .then((response) => {
                const data = response.data.data;
                const buildings = Object.values(data);
                var b = [];
                buildings.map((building, index) => {
                    return b = b.concat(building);
                })
                this.setState({buildings: b, capacity: response.data.capacity});
                this.props.increment();
        }).catch((error) => {
            this.setState({error: error.message});
            this.props.increment();
        });
    }
    componentWillMount() {
        this.setState({building: getBuilding()});
        this.getAllBuildings();
    }
    addBuilding = () => {
        const building = { name: 'Halley', capacity: 50, floors: 12, img: Math.floor(Math.random() * 5) }
        this.setState({ buildings: this.state.buildings.concat(building) });
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose = () => {
        this.setState({ show: false });
        this.getAllBuildings();
    }
    handleClick = (name) => {
        console.log(name)
        if(getBuilding(name) && !compareBuildings(name)){
            this.setState({error: 'Você não pode acessar dois prédios ao mesmo tempo'});
            return;
        } else {
            this.setState({error: null});
            let path = 'building/' + name;
            this.props.history.push(path);
        }
    }
    sendRequest = () => {
        const data = {
            name: this.state.name,
            numberOfFloors: this.state.numberOfFloors,
            capacity: this.state.capacity,
            floorsCapacity: this.state.floorsCapacity
        }
        axios.post(`${s[this.props.i%s.servers.length]}/building`, data).then((response) => {
            console.log(data);
            console.log(response);
            this.handleClose();
            this.setState({ submit: false });
            this.props.increment();
        }).catch((error) => {
            console.log(error);
            this.handleClose();
            this.setState({ submit: false });
            this.props.increment();
        });
    }
    onPageChanged = data => {
        const { buildings } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentBuildings = buildings.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, currentBuildings, totalPages });
    }
    render() {
        return <div>
            <Styles>
                <Container fluid>
                    <h2 style={{ textAlign: "center", marginTop: "40px" }}>Prédios do Complexo</h2>
                    <hr className="styledHr" />
                    <br />
                    <Row>
                        <Col lg={{span: 4, offset: 4}} xs={12}>
                        {
                            this.state.error ? <Alert variant="danger">
                                <Alert.Heading>Erro Encontrado</Alert.Heading>
                                <p>{this.state.error}</p>
                            </Alert>
                            : null
                        }
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                        {
                            this.state.buildings.length === 0 ? <div>
                                    <Col xs={12} lg={{span: 4, offset: 4}}>
                                        <Alert variant="primary">
                                            <p>Não existem prédios no complexo ainda !</p>
                                        </Alert>
                                    </Col>
                            </div> : <Col xs={12}>
                                <p className="text-muted" style={{textAlign: "center"}}>Capacidade total do complexo: {this.state.capacity} pessoas</p>
                            </Col>
                        }
                        </Col>
                    </Row>
                    <Row> 
                        {
                            this.state.buildings.map((building, index) => {
                                    return <Col key={index} lg={4} md={6} xs={12} bsPrefix="col top20">
                                        <Building name={building.name} floors={building.floors.length} capacity={building.capacity + building.numberOfFloors * building.floorsCapacity} img={building.img} click={this.handleClick} />
                                    </Col>
                            })
                        }
                    </Row>
                </Container>
            </Styles>
        </div>
    }

}

export default withRouter(Home);
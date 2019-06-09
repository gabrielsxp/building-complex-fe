import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Floor from '../components/Floor';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import axios from '../axios';
import {withRouter} from 'react-router-dom';
import { getRole, logout, getOutOfBuilding } from '../services/auth';
import { setBuilding } from '../services/auth';
import * as s from '../constants/servers';

const Styles = styled.div`
    .container {
        margin-top: 40px;
        margin-bottom: 40px;
        min-height: 100vh;
    }
`;

class Floors extends React.Component {
    state = {
        floors: [],
        people: 0,
        role: null,
        accessing: false,
        error: null,
        capacity: 0
    }
    componentDidMount() {
        this.setState({ role: getRole() });
        const name = this.props.match.params.name;
        axios.get(`${s.servers[this.props.i%s.servers.length]}/building/${name}`)
            .then((response) => {
                this.props.increment();
                const data = response.data;
                console.log(data);
                this.setState({ floors: data.floors, capacity: data.capacity });
                axios.get(`${s.servers[this.props.i%s.servers.length] + this.props.location.pathname}/lotation`)
                    .then((response) => {
                        this.props.increment();
                        this.setState({
                            people: response.data.users
                        })
                        setBuilding(name);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({error: error});
                        this.props.increment();
                    })
            }).catch((error) => {
                console.log(error);
                this.setState({error: error});
                this.props.increment();
            })
    }
    handleExitBuilding = () => {
        this.setState({ accessing: true });
        const url = this.props.location.pathname;
        axios.delete(`${s.servers[this.props.i%s.servers.length]+url}`)
            .then((response) => {
                this.props.increment();
                this.setState({ accessing: false });
                logout();
                getOutOfBuilding();
                this.props.history.push('/app');
            })
            .catch((error) => {
                this.setState({ accessing: false, error: error });
            })
    }    
    render() {
        return <div>
            <Styles>
                <Container>
                    <Row>
                        <Col md={{ span: 8, offset: 2 }}>
                            <div className="itemsWrapper" style={{
                                display: "flex",
                                alignItems: "center",
                                flexFlow: "flex-start",
                                justifyContent: "space-between",
                                flexWrap: "wrap"
                            }}>
                                <div>
                                    <h2>Nome do Prédio: {this.props.match.params.name.charAt(0).toUpperCase() + this.props.match.params.name.slice(1)}</h2>
                                    <h5>Existem atualmente {this.state.people} pessoas nesse prédio</h5>
                                    <h5>Esse prédio comporta {this.state.capacity} pessoas</h5>
                                    <p className="text-muted">Acesse algum andar do prédio</p>
                                </div>
                                <div>
                                    <Button variant="danger" onClick={this.handleExitBuilding}>
                                        {!this.state.accessing ? 'Sair do prédio' : <div>
                                            Saindo...
                                            &nbsp;&nbsp;
                                            <Spinner
                                                as="span"
                                                animation="border"
                                                size="sm"
                                                role="status"
                                                aria-hidden="false"
                                            />
                                            <span className="sr-only">Acessando...</span>
                                        </div>
                                        }
                                    </Button>
                                </div>
                            </div>
                            {
                                this.state.error ?
                                <Row>
                                    <Col xs={12}>
                                        <Alert variant="danger">{this.state.error}</Alert>
                                    </Col>
                                </Row>
                                : null
                            }
                            <hr />
                            {
                                !this.state.floors ? <Spinner animation="border" /> :
                                this.state.floors.map((floor, index) => {
                                    return (
                                        <Floor i={this.props.i} increment={this.props.increment} role={this.state.role} allows={floor.allows} id={floor.id} index={index} capacity={floor.capacity} />
                                    )
                                })
                            }
                        </Col>
                    </Row>
                </Container>
            </Styles>
        </div>
    }
}

export default withRouter(Floors);
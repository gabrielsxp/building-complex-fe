import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import hrImg from '../assets/hr-12.png';
import axios from '../axios';
import {logout, getOutOfBuilding} from '../services/auth';
import {withRouter} from 'react-router-dom';
import * as s from '../constants/servers';

const Styles = styled.div`
    .container-fluid {
        margin-top: 40px;
        margin-bottom: 40px;
        min-height: 100vh;
    }
    .styledHr {
        height: 6px;
        background: url(${hrImg}) repeat-x 0 0;
        border: 0;
        max-width: 10rem;
    }
    .btnWrapper {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-flow: row;
        justify-content: space-between;
    }
`;


class FloorAccessed extends React.Component{
    state = {
        sending: false,
        accessing: false
    }
    handleClickHall = () => {
        this.setState({ sending: true });
        console.log(this.props.location.pathname);
        axios.delete(`${s.servers[this.props.i%s.servers.length]}/${this.props.location.pathname}`)
            .then((response) => {
                this.setState({sending: false});
                this.props.history.goBack();
                this.props.increment();
            })
            .catch((error) => {
                this.setState({sending: false});
                this.setState({error: error.message});
                this.props.increment();
            })
    }
    handleExitBuilding = () => {
        this.setState({accessing: true});
        const urlArr = this.props.location.pathname.split('/');
        urlArr.pop();
        const url = urlArr.join('/');
        console.log(url);
        axios.delete(`${s.servers[this.props.i%s.servers.length]}/${url}`)
            .then((response) => {
                this.setState({accessing: false});
                logout();
                getOutOfBuilding();
                this.props.history.push('/app');
            })
            .catch((error) => {
                this.setState({accessing: false, error: error.message});
            })
    }
    render(){
        const floorArr = this.props.location.pathname.split('/');
        const floor = floorArr[floorArr.length-1];
        return <div>
            <Styles>
                <Container fluid>
                    <h1 style={{textAlign: 'center'}}>Andar Acessado</h1>
                    <hr className="styledHr" />
                    <Row>    
                        <Col lg={{span: 8, offset: 2}} xs={12}>
                            <Alert variant="primary">
                                <p style={{textAlign: 'center'}}>Você está atualmente no {floor}º andar </p>
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={{span: 4, offset: 4}} xs={12}>
                            <div className="btnWrapper">
                                <Button variant="primary" onClick={this.handleClickHall} disabled={this.state.sending}>
                                    { !this.state.accessing ? 'Voltar para o Hall' : <div> 
                                            Voltando...
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
                                
                                <Button variant="danger" disabled={this.state.accessing} onClick={this.handleExitBuilding}>
                                    { !this.state.accessing ? 'Sair do prédio' : <div>
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
                        </Col>
                    </Row>
                </Container>
            </Styles>
        </div>
    }
}

export default withRouter(FloorAccessed);
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components';
import hrImg from '../assets/hr-12.png';
import axios from '../axios';
import { logout, getOutOfBuilding, getRole } from '../services/auth';
import { withRouter } from 'react-router-dom';
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


class FloorAccessed extends React.Component {
    state = {
        sending: false,
        role: null,
        accessing: false,
        editing: false,
        success: null,
        show: false,
        permissions: [],
        lotation: 0,
        admin: false,
        employee: false,
        visitor: false,
        capacity: 0
    }
    componentDidMount() {
        this.setState({ success: null, error: null, role: getRole() });
        axios.get(s.servers[this.props.i % s.servers.length] + this.props.location.pathname)
            .then((response) => {
                this.props.increment();
                console.log(response.data);
                const permissions = response.data.floor.allows;
                const lotation = response.data.lotation;
                var translatedPermissions = [];
                permissions.map((p) => {
                    if (p === 'visitor') {
                        translatedPermissions.push('Visitantes');
                    } else if (p === 'employee') {
                        translatedPermissions.push('Funcionários');
                    } else if (p === 'admin') {
                        translatedPermissions.push('Administradores');
                    }
                    return translatedPermissions;
                })
                this.setState({ permissions: translatedPermissions, lotation });
                permissions.map((type) => {
                    if (type === 'visitor') {
                        this.setState({ visitor: true });
                    }
                    if (type === 'admin') {
                        this.setState({ admin: true });
                    }
                    if (type === 'employee') {
                        this.setState({ employee: true });
                    }
                    return type;
                })
                this.setState({ capacity: response.data.floor.capacity });
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ sending: false, error: error });
            })

    }
    handleClickHall = () => {
        this.setState({ sending: true });
        console.log(this.props.location.pathname);
        axios.delete(s.servers[this.props.i % s.servers.length] + this.props.location.pathname)
            .then((response) => {
                this.setState({ sending: false });
                this.props.history.goBack();
                this.props.increment();
            })
            .catch((error) => {
                this.setState({ sending: false });
                this.setState({ error: error });
                this.props.increment();
            })
    }
    handleExitBuilding = () => {
        this.setState({ accessing: true });
        const urlArr = this.props.location.pathname.split('/');
        urlArr.pop();
        const url = urlArr.join('/');
        console.log(url);
        axios.delete(s.servers[this.props.i % s.servers.length] + url)
            .then((response) => {
                this.props.increment();
                this.setState({ accessing: false });
                logout();
                getOutOfBuilding();
                this.props.history.push('/app');
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ accessing: false, error: error });
            })
    }
    handleEditFloor = () => {
        this.setState({ success: null, error: null, editing: true });
        const visitor = this.state.visitor ? 'visitor' : null;
        const employee = this.state.employee ? 'employee' : null;
        const admin = this.state.admin ? 'admin' : null;
        var permissions = [];
        if (visitor) {
            permissions.push(visitor);
        }
        if (employee) {
            permissions.push(employee);
        }
        if (admin) {
            permissions.push(admin);
        }
        const data = {
            capacity: this.state.capacity,
            allows: permissions
        }
        axios.patch(s.servers[this.props.i % s.servers.length] + this.props.location.pathname, data)
            .then((response) => {
                this.props.increment();
                this.setState({ editing: false, success: 'Dados atualizados com sucesso !' });
                this.handleClose();
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ editing: false, error: error });
            })
    }
    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    render() {
        const floorArr = this.props.location.pathname.split('/');
        const floor = floorArr[floorArr.length - 1];
        return <div>
            <Styles>
                <Container fluid>
                    <h1 style={{ textAlign: 'center' }}>Andar Acessado</h1>
                    <hr className="styledHr" />
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }} xs={12}>
                            <Alert variant="primary">
                                <p style={{ textAlign: 'center' }}>Você está atualmente no {floor}º andar </p>
                                <p style={{ textAlign: 'center' }}>Capacidade: <b>{this.state.capacity}</b> pessoas</p>
                                <p style={{ textAlign: 'center' }}>Existem <b>{this.state.lotation}</b> pessoas neste andar</p>
                                <p style={{ textAlign: 'center' }}><b>Permite:&nbsp;</b> {this.state.permissions.join(', ')}</p>
                            </Alert>
                        </Col>
                        {
                            this.state.success ?
                                <Col lg={{ span: 8, offset: 2 }} xs={12}>
                                    <Alert variant="success">
                                        {this.state.success}
                                    </Alert>
                                </Col>
                                : null
                        }
                    </Row>
                    <Row>
                        <Col lg={{ span: 4, offset: 4 }} xs={12}>
                            <div className="btnWrapper">
                                <Button variant="primary" onClick={this.handleClickHall} disabled={this.state.sending}>
                                    {!this.state.sending ? 'Voltar para o Hall' : <div>
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
                                {
                                    this.state.role === 'Administrador' ?
                                        <Button variant="secondary" onClick={this.handleShow}>
                                            Editar Andar
                                        </Button>
                                        : null
                                }
                                <Modal centered size="md" show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Editar andar</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        {
                                            this.state.error ?
                                                <Alert variant="danger">{this.state.error}</Alert>
                                                : null
                                        }
                                        <Form>
                                            <Form.Group>
                                                <Form.Label>Altere a capacidade do andar</Form.Label>
                                                <Form.Control type="text" value={this.state.capacity} onChange={e => this.setState({ capacity: e.target.value })} placeholder="Capacidade do andar" />
                                            </Form.Group>
                                            <Form.Group controlId="exampleForm.ControlSelect2">
                                                <Form.Label>Permissões desse andar</Form.Label>
                                                <Form.Check checked={this.state.visitor} onChange={e => this.setState({ visitor: e.target.checked })} type='checkbox' id='check-visitor' label='Visitante'></Form.Check>
                                                <Form.Check checked={this.state.employee} onChange={e => this.setState({ employee: e.target.checked })} type='checkbox' id='check-employee' label='Funcionário'></Form.Check>
                                                <Form.Check checked disabled type='checkbox' id='checkadmin' label='Administrador'></Form.Check>
                                            </Form.Group>
                                            <Button variant="primary" disabled={this.state.editing || this.state.role !== 'Administrador'} onClick={this.handleEditFloor}>
                                                {!this.state.editing ? 'Alterar dados' : <div>
                                                    Alterando...
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
                                        </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Fechar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        </div>
    }
}

export default withRouter(FloorAccessed);
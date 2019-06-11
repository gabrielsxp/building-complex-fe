import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import hrImg from '../assets/hr-12.png';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import { withRouter, Link } from 'react-router-dom';
import { logout, getOutOfBuilding, getRole, setRole } from '../services/auth';
import axios from '../axios';
import * as s from '../constants/servers';

const Styles = styled.div`
    .container {
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
    .testSection {
        position: relative;
        border: 2px solid #dedede;
        border-radius: 5px;
        padding: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-flow: column;
        flex-wrap: wrap;
        margin-bottom: 15px;
    }
    .testSection h3 {
        color: #333;
    }
    
`;

const StyleButton = styled.div`
    .btnWrapper {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        flex-flow: row;
        justify-content: space-between;
    }
`;

class Tests extends React.Component {
    state = {
        show: false,
        showTwo: false,
        submiting: false,
        buildings: [],
        buildingQtd: 10,
        buildingFloorsQtd: 10,
        error: null,
        building: '',
        success: null,
        admin: true,
        visitor: true,
        employee: true,
        working: false,
        people: 1,
        role: null,
        confirmationShow: false
    }

    componentDidMount() {
        this.setState({ role: getRole() });
        this.getAllBuildings();
    }

    getAllBuildings = () => {
        axios.get(`${s.servers[this.props.i % s.servers.length]}/buildings`).then((response) => {
            this.props.increment();
            const data = response.data.data;
            const buildings = Object.values(data);
            var b = [];
            buildings.map((building, index) => {
                return b = b.concat(building.name);
            })
            console.log(response);
            this.setState({ buildings: b, building: b[0], capacity: response.data.capacity });
        }).catch((error) => {
            this.props.increment();
            this.setState({ error: error.message });
        });
    }

    handleShow = () => {
        this.setState({ show: true });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    handleShowTwo = () => {
        this.setState({ showTwo: true });
    }
    handleCloseTwo = () => {
        this.setState({ showTwo: false });
    }
    handleShowThree = () => {
        this.setState({ showThree: true });
    }
    handleCloseThree = () => {
        this.setState({ showThree: false });
    }
    handleConfirmationShow = () => {
        this.setState({ confirmationShow: true });
    }

    handleConfirmationClose = () => {
        this.setState({ confirmationShow: false });
    }

    handleLogout = () => {
        getOutOfBuilding();
        logout();
        this.props.history.push('/app');
    }
    floodUsers = (e) => {
        e.preventDefault();
        this.setState({ error: null, submiting: true });
        axios.post(`${s.servers[this.props.i % s.servers.length]}/users/random`, { numberOfPeople: this.state.people })
            .then((response) => {
                this.props.increment();
                this.setState({ submiting: false, success: `${response.data.success} pessoas adicionadas` });
                this.handleCloseTwo();
                this.props.scrollTop();
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ submiting: false, error: 'Não foi possível adicionar os usuários' });
                this.handleCloseTwo();
            })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({ submiting: true, error: null, success: null });
        const visitor = this.state.visitor ? 'visitor' : null;
        const employee = this.state.employee ? 'employee' : null;
        const admin = this.state.admin ? 'admin' : null;
        var permissions = [];
        if(visitor){
            permissions.push(visitor);
        }
        if(employee){
            permissions.push(employee);
        }
        if(admin){
            permissions.push(admin);
        }
        var buildings = [];
        console.log(this.state.buildingQtd);
        for (let i = 1; i <= this.state.buildingQtd; i++) {
            const capacity = parseInt(Math.random() * (50 - 20) + 20);
            let building = {
                name: `Predio-${Math.random().toString(36).substr(2, 9)}`,
                capacity: capacity,
                numberOfFloors: parseInt(Math.random() * (this.state.buildingFloorsQtd - 1) + 1),
                floorsCapacity: capacity,
                permissions: permissions
            }
            buildings.push(building);
        }
        axios.post(`${s.servers[this.props.i % s.servers.length]}/buildings`, buildings)
            .then((response) => {
                this.props.increment();
                this.setState({ success: 'Prédios criados com sucesso. Redirecionando...', error: null });
                this.handleClose();
                this.props.history.push('/app');
                this.props.scrollTop();
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ error: error.message });
                this.handleClose();
                this.props.scrollTop();
            });
    }

    handleConfirmationDelete = (e) => {
        e.preventDefault();
        this.setState({ submiting: true });
        axios.delete(`${s.servers[this.props.i % s.servers.length]}/buildings`)
            .then((response) => {
                this.props.increment();
                this.setState({ submiting: false });
                this.handleConfirmationClose();
                this.handleLogout();
                axios.delete(`${s.servers[this.props.i % s.servers.length]}/users`)
                    .then((response) => {
                        this.props.increment();
                        axios.delete(`${s.servers[this.props.i % s.servers.length]}/floors`)
                            .then((response) => {
                                this.props.increment();
                                this.props.scrollTop();
                                this.props.history.push('/app');
                            })
                            .catch((error) => {
                                this.props.increment();
                                this.setState({ error: error.message });
                                this.props.scrollTop();
                            })
                    })
                    .catch((error) => {
                        this.props.increment();
                        this.setState({ error: error.message });
                        this.props.scrollTop();
                    })
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ error: error.message, submiting: false });
                this.handleConfirmationClose();
                this.props.scrollTop();
            })
    }

    handleBuildingLotation = (e) => {
        console.log(this.state.building);
        e.preventDefault();
        this.setState({ error: null, submiting: true });
        axios.post(`${s.servers[this.props.i % s.servers.length]}/building/${this.state.building}/fill`)
            .then((response) => {
                this.props.increment();
                this.setState({ submiting: false, success: "Prédio lotado com sucesso" });
                this.handleCloseThree();
                this.props.scrollTop();
            })
            .catch((error) => {
                this.props.increment();
                this.setState({ submiting: false, error: error.message });
                this.handleCloseThree();
                this.props.scrollTop();
            });
    }

    makeSuperUser = () => {
        this.setState({error: null, working: true});
        axios.patch(`${s.servers[this.props.i % s.servers.length]}/super/me`)
            .then((response) => {
                this.setState({working: false, success: 'Permissões atualizadas'});
                setRole('Administrador');
                this.props.scrollTop();
            })
            .catch((error) => {
                this.setState({ working: false, error: error});
                this.props.scrollTop();
            });
    }

    render() {
        const selectOptionsFloors = [1, 5, 10, 25, 50, 100];
        return <div>
            <Styles>
                <Container>
                    <h1 style={{ textAlign: "center" }}>Sessão de Testes</h1>
                    <hr className="styledHr" />
                    <Row>
                        {
                            this.state.success ?
                                <Col lg={{span: 8, offset: 2}} xs={12}>
                                    <Alert variant="success">
                                        <div style={{
                                            display: 'flex',
                                            flexFlow: 'column',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}>
                                            {this.state.success}
                                            <br /><br />
                                            <Link to="/app"><Button variant="primary">Voltar para o Complexo</Button></Link>
                                        </div>
                                    </Alert>
                                </Col> : null
                        }
                    </Row>
                    <Row>
                        {
                            this.state.error ?
                            <Col lg={{span: 8, offset: 2}} xs={12}>
                                <Alert variant="danger">
                                    <div style={{
                                        display: 'flex',
                                        flexFlow: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        {this.state.error}
                                    </div>
                                </Alert>
                            </Col> : null
                        }
                    </Row>
                    <Row>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Adicionar Prédios</h3>
                                <p className="text-muted"><b>Descrição: </b> Adicione uma lista de prédios, definindo a quantidade de prédios e a quantidade máxima de andares de cada um</p>
                                <Button variant="primary" onClick={this.handleShow}>Opções</Button>
                            </div>
                        </Col>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Remover tudo</h3>
                                <p className="text-muted"><b>Descrição: </b>Remover todos os prédios do complexo cadastrados até agora, juntamente com os andares e todos os usuários do sistema</p>
                                <Button variant="danger" onClick={this.handleConfirmationShow}>Excluir tudo</Button>
                            </div>
                        </Col>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Simular usuários</h3>
                                <p className="text-muted"><b>Descrição: </b>Simula a entrada de vários usuários no prédio de uma só vez</p>
                                <Button variant="primary" onClick={this.handleShowTwo}>Opções</Button>
                            </div>
                        </Col>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Expulsar o usuário atual do prédio</h3>
                                <p className="text-muted"><b>Descrição: </b>Remover o usuário que seja <b>visitante</b> do prédio atual.</p>
                                <Button disabled={this.state.role !== 'Visitante'} variant="danger" onClick={this.handleLogout}>Expulsar Usuário</Button>
                            </div>
                        </Col>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Lotar um edifício</h3>
                                <p className="text-muted"><b>Descrição: </b>Adicionar pessoas aleatórias no edifício inteiro, tanto no hall quanto em todos os andares. Impossibilitando a entrada de novas pessoas</p>
                                <Button variant="primary" onClick={this.handleShowThree}>Opções</Button>
                            </div>
                        </Col>
                        <Col lg={6} xs={12}>
                            <div className="testSection">
                                <h3>Modo Administrador</h3>
                                <p className="text-muted"><b>Descrição: </b>Atualiza permissões para Administrador ao usuário atual do sistema que seja Funcionário</p>
                                <Button variant="primary" type="submit" onClick={this.makeSuperUser} disabled={this.state.working || this.state.role !== 'Funcionário'}>
                                    {
                                        !this.state.working ? 'Atualizar' :
                                            <div>
                                                Atualizando...&nbsp;&nbsp;
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
                    <Modal
                        show={this.state.show}
                        onHide={this.handleClose}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Opções para adicionar prédios
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Quantidade de prédios</Form.Label>
                                    <Form.Control as="select" value={this.state.buildingQtd} onChange={e => this.setState({ buildingQtd: e.target.value })}>
                                        {
                                            selectOptionsFloors.map((qtd, index) => {
                                                return <option key={index} index={index}>{qtd}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Quantidade de andares</Form.Label>
                                    <Form.Control as="select" value={this.state.buildingFloorsQtd} onChange={e => this.setState({ buildingFloorsQtd: e.target.value })}>
                                        {
                                            selectOptionsFloors.map((qtd, index) => {
                                                return <option key={index} index={index}>{qtd}</option>
                                            })
                                        }
                                    </Form.Control>
                                    <Form.Text className="text-muted">
                                        Número máximo de andares que serão escolhidos através de uma função randômica
                                </Form.Text>
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlSelect2">
                                    <Form.Label>Permissões de cada andar</Form.Label>
                                    <Form.Check checked={this.state.visitor} onChange={e => this.setState({visitor: e.target.checked})} type='checkbox' id='check-visitor' label='Visitante'></Form.Check>
                                    <Form.Check checked={this.state.employee} onChange={e => this.setState({employee: e.target.checked})} type='checkbox' id='check-employee' label='Funcionário'></Form.Check>
                                    <Form.Check checked disabled type='checkbox' id='checkadmin' label='Administrador'></Form.Check>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.submiting}>
                                    {
                                        !this.state.submiting ? 'Acessar' :
                                            <div>
                                                Trabalhando...&nbsp;&nbsp;
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
                    <Modal
                        size="md"
                        centered={true}
                        show={this.state.confirmationShow}
                        onHide={this.handleConfirmationClose}
                        aria-labelledby="example-modal-sizes-title-sm"
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm">
                                Tem certeza disso ?
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <p className="text-muted">Tem realmente certeza disso ? Essa ação é <b>irreversível</b></p>
                            <StyleButton>
                                <div className="btnWrapper">
                                    <Button variant="danger" onClick={this.handleConfirmationDelete} disabled={this.state.submiting}>
                                        {
                                            !this.state.submiting ? 'Excluir Tudo' :
                                                <div>
                                                    Trabalhando...&nbsp;&nbsp;
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
                                    <Button variant="secondary" onClick={this.handleConfirmationClose}>Cancelar</Button>
                                </div>
                            </StyleButton>
                        </Modal.Body>
                    </Modal>
                    <Modal
                        show={this.state.showTwo}
                        onHide={this.handleCloseTwo}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Opções para adicionar pessoas ao complexo
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Quantidade de Pessoas</Form.Label>
                                    <Form.Control as="select" value={this.state.people} onChange={e => this.setState({ people: e.target.value })}>
                                        {
                                            selectOptionsFloors.map((qtd, index) => {
                                                return <option key={index} index={index}>{qtd}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.floodUsers} disabled={this.state.submiting}>
                                    {
                                        !this.state.submiting ? 'Simular' :
                                            <div>
                                                Simulando...&nbsp;&nbsp;
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
                            <Button variant="secondary" onClick={this.handleCloseTwo}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Modal
                        show={this.state.showThree}
                        onHide={this.handleCloseThree}
                        size="md"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Opções para adicionar pessoas ao edifício
                        </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Escolha o edifício que será lotado</Form.Label>
                                    <Form.Control as="select" value={this.state.building} onChange={e => this.setState({ building: e.target.value })}>
                                        {
                                            this.state.buildings.map((name, index) => {
                                                return <option key={index} index={index}>{name}</option>
                                            })
                                        }
                                    </Form.Control>
                                </Form.Group>
                                <Button variant="primary" type="submit" onClick={this.handleBuildingLotation} disabled={this.state.submiting || this.state.buildings.length === 0}>
                                    {
                                        !this.state.submiting ? 'Simular' :
                                            <div>
                                                Simulando...&nbsp;&nbsp;
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
                            <Button variant="secondary" onClick={this.handleCloseThree}>
                                Fechar
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
            </Styles>
        </div>
    }
}

export default withRouter(Tests);
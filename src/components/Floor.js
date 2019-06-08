import React from 'react';
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom';
import axios from '../axios';
import * as s from '../constants/servers';

const Styles = styled.div`
    .floor {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 15px;
        background-color: #dedede;
        color: #333;
        border-radius: 5px;
        border: 2px solid #47535A;
        margin-bottom: 15px;
    }
`;

class Floor extends React.Component {
    state = {
        show: false,
        accessing: false,
        error: null,
        floor: 0,
        email: '',
        password: '',
        index: 1,
        role: null
    }
    componentDidMount(){
        this.setState({role: this.props.role});
    }
    handleAccess = (e) => {
        e.preventDefault();
        const url = this.props.location.pathname;
        const dataFuncionario = {email: this.state.email, password: this.state.password};
        const dataVisitante = {email: this.state.email};
        this.setState({ accessing: true });
        axios.post(`${s.servers[this.props.i%s.servers.length]}/${url}/${this.state.floor}` , this.props.role === 'Funcionário' ? dataFuncionario : dataVisitante)
            .then((response) => {
                this.props.increment();
                console.log(url + '/' + this.state.floor);
                this.setState({ accessing: false });
                this.props.history.push(url + '/' + this.state.floor);
            })
            .catch((error) => {
                this.props.increment();
                console.log(error);
                this.setState({ accessing: false, error: error.message });
            })
    }
    handleShow = (floor) => {
        console.log('entrei aqui');
        this.setState({ show: true, floor: floor });
    }
    handleClose = () => {
        this.setState({ show: false });
    }
    render() {
        var translatedPermissions = [];
        
        this.props.allows.map((p) => {
            if(p === 'visitor'){
                translatedPermissions.push('Visitantes');
            } else if(p === 'employee'){
                translatedPermissions.push('Funcionários');
            } else if(p === 'admin'){
                translatedPermissions.push('Administradores');
            }
            return translatedPermissions
        })
        
        return <div>
            <Styles>
                <div className="floor">
                    <p>Andar: {this.props.index + 1} (Capacidade: {this.props.capacity}) <b>Permite:&nbsp;</b> {translatedPermissions.join(', ')}</p>
                    <Button variant="success" onClick={ e => this.handleShow(this.props.index + 1)}>
                        {!this.state.accessing ? 'Acessar Andar' : <div>
                            Acessando...
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
            </Styles>
            <Modal show={this.state.show} onHide={this.handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirme suas credenciais</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Digite seu email</Form.Label>
                            <Form.Control required type="email" placeholder="Digite seu email" onChange={e => this.setState({ email: e.target.value })} />
                            <Form.Text className="text-muted">
                                Nós não divulgaremos seu email para ninguém
                            </Form.Text>
                        </Form.Group>
                        {
                            this.props.role === 'Funcionário' ?
                                <div>
                                    <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Senha</Form.Label>
                                    <Form.Control required type="password" placeholder="Digite sua senha" onChange={e => this.setState({ password: e.target.value })} />
                                    </Form.Group>
                                </div> : null
                        }
                        <Button variant="primary" type="submit" onClick={this.handleAccess}  disabled={this.state.accessing}>
                            {!this.state.accessing ? 'Acessar Andar' : <div>
                                Acessando...
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
    }
}

export default withRouter(Floor);
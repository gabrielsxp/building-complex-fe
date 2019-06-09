import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import hrImg from '../assets/hr-12.png';
import { withRouter } from 'react-router-dom';
import { login, setBuilding } from '../services/auth';
import axios from '../axios';
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
    .formWrapper { 
        padding: 20px;
        border-radius: 5px;
        border: 2px solid #dedede;
    }
`;

class SignIn extends React.Component {
    state = {
        role: 'Visitante',
        name: '',
        email: '',
        password: '',
        submiting: false,
        error: null,
        success: null
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { role, name, email, password } = this.state;
        const path = this.props.location.state.from.pathname.split('/');
        const buildingName = path[path.length-1];
        if(role === 'Funcionário' && (!password || !email || !name)) {
            this.setState({error: 'Todos os campos devem ser preenchidos'});    
        } else if(role === 'Visitante' && (!name || !email)){
            this.setState({error: 'Todos os campos devem ser preenchidos'});  
        } else {
            this.setState({submiting: true});
            const visitante = {name: name, email: email};
            const funcionario = {name: name, password: password, email: email};
            if(this.state.role === 'Visitante'){
                axios.post(`${s.servers[this.props.i%s.servers.length] + this.props.location.state.from.pathname}`, visitante)
                .then((response) => {
                    this.props.increment();
                    console.log(this.props.location.state.from.pathname);
                    this.setState({submiting: false});
                    login(response.data.token, this.state.role);
                    setBuilding(buildingName);
                    this.props.history.push(this.props.location.state.from.pathname);
                })
                .catch((error) => {
                    console.log(error);
                    this.props.increment()
                    this.setState({submiting: false});
                    this.setState({error: error})
                })
            } else {
                    axios.post(`${s.servers[this.props.i%s.servers.length] + this.props.location.state.from.pathname}`, funcionario) //building/nomePredio
                    .then((response) => {
                        this.setState({submiting: false});
                        login(response.data.token, this.state.role);
                        setBuilding(buildingName);
                        this.props.history.push(this.props.location.state.from.pathname);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setState({submiting: false});
                        this.setState({error: error})
                    })
            }
        }
    }

    render(){
        return(<div>
            <Styles>
                <Container fluid>
                    <h1 style={{textAlign: "center"}}>Acessar Edifício</h1>
                    <hr className="styledHr" />
                    <Row>
                        <Col xs={12} lg={{span: 4, offset: 4}}>
                            <div className="formWrapper">
                            {
                                this.state.error ? <Alert  variant="danger">
                                    <Alert.Heading>Erro encontrado !</Alert.Heading>
                                    <p>{this.state.error}</p>
                                </Alert>
                                : null
                            }
                            {
                                this.state.success ? <Alert  variant="danger">
                                    <Alert.Heading>Logado com sucesso !</Alert.Heading>
                                    <p>Redirecionando...</p>
                                </Alert>
                                : null
                            }
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Selecione o seu nível de acesso</Form.Label>
                                        <Form.Control as="select" value={this.state.role} onChange={(e) => this.setState({role: e.target.value})}>
                                            <option>Visitante</option>
                                            <option>Funcionário</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Endereço de Email</Form.Label>
                                        <Form.Control required type="email" placeholder="Informe seu endereço de email" onChange={(e) => this.setState({email: e.target.value})} />
                                        <Form.Text className="text-muted">
                                        Nós nunca divulgaremos o seu endereço de email para ninguém
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group controlId="formBasicName">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control required type="text" placeholder="Informe seu nome completo" onChange={(e) => this.setState({name: e.target.value})} />
                                    </Form.Group>

                                    {
                                        this.state.role === 'Funcionário' ? <div>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>Senha</Form.Label>
                                                <Form.Control required type="password" placeholder="Password" onChange={(e) => this.setState({password: e.target.value})} />
                                                <Form.Text className="text-muted">Informe sua senha numérica de 6 dígitos</Form.Text>
                                            </Form.Group>
                                        </div>
                                        : null
                                    }

                                    <Button variant="primary" type="submit" onClick={this.handleSubmit} disabled={this.state.submiting}>
                                        {
                                            !this.state.submiting ? 'Acessar' :
                                            <div>
                                                Acessando&nbsp;&nbsp;
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
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Styles>
        </div>);
    }
}

export default withRouter(SignIn);
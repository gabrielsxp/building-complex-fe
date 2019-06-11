import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import hrImg from '../assets/hr-12.png';
import buildingImg from '../assets/b3.png';
import Image from 'react-bootstrap/Image';
import {Element} from 'react-scroll';

const Styles = styled.div`
    .container {
        margin-top: 80px;
        margin-bottom: 80px;
    }
    .container h2 {
        text-align: center;
    }
    .styledHr {
        height: 6px;
        background: url(${hrImg}) repeat-x 0 0;
        border: 0;
        max-width: 10rem;
    }
    .wrappingContent {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
    }
    .description {
        box-sizing: border-box;
        width: 100%;
        margin-top: 0.5rem;
        background-color: #dedede;
        box-shadow: 2px 1px 2px rgba(0,0,0,0.5);
        border-radius: 5px;
    }
    .description p {
        text-align: center;
        margin-top: 5px;
    }
`;

const about = () => {
    return <Element name="about" id="aboutId">
        <Styles>
            <Container>
                <h2>Descrição do projeto</h2>
                <hr className="styledHr"></hr>
                <Row>
                    <Col lg={{ span: 6, offset: 2 }} md={8}>
                        <p>
                        Considere um grande e movimentado complexo de edifícios comerciais de escritórios. Por
						motivos de segurança, é necessário realizar o controle de acesso de todas as pessoas que
						frequentam o complexo habitual (funcionários) ou esporadicamente (visitantes, clientes etc.).
						Políticas de acesso diferentes são aplicáveis a funcionários da administração do condomínio,
						funcionários das empresas que possuem escritórios no local e visitantes em geral. Na entrada do
						complexo, há um conjunto de pontos de acesso (como catracas eletrônicas), por meio dos quais
						as pessoas se identificam (usando biometria, por exemplo) antes de serem autorizadas a entrar
						nas instalações. Pontos de acesso também são instalados na entrada de cada prédio e na
						entrada de cada andar de um prédio, uma vez que funcionários das empresas condôminas,
						assim como os visitantes, só devem ter acesso a certas partes do complexo. Finalmente,
						também por motivos de segurança em caso de emergências, o complexo possui uma
						capacidade de lotação máxima total, por prédio e por andar. Desta forma, um visitante, mesmo
						que possua as credenciais necessárias, só pode ser admitido no complexo, prédio ou andar se
						as respectivas capacidades máximas não tiverem sido excedidas. Note que funcionários não
						estão sujeitos a este controle de lotação, embora devam ser contados para fins de cálculo da
						capacidade de ocupação disponível. Os parâmetros do sistema, em particular as políticas de
						acesso aplicáveis aos três tipos de ocupantes do edifício e as capacidades máximas (dos
						complexo, dos edifícios e de cada andar), devem ser definidos no início da operação do sistema
						pelo(a) administrador(a) do condomínio, podendo ser reajustados por ele(a) a qualquer momento.
						</p>
                        <p><b>Links Para o repositório da aplicação</b></p>
                        <div style={{
                            display: "flex",
                            flexWrap: "wrap",
                            flexFlow: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}>
                            <a className="btn btn-primary" style={{marginRight: '20px'}} href="https://github.com/gabrielsxp/project-building-api" target="_blank" rel="noopener noreferrer">Servidor</a>
                            <br />
                            <a className="btn btn-primary" href="https://github.com/gabrielsxp/building-complex-fe" target="_blank" rel="noopener noreferrer">Cliente</a>
                        </div>
                    </Col>
                    <Col lg={4} md={4}>
                        <div className="wrappingContent">
                            <Image src={buildingImg} thumbnail />
                            <div className="description">
                                <p>Exemplo de um prédio na aplicação</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Styles>
    </Element>
}

export default about;
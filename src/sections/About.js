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
                        <p>Officia magna non laborum labore officia mollit irure ex amet fugiat sint qui veniam adipisicing. Esse cupidatat officia irure culpa ex aliquip veniam dolore velit magna do. In magna non duis laboris velit et fugiat aliquip nostrud aliquip amet irure esse esse.</p>
                        <p>Irure dolore commodo amet esse labore occaecat laboris ipsum quis cupidatat nulla tempor mollit voluptate. Lorem quis consectetur et esse duis consequat dolore sint commodo. Officia amet est cillum deserunt Lorem.</p>
                        <p>Duis veniam mollit laborum adipisicing officia ea dolore qui qui irure irure. Laborum dolore aute esse minim dolore eu minim sit aute. Nulla non consequat occaecat mollit sint cillum aute sunt proident elit aute non non magna.</p>
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
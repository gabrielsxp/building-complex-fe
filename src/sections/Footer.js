import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Styles = styled.div`
    .container-fluid {
        background-color: #333;
        padding: 50px 0;
        color: #fff;
        text-align: center;
        overflow: hidden;
    }
    .linkpngtree {
        color: #fff;
        text-decoration: underline;
    }
    .linkpngtree:hover {
        color: #dedede;
        text-decoration: underline;
    }
`;

class Footer extends React.Component {
    render() {
        const location = this.props.location.pathname === '/app' ? true : false;
        return <div>
            <Styles>
                <Container fluid>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }}>Feito com ♥</Col>
                    </Row>
                    <Row>
                        <Col xs={{ span: 4, offset: 4 }}>
                            {location ? <a className="linkpngtree" href="https://pngtree.com/free-vectors">Free Vector from PNGTREE</a> : null}
                        </Col>
                    </Row>
                </Container>
            </Styles>
        </div>
    }
}

export default withRouter(Footer);
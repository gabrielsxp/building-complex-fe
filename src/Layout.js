import React from 'react';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';

const Styles = styled.div`
    .container {
        background-color: red;
        margin-top: 40px;
        margin-bottom: 40px;
    }
`;

const layout = (props) => {
    return <div><Styles><Container fluid>{props.children}</Container></Styles></div>
}

export default layout;
import React from 'react';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import About from '../sections/About';
import bgImg from '../assets/herobg.jpg';
import Jumbotron from 'react-bootstrap/Jumbotron';
import { Link,  Events, scrollSpy } from 'react-scroll'
import {Link as L} from 'react-router-dom';

const Styles = styled.div`
    .jumbotron {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        top: -5rem;
        width: 100%;
        height: calc(100vh + 5rem);
        z-index: 0;
        background: url(${bgImg}) no-repeat fixed top;
        background-size: cover;
    }
    .hero {
        position: relative;
        width: 100%;
        z-index: 1;
        height: calc(100vh + 5rem);
        background-color: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .hero h1 {
        color: #fff;
    }
    .hero p {
        color: #dedede;
    }
    .heroContent {
        text-align: justify;
        padding: 20px;
    }
    .btnWrapper {
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .btnWrapper .btn-secondary {
        background-color: #ff502f;
        border-color: #ff502f;
    }
    .btnWrapper button {
        margin-right: 1.5rem;
    }
`;

class Landing extends React.Component {
        componentDidMount() {
            Events.scrollEvent.register('begin', function(to, element) {
                console.log("begin", arguments);
            });
            
            Events.scrollEvent.register('end', function(to, element) {
                console.log("end", arguments);
            });
            
            scrollSpy.update();
        }
        componentWillUnmount() {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
        render(){
        return <div>
            <Styles>
                <Jumbotron fluid>
                    <div className="hero">
                        <div className="heroContent">
                            <h1>BuildingComplex</h1>
                            <p>Aplicação distribuída baseada em comunicação com API RESTFUL</p>
                            <div className="btnWrapper">
                                <Link to="about" spy={true} smooth={true} duration={750} offset={-160}><Button variant="secondary">Saiba Mais</Button></Link>
                                <L to="/app"><Button variant="primary">Iniciar</Button></L>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <About />
            </Styles>
        </div>
        }
}

export default Landing;
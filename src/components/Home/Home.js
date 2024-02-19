import React from 'react';
import './Home.css'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: ''
        }
    }

    buttonClickHandler = (e) => {
        let id = e.target.id;
        this.props.mode(id);
    };

    goToHackonePage = () => {
        window.open('https://hackone.com.br/#');
    };

    render() {
        return (
            <div className="container">
                <div className="wrapper-center">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="homeHeader text-primary">
                                Binário Hackone
                            </h6>

                            {/* <div style={{marginTop: '16px', }}>
                                <p>
                                    Para conquistar o exame de certificação da Hackone, é essencial dominar a arte da conversão ágil entre números decimais e binários.
                                </p>

                                <p>
                                    A Hackone está ao seu dispor, oferecendo um desafio envolvente no universo binário. Aperfeiçoe sua habilidade de converter números rapidamente, elevando sua destreza mental nesse processo.
                                </p>

                                <p>
                                    Não deixe de explorar nossos recursos de Webinars e vídeos, uma valiosa extensão para seu aprendizado gratuito. Tenha acesso a vídeos de treinamento exclusivos e participe de webinars ao vivo com especialistas da Hackone, enriquecendo ainda mais sua jornada de conhecimento.
                                </p>
                            </div> */}

                            <div className="buttonContainer">
                                {/* <div className="button" id={'easy'} onClick={this.buttonClickHandler}>
                                    EASY (4x4)
                                </div> */}
                                {/* <div className="button" id={'medium'} onClick={this.buttonClickHandler}>
                                    MEDIUM (6x6)
                                </div> */}
                                <div className='buttonContainer'>
                                    <button className="button primary primary-pulse" id={'hard'} onClick={this.buttonClickHandler}>
                                        COMEÇAR AGORA
                                    </button>
                                    
                                    <div style={{ marginTop: '20px' }}>
                                        <button className="button button-outline primary" id={'hard'} onClick={this.goToHackonePage} style={{ fontSize:'12px' }}>
                                            CONHEÇA A HACKONE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;

import React from 'react';
import './Game.css';
import {EASY, MEDIUM, HARD} from '../../const/Modes'

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPow: 0,
            items: [],
            resultHorizontal: [],
            resultVertical: [],
            currentTotalVertical: [],
            currentTotalHorizontal: [],
            isTrueVertical: [],
            isTrueHorizontal: [],
            isFinish: 0
        }
        this.arrayValueColums = ['2⁰', '2¹', '2²', '2³', '2⁴', '2⁵', '2⁶', '2⁷'].reverse();
    }


    clickHandler = (e) => {
        let index = e.target.id;
        let {
            items,
            resultHorizontal,
            currentTotalVertical,
            currentTotalHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal,
            maxPow
        } = this.state;


        let column = index % maxPow;
        let row = Math.floor(index / maxPow);


        if (items[index].isActive) {
            items[index].isActive = 0;
            currentTotalVertical[column] -= Math.pow(2, items[index].rowValue);
            currentTotalHorizontal[row] -= Math.pow(2, items[index].colValue);
        } else {
            items[index].isActive = 1;
            currentTotalVertical[column] += Math.pow(2, items[index].rowValue);
            currentTotalHorizontal[row] += Math.pow(2, items[index].colValue);
        }

        if (resultHorizontal[column] === currentTotalVertical[column]) {
            isTrueVertical[column] = 1;
        } else {
            isTrueVertical[column] = 0
        }

        if (resultVertical[row] === currentTotalHorizontal[row]) {
            isTrueHorizontal[row] = 1;
        } else {
            isTrueHorizontal[row] = 0
        }
        this.isFinish();
        this.setState({
            items,
            resultHorizontal,
            currentTotalVertical,
            currentTotalHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal,
        })
    };

    randomBinary() {
        return Math.floor(Math.random() * 10) % 2
    }

    isFinish = () => {

        let {isTrueHorizontal, isTrueVertical, maxPow} = this.state;
        let isCompleteHorizontal = 0;
        let isCompleteVertical = 0;

        isTrueHorizontal.map(x => {
            isCompleteHorizontal += x;
        });

        isTrueVertical.map(x => {
            isCompleteVertical += x;
        });

        let isFinish = isCompleteVertical + isCompleteHorizontal === maxPow * 2 ? 1 : 0;

        this.setState({
            isFinish
        })
    };

    setItems = () => {
        let items = [];
        let maxPow = 0;
        let resultHorizontal = [];
        let currentTotalVertical = [];
        let currentTotalHorizontal = [];
        let resultVertical = [];

        switch (this.props.mode) {
            case 'easy':
                items = EASY;
                maxPow = 4;
                break;

            case 'medium':
                items = MEDIUM;
                maxPow = 6;
                break;

            case 'hard':
                items = HARD;
                maxPow = 8;
                break;
        }


        for (let i = 0; i < maxPow; i++) {
            resultVertical[i] = 0;
            resultHorizontal[i] = 0;
            currentTotalHorizontal[i] = 0;
            currentTotalVertical[i] = 0;
        }

        do { // 0 sonucunun gelmesini istemiyoruz
            for (let i = 0; i < maxPow; i++) {
                resultVertical[i] = 0;
                resultHorizontal[i] = 0;
            }
            items.map((item, index) => {
                let randomBinary = this.randomBinary();
                item.binaryValue = randomBinary;
                let column = index % maxPow;
                let row = Math.floor(index / maxPow);
                if (randomBinary) {
                    resultVertical[column] += Math.pow(2, items[index].rowValue);
                    resultHorizontal[row] += Math.pow(2, items[index].colValue);
                }

            });


        } while (this.isItZero(resultHorizontal, resultVertical, maxPow)) ;


        this.setState({
            items,
            resultVertical,
            resultHorizontal,
            maxPow,
            currentTotalVertical,
            currentTotalHorizontal
        })
    };


    giveUpHandler = () => {
        let {items} = this.state;

        items.map(item => {
            item.isActive = 0;
            if (item.binaryValue !== 0) {
                item.isActive = 1
            }
        });


        this.setState({
            isFinish: 1,
            items
        })
    };

    refreshGame = () => {
        let {items} = this.state;

        items.map(item => {
            item.isActive = 0;
        });
        this.props.mode('hard')
    };

    backToHome = () => {
        let {items} = this.state;

        items.map(item => {
            item.isActive = 0;
        });
        this.props.screen()
    }


    isItZero(resultHorizontal, resultVertical, maxPow) {
        for (let i = 0; i < maxPow; i++) {
            if (resultHorizontal[i] === 0 || resultVertical[i] === 0) {
                return 1;
            }
        }

        return 0;
    };

    returnCalculationIndicatorVertical(indexCount) {
        switch(indexCount){
            case 7: 
                return this.arrayValueColums[0];
            case 15: 
                return this.arrayValueColums[1];
            case 23: 
                return this.arrayValueColums[2];
            case 31: 
                return this.arrayValueColums[3];
            case 39: 
                return this.arrayValueColums[4];
            case 47: 
                return this.arrayValueColums[5];
            case 55: 
                return this.arrayValueColums[6];
            case 63: 
                return this.arrayValueColums[7];
            default:
                return '-'
        }
    }


    componentDidMount() {
        this.setItems()
    }


    render() {
        const {
            items,
            resultHorizontal,
            isTrueVertical,
            resultVertical,
            isTrueHorizontal,
            maxPow,
            isFinish
        } = this.state;
        const {mode} = this.props;
        return (
            <div className='container-wrapper'>
                <div className="card card-game">
                    <div className="card-body">
                            <div className={"container " + mode + "Container"}>
                            {
                                items.map((item, index) => {
                                    if (index % maxPow === maxPow - 1) {
                                        
                                        return (
                                            <div style={{display: "flex"}}>
                                                <div
                                                    className={"item " + mode + "Item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
                                                    onClick={this.clickHandler} id={index} key={index}>
                                                    {item.isActive}
                                                </div>
                                                <div
                                                    style={{position: 'relative'}}
                                                    className={"item " + mode + "Item " + (isTrueHorizontal[Math.floor(index / maxPow)] ? "resultItemTrue" : "resultItemFalse")}>
                                                    {resultVertical[Math.floor(index / maxPow)]}
                                                    
                                                    <div className='calculationIndicatorVertical'>
                                                        { this.returnCalculationIndicatorVertical(index) }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div
                                                className={"item " + mode + "Item " + (items[index].isActive ? "activeItem" : "inactiveItem")}
                                                onClick={this.clickHandler} id={index} key={index}>
                                                {item.isActive}
                                            </div>
                                        )
                                    }
                                })
                            }
                            {
                                resultHorizontal.map((resultHorizontal, index) => {
                                    return (
                                        <>
                                            <div
                                                style={{position: 'relative'}}
                                                className={"item " + mode + "Item " + (isTrueVertical[index % maxPow] ? "resultItemTrue " : "resultItemFalse ")}
                                                key={index}>
                                                {resultHorizontal}

                                                <div className='calculationIndicator'>
                                                    {this.arrayValueColums[index]}
                                                </div>
                                            </div>
                                            
                                        </>
                                    )
                                })
                            }


                        </div>
                        {/* <div className="gameButtonArea">
                            {
                                isFinish ?
                                    (
                                        <button className="button">
                                            Compartilhar pontuação
                                        </button>
                                    )
                                    :
                                    (
                                        <button className="button primary" onClick={this.refreshGame} title='Reiniciar'>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                xmlSpace="preserve"
                                                width="0.9em"
                                                height="0.9em"
                                                fill="#FFF"
                                                viewBox="0 0 489.645 489.645"
                                            >
                                                <path d="M460.656 132.911c-58.7-122.1-212.2-166.5-331.8-104.1-9.4 5.2-13.5 16.6-8.3 27 5.2 9.4 16.6 13.5 27 8.3 99.9-52 227.4-14.9 276.7 86.3 65.4 134.3-19 236.7-87.4 274.6-93.1 51.7-211.2 17.4-267.6-70.7l69.3 14.5c10.4 2.1 21.8-4.2 23.9-15.6 2.1-10.4-4.2-21.8-15.6-23.9l-122.8-25c-20.6-2-25 16.6-23.9 22.9l15.6 123.8c1 10.4 9.4 17.7 19.8 17.7 12.8 0 20.8-12.5 19.8-23.9l-6-50.5c57.4 70.8 170.3 131.2 307.4 68.2 58.1-30 191.5-147.7 103.9-329.6z" />
                                            </svg>
                                        </button>
                                        
                                    )
                            }
                            <button style={{marginRight: "12px"}} className="button button-outline" onClick={this.giveUpHandler}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlSpace="preserve"
                                    width="1em"
                                    height="1em"
                                    fill="#FFF"
                                    viewBox="0 0 973.1 973.1"
                                >
                                    <path d="M502.29 788.199h-47c-33.1 0-60 26.9-60 60v64.9c0 33.1 26.9 60 60 60h47c33.101 0 60-26.9 60-60v-64.9c0-33.199-26.899-60-60-60zM170.89 285.8l86.7 10.8c27.5 3.4 53.6-12.4 63.5-38.3 12.5-32.7 29.9-58.5 52.2-77.3 31.601-26.6 70.9-40 117.9-40 48.7 0 87.5 12.8 116.3 38.3 28.8 25.6 43.1 56.2 43.1 92.1 0 25.8-8.1 49.4-24.3 70.8-10.5 13.6-42.8 42.2-96.7 85.9-54 43.7-89.899 83.099-107.899 118.099-18.4 35.801-24.8 75.5-26.4 115.301-1.399 34.1 25.8 62.5 60 62.5h49c31.2 0 57-23.9 59.8-54.9 2-22.299 5.7-39.199 11.301-50.699 9.399-19.701 33.699-45.701 72.699-78.1C723.59 477.8 772.79 428.4 795.891 392c23-36.3 34.6-74.8 34.6-115.5 0-73.5-31.3-138-94-193.4-62.6-55.4-147-83.1-253-83.1-100.8 0-182.1 27.3-244.1 82-52.8 46.6-84.9 101.8-96.2 165.5-3.501 18.6 9.199 36 27.699 38.3z" />
                                </svg>
                                Resolver
                            </button>
                        </div> */}

                        <div style={{marginTop: '10px'}}>
                            <button style={{marginRight: "12px", fontSize: '12px'}} className="button button-outline" onClick={this.backToHome}>
                                Voltar
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


export default Game;

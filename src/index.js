import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


class Exercise extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            type: "",
            value: 0
        };
        this.getExercise = this.getExercise.bind(this);
        this.clear = this.clear.bind(this);

    }

    setName(evt) {
        this.setState({
            name: evt.target.value
        })
    }

    setType(evt) {
        this.setState({
            type: evt.target.value
        })
    }

    setValue(evt) {
        this.setState({
            value: evt.target.value
        })
    }

    clear() {
        this.setState({
            name: "",
            type: "",
            value: 0
        })
    }

    async getExercise() {
        try {
            const response = await fetch(
                `http://localhost:8080/exercise`
            );
            const exercise = await response.json();
            const newState = exercise[Math.floor(Math.random() * (exercise.length - 1))];
            console.log(newState)
            this.setState(newState);

        } catch (error) {
            console.error(error);
        }
    }

    postIt(state) {
        console.log(state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        };
        fetch('http://localhost:8080/exercise', requestOptions);
            // .then(response => response.json())
            // .then(data => this.setState({ postId: data.id }));
    }

    render() {

        return (
            <div>
                <p>{this.state.name}</p>
                <p>{this.state.type}</p>
                <p>{this.state.value}</p>
                <input type="text" onChange={evt => this.setName(evt)}/>
                <input type="text" onChange={evt => this.setType(evt)}/>
                <input type="number" onChange={evt => this.setValue(evt)}/>
                <button type="button" onClick={() => this.postIt(this.state)}>Post It</button>
                <button type="button" onClick={this.getExercise}>Get It</button>
                <button type="button" onClick={this.clear}>Clear</button>
            </div>
        );
    }
}


class Calc extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0
        };
        this.getCalc = this.getCalc.bind(this);
        this.clear = this.clear.bind(this);

    }

    setValue(evt) {
        this.setState({
            value: evt.target.value
        })
    }

    clear() {
        this.setState({
            value: 0
        })
    }

    async getCalc() {
        try {
            const response = await fetch(
                `http://localhost:8080/calc`
            );
            const exercise = await response.json();
            console.log(exercise)
            this.setState({
                value: exercise
            });

        } catch (error) {
            console.error(error);
        }
    }

    postIt(state) {
        console.log(state);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(state)
        };
        fetch('http://localhost:8080/calc', requestOptions);
    }

    render() {

        return (
            <div>
                <p>{this.state.value}</p>
                <input type="number" onChange={evt => this.setValue(evt)}/>
                <button type="button" onClick={() => this.postIt(this.state)}>Post It</button>
                <button type="button" onClick={this.getCalc}>Get It</button>
                <button type="button" onClick={this.clear}>Clear</button>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Calc/>);




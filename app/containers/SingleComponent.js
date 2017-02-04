import React, { Component } from 'react';
import Results from '../components/results/Results';
import PageTitle from '../components/pageTitle/PageTitle';

const { ipcRenderer } = require('electron');

ipcRenderer.on('results', (event, arg) => {
    // Print 2
    console.log(arg);
});


export default class SingleComponent extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            componentName: ''
        };

        this.clear = this.clear.bind(this);
        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    clear() {
        this.setState({
            componentName: ''
        });
    }

    handleComponentNameChange(event) {
        this.setState({ componentName: event.target.value });
    }

    handleSubmit() {
        ipcRenderer.send('search', {
            type: 'single-component',
            data: {
                componentName: this.state.componentName
            }
        });
        console.log('submit');
    }

    render() {
        return (
            <div>

                <PageTitle title="Single Component Search" subtitle="Enter a components name to search for it" />

                <div className="columns">
                    <div className="column is-one-quarter">
                        <label className="label">Component Name</label>
                        <p className="control">
                            <input className="input" type="text" placeholder="ui:component-name" value={this.state.componentName} onChange={this.handleComponentNameChange} />
                        </p>
                        <div className="control is-grouped">
                            <p className="control">
                                <button
                                    className={`button is-primary ${this.state.componentName ? '' : 'is-disabled'}`}
                                    onClick={this.handleSubmit}
                                >Search</button>
                            </p>
                            <p className="control">
                                <button className="button is-link" onClick={this.clear}>Cancel</button>
                            </p>
                        </div>
                    </div>
                </div>

                <Results results={['asd']} />
            </div>
        );
    }
}
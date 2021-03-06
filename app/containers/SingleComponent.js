import React, {Component} from 'react';
import Results from '../components/results/Results';
import PageTitle from '../components/pageTitle/PageTitle';

const {ipcRenderer} = require('electron');

export default class SingleComponent extends Component {

    constructor() {
        super();
        this.state = {
            mode: 'list',
            componentName: '',
            results: null,
            loading: false
        };

        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.handleSearchResponse = this.handleSearchResponse.bind(this);
        this.handleComponentNameChange = this.handleComponentNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.clear = this.clear.bind(this);
    }

    componentDidMount() {
        ipcRenderer.on('results', this.handleSearchResponse);
    }

    componentWillUnmount() {
        ipcRenderer.removeListener('results', this.handleSearchResponse);
    }

    handleSearchResponse(event, arg) {
        this.setState({loading: false, results: arg});
    }

    handleComponentNameChange(event) {
        this.setState({componentName: event.target.value});
    }

    handleSubmit() {
        ipcRenderer.send('search', {
            type: 'single-component',
            data: {
                componentName: this.state.componentName
            }
        });
        this.setState({loading: true});
    }

    handleKeyPress(target) {
        if (target.charCode === 13) {
            if (this.state.componentName) {
                this.handleSubmit();
            }
        }
    }

    clear() {
        this.setState({
            componentName: ''
        });
    }

    render() {
        return (
            <div>

                <PageTitle title="Single Component Search" subtitle="Enter a components name to search for it"/>

                <div className="columns">
                    <div className="column is-one-third">
                        <label className="label">Component Name</label>
                        <p className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="ui:component-name"
                                value={this.state.componentName}
                                onChange={this.handleComponentNameChange}
                                onKeyPress={this.handleKeyPress}
                            />
                        </p>
                        <div className="control is-grouped">
                            <p className="control">
                                <button
                                    className={`button is-primary ${this.state.componentName ? '' : 'is-disabled'}`}
                                    onClick={this.handleSubmit}
                                >Search
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-link" onClick={this.clear}>Cancel</button>
                            </p>
                        </div>
                    </div>
                </div>

                <Results loading={this.state.loading} results={this.state.results}/>
            </div>
        );
    }
}

import React, { Component } from 'react';
import Axios from 'Axios';

import PageHeader from '../template/pageHeader';
import TodoForm from './todoForm';
import TodoList from './todoList';

const URL = 'http://localhost:3003/api/todos';

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = { description: '', list: [] }

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.refresh();
    }

    refresh() {
        Axios.get(`${URL}?sort=-createdAt`).then(resp => this.setState({ ...this.state, description: '', list: resp.data }));
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value });
    }

    handleAdd() {
        const description = this.state.description;
        const done = true;
        Axios.post(URL, { description, done })
            .then(res => this.refresh());
    }

    render() {
        return (
            < div >
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    description={this.state.description}
                />
                <TodoList />
            </div >
        )
    }
}
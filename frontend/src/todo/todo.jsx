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

        this.handleSearch = this.handleSearch.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this);
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this);
        this.handleClear = this.handleClear.bind(this);

        this.refresh(this.state.description);
    }

    refresh(description = '') {
        const search = description ? `&description__regex=/${description}/` : '';

        Axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => this.setState({ ...this.state, description, list: resp.data }));
    }

    handleSearch() {
        this.refresh(this.state.description);
    }

    handleChange(e) {
        this.setState({ ...this.state, description: e.target.value });
    }

    handleAdd() {
        const description = this.state.description;
        const done = false;
        Axios.post(URL, { description, done })
            .then(resp => this.refresh(this.state.description));
    }

    handleClear() {
        this.refresh();
    }

    handleMarkAsDone(todo) {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => this.refresh(this.state.description));
    }

    handleMarkAsPending(todo) {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => this.refresh(this.state.description));

    }

    handleRemove(todo) {
        Axios.delete(`${URL}/${todo._id}`)
            .then(resp => this.refresh(this.state.description));
    }

    render() {
        return (
            < div >
                <PageHeader name="Tarefas" small="Cadastro" />
                <TodoForm
                    handleSearch={this.handleSearch}
                    handleAdd={this.handleAdd}
                    handleChange={this.handleChange}
                    description={this.state.description}
                    handleClear={this.handleClear}
                />
                <TodoList
                    list={this.state.list}
                    handleRemove={this.handleRemove}
                    handleMarkAsDone={this.handleMarkAsDone}
                    handleMarkAsPending={this.handleMarkAsPending}
                />
            </div >
        )
    }
}
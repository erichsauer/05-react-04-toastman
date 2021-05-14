import React, { Component } from 'react';
import { Controls } from '../components/Controls';
import Spinner from '../components/Spinner';

export default class Toastman extends Component {
  state = {
    loading: false,
    selectedMethod: 'GET',
    enteredURL: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const { handleSubmit, handleInputChange } = this;
    const { selectedMethod, enteredURL, loading } = this.state;
    return (
      <>
        <Controls
          onFormSubmit={handleSubmit}
          onInputChange={handleInputChange}
          selectedMethod={selectedMethod}
          enteredURL={enteredURL}
        />
        {loading ? <Spinner /> : <div>Hello World</div>}
      </>
    );
  }
}

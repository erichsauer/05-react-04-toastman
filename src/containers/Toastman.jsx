import React, { Component } from 'react';
import Controls from '../components/Controls';
import Header from '../components/Header';
import HistoryList from '../components/HistoryList';
import Response from '../components/Response';
import Spinner from '../components/Spinner';
import fetchUtil from '../services/fetchUtil';

export default class Toastman extends Component {
  state = {
    loading: false,
    selectedMethod: '',
    enteredURL: '',
    enteredJSON: '',
    responseJSON: '',
    historyList: [],
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { enteredURL, selectedMethod, enteredJSON } = this.state;
    let responseJSON;
    this.setState({ loading: true });

    try {
      responseJSON = await fetchUtil({
        url: enteredURL,
        method: selectedMethod,
        body: enteredJSON,
      });
    } catch (e) {
      responseJSON = { Error: `Uh oh! This happened: ${e.message}` };
    }
    setTimeout(() => {
      this.setState({
        loading: false,
      });
    }, 3000);
    this.setState(({ historyList, enteredURL }) => ({
      responseJSON,
      historyList: historyList.includes(enteredURL)
        ? historyList
        : [...historyList, enteredURL],
    }));
  };

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleReset = () => {
    this.setState({
      selectedMethod: '',
      enteredURL: '',
      enteredJSON: '',
      responseJSON: '',
      historyList: [],
    });
  };

  handleBack = () => {
    this.setState({ responseJSON: '' });
  };

  handleHistoryItemDelete = (historyItem) => {
    this.setState(({ historyList }) => ({
      historyList: historyList.filter((item) => item !== historyItem),
      enteredURL: historyItem,
      responseJSON: '',
    }));
  };

  handleURLClear = () => {
    this.setState({
      enteredURL: '',
      selectedMethod: '',
    });
  };

  render() {
    const {
      handleSubmit,
      handleInputChange,
      handleReset,
      handleBack,
      handleHistoryItemDelete,
      handleURLClear,
    } = this;
    const {
      selectedMethod,
      enteredURL,
      enteredJSON,
      loading,
      responseJSON,
      historyList,
    } = this.state;
    return (
      <>
        <Header onLogoClick={handleReset} />
        {loading ? (
          <Spinner />
        ) : responseJSON ? (
          <Response responseJSON={responseJSON} onBack={handleBack} />
        ) : (
          <Controls
            onFormSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onURLClear={handleURLClear}
            selectedMethod={selectedMethod}
            enteredURL={enteredURL}
            enteredJSON={enteredJSON}
          />
        )}
        <HistoryList
          historyList={historyList}
          onHistoryItemClick={handleHistoryItemDelete}
        />
      </>
    );
  }
}

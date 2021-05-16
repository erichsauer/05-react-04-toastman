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
    apiKey: false,
    enteredKey: '',
    enteredKeyHeader: '',
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      enteredURL,
      selectedMethod,
      enteredJSON,
      enteredKeyHeader,
      enteredKey,
    } = this.state;
    let responseJSON;
    this.setState({ loading: true });

    try {
      responseJSON = await fetchUtil({
        url: enteredURL,
        method: selectedMethod,
        body: enteredJSON,
        header: enteredKeyHeader,
        key: enteredKey,
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

  handleCheckboxToggle = () => {
    this.setState(({ apiKey }) => ({
      apiKey: !apiKey,
    }));
  };

  handleReset = () => {
    this.setState({
      selectedMethod: '',
      enteredURL: '',
      enteredJSON: '',
      responseJSON: '',
      historyList: [],
      apiKey: false,
      enteredKey: '',
      enteredKeyHeader,
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
      enteredJSON: '',
      apiKey: false,
      enteredKey: '',
      enteredKeyHeader: '',
      selectedMethod: '',
    }));
  };

  handleURLClear = () => {
    this.setState({
      enteredURL: '',
      apiKey: false,
      enteredKey: '',
      enteredKeyHeader: '',
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
      handleCheckboxToggle,
    } = this;
    const {
      selectedMethod,
      enteredURL,
      enteredJSON,
      loading,
      responseJSON,
      historyList,
      apiKey,
      enteredKey,
      enteredKeyHeader,
    } = this.state;
    return (
      <>
        <Header onLogoClick={handleReset} />
        {loading ? (
          <Spinner />
        ) : responseJSON && enteredURL ? (
          <Response responseJSON={responseJSON} onBack={handleBack} />
        ) : (
          <Controls
            onFormSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onURLClear={handleURLClear}
            onCheckboxToggle={handleCheckboxToggle}
            selectedMethod={selectedMethod}
            enteredURL={enteredURL}
            enteredJSON={enteredJSON}
            apiKEY={apiKey}
            enteredKey={enteredKey}
            enteredKeyHeader={enteredKeyHeader}
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

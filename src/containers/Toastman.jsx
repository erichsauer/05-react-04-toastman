import React, { Component } from 'react';
import Controls from '../components/Controls';
import Header from '../components/Header';
import HistoryList from '../components/HistoryList';
import Response from '../components/Response';
import Spinner from '../components/Spinner';
import Welcome from '../components/Welcome';
import fetchUtil from '../services/fetchUtil';

export default class Toastman extends Component {
  state = {
    loading: false,
    selectedMethod: '',
    enteredURL: '',
    enteredJSON: '',
    responseJSON: { json: '' },
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
    let responseJSON = { json: {} };

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
      responseJSON: { json: '' },
      historyList: [],
      apiKey: false,
      enteredKey: '',
      enteredKeyHeader: '',
    });
  };

  handleBack = () => {
    this.setState({ responseJSON: { json: '' } });
  };

  handleHistoryItemDelete = (historyItem) => {
    this.setState(({ historyList }) => ({
      historyList: historyList.filter((item) => item !== historyItem),
      enteredURL: historyItem,
      responseJSON: { json: '' },
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
      enteredURL,
      loading,
      responseJSON,
      historyList,
      selectedMethod,
      enteredJSON,
      apiKey,
      enteredKey,
      enteredKeyHeader,
    } = this.state;
    return (
      <>
        <Header onLogoClick={handleReset} />
        {loading ? (
          <Spinner />
        ) : responseJSON.json && enteredURL ? (
          <Response responseJSON={responseJSON} onBack={handleBack} />
        ) : (
          <Controls
            onFormSubmit={handleSubmit}
            onInputChange={handleInputChange}
            onURLClear={handleURLClear}
            onCheckboxToggle={handleCheckboxToggle}
            selectedMethod={selectedMethod}
            enteredJSON={enteredJSON}
            apiKey={apiKey}
            enteredKey={enteredKey}
            enteredKeyHeader={enteredKeyHeader}
            enteredURL={enteredURL}
          />
        )}
        {historyList.length === 0 ? (
          <Welcome />
        ) : (
          <HistoryList
            historyList={historyList}
            onHistoryItemClick={handleHistoryItemDelete}
          />
        )}
      </>
    );
  }
}

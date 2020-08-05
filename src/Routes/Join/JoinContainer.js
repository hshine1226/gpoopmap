import React from "react";
import JoinPresenter from "./JoinPresenter";

export default class extends React.Component {
  state = {
    loading: false,
  };
  render() {
    const { loading } = this.state;
    return <JoinPresenter loading={loading} />;
  }
}

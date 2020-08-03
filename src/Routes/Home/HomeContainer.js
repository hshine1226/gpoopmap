import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;

    return <HomePresenter loading={loading} />;
  }
}

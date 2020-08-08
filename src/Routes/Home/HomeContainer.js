import React from "react";
import HomePresenter from "./HomePresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return <HomePresenter loading={loading} history={this.props.history} />;
  }
}

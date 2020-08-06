import React from "react";
import JoinPresenter from "./JoinPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;
    return <JoinPresenter loading={loading} history={this.props.history} />;
  }
}

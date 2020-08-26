import React from "react";
import LoginPresenter from "./LoginPresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return <LoginPresenter loading={loading} history={this.props.history} />;
  }
}

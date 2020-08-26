import React from "react";
import ProfilePresenter from "./ProfilePresenter";

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };
  }

  render() {
    const { loading } = this.state;

    return <ProfilePresenter loading={loading} history={this.props.history} />;
  }
}

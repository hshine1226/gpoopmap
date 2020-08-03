import React, { Component } from "react";
import Router from "Components/Router";
import GlobalStyles from "Components/GlobalStyles";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      "Noto Sans KR",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:6001/api/me")
      .then((res) => res.json())
      .then((data) => this.setState({ username: data.username }));
  }
  render() {
    const { username } = this.state;
    console.log(username);
    return (
      <>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </>
    );
  }
}

export default App;

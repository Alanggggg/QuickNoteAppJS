import React, { Component } from "react";
import { FormControl, TextField, Button, Paper } from "@material-ui/core";
import { withRouter } from "react-router";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const styles = {
  form: {
    marginTop: "2rem",
    marginBottom: "1rem",
    padding: "1rem",
  },
  paper: {
    marginBottom: "1rem",
  },
};

class UpsertNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
    };
  }

  updateTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  updateText = (value) => {
    this.setState({
      text: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.upsertNote(this.state);
    this.props.history.push("/");
  };

  handleCancel = (event) => {
    event.preventDefault();
    this.props.history.push("/");
  };

  //invoked immediately after the component is inserted into the DOM
  componentDidMount() {
    const { state } = this.props.location;
    if (state) {
      console.log(state);
      const { id, title, text } = state;
      this.setState({
        id,
        title,
        text,
      });
    }
  }


  render() {
    return (
      <form style={styles.form}>
        <Paper elevation={3} style={styles.paper}>
          <FormControl fullWidth>
            <TextField
              label="Title"
              variant="outlined"
              value={this.state.title}
              onChange={this.updateTitle}
            />
          </FormControl>
        </Paper>
        <SimpleMDE value={this.state.text} onChange={this.updateText} />
        <div>
          <Button type="button" color="secondary" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button type="submit" color="primary" onClick={this.handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    );
  }

}

export default withRouter(UpsertNote);

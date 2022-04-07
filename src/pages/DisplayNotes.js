import { List, Fab, withStyles } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { Component } from "react";
import Note from "../components/Note";
import Search from "../components/Search";
import { Link } from "react-router-dom";

const styles = {
    fab: {
      position: 'absolute',
      bottom: "2rem",
      right: "2rem",
    }
  };

class DisplayNotes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }

  updateQuery = (query) => {
    this.setState({ query });
  };

  includes = (note) => {
    const query = this.state.query.trim().toLowerCase();
    return (
      query === "" ||
      note.title.toLowerCase().includes(query) ||
      note.text.toLowerCase().includes(query)
    );
  };

  render() {
    const { notes, deleteNote, classes } = this.props;
    return (
      <>
        <Search query={this.state.query} updateQuery={this.updateQuery} />
        <List>
          {notes.filter(this.includes).map((note, index) => {
            return <Note note={note} key={index} deleteNote={deleteNote} />;
          })}
        </List>
        <Link to="/add">
          <Fab aria-label={"Add"} className={classes.fab}>
            <Add />
          </Fab>
        </Link>
      </>
    );
  }
}

export default withStyles(styles)(DisplayNotes);

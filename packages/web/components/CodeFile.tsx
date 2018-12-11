import * as React from "react";

interface Props {
  text: string | null;
}

export class CodeFile extends React.PureComponent<Props> {
  state = {
    startingLineNum: "0",
    endingLineNum: "0",
    question: ""
  };

  handleChange = (e: any) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { text } = this.props;
    const { endingLineNum, question, startingLineNum } = this.state;

    return (
      <>
        <pre>{text}</pre>
        <form
          onSubmit={e => {
            e.preventDefault();
            console.log("send mutation");
          }}
        >
          <input
            name="startingLineNum"
            placeholder="startingLineNum"
            value={startingLineNum}
            onChange={this.handleChange}
          />
          <input
            name="endingLineNum"
            placeholder="endingLineNum"
            value={endingLineNum}
            onChange={this.handleChange}
          />
          <input
            name="question"
            placeholder="question"
            value={question}
            onChange={this.handleChange}
          />
          <button type="submit">save</button>
        </form>
      </>
    );
  }
}

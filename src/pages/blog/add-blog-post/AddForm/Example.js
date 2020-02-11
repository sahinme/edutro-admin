import React, { Component } from 'react'


import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: 'content',
    }
  }

  updateContent(value) {
    this.setState({ content: value })
  }

  render() {
    const { content } = this.state;
    return <JoditEditor
      value={content}
      config={{
        readonly: false // all options from https://xdsoft.net/jodit/play.html
      }}
      onChange={this.updateContent}
    />
  }
}

export default Example;
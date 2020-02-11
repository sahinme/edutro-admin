import React, { Component } from 'react'


import 'jodit';
import 'jodit/build/jodit.min.css';
import JoditEditor from "jodit-react";

class Example extends Component {
  config = {
    zIndex: 0,
    readonly: false,
    activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
    toolbarButtonSize: 'middle',
    theme: 'default',
    enableDragAndDropFileToEditor: true,
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    height: 220,
    direction: 'ltr',
    language: 'en',
    debugLanguage: false,
    i18n: 'en',
    tabIndex: -1,
    toolbar: true,
    enter: 'P',
    useSplitMode: false,
    colorPickerDefaultTab: 'background',
    imageDefaultWidth: 100,
    removeButtons: ['source', 'fullsize', 'about', 'outdent', 'indent', 'video', 'print', 'table', 'fontsize', 'superscript', 'subscript', 'file', 'cut', 'selectall'],
    disablePlugins: ['paste', 'stat'],
    events: {},
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true
    },
    placeholder: '',
    showXPathInStatusbar: false
  };

  constructor(props) {
    super(props);
    const { message } = this.props;
    this.state = {
      editorState: message,
    }
  }

  updateContent(e) {
    this.setState({
      editorState: e
    });
  }

  render() {
    const { editorState } = this.state;
    return <JoditEditor value={editorState} config={this.config} onChange={e => this.updateContent(e)} />

  }
}

export default Example;
import * as React from 'react';

import {
  Symbolizer,
  MarkSymbolizer,
  WellKnownName
} from 'geostyler-style';

import WellKnownNameField from '../Field/WellKnownNameField/WellKnownNameField';
import WellKnownNameEditor from '../WellKnownNameEditor/WellKnownNameEditor';

const _cloneDeep = require('lodash/cloneDeep');

// non default props
export interface MarkEditorProps {
  symbolizer: MarkSymbolizer;
  onSymbolizerChange?: (changedSymb: Symbolizer) => void;
}

interface MarkEditorState {
  symbolizer: MarkSymbolizer;
}

export class MarkEditor extends React.Component<MarkEditorProps, MarkEditorState> {

  constructor(props: MarkEditorProps) {
    super(props);
    this.state = {
      symbolizer: {
        kind: 'Mark',
        wellKnownName: 'Circle'
      }
    };
  }

  static getDerivedStateFromProps(
      nextProps: MarkEditorProps,
      prevState: MarkEditorState): Partial<MarkEditorState> {
    return {
      symbolizer: nextProps.symbolizer
    };
  }

  onWellKnownNameChange = (wkn: WellKnownName) => {
    const {
      onSymbolizerChange
    } = this.props;
    const symbolizer = _cloneDeep(this.state.symbolizer);
    symbolizer.wellKnownName = wkn;
    if (onSymbolizerChange) {
      onSymbolizerChange(symbolizer);
    }
  }

  render() {
    const {
      onSymbolizerChange
    } = this.props;
    const {
      symbolizer
    } = this.state;

    return (
      <div className="gs-mark-symbolizer-editor" >
        <WellKnownNameField
          wellKnownName={symbolizer.wellKnownName}
          onChange={this.onWellKnownNameChange}
        />
        <WellKnownNameEditor
          symbolizer={symbolizer}
          onSymbolizerChange={onSymbolizerChange}
        />
      </div>
    );
  }
}

export default MarkEditor;

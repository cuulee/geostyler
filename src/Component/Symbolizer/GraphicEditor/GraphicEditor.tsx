import * as React from 'react';
import {
  PointSymbolizer,
  GraphicType,
  MarkSymbolizer,
  IconSymbolizer
} from 'geostyler-style';
import MarkEditor from '../MarkEditor/MarkEditor';
import IconEditor, { IconEditorProps } from '../IconEditor/IconEditor';
import GraphicTypeField, { GraphicTypeFieldProps } from '../Field/GraphicTypeField/GraphicTypeField';
import SymbolizerUtil from '../../../Util/SymbolizerUtil';
import { IconLibrary } from '../IconSelector/IconSelector';

const _get = require('lodash/get');

export interface GraphicEditorDefaultProps {
  /** Label being used on TypeField */
  graphicTypeFieldLabel: string;
}

// non default props
export interface GraphicEditorProps extends Partial<GraphicEditorDefaultProps> {
  /** PointSymbolizer that is being used as graphic */
  graphic: PointSymbolizer;
  /** Currently selected GraphicType */
  graphicType: GraphicType;
  /** Gets called when changing a graphic */
  onGraphicChange?: (graphic: PointSymbolizer) => void;
  /** Default GraphicTypeFieldProps */
  graphicTypeFieldProps?: GraphicTypeFieldProps;
  /** Default IconEditorProps */
  iconEditorProps?: Partial<IconEditorProps>;
  iconLibraries?: IconLibrary[];
}

/** GraphicEditor to select between different graphic options */
export class GraphicEditor extends React.Component <GraphicEditorProps> {

  public static defaultProps: GraphicEditorDefaultProps = {
    graphicTypeFieldLabel: 'Graphic-Type'
  };

  /**
   * Get the right Editor depending on kind of PointSymbolizer
   *
   * @param {PointSymbolizer} graphic Pointsymbolizer that should be editable
   * @param {any} iconEditorProps PassTroughProps for IconEditor
   * @return {React.ReactNode} MarkEditor or IconEditor or undefined
   */
  getGraphicFields = (graphic: PointSymbolizer, iconEditorProps?: any): React.ReactNode => {
    const {
      onGraphicChange,
      iconLibraries
    } = this.props;
    if (_get(graphic, 'kind') === 'Mark') {
      let markGraphic: MarkSymbolizer = graphic as MarkSymbolizer;
      return (
        <MarkEditor
          symbolizer={markGraphic}
          onSymbolizerChange={onGraphicChange}
        />
      );
    } else if (_get(graphic, 'kind') === 'Icon') {
      return (
        <IconEditor
          symbolizer={graphic}
          onSymbolizerChange={onGraphicChange}
          iconLibraries={iconLibraries}
          {...iconEditorProps}
        />
      );
    } else {
      return undefined;
    }
  }

  /**
   * If GraphicType changed, call props.onGraphicChange with default PointSymbolizers.
   * If GraphicType was unselected, call props.onGraphicChange with undefined to reset values.
   *
   * @param {GraphicType} gType currently selected GraphicType
   */
  onGraphicTypeChange = (gType: GraphicType): void => {
    const {
      onGraphicChange
    } = this.props;

    if (onGraphicChange) {
      if (gType === 'Mark') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Mark') as MarkSymbolizer);
      } else if (gType === 'Icon') {
        onGraphicChange(SymbolizerUtil.generateSymbolizer('Icon') as IconSymbolizer);
      } else {
        onGraphicChange(undefined);
      }
    }
  }

  render() {
    const {
      graphic,
      graphicType,
      graphicTypeFieldLabel,
      graphicTypeFieldProps,
      iconEditorProps
    } = this.props;

    return (
      <div>
      <GraphicTypeField
        label={graphicTypeFieldLabel}
        graphicType={graphicType}
        onChange={this.onGraphicTypeChange}
        {...graphicTypeFieldProps}
      />
      {this.getGraphicFields(graphic, iconEditorProps)}
    </div>
    );
  }
}

export default GraphicEditor;

import * as _ from 'lodash';
import * as React from 'react';


const SupportedButtonStyles:Array<string> = ["default", "primary", "success", "info", "warning", "danger"];

export interface IButtonProps {
  fetching?: boolean,
  children: React.ReactChildren,
  disabled?: boolean,
  visible?: boolean,
  onClick: Function,
  btnStyle?: string
}

export default class Button extends React.Component<IButtonProps, any> {
  render(): JSX.Element {
    const {
      fetching,
      children,
      disabled,
      visible,
      onClick,
      btnStyle
      } = this.props;

    if (!visible) {
      return (<div></div>);
    }

    let actualBtnStyle: string = "btn-default";

    if (_.contains(SupportedButtonStyles, btnStyle)) {
      actualBtnStyle = `btn-${btnStyle}`;
    } else {
      console.warn(`The btnStyle property ${btnStyle} was not recognised`);
    }

    const className: string = `btn ${actualBtnStyle}`;

    return (
      <button
        className={className}
        type="button"
        onClick={onClick}
        disabled={disabled || fetching}>
        {children}
      </button>
    );
  }
}
import React from 'react';
import PropTypes from 'prop-types';

require('./index.css');

export default class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onFocus: false,
    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div className="inputField">
          <input
              className="inputBox"
              style={{ borderColor: this.props.isError ? '#FA656F' : null }}
              onFocus={() => this.setState({ onFocus: true })}
              onBlur={() => this.setState({ onFocus: false })}
              onChange={e => this.props.onChange(e.target.value)}
              type="text"
              value={this.props.text}
              placeholder={this.state.onFocus ? '' : this.props.placeholder}
              ref={(ref) => {
                  this.signUpEmail = ref;
              }}
          />
          {
              this.props.isError ?
              <p className="error">{this.props.errorText}</p>
              : null
          }
          {
              this.state.onFocus ?
              <p className="inputFieldIndex">{this.props.placeholder}</p>
              : null
          }
      </div>
    );
  }
}

InputText.propTypes = {
  placeholder: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  errorText: PropTypes.string,
  text: PropTypes.string.isRequired,
};

InputText.defaultProps = {
  onChange: () => undefined,
  placeholder: '',
  isError: false,
  errorText: '',
};

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
    const {
      isError, text, placeholder, errorText, type, maxLength,
    } = this.props;
    return (
      <div className="inputField">
          <input
              className="inputBox"
              style={{ borderColor: isError ? '#FA656F' : null }}
              onFocus={() => this.setState({ onFocus: true })}
              onBlur={() => this.setState({ onFocus: false })}
              onChange={e => this.props.onChange(e.target.value)}
              type="text"
              value={text}
              type={type}
              maxLength={maxLength}
              placeholder={this.state.onFocus ? '' : placeholder}
              ref={(ref) => {
                  this.signUpEmail = ref;
              }}
          />
          {
              isError ?
              <p className="error">{errorText}</p>
              : null
          }
          {
              this.state.onFocus ?
              <p className="inputFieldIndex">{placeholder}</p>
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
  maxLength: PropTypes.number,
  type: PropTypes.string,
};

InputText.defaultProps = {
  onChange: () => undefined,
  placeholder: '',
  isError: false,
  errorText: '',
  maxLength: 20,
  type: 'text',
};

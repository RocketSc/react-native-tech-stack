import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { CardSection } from './common';

const styles = {
  title: {
    fontSize: 18,
    paddingLeft: 15
  }
};

class ListItem extends Component {
  componentWillUpdate() {
    LayoutAnimation.spring();
  }

  renderDescription = () => {
    const { expanded, library: { description } } = this.props;

    if (!expanded) {
      return null;
    }

    return (
      <CardSection>
        <Text style={{ flex: 1 }}>
          {description}
        </Text>
      </CardSection>
    );
  }

  render() {
    const { selectLibrary, library } = this.props;

    return (
      <TouchableWithoutFeedback onPress={() => selectLibrary(library.id)}>
        <View>
          <CardSection>
            <Text style={styles.title}>
              {library.title}
            </Text>
          </CardSection>

          {this.renderDescription()}

        </View>
      </TouchableWithoutFeedback>
    );
  }
}

ListItem.propTypes = {
  library: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  expanded: PropTypes.bool.isRequired,
  selectLibrary: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  expanded: state.selection === ownProps.library.id
});

export default connect(mapStateToProps)(ListItem);

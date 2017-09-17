import React, { Component } from 'react';
import { ListView } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import { selectLibrary } from '../actions';

class LibraryList extends Component {
  componentWillMount() {
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => (r1 !== r2)
    });

    this.dataSource = dataSource.cloneWithRows(this.props.libraries);
  }

  renderRow = library => (
    <ListItem
      library={library}
      selectLibrary={this.props.selectLibrary}
    />
  );

  render() {
    return (
      <ListView
        dataSource={this.dataSource}
        renderRow={this.renderRow}
      />
    );
  }
}

LibraryList.propTypes = {
  libraries: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })).isRequired,
  selectLibrary: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  libraries: state.libraries,
});

const mapDispatchToProps = dispatch => ({
  selectLibrary: id => dispatch(selectLibrary(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(LibraryList);

import React, { Component } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { connect } from "react-redux";
import {
  updateAnswers,
  updateQuestionsCollection,
  updateListOfTests,
  setAppMode,
  setTestResults,
  setCurrentTest
} from "../../../../redux/appState/actions";

class LightboxExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      photoIndex: 0,
      isOpen: true
    };
  }

  render() {
    const { photoIndex, isOpen } = this.state;

    return (
      <div>
        {this.props.isOpen && (
          <Lightbox
            mainSrc={this.props.imageUrl[this.state.photoIndex]}
            onCloseRequest={() => this.setState({ isOpen: false })}
            nextSrc={
              this.props.imageUrl[(photoIndex + 1) % this.props.imageUrl.length]
            }
            prevSrc={
              this.props.imageUrl[
                (photoIndex + this.props.imageUrl.length - 1) %
                  this.props.imageUrl.length
              ]
            }
            onMovePrevRequest={() =>
              this.setState({
                photoIndex:
                  (photoIndex + this.props.imageUrl.length - 1) %
                  this.props.imageUrl.length
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % this.props.imageUrl.length
              })
            }
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({});

const mapStateToProps = state => ({
  isOpen: state.appState.isOpenLightbox
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LightboxExample);

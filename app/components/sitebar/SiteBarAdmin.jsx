import React, { Component } from "react";
import PropTypes from "prop-types";
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";
import { connect } from "react-redux";
import {
  setActivePost,
  setActiveSubmodule,
  setActiveModule,
  setAppMode,
  setModules,
  setModuleKeys
} from "../../../redux/appState/actions";
import "../../../style/components/sitebar/SiteBarAdmin.scss";

class SiteBarAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminList: [],
      test: "123",
      endpointData: [],
      activeSubmodule: false
    };

    this.fetchModules();
  }

  componentDidMount() {}

  getAllModules = modules => {
    return modules.reduce(function(acumulator, data, key) {
      let tmp_array = [];
      for (let i = 0; i < 6; i++) {
        let elementName = "module_title_" + i;
        let submodulNumber = key + "_" + i;
        !!data.fields[elementName] && tmp_array.push(submodulNumber);
      }
      return acumulator.concat(tmp_array);
    }, []);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.activeSubmodule != this.props.activeSubmodule ||
      this.props.globalAppMode !== this.props.globalAppMode
    ) {
      // this.setState({adminList:[]})
      // this.setState({adminList:this.state.adminList})
      this.setState({ activeSubmodule: nextProps.activeSubmodule });
      // this.fillList(this.state.endpointData)
      this.forceUpdate();
    }
    if (nextProps.globalAppMode !== this.props.globalAppMode) {
      this.forceUpdate();
    }
  };

  fetchModules = () => {
    this.props.fetchWP.get("modules").then(json => {
      this.setState({ adminList: json.modules });
      this.props.setModules(json.modules);
      this.props.setModuleKeys(this.getAllModules(json.modules));
    });
  };

  getActiveSubmodule = () => {
    return this.props.activeSubmodule;
  };

  getActiveModule = () => {
    return this.props.activeModule;
  };

  onClickModule = key => {
    if (
      this.props.appGlobalMode !== "test" &&
      this.props.appGlobalMode !== "welcome"
    ) {
      this.props.setActiveSubmodule(key);
      this.props.setActiveModule(key[0]);
      this.props.setAppMode("post");
    }
  };

  fillList = modules => {
    return modules.map(
      function(data, key) {
        let tmp_array = [];
        tmp_array.push(
          <ListGroupItem
            active={this.getActiveModule() == key}
            key={key + "_module"}
            header={data.post_title}
          />
        );

        for (let i = 0; i < 6; i++) {
          let elementName = "module_title_" + i;
          let submodulNumber = key + "_" + i;
          !!data.fields[elementName] &&
            tmp_array.push(
              <ListGroupItem
                onClick={() => this.onClickModule(submodulNumber)}
                active={this.getActiveSubmodule() == submodulNumber}
                key={elementName}
              >
                1. {data.fields[elementName]}
              </ListGroupItem>
            );
        }
        return tmp_array;
      }.bind(this)
    );
  };

  render() {
    const isTest = this.props.appGlobalMode === "test";
    const isWelcome = this.props.appGlobalMode === "welcome";
    return (
      <div className="sitebar-admin-wraper">
        <ListGroup className="sitebar-admin-course-list">
          <ListGroupItem
            header="Pretest"
            active={
              (isTest || isWelcome) && this.props.currentTest == "pre-test"
            }
          />
          {this.fillList(this.state.adminList)}
          <ListGroupItem
            header="Test egzaminacyjny"
            active={isTest && this.props.currentTest == "post-test"}
          />
        </ListGroup>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  activePost: post => dispatch(setActivePost(post)),
  setModules: modules => dispatch(setModules(modules)),
  setActiveSubmodule: submodule => dispatch(setActiveSubmodule(submodule)),
  setActiveModule: module => dispatch(setActiveModule(module)),
  setAppMode: mode => dispatch(setAppMode(mode)),
  setModuleKeys: keys => dispatch(setModuleKeys(keys))
});

const mapStateToProps = state => ({
  listOfTests: state.appState.listOfTests,
  currentTest: state.appState.currentTest,
  fetchWP: state.appState.fetchWP,
  activeModule: state.appState.activeModule,
  activeSubmodule: state.appState.activeSubmodule,
  appGlobalMode: state.appState.appGlobalMode,
  moduleKeys: state.appState.moduleKeys
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SiteBarAdmin);

import React, { Component } from "react";
import { Grid, Col, Panel } from "react-bootstrap";
import StartTestButton from "./StartTestButton";
import jsPDF from "jspdf";
import "../../../style/components/content/WelcomeUser.scss";

const imagePlaceholder =
  "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180";

const WelcomeUser = () => {
  return (
    <Col>
      <Grid componentClass="content-add-new-course">
        <Panel>
          <Panel.Body>
            <h3>Witaj w strefie e-learning</h3>
            <p>
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?"
            </p>
            <StartTestButton />
          </Panel.Body>
        </Panel>
      </Grid>
    </Col>
  );
};

export default WelcomeUser;

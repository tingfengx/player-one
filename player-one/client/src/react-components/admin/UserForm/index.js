import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import Input from "./../Input";

import "./styles.css";

/* Component for the Student Form */
class UserForm extends React.Component {
  render() {
    const {
      username,
      handleChange,
      password,

      addUser
    } = this.props;

    return (
      <Grid className="user-form" container spacing={4}>
        {/* Inputs to add student */}
        <Input
          name="username"
          value={username}
          onChange={handleChange}
          label="User"
        />

        <Input
          name="password"
          value={password}
          onChange={handleChange}
          label="password"
        />

       

        <Grid
          className="user-form__button-grid"
          item
          xl={2}
          lg={2}
          md={12}
          s={12}
          xs={12}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={addUser}
            className="user-form__submit-button"
          >
            Add User
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default UserForm;

import React, { Component } from "react";
import ScrollableTabsButtonPrevent from "./ActivityTabs"
import "./styles.css";


class UserActivities extends Component {
    render() {
        return (
            <div class="activityContainer">
                <ScrollableTabsButtonPrevent/>
            </div>
        );
    }
}

export default UserActivities;
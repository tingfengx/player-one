import React, {Component} from 'react';

import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';


import './style.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import TopNavBar from "../TopNavBar";

import Typography from '@material-ui/core/Typography';



class SignInForm extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        console.log('The form was submitted with the following data:');
        console.log(this.state);
    }

    // const classes = useStyles();


    render() {
        const sections = [
            {title: 'Featured', url: '#'},
            {title: 'Trending', url: '#'},
            {title: 'RPG Game', url: '#'},
            {title: 'Leisure', url: '#'},
            {title: 'Scenery', url: '#'},
            {title: 'bruh', url: '#'},
            {title: 'what else', url: '#'},
        ];
        return (

            <div className='homeImage'>
                <TopNavBar sections={sections} title="PLAYER ONE"/>
                <div className="FormCenter">

                    <Typography variant="button" display="block" gutterBottom>
                        <h3>Sign-In </h3>
                    </Typography>

                    <form onSubmit={this.handleSubmit} className="FormFields" onSubmit={this.handleSubmit}>
                        <div className="FormField">

                            <TextField
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Email</InputAdornment>,
                                }}
                                className="textField"
                                variant="outlined"
                                margin="normal"
                                required

                                fullWidth
                                color="secondary"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />


                        </div>

                        <div className="FormField">

                            <TextField
                                className="textField"
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Password</InputAdornment>,
                                }}
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="FormField">
                            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;<Button variant="outlined" >Yeah!</Button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        </div>
                    </form>
                </div>
            </div>



        );
    }



}

export default SignInForm;
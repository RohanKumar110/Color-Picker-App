import React, { Component } from "react";
import { ChromePicker } from "react-color";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import styles from "./styles/ColorPickerFormStyles";

class ColorPickerForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isColorNameUnique', (value) =>
            this.props.colors.every(
                ({ name }) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('isColorUnique', (value) =>
            this.props.colors.every(
                ({ color }) => color !== this.state.currentColor
            )
        );
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit() {
        const newColor = {
            color: this.state.currentColor,
            name: this.state.newColorName
        }
        this.props.addNewColor(newColor);
        this.setState({ newColorName: "" });
    }

    updateCurrentColor(newColor) {
        this.setState({ currentColor: newColor.hex });
    }

    render() {
        const { classes, paletteIsFull } = this.props;
        const { currentColor, newColorName } = this.state;
        return (
            <div>
                <ChromePicker
                    color={this.state.currentColor}
                    className={classes.picker}
                    onChangeComplete={this.updateCurrentColor} />
                <ValidatorForm onSubmit={this.handleSubmit} instantValidate={false}>
                    <TextValidator
                        name="newColorName"
                        value={newColorName}
                        variant="filled"
                        margin="normal"
                        label="Color Name"
                        className={classes.colorNameInput}
                        onChange={this.handleChange}
                        validators={['required', 'isColorNameUnique', 'isColorUnique']}
                        errorMessages={['Enter a color name', 'Color name must be unique',
                            'Color already used']}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={paletteIsFull}
                        className={classes.addColor}
                        style={{ backgroundColor: paletteIsFull ? "silver" : currentColor }}>
                        {paletteIsFull ? "Palette Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);

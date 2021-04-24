import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            newPaletteName: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
            this.props.palettes.every(
                ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
            )
        );
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClickClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { open, newPaletteName } = this.state;
        const { handleSubmit } = this.props;
        return (
            <Dialog open={open} onClose={this.handleClickClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <DialogContent>
                        <DialogContentText>
                            Please enter a name for your new beautiful palette.
                            Make sure it's unique!!
                        </DialogContentText>
                        <TextValidator
                            fullWidth
                            type="text"
                            autoFocus
                            margin="dense"
                            label="Palette Name"
                            name="newPaletteName"
                            value={newPaletteName}
                            onChange={this.handleChange}
                            validators={['required', 'isPaletteNameUnique']}
                            errorMessages={['Enter a palette name', 'Name Already Used']}
                        />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">
                            Cancel
                            </Button>
                        <Button variant="contained" type="submit" color="primary">
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        );
    }
}
export default PaletteMetaForm;
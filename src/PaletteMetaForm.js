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
            open: false,
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
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Save Palette
                </Button>
                <Dialog open={open} onClose={this.handleClickClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                        </DialogContentText>
                        <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                            <TextValidator
                                fullWidth
                                type="text"
                                autoFocus
                                margin="dense"
                                label="Palette Name"
                                name="newPaletteName"
                                placeholder="Palette Name"
                                value={newPaletteName}
                                onChange={this.handleChange}
                                validators={['required', 'isPaletteNameUnique']}
                                errorMessages={['Enter a palette name', 'Name Already Used']}
                            />
                            <Button
                                variant="contained"
                                type="submit"
                                color="primary">
                                Save Palette
                                </Button>
                        </ValidatorForm>
                        {/* <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Email Address"
                            type="email"
                            fullWidth
                        /> */}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClickClose} color="primary">
                            Cancel
                            </Button>
                        <Button onClick={this.handleClickClose} color="primary">
                            Subscribe
                            </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default PaletteMetaForm;
import React from 'react';
import './JobModal.scss';
import ReactModal from 'react-modal';

class JobModal extends React.Component {

    state = {
        modalIsOpen: true
    }

    modalControl() {
        let stateCopy = this.state;
        stateCopy.modalIsOpen = !this.state.modalIsOpen;
        this.setState(stateCopy);
    }

    onClickModal = () => {
        let stateCopy = this.state;
        stateCopy.modalControl = true;

        this.setState({
            stateCopy
        })
    }

    render() {
        
        return(
            <ReactModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={() => {this.modalControl()}}
                    ariaHideApp={false}
                    className="modal__container"
                    overlayClassName="modal__overlay"
                >
                    <form className="modal__form-container" onSubmit={null}>
                        <div>TEST</div>
                    </form>
            </ReactModal>
                    
        )
    }
}

export default JobModal
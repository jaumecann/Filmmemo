import Modal from '@mui/material/Modal';
import { useState } from 'react';

const BaseModal = (props) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    return(
        <Modal
        open={open}
        onClose={handleClose}
        >
            <p>cuerpo del Modal</p>
        </Modal>
    )
}

export default BaseModal
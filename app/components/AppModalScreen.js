import React from 'react';

import { Modal } from 'react-native'



function AppModalScreen({ children, activeControl, active, animationType='slide', backButton, onShow}) {
    //Close the module
    const closeModal = () => {
        activeControl(false);
    }    

    //Set the back button functionality
    if (!backButton) {
        backButton = () => closeModal();
    }

    return (
        <Modal 
            animationType={animationType}
            visible={active}
            onRequestClose={() => {
                backButton();
            }}
            statusBarTranslucent={true}
            onShow={onShow}
        >
            {
                children({backButton, closeModal})
            }
        </Modal>
    );
}

export default AppModalScreen;
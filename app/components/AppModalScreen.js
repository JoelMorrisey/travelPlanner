import React from 'react';

import { Modal } from 'react-native'



function AppModalScreen({ children, activeControl, active, animationType='slide', backButton}) {
    //Close the module
    const closeModal = () => {
        activeControl(false);
    }    

    //Set the back button functionality
    if (!backButton) {
        backButton = () => {
            return closeModal();
        }
    }

    return (
        <Modal 
            animationType={animationType}
            visible={active}
            onRequestClose={() => {
                backButton();
            }}
            statusBarTranslucent={true}
        >
            {
                children({backButton, closeModal})
            }
        </Modal>
    );
}

export default AppModalScreen;
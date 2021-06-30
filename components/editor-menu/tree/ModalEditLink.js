// libs
import Popup from 'reactjs-popup';

// components
import {UpdateButton} from '../editor-menu-buttons';
import MenuEditorLink from '../forms/MenuEditorLink';


const overlayStyle = {
    background: 'rgba(0,0,0,0.75)'
}
export default function ModalEditLink({isEditing, onClick, label, href, setHref, setLabel, closeEditModal, onSubmitEdit}){

    return (
        <>
            {/* Toggle */}
            <UpdateButton
                label={isEditing ? 'Fermer' : 'Modifier'}
                onClick={onClick}
            />

            {/* Popup */}
            <Popup
                open={!!isEditing}
                modal
                closeOnDocumentClick
                onClose={closeEditModal}
                overlayStyle={overlayStyle}
            >
                {
                    close => (
                        <div style={{width: 400}} className="bg-white border-2 rounded px-6 py-4">
                            <h4 className="text-xl font-semibold mb-4">Edition du lien</h4>
                            <MenuEditorLink
                                // text
                                formTitle="Modifier un lien"
                                formSubmitLabel="Modifier le lien"
                                // submit
                                onSubmit={onSubmitEdit}
                                // values
                                label={label}
                                onLabelChange={setLabel}
                                href={href}
                                onHrefChange={setHref}

                                afterSubmit={
                                    <button
                                        type="button"
                                        onClick={onClick}
                                        className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-white font-semibold text-md"
                                    >
                                        Fermer
                                    </button>
                                }
                            />
                        </div>
                    )
                }
            </Popup>
        </>
    )

}
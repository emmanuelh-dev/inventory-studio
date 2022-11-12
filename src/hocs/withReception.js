import React, { useEffect, useState } from 'react';
//utils
import { isEmpty, dateToString, stringToDate } from '@utils';
//constants
import { receptionState, receptionFields, detailState } from '@constants';
import { toolbar, detailColumns, receptionTypes, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { BarcodeSheet } from '@components/barcodesheet';
import { ReceptionForm } from '@components/receptionform';
//hooks
import { useNew } from '@hooks/useNew';
import { useGet } from '@hooks/useGet';
import { usePut } from '@hooks/usePut';
import { usePost } from '@hooks/usePost';
import { useCopy } from '@hooks/useCopy';
import { useDelete } from '@hooks/useDelete';
import { useSearch } from '@hooks/useSearch';
import { useFormState } from '@hooks/useFormState';
import { useNotification } from '@hooks/useNotification';
import { useControlField } from '@hooks/useControlField';
import { useSumarizeField } from '@hooks/useSumarizeField';

export const withReception = (props) => {
    const [released, setReleased] = useState(false);
    const [showSheet, setShowSheet] = useState(false);

    let { initialState } = { ...props };

    initialState =
        initialState == undefined || initialState == null ? receptionState : initialState;
    //states
    const {
        state: document,
        updateState: updateDocument,
        updateField: updateDocumentField,
    } = useFormState({ ...initialState }, { ...receptionState });
    const { state: selection, updateState: updateSelection } = useFormState([], []);

    const { buttonState, updateCopy, updateSaveButton } = useCopy({ ...initialState }, document);
    const { onNew } = useNew(updateDocument, updateCopy, { ...receptionState });

    //constants
    const fields = { ...receptionFields };
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        update: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        suggestions: `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${document[fields.TYPE]}`,
    };

    //actions
    useSumarizeField(document, updateDocument, fields);
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateDocument, updateCopy);

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        cleanControlField: cleanControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document[fields.TOTAL_QUANTITY], showNotification, 0);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        cleanControlField: cleanControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document[fields.TOTAL_AMOUNT], showNotification, 0);

    const onNewDocument = () => {
        const _initialState = { ...receptionState };
        _initialState[fields.TYPE] = document[fields.TYPE];
        onNew(_initialState);
        updateSelection([]);
        cleanControlAmountField();
        cleanControlQuantityField();
    };

    const onSave = () => {
        const onSaveDocument = () => {
            const validation = saveValidations();

            if (validation) {
                if (isEmpty(document[fields.ID])) {
                    usePost(`${endpoint.save}${document[fields.TYPE]}`, dateToString(document))
                        .then((data) => {
                            const _document = stringToDate(data);
                            updateDocument(_document);
                            updateCopy(_document);
                            showNotification('success');
                        })
                        .catch((error) => {
                            showNotification('error', error.message);
                        });
                } else {
                    usePut(
                        `${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}`,
                        dateToString(document)
                    )
                        .then((data) => {
                            const _document = stringToDate(data);
                            updateDocument(_document);
                            updateCopy(_document);
                            const message = `El registro fue actualizado con exito`;
                            showNotification('success', message);
                        })
                        .catch((error) => {
                            showNotification('error', error.message);
                        });
                }
            }
        };

        return {
            state: buttonState,
            command: onSaveDocument,
        };
    };

    const onCancel = () => {
        const onCancelDocument = () => {
            if (!isEmpty(document[fields.ID])) {
                useGet(`${endpoint.suggestions}/id/${document[fields.ID]}`).then((data) => {
                    const _document = stringToDate(data);
                    updateDocument(_document);
                    updateCopy(_document);
                });
            } else {
                onNewDocument();
            }
        };

        return {
            state: buttonState,
            command: onCancelDocument,
        };
    };

    const onDelete = () => {
        const onDeleteDocument = () => {
            useDelete(`${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}`)
                .then(() => {
                    onNewDocument();
                    const message = `El registro fue eliminado con exito`;
                    showNotification('success', message);
                })
                .catch((error) => {
                    showNotification('error', error.message);
                });
        };

        return {
            state: isEmpty(document[fields.ID]) || document[fields.STATUS] == 'RELEASED',
            command: onDeleteDocument,
        };
    };

    const onRelease = () => {
        if (!isEmpty(document[fields.ID])) {
            usePut(
                `${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}/release`,
                dateToString(document)
            )
                .then((data) => {
                    const _document = stringToDate(data);
                    updateDocument(_document);
                    updateCopy(_document);
                    const message = `El registro fue liberado con exito`;
                    showNotification('success', message);
                })

                .catch((error) => {
                    showNotification('error', error.message);
                });
        }
    };

    const onHideSheet = () => {
        setShowSheet(false);
    };

    const actions = () => {
        const release = {
            label: 'Liberar',
            command: onRelease,
            disabled: document[fields.STATUS] == 'RELEASED' || isEmpty(document[fields.ID]),
        };

        const sheet = {
            label: 'Personalizar etiquetas',
            command: () => {
                setShowSheet(true);
            },
            disabled: document[fields.STATUS] != 'RELEASED',
        };

        return [release, sheet];
    };

    const updateDetails = (detail) => {
        const _detail = { ...detail };
        const _document = { ...document };
        const _details = [...document[fields.DETAILS]];
        const index = _details.findIndex((element) => {
            return element[fields.LINE_NUMBER] == _detail[fields.LINE_NUMBER];
        });

        if (index > -1) {
            _details[index] = _detail;
            _document[fields.DETAILS] = _details;
        } else {
            _document = addDetail(_document, _details, _detail);
        }
        updateDocument(_document);
    };

    const addDetail = (_document, _details, _detail) => {
        _document[fields.COUNTER] = _document[fields.COUNTER] + 1;
        const _initialState = { ...detailState };
        _initialState[fields.ITEM] = _detail[fields.ITEM];
        _initialState[fields.QUANTITY] = _detail[fields.QUANTITY];
        _initialState[fields.UNIT_PRICE] = _detail[fields.UNIT_PRICE];
        _initialState[fields.LINE_NUMBER] = _document[fields.COUNTER];
        _initialState[fields.TOTAL_PRICE] = _detail[fields.TOTAL_PRICE];
        _initialState[fields.DESCRIPTION] = _detail[fields.DESCRIPTION];
        _details.unshift(_initialState);
        _document[fields.DETAILS] = _details;
        return _document;
    };

    const removeDetail = () => {
        const _document = { ...document };
        const _details = [...document[fields.DETAILS]];

        const __details = _details.reduce((accumulator, element) => {
            const removed = selection.find((value) => {
                return value[fields.LINE_NUMBER] === element[fields.LINE_NUMBER];
            });

            if (removed == undefined) {
                accumulator.unshift(element);
            } else if (removed !== undefined && removed[fields.ID]) {
                element[fields.DELETED] = true;

                accumulator.unshift(element);
            }

            return accumulator;
        }, []);

        __details.sort((first, second) => {
            return second[fields.LINE_NUMBER] - first[fields.LINE_NUMBER];
        });

        _document[fields.DETAILS] = __details;
        updateDocument(_document);
    };

    //validations
    const saveValidations = () => {
        const validateAmountField = validateControlAmountField('Control Monto Total');
        const validateQuantityField = validateControlQuantityField('Control Cantidad Total');
        const validateWarehouseField = validateField(
            document[fields.WAREHOUSE],
            'Almacen',
            showNotification
        );
        const validateDescriptionField = validateField(
            document[fields.DESCRIPTION],
            'Descripcion',
            showNotification
        );

        return (
            validateAmountField &&
            validateQuantityField &&
            validateWarehouseField &&
            validateDescriptionField
        );
    };

    //props
    const receptionProps = {
        fields,
        document,
        released,
        showSearch,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        updateControlAmountField,
        updateControlQuantityField,
        options: {
            documentTypes: receptionTypes,
        },
    };

    const detailProps = {
        fields,
        released,
        selection,
        removeDetail,
        updateDetails,
        updateSelection,
        columns: detailColumns,
        data: document[fields.DETAILS],
    };

    const searchProps = {
        endpoint,
        selectOption,
        visible: search,
        onHide: hideSearch,
        fields: documentSearchFields,
    };

    //hooks
    useEffect(() => {
        endpoint.suggestions = `${endpoint.suggestions}${document[fields.TYPE]}`;
        if (isEmpty(initialState) || initialState[fields.TYPE] !== document[fields.TYPE]) {
            onNewDocument();
        }
    }, [document[fields.TYPE]]);

    useEffect(() => {
        updateSaveButton();
    }, [document]);

    useEffect(() => {
        cleanControlAmountField();
        cleanControlQuantityField();
    }, [document[fields.ID]]);

    useEffect(() => {
        setReleased(document[fields.STATUS] == 'RELEASED');
    }, [document[fields.STATUS]]);

    const documentToolbar = () => {
        const _documentToolbar = createDocumentToolbar(
            onNewDocument,
            onSave(),
            onCancel(),
            onDelete(),
            actions()
        );
        return <Menubar model={_documentToolbar} />;
    };

    return (
        <Panel header={documentToolbar}>
            <ReceptionForm {...receptionProps} />
            <Details {...detailProps} />
            {search ? <Search {...searchProps} /> : <></>}
            <Toast ref={notification} />
            <BarcodeSheet visible={showSheet} onHide={onHideSheet} />
        </Panel>
    );
};

const createDocumentToolbar = (onNew, onSave, onCancel, onDelete, actions) => {
    const documentToolbar = [...toolbar];
    documentToolbar[0].command = onNew;
    documentToolbar[1].command = onSave.command;
    documentToolbar[1].disabled = onSave.state;
    documentToolbar[2].command = onCancel.command;
    documentToolbar[2].disabled = onCancel.state;
    documentToolbar[3].command = onDelete.command;
    documentToolbar[3].disabled = onDelete.state;
    documentToolbar[4].items = actions;

    return documentToolbar;
};

const validateField = (value, fieldName, showNotification) => {
    const validate = isEmpty(value) || !value;
    if (validate) {
        const message = `El campo ${fieldName} esta vacio`;
        showNotification('error', message);
    }

    return !validate;
};

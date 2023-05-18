import React, { useEffect, useState } from 'react';
import services from '@services/api-services';
//utils
import { isEmpty, isArrayEmpty, dateToString } from '@utils';
//constants
import { inputDocumentState, receptionFields } from '@constants';
import { toolbar, detailColumns, receptionTypes, documentSearchFields } from '@constants/options';
//components
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
//custom components
import { Search } from '@components/search';
import { Details } from '@components/details';
import { Viewer } from '@components/reportviewer';
import { Dashboard } from '@components/dashboard';
import { BarcodeSheet } from '@components/barcodesheet';
import { ReceptionForm } from '@components/receptionform';
//hooks
import { useSearch } from '@hooks/useSearch';
import { useSelection } from '@hooks/useSelection';
import { useForm, useDetail } from '@hooks/useFormState';
import { useNotification } from '@hooks/useNotification';
import { useControlField } from '@hooks/useControlField';
import { useSumarizeField } from '@hooks/useSumarizeField';

export const withReception = (props) => {
    const fields = { ...receptionFields };
    const [showSheet, setShowSheet] = useState(false);
    const [customSheet, setCustomSheet] = useState([]);
    const [showViewer, setShowViewer] = useState(false);

    const { initialState } = { ...props };
    //states
    const {
        document,
        isReleased,
        clearDocument,
        updateDocument,
        updateDocumentCopy,
        saveButtonDisabled,
        updateDocumentField,
        updateInitialDocument,
        updateSaveButtonStatus,
        addButtonStatusDisabled,
        updateDocumentFromService,
        deleteButtonStatusDisabled,
        releaseButtonStatusDisabled,
    } = useForm(initialState, inputDocumentState);
    const { createRow, removeRows, updateRows } = useDetail();
    const { selection, clearSelection, updateSelection } = useSelection();

    // const { buttonState, updateCopy, updateSaveButton } = useCopy({ ...initialState }, document);
    // const { onNew } = useNew(updateDocument, updateCopy, { ...receptionState });

    // //constants
    const endpoint = {
        save: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        barcode: process.env.NEXT_PUBLIC_REPORT_BARCODE,
        update: process.env.NEXT_PUBLIC_RECEPTIONS_SAVE,
        suggestions: `${process.env.NEXT_PUBLIC_RECEPTIONS_SUGGESTIONS}${document[fields.TYPE]}`,
    };

    //actions
    useSumarizeField(document, updateDocument, fields);
    const { notification, showNotification } = useNotification();
    const { search, showSearch, hideSearch, selectOption } = useSearch(
        updateDocument,
        updateDocumentCopy
    );

    const {
        controlField: controlQuantityField,
        validate: validateControlQuantityField,
        clearControlField: clearControlQuantityField,
        updateControlField: updateControlQuantityField,
    } = useControlField(document[fields.TOTAL_QUANTITY], showNotification, 0);

    const {
        controlField: controlAmountField,
        validate: validateControlAmountField,
        clearControlField: clearControlAmountField,
        updateControlField: updateControlAmountField,
    } = useControlField(document[fields.TOTAL_AMOUNT], showNotification, 0);

    const onNewDocument = () => {
        clearDocument();
        clearSelection();
        clearControlAmountField();
        clearControlQuantityField();
    };

    const onSave = () => {
        // const onSaveDocument = () => {
        //     const validation = saveValidations();

        //     if (validation) {
        //         if (isEmpty(document[fields.ID])) {
        //             usePost(`${endpoint.save}${document[fields.TYPE]}`, dateToString(document))
        //                 .then((data) => {
        //                     const _document = stringToDate(data);
        //                     updateDocument(_document);
        //                     updateCopy(_document);
        //                     showNotification('success');
        //                 })
        //                 .catch((error) => {
        //                     showNotification('error', error.message);
        //                 });
        //         } else {
        //             usePut(
        //                 `${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}`,
        //                 dateToString(document)
        //             )
        //                 .then((data) => {
        //                     const _document = stringToDate(data);
        //                     updateDocument(_document);
        //                     updateCopy(_document);
        //                     const message = `El registro fue actualizado con exito`;
        //                     showNotification('success', message);
        //                 })
        //                 .catch((error) => {
        //                     showNotification('error', error.message);
        //                 });
        //         }
        //     }
        // };

        const onSaveDocument = async () => {
            const validation = saveValidations();

            if (validation) {
                const body = dateToString(document);
                if (isEmpty(document[fields.ID])) {
                    try {
                        const response = await services.postReceptionDocument(body);
                        updateDocumentFromService(response);
                        showNotification('success');
                    } catch (error) {
                        showNotification('error', error.message);
                    }
                } else {
                    try {
                        const response = await services.putReceptionDocument(body);
                        updateDocumentFromService(response);
                        const message = `El registro fue actualizado con exito`;
                        showNotification('success', message);
                    } catch (error) {
                        showNotification('error', error.message);
                    }
                }
            }
        };

        return {
            state: saveButtonDisabled,
            command: onSaveDocument,
        };
    };

    const onCancel = () => {
        // const onCancelDocument = () => {
        //     if (!isEmpty(document[fields.ID])) {
        //         useGet(`${endpoint.suggestions}/id/${document[fields.ID]}`).then((data) => {
        //             const _document = stringToDate(data);
        //             updateDocument(_document);
        //             updateCopy(_document);
        //         });
        //     } else {
        //         onNewDocument();
        //     }
        // };

        const onCancelDocument = async () => {
            if (!isEmpty(document[fields.ID])) {
                const response = await services.findReceptionDocumentById(
                    document[fields.TYPE],
                    document[fields.ID]
                );
                updateDocumentFromService(response);
            } else {
                onNewDocument();
            }
        };

        return {
            state: saveButtonDisabled,
            command: onCancelDocument,
        };
    };

    const onDelete = () => {
        // const onDeleteDocument = () => {
        //     useDelete(`${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}`)
        //         .then(() => {
        //             onNewDocument();
        //             const message = `El registro fue eliminado con exito`;
        //             showNotification('success', message);
        //         })
        //         .catch((error) => {
        //             showNotification('error', error.message);
        //         });
        // };

        const onDeleteDocument = async () => {
            try {
                await services.deleteReceptionDocument(document);
                onNewDocument();
                const message = `El registro fue eliminado con exito`;
                showNotification('success', message);
            } catch (error) {
                showNotification('error', error.message);
            }
        };

        return {
            state: deleteButtonStatusDisabled(),
            command: onDeleteDocument,
        };
    };

    const onRelease = async () => {
        // if (!isEmpty(document[fields.ID])) {
        //     usePut(
        //         `${endpoint.save}${document[fields.TYPE]}/id/${document[fields.ID]}/release`,
        //         dateToString(document)
        //     )
        //         .then((data) => {
        //             const _document = stringToDate(data);
        //             updateDocument(_document);
        //             updateCopy(_document);
        //             const message = `El registro fue liberado con exito`;
        //             showNotification('success', message);
        //         })

        //         .catch((error) => {
        //             showNotification('error', error.message);
        //         });
        // }

        if (releaseValidations()) {
            try {
                const response = await services.releaseReceptionDocument(dateToString(document));
                updateDocumentFromService(response);
                const message = `El registro fue liberado con exito`;
                showNotification('success', message);
            } catch (error) {
                showNotification('error', error.message);
            }

            clearControlAmountField();
            clearControlQuantityField();
        }
    };

    const onHideSheet = () => {
        setShowSheet(false);
    };

    const onCustomSheet = (positions) => {
        setCustomSheet(positions);
    };

    const onHideViewer = () => {
        setShowViewer(false);
    };

    const actions = () => {
        const release = {
            label: 'Liberar',
            command: onRelease,
            disabled: releaseButtonStatusDisabled(),
        };

        const sheet = {
            label: 'Personalizar etiquetas',
            command: () => {
                setShowSheet(true);
            },
            disabled: document[fields.STATUS] != 'RELEASED',
        };

        const viewer = {
            label: 'Imprimir Etiquetas',
            command: () => {
                setShowViewer(true);
            },
            disabled: document[fields.STATUS] != 'RELEASED',
        };

        return [release, sheet, viewer];
    };

    const updateDetails = (detail) => {
        // const _detail = { ...detail };
        // const _document = { ...document };
        // const _details = [...document[fields.DETAILS]];

        // if (!validateRepeatedItem(_detail, _details, fields, showNotification)) {
        //     const index = findDetail(_detail, _details, fields);

        //     if (index > -1) {
        //         _details[index] = _detail;
        //         _document[fields.DETAILS] = _details;
        //     } else {
        //         _document = addDetail(_document, _details, _detail);
        //     }
        //     updateDocument(_document);
        // }

        if (detail[fields.LINE_NUMBER] == 0) {
            addDetail([...document[fields.DETAILS]], { ...detail });
        } else {
            const rows = updateRows([...document[fields.DETAILS]], { ...detail });
            !isArrayEmpty(rows) && updateDocumentField(fields.DETAILS, rows);
        }
    };

    const addDetail = (details, detail) => {
        // _document[fields.COUNTER] = _document[fields.COUNTER] + 1;
        // const _initialState = { ...detailState };
        // _initialState[fields.ITEM] = _detail[fields.ITEM];
        // _initialState[fields.QUANTITY] = _detail[fields.QUANTITY];
        // _initialState[fields.UNIT_PRICE] = _detail[fields.UNIT_PRICE];
        // _initialState[fields.LINE_NUMBER] = _document[fields.COUNTER];
        // _initialState[fields.TOTAL_PRICE] = _detail[fields.TOTAL_PRICE];
        // _initialState[fields.DESCRIPTION] = _detail[fields.DESCRIPTION];
        // _details.unshift(_initialState);
        // _document[fields.DETAILS] = _details;
        // return _document;

        const nextCounter = document[fields.COUNTER] + 1;
        const row = createRow(detail, nextCounter);
        details.unshift(row);
        updateDocumentField(fields.COUNTER, nextCounter);
        updateDocumentField(fields.DETAILS, details);
    };

    const removeDetail = () => {
        // const _document = { ...document };
        // const _details = [...document[fields.DETAILS]];

        // const __details = _details.reduce((accumulator, element) => {
        //     const removed = selection.find((value) => {
        //         return value[fields.LINE_NUMBER] === element[fields.LINE_NUMBER];
        //     });

        //     if (removed == undefined) {
        //         accumulator.unshift(element);
        //     } else if (removed !== undefined && removed[fields.ID]) {
        //         element[fields.DELETED] = true;

        //         accumulator.unshift(element);
        //     }

        //     return accumulator;
        // }, []);

        // __details.sort((first, second) => {
        //     return second[fields.LINE_NUMBER] - first[fields.LINE_NUMBER];
        // });

        // _document[fields.DETAILS] = __details;
        // updateDocument(_document);

        const details = removeRows([...document[fields.DETAILS]], selection);
        updateDocumentField(fields.DETAILS, details);
    };

    //validations
    const saveValidations = () => {
        // const validateAmountField = validateControlAmountField('Control Monto Total');
        // const validateQuantityField = validateControlQuantityField('Control Cantidad Total');
        // const validateWarehouseField = validateField(
        //     document[fields.WAREHOUSE],
        //     'Almacen',
        //     showNotification
        // );
        // const validateDescriptionField = validateField(
        //     document[fields.DESCRIPTION],
        //     'Descripcion',
        //     showNotification
        // );

        // return (
        //     validateAmountField &&
        //     validateQuantityField &&
        //     validateWarehouseField &&
        //     validateDescriptionField
        // );

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

        return validateWarehouseField && validateDescriptionField;
    };

    const releaseValidations = () => {
        const validateSaveFields = saveValidations();
        const validateIdField = !releaseButtonStatusDisabled();
        const validateAmountField = validateControlAmountField('Control Monto Total');
        const validateQuantityField = validateControlQuantityField('Control Cantidad Total');
        return (
            validateIdField && validateSaveFields && validateAmountField && validateQuantityField
        );
    };

    //props
    const receptionProps = {
        fields,
        document,
        showSearch,
        controlAmountField,
        updateDocumentField,
        controlQuantityField,
        isReleased: isReleased(),
        updateControlAmountField,
        updateControlQuantityField,
        options: {
            documentTypes: receptionTypes,
        },
    };

    const detailProps = {
        fields,
        selection,
        removeDetail,
        updateDetails,
        updateSelection,
        columns: detailColumns,
        type: document[fields.TYPE],
        data: document[fields.DETAILS],
        editable: addButtonStatusDisabled(),
        warehouse: document[fields.WAREHOUSE],
    };

    const searchProps = {
        selectOption,
        visible: search,
        onHide: hideSearch,
        type: document[fields.TYPE],
        fields: documentSearchFields,
        getDataByPage: services.findAllReceptionDocumentByPage,
        getDataAsPage: services.findAllReceptionDocumentAsPage,
    };

    const barcodeSheetProps = {
        visible: showSheet,
        onHide: onHideSheet,
        onYes: onCustomSheet,
        quantity: document[fields.TOTAL_QUANTITY],
    };

    const viewerProps = {
        endpoint,
        body: customSheet,
        visible: showViewer,
        onHide: onHideViewer,
        params: {
            id: document[fields.ID],
            type: document[fields.TYPE],
            barcodeType: 'CODE128',
            sheetType: 'OD5160',
        },
    };

    //hooks
    useEffect(() => {
        updateInitialDocument(document[fields.TYPE]);
    }, [document[fields.TYPE]]);

    useEffect(() => {
        updateSaveButtonStatus();
    }, [document]);

    useEffect(() => {
        clearControlAmountField();
        clearControlQuantityField();
    }, [document[fields.ID]]);

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
        <Dashboard>
            <Panel header={documentToolbar}>
                <ReceptionForm {...receptionProps} />
                <Details {...detailProps} />
                {search ? <Search {...searchProps} /> : <></>}
                <Toast ref={notification} />
                <BarcodeSheet {...barcodeSheetProps} />
                <Viewer {...viewerProps} />
            </Panel>
        </Dashboard>
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

const validateRepeatedItem = (detail, details, fields, showNotification) => {
    const validate = details.find(
        (element) =>
            element[fields.ITEM][fields.ID] == detail[fields.ITEM][fields.ID] &&
            element[fields.LINE_NUMBER] !== detail[fields.LINE_NUMBER]
    );

    validate = validate != undefined;
    if (validate) {
        const message = `El articulo ${
            detail[fields.ITEM].itemName
        } ya se encuentra en este documento`;
        showNotification('error', message);
    }
    return validate;
};

const findDetail = (detail, details, fields) => {
    const index = details.findIndex((element) => {
        return (
            element[fields.LINE_NUMBER] == detail[fields.LINE_NUMBER] &&
            element[fields.ITEM][fields.ID] == detail[fields.ITEM][fields.ID]
        );
    });

    return index;
};

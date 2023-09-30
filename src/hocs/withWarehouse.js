import React, { useEffect } from 'react';
import { MESSAGES } from '@messages';
import { isNullOrUndefined } from '@utils';
import services from '@services/api-services';
import { validateNotEmptyStringField } from '@utils/validations';
import { toolbar, warehouseSearchFields } from '@constants/options';
import { warehouseState, warehouseFields, MESSAGE_TYPES } from '@constants';

//hooks
import { useSearch } from '@hooks/useSearch';
import { confirmDialog } from 'primereact/confirmdialog';
import { useNotification } from '@hooks/useNotification';
import { useForm, useStateStatus } from '@hooks/useFormState';

export const withWarehouse = (WrappedComponent) => {
    const WithWarehouse = (props) => {
        const fields = { ...warehouseFields };
        const { initialState } = { ...props };
        const {
            form,
            clearForm,
            updateForm,
            updateFormCopy,
            updateFormField,
            updateFormFromService,
            updateSaveButtonStatus,
        } = useForm(initialState, warehouseState);
        const { notification, showNotification } = useNotification();
        const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(form, fields.LOCKED);
        const { search, showSearch, hideSearch, selectOption } = useSearch(
            updateForm,
            updateFormCopy
        );

        const onNew = () => {
            return {
                command: clearForm,
            };
        };

        const onSave = () => {
            const onSaveWarehouse = async () => {
                const validation = saveValidations();
                if (validation) {
                    try {
                        const isNew = isNullOrUndefined(form[fields.ID]);
                        const response = isNew
                            ? await services.postWarehouse(form)
                            : await services.putWarehouse(form);
                        updateFormFromService(response);
                        isNew
                            ? showNotification(MESSAGE_TYPES.SUCCESS)
                            : showNotification(
                                  MESSAGE_TYPES.SUCCESS,
                                  MESSAGES.SUCCESS_RECORD_UPDATED
                              );
                    } catch (error) {
                        showNotification(MESSAGE_TYPES.ERROR, error.message);
                    }
                }
            };

            return {
                command: onSaveWarehouse,
                disabled: updateSaveButtonStatus(),
            };
        };

        const onCancel = () => {
            const onCancelWarehouse = async () => {
                if (!isNullOrUndefined(form[fields.ID])) {
                    const response = await services.findWarehouseById(form[fields.ID]);
                    updateFormFromService(response);
                } else {
                    clearForm();
                }
            };

            return {
                command: onCancelWarehouse,
                disabled: updateSaveButtonStatus(),
            };
        };

        const onDelete = () => {
            const onDeleteWarehouse = async () => {
                try {
                    await services.deleteWarehouse(form[fields.ID]);
                    showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCESS_RECORD_DELETED);
                } catch (error) {
                    showNotification(MESSAGE_TYPES.ERROR, error.message);
                }
            };

            const onConfirmRemoval = () => {
                const accept = async () => {
                    await onDeleteWarehouse();
                    onNew().command();
                };

                confirmDialog({
                    accept,
                    reject: () => {},
                    acceptLabel: 'Si',
                    icon: 'pi pi-exclamation-triangle',
                    acceptClassName: 'p-button-danger',
                    message: `¿Esta seguro que desea borrar este registro?`,
                    header: `${MESSAGES.WAREHOUSE_DELETE_CONFIRMATION} ${
                        form[fields.WAREHOUSE_NAME]
                    }`,
                });
            };

            return {
                command: onConfirmRemoval,
                disabled: form[fields.LOCKED] || isNullOrUndefined(form[fields.ID]),
            };
        };

        const saveValidations = () => {
            const validateNameField = validateNotEmptyStringField(
                form[fields.WAREHOUSE_NAME],
                'Nombre',
                showNotification
            );

            return validateNameField;
        };

        const options = {
            toolbar: createWarehouseToolbar(onNew(), onSave(), onCancel(), onDelete()),
            searchFields: warehouseSearchFields,
        };

        useEffect(() => {
            updateStateStatus();
        }, [form]);

        const componentProps = {
            fields: fields,
            warehouse: form,
            options: options,
            usedIcon: usedIcon,
            usedLabel: usedLabel,
            searchVisible: search,
            showSearch: showSearch,
            hideSearch: hideSearch,
            selectOption: selectOption,
            notification: notification,
            updateField: updateFormField,
        };

        return <WrappedComponent {...componentProps} />;
    };

    return WithWarehouse;
};

const createWarehouseToolbar = (onNew, onSave, onCancel, onDelete) => {
    const warehouseToolbar = [...toolbar];
    warehouseToolbar[0].command = onNew.command;
    warehouseToolbar[1].command = onSave.command;
    warehouseToolbar[1].disabled = onSave.disabled;
    warehouseToolbar[2].command = onCancel.command;
    warehouseToolbar[2].disabled = onCancel.disabled;
    warehouseToolbar[3].command = onDelete.command;
    warehouseToolbar[3].disabled = onDelete.disabled;
    return warehouseToolbar;
};

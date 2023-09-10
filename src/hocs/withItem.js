import React, { useEffect } from 'react';
import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { isNullOrUndefined } from '@utils';
import { validateNotEmptyStringField } from '@utils/validations';
import { itemState, itemFields, MESSAGE_TYPES } from '@constants';
import { valuation, toolbar, itemSearchFields } from '@constants/options';

//hooks
import { useSearch } from '@hooks/useSearch';
import { useNotification } from '@hooks/useNotification';
import { useForm, useStateStatus } from '@hooks/useFormState';

export const withItem = (WrappedComponent) => {
    const WithItem = (props) => {
        const fields = { ...itemFields };
        const { initialState } = { ...props };
        const {
            form,
            clearForm,
            updateForm,
            updateFormCopy,
            updateFormField,
            updateFormFromService,
            updateSaveButtonStatus,
        } = useForm(initialState, itemState);

        const { notification, showNotification } = useNotification();
        const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(form, fields.USED);
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
            const onSaveItem = async () => {
                const validation = saveValidations();
                if (validation) {
                    try {
                        const isNew = isNullOrUndefined(form[fields.ID]);
                        const response = isNew
                            ? await services.postItem(form)
                            : await services.putItem(form);
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
                command: onSaveItem,
                disabled: updateSaveButtonStatus(),
            };
        };

        const onCancel = () => {
            const onCancelItem = async () => {
                if (!isNullOrUndefined(form[fields.ID])) {
                    const response = await services.findItemById(form[fields.ID]);
                    updateFormFromService(response);
                } else {
                    clearForm();
                }
            };

            return {
                command: onCancelItem,
                disabled: updateSaveButtonStatus(),
            };
        };

        const onDelete = () => {
            const onDeleteItem = async () => {};

            return {
                command: onDeleteItem,
                disabled: form[fields.USED] || isNullOrUndefined(form[fields.ID]),
            };
        };

        const saveValidations = () => {
            const validateNameField = validateNotEmptyStringField(
                form[fields.ITEM_NAME],
                'Nombre',
                showNotification
            );

            const validateDescriptionField = validateNotEmptyStringField(
                form[fields.DESCRIPTION],
                'Descripcion',
                showNotification
            );

            return validateNameField && validateDescriptionField;
        };

        const options = {
            valuation: valuation,
            toolbar: createItemToolbar(onNew(), onSave(), onCancel(), onDelete()),
            searchFields: itemSearchFields,
        };

        useEffect(() => {
            updateStateStatus();
        }, [form]);

        const componentProps = {
            item: form,
            fields: fields,
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

    return WithItem;
};

const createItemToolbar = (onNew, onSave, onCancel, onDelete) => {
    const itemToolbar = [...toolbar];
    itemToolbar[0].command = onNew.command;
    itemToolbar[1].command = onSave.command;
    itemToolbar[1].disabled = onSave.disabled;
    itemToolbar[2].command = onCancel.command;
    itemToolbar[2].disabled = onCancel.disabled;
    itemToolbar[3].command = onDelete.command;
    itemToolbar[3].disabled = onDelete.disabled;
    return itemToolbar;
};

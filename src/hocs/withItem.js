import React, { useEffect } from 'react';
import { MESSAGES } from '@messages';
import services from '@services/api-services';
import { isNullOrUndefinedOrEmptyString } from '@utils';
import { itemState, itemFields, MESSAGE_TYPES } from '@constants';
import { valuation, toolbar, itemSearchFields } from '@constants/options';

//hooks
import { useSearch } from '@hooks/useSearch';
import { useNotification } from '@hooks/useNotification';
import { useForm, useStateStatus } from '@hooks/useFormState';
import { validateNotEmptyField } from '../utils/validations';

export const withItem = (WrappedComponent) => (props) => {
    const fields = { ...itemFields };
    const endpoint = {
        search: process.env.NEXT_PUBLIC_ITEMS_SEARCH,
        suggestions: process.env.NEXT_PUBLIC_ITEMS_SUGGESTIONS,
        save: process.env.NEXT_PUBLIC_ITEMS_SAVE,
        update: process.env.NEXT_PUBLIC_ITEMS_SAVE,
    };

    // let { initialState } = { ...props };
    // initialState = initialState == undefined || initialState == null ? itemState : initialState;
    // const { state, updateField, updateState } = useFormState(initialState);
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
    // const { buttonState, updateCopy, updateSaveButton } = useCopy(initialState, state);

    // const { onNew } = useNew(updateState, updateCopy, itemState);
    const { notification, showNotification } = useNotification();
    //const { onSave } = useSave(itemFields.ID, endpoint, showNotification);
    const { usedIcon, usedLabel, updateStateStatus } = useStateStatus(form, fields.USED);
    const { search, showSearch, hideSearch, selectOption } = useSearch(updateForm, updateFormCopy);

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
                    const isNew = isNullOrUndefinedOrEmptyString(form[fields.ID]);
                    const response = isNew
                        ? await services.postItem(form)
                        : await services.putItem(form);
                    updateFormFromService(response);
                    isNew
                        ? showNotification(MESSAGE_TYPES.SUCCESS)
                        : showNotification(MESSAGE_TYPES.SUCCESS, MESSAGES.SUCCESS_RECORD_UPDATED);
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
            if (!isNullOrUndefinedOrEmptyString(form[fields.ID])) {
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
            disabled: form[fields.USED] || isNullOrUndefinedOrEmptyString(form[fields.ID]),
        };
    };

    const saveValidations = () => {
        const validateNameField = validateNotEmptyField(
            form[fields.ITEM_NAME],
            'Nombre',
            showNotification
        );

        const validateDescriptionField = validateNotEmptyField(
            form[fields.DESCRIPTION],
            'Descripcion',
            showNotification
        );

        return validateNameField && validateDescriptionField;
    };

    // const _toolbar = [...toolbar];
    // _toolbar[0].command = onNew;
    // _toolbar[1].command = () => {
    //     onSave(state, updateState, updateCopy);
    // };
    // _toolbar[1].disabled = buttonState;
    // _toolbar[2].disabled = state[itemFields.USED] || !state[itemFields.ID];

    const options = {
        valuation: valuation,
        toolbar: createItemToobar(onNew(), onSave(), onCancel(), onDelete()),
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

    // return (
    //     <WrappedComponent
    //         item={state}
    //         updateField={updateField}
    //         fields={itemFields}
    //         options={options}
    //         usedIcon={usedIcon}
    //         usedLabel={usedLabel}
    //         notification={notification}
    //         searchVisible={search}
    //         showSearch={showSearch}
    //         hideSearch={hideSearch}
    //         selectOption={selectOption}
    //         endpoint={endpoint}
    //     />
    // );
};

const createItemToobar = (onNew, onSave, onCancel, onDelete) => {
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

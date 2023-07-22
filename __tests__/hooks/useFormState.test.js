import { renderHook, act } from '@testing-library/react';
import { useDocumentForm } from '@hooks/useFormState';
import { outputDocumentState } from '@constants';

describe('useFormState', () => {
    describe('useDocumentForm', () => {
        describe('output document', () => {
            it('should be able to init the hook with default initial state value for output document', () => {
                const { result } = renderHook(useDocumentForm, {
                    initialProps: {
                        initialState: undefined,
                        defaultInitialState: outputDocumentState,
                    },
                });
                expect(result.current.document).toEqual(outputDocumentState);
                expect(result.current.documentCopy).toEqual(outputDocumentState);
                expect(result.current.saveButtonDisabled).toBe(false);
                expect(result.current.initialDocument).toEqual(outputDocumentState);
            });
        });
    });
});

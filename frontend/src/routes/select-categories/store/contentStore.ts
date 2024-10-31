import { create } from "zustand";

type Content = {
    mainCategory: string;
    innerCategory: string;
    age: string;
    detail: string;
    additionalInfo: string;
};

type StockStore = {
    content: Content;
    actions: {
        clearContent: () => void;
        updateContent: (updatedFields: Partial<Content>) => void;
    };
};

const useContentStore = create<StockStore>((set) => ({
    content: {
        mainCategory: '',
        innerCategory: '',
        age: '',
        detail: '',
        additionalInfo: ''
    },

    actions: {
        clearContent: () => set((state) => ({
            ...state,
            content: {
                mainCategory: '',
                innerCategory: '',
                age: '',
                detail: '',
                additionalInfo: ''
            }
        })),

        updateContent: (updatedFields) => set((state) => ({
            content: {
                ...state.content,
                ...updatedFields
            }
        }))
    },
}));

export const useContentStoreActions = () => useContentStore((state) => state.actions);
export const useAgeRange = () => useContentStore((state) => state.content.age);
export const useMainCategory = () => useContentStore((state) => state.content.mainCategory);

import { AppDispatch, RootState } from 'app/providers/store';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
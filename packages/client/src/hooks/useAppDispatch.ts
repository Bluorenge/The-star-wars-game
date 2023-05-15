import { useDispatch } from 'react-redux';
import { AppDispatch } from 'core/store/store';

export const useAppDispatch: () => AppDispatch = useDispatch;

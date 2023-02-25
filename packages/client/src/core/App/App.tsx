import { useEffect } from 'react';
import { getCurrentUser } from 'app/slices/userSlice';
import { Router } from 'core/Router';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { LOCAL_STORAGE_IS_AUTH_KEY } from 'constants/localStorage';

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem(LOCAL_STORAGE_IS_AUTH_KEY)) {
      dispatch(getCurrentUser());
    }
  }, []);

  return (
    <div className="App">
      <Router />
    </div>
  );
};

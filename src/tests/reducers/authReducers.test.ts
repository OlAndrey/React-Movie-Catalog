import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  checkAuth,
  checkUserData,
  updateAuth,
  updateAuthError,
} from '../../store/actions/authAction';
import { authReducer } from '../../store/reducers/authReducers';
import { auth } from '../../firebase';

const userData = (async function () {
  const { user } = await signInWithEmailAndPassword(auth, 'fortest1@test.com', 'Qwertytrewq1');
  return user;
})();

describe('Auth Reducer', () => {
  it('Should return a new state during validation', () => {
    const action = checkAuth();
    const state = authReducer(undefined, action);

    expect(state.isCheck).toEqual(false);
    expect(state.isError).toEqual(false);
  });

  it('Should return a new state if there are errors during authorization', () => {
    const action = updateAuthError();
    const state = authReducer(undefined, action);

    expect(state.isCheck).toEqual(true);
    expect(state.isError).toEqual(true);
  });

  it("Should return a new state when it checks the user's authorization", async () => {
    const action = checkUserData(await userData);
    const state = authReducer(undefined, action);

    expect(state.isCheckAuth).toEqual(false);
    expect(state.isCheck).toEqual(false);
    expect(state.isError).toEqual(false);
    expect(state.currentUser).toEqual(await userData);
  });

  it('Should return a new state when the user logs out', () => {
    const action = updateAuth(null);
    const state = authReducer(undefined, action);

    expect(state.isCheck).toEqual(true);
    expect(state.isError).toEqual(false);
    expect(state.currentUser).toEqual(null);
  });

  it('Should return a new state when the user logs in with an account', async () => {
    const action = updateAuth(await userData);
    const state = authReducer(undefined, action);

    expect(state.isCheck).toEqual(true);
    expect(state.isError).toEqual(false);
    expect(state.currentUser).toEqual(await userData);
  });
});

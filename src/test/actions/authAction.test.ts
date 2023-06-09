import { checkAuth, checkUserData, updateAuth, updateAuthError } from "../../store/actions/authAction";
import { AuthActionsTypes } from "../../types/Auth";

describe('Get Auth', () => {
  it('Should return an object that contains the type to check authorization', () => {
    const response = checkAuth();

    expect(response.type).toEqual(AuthActionsTypes.CHECK);
  });

  it('Should return an object containing the type to change the authorization error', () => {
    const response = updateAuthError();

    expect(response.type).toEqual(AuthActionsTypes.UPDATE_IS_AUTH_ERROR);
  });

  it('Should return an object containing the type and the payload for the authorization check', () => {
    const response = checkUserData(null);

    expect(response.type).toEqual(AuthActionsTypes.CHECK_AUTH);
    expect(response.payload).toEqual(null);
  });

  it('Should return an object containing the type and the payload to change the authorization data', () => {
    const response = updateAuth(null);

    expect(response.type).toEqual(AuthActionsTypes.UPDATE_AUTH);
    expect(response.payload).toEqual(null);
  });
});

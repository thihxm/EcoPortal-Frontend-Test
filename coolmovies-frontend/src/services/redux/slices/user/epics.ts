import { gql } from '@apollo/client';
import { Epic, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { RootState } from '../../store';
import { EpicDependencies } from '../../types';
import { actions, SliceAction } from './slice';

export const userAsyncEpic: Epic = (
  action$: Observable<SliceAction['fetchCurrentUser']>,
  state$: StateObservable<RootState>,
  { client }: EpicDependencies
) =>
  action$.pipe(
    filter(actions.fetchCurrentUser.match),
    switchMap(async () => {
      try {
        const result = await client.query({
          query: currentUser(),
        });
        return actions.loadedUser({ data: result.data });
      } catch (err) {
        return actions.loadUserError();
      }
    })
  );

const currentUser = () => {
  return gql`
    query {
      currentUser {
        id
        name
      }
    }
  `;
}

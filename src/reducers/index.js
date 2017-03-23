import { combineReducers } from 'redux';
import ReducerTypes from './reducer_types';
import ReducerActiveType from './reducer_active_type';
import ReducerQuestions from './questionsAnswers';
import ReducerResult from './reducer_results';

const rootReducer = combineReducers({
  types: ReducerTypes,
  activeType: ReducerActiveType,
  questions: ReducerQuestions,
  results: ReducerResult
});

export default rootReducer;

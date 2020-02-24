import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

// 액션 타입 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

// 액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT, input => input);
let id = 3;
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

/*
export const insert = text => ({
    type: INSERT,
    todo: {
        id: id++,
        text,
        done: false,
    },
});

export const remove = id => ({
    type: REMOVE,
    id,
});
*/

// 초기값
const initialState = {
    input: '',
    todos: [
        {
            id: 1,
            text: '리덕스 기초 배우기',
            done: true,
        },
        {
            id: 2,
            text: '리엑트와 리덕스 사용하기',
            done: false,
        },
    ],
};

// 리듀서 함수
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) =>
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT]: (state, { payload: todo }) =>
            produce(state, draft => {
                draft.todos.push(todo);
            }),
        [TOGGLE]: (state, { payload: id }) =>
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.is === id);
                todo.done = !todo.done;
            }),
        [REMOVE]: (state, { payload: id }) =>
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
            }),
    },
    initialState,
);

/*
const todos = handleActions(
    {
        [CHANGE_INPUT]: (state, { payload: input }) => ({
            ...state,
            input,
        }),
        [INSERT]: (state, { payload: todo }) => ({
            ...state,
            todos: state.todos.concat(todo),
        }),
        [TOGGLE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.map(todo =>
                todo.id === id ? { ...todo, done: !todo.done } : todo,
            ),
        }),
        [REMOVE]: (state, { payload: id }) => ({
            ...state,
            todos: state.todos.filter(todo => todo.id !== id),
        }),
    },
    initialState,
);
*/
/*
function todos(state = initialState, action) {
    switch (action.type) {
        case CHANGE_INPUT:
            return {
                ...state,
                input: action.input,
            };
        case INSERT:
            return {
                ...state,
                todos: state.todos.concat(action.todo),
            };
        case TOGGLE:
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id
                        ? { ...todo, done: !todo.done }
                        : todo,
                ),
            };
        case REMOVE:
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.id),
            };
        default:
            return state;
    }
}
*/

export default todos;

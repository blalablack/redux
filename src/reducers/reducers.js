import {combineReducers} from 'redux'
import {ADD_TODO, COMPLETE_TODO, DELETE_TODO, DELETE_ALL, CHECK_ALL} from '../components/actions'

/*定义初始化值*/
const initial = {
    data: [{
        text: "学习使用redux",
        completed: false
    }, {
        text: "路漫漫其修远，吾将上下而求索",
        completed: false
    }], ischeck: false
};

function isCheck(state = initial, action) {
    switch (action.type) {
        case COMPLETE_TODO:
            for (let i = 0, l = state.data.length; i < l; i++) {
                if (!state.data[i].compeleted) {
                    state.ischeck = false;
                    break
                } else {
                    state.ischeck = true;
                }
            }
            return state;

        case CHECK_ALL:
            if (state.ischeck) {
                state.data.map(todo=> {
                    todo.completed = false
                });
            } else {
                state.data.map(todo=> {
                    todo.completed = true
                });
                state.ischeck = true;
                console.log(state.ischeck);
            }

            return state;

        default:
            return state
    }
}


/*state 和action是必要属性，
 action是组件传来的变化数据他的type属性决定进入那个运行*/
function todos(state = initial, action) {
    switch (action.type) {
        /*增加todo*/
        case ADD_TODO:
            return {
                data: [
                    ...state.data,
                    {
                        text: action.text,
                        completed: false
                    }
                ],
                ischeck: state.ischeck
            }
        case CHECK_ALL:
            state.data.map(item=> {
                if (state.ischeck) {
                    item.completed = false;
                } else {
                    item.completed = true;
                }
            }),
                state.ischeck = state.ischeck ? false : true;
            return {
                data: state.data,
                ischeck: state.ischeck
            };

        /*标记为completed*/
        case COMPLETE_TODO:
            let datal = [
                ...state.data.slice(0, action.index),
                Object.assign({}, state.data[action.index], {
                    completed: state.data[action.index].completed ? false : true
                }),
                ...state.data.slice(action.index + 1)
            ];
            /*这是检测是否全部选中*/
            for (let i = 0, l = datal.length; i < l; i++) {
                if (!datal[i].completed) {
                    state.ischeck = false;
                    break
                } else {
                }
                state.ischeck = true;
            }
            return {data: datal, ischeck: state.ischeck}
        /*点击X删除todo*/
        case DELETE_TODO:
            //在想办法
            return {
                data: [
                    ...state.data.slice(0, action.index), ...state.data.slice(action.index + 1)
                ], ischeck: state.ischeck
            };
        /*删除全部completed的todo*/
        case DELETE_ALL:
            return {data: [...state.data.filter(todo => !todo.completed)], ischeck: state.ischeck}

        default:
            return state
    }
}
const todoApp = combineReducers({
    todos
});
export default todoApp
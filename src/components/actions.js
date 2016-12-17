/*����action�Ĺ��캯��*/
export const ADD_TODO = "ADD_TODO";
export const COMPLETE_TODO = "COMPLETE_TODO";
export const DELETE_TODO = "DELETETODO";
export const DELETE_ALL = "DELETE_ALL";
export const CHECK_ALL = "CHECK_ALL";


export function addTodo(text) {
    return {type: ADD_TODO, text}
}

export function completeTodo(index) {
    return {type: COMPLETE_TODO, index}
}

export function deleteTodo(index) {
    return {type: DELETE_TODO, index}
}
export function deleteAll() {
    return {type: DELETE_ALL}
}
export function checkAll() {
    return {type: CHECK_ALL}
}


import React, {Component} from 'react';
import{connect} from "react-redux";
import {addTodo, completeTodo, deleteTodo, deleteAll, checkAll} from './actions'

class App extends Component {
    render() {
        const {dispatch, visibleTodos} = this.props
        return (
            <div className="TodoList">
                <TodoHeader AddClick={text =>dispatch(addTodo(text))}/> {/*给下面enter事件提供接口发送action*/}
                <TodoMain
                    todoItems={visibleTodos} //取得临时state
                    hasDoneClick={index =>dispatch(completeTodo(index))}//点击选为已经做了
                    deleteTodoClick={index =>dispatch(deleteTodo(index))}//点击X删除某项
                />
                <TodoFooter
                    todoItems={visibleTodos}//取得临时state
                    deleteAll={()=>dispatch(deleteAll())}//删除所有completed的todo
                    checkAll={()=>dispatch(checkAll())}
                />
            </div>
        )
    }
}

class TodoHeader extends Component {
    /*处理输入框输入todo的是*/
    handleKeyup(e) {
        if (e.keyCode === 13 && e.target.value !== "") {
            //取得输入框内容
            let content = e.target.value;
            //清除输入框中的数据
            e.target.value = "";
            //传递给上一层处理
            this.props.AddClick(content);
        }
    }

    render() {
        return (
            <div className="TodoHeader">
                <input type="text" onKeyUp={this.handleKeyup.bind(this)} placeholder="请输入Todo的事情，按回车确定"/>
            </div>
        )
    }
}

class TodoMain extends Component {
    render() {
        return (
            <div className="TodoMain">
                {
                    this.props.todoItems.map((item, index)=> {
                        return (
                            <Todo key={index}
                                  click1={()=>this.props.hasDoneClick(index)} //这里别忘了是个方法而不是函数
                                  click2={()=>this.props.deleteTodoClick(index)}
                                  index={index}
                                  item={item}
                            />
                        )
                    })
                }
            </div>
        )
    }
}
class Todo extends Component {

    render() {
        const {item, index, isChecked}=this.props
        return (
            <div >
                {/*为什么绘不了啊？？？*/}
                <input onClick={this.props.click1} checked={item.completed} id={"item" + index} type="checkbox"/>
                <label htmlFor={"item" + index}
                       style={
                       {textDecoration: item.completed ? "line-through" : "none"}
                       }>{item.text}</label>
                <span onClick={this.props.click2}>X</span>
            </div>
        )
    }
}

class TodoFooter extends React.Component {
    render() {
        let items = this.props.todoItems;
        let hasdone = items.filter(item=>item.completed);
        return (
            <div className="TodoFooter">
                <span className="text"><span className="hasDone">已完成<span>{hasdone.length}</span></span>/<span
                    className="all">全部</span><span>{items.length}</span></span>
                <span className="button" onClick={()=>this.props.deleteAll()}>清除已完成任务</span>
            </div>
        )
    }
}
function select(state) {

    return {
        visibleTodos: state.todos.data,
        ischeck: state.ischeck
    }

}
export default connect(select)(App)//形成新的app组件
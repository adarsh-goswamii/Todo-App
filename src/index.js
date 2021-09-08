import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./components/button"
import './style.css';
import List from './components/list'
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import path from './img/empty.svg'

const App = () => {
    let list = [
        // { title: "Make a small react application", state: "active", id: 1 },
        // { title: "Make a small react application", state: "active", id: 2 },
        // { title: "Make a small react application", state: "active", id: 3 },
        // { title: "Make a small react application", state: "completed", id: 4 },
        // { title: "Make a small react application", state: "completed", id: 5 }
    ];

    // useState
    var [list_of_plans, setList] = useState(list);

    // remove all plans 
    let deleteAll= ()=> {
        list_of_plans = [];
        setList(list_of_plans);
    };

    // add a new plan
    let addPlan= ()=> {
        let input= document.querySelector('input').value;
        document.querySelector('input').value= '';
        let add_list= document.querySelector(".add-list");
        let new_plan= {};
        new_plan.title= input; 
        new_plan.state= 'active'; 
        new_plan.id= list_of_plans.length+1; 
        list_of_plans.push(new_plan);
        var list= [...list_of_plans];
        setList(list);
        add_list.classList.remove("show");
    }

    // removing a particular plan
    let removePlan= (e)=> {
        if(e.target.classList.contains("btn")) {
            let remove= e.target.parentElement;
            let list= list_of_plans.filter((i)=> {
                if(remove.getAttribute('id')!= i.id) return i; 
            });

            setList(list);
        }
    };

    let showAddList= ()=> {
        let add_list= document.querySelector(".add-list");
        add_list.classList.add("show");
    };

    let closeAddList= ()=> {
        let add_list= document.querySelector(".add-list");
        add_list.classList.remove("show");
    }

    useEffect(() => {
        var delete_all = document.querySelector(".icon.delete");
        var show_add_list = document.querySelector(".icon.add");
        var hide_add_list = document.querySelector(".icon.close");
        var add_plan= document.querySelector(".add-list .btn");
        var list_container= document.querySelector(".list-container");
        var containers= document.querySelectorAll(".list-container");
        // checking whether list is empty or not
        if(list_of_plans.length== 0) {
            containers[0].classList.remove('empty');
            containers[1].classList.remove('empty');
            containers[0].classList.add('empty');
        } else {
            containers[0].classList.remove('empty');
            containers[1].classList.remove('empty');
            containers[1].classList.add('empty');
        }

        // deleting all plans.
        delete_all.addEventListener('click', deleteAll);

        // displaying add item layer
        show_add_list.addEventListener('click', showAddList);

        // hiding add item layer
        hide_add_list.addEventListener('click', closeAddList);

        // adding a new plan to the list
        add_plan.addEventListener('click', addPlan);

        // marking a particular plan as completed
        list_container.addEventListener('click', removePlan);

        // cleanUp function
        return () => {
            delete_all.removeEventListener('click', deleteAll);
            show_add_list.removeEventListener('click', showAddList);
            add_plan.removeEventListener('click', addPlan);
            list_container.removeEventListener('click', removePlan);
            hide_add_list.removeEventListener('click', closeAddList);
        };
    });

    return (
        <>
            <div className="add-list">
                <input type="text" className='add-title' />
                <Button state='active' text="Add Item" ></Button>
                <CloseIcon className="icon close"/>
            </div>
            <main>
                <div className="main">
                    <h1 className="heading">Plan For Today</h1>
                    <div className="list-container">
                        {
                            list_of_plans.map((i) => {
                                console.log(i, 're-rendering');
                                const { title, state, id } = i;
                                return <List state={state} title={title} key={id} id={id} />
                            })
                        }
                    </div>
                    <div className="list-container">
                        <img src={path} alt="" />
                        <h3>Add Some Plans</h3>
                    </div>
                </div>
            </main>

            <div className="btn-container">
                <AddIcon className="icon add" />
                <DeleteIcon className="icon delete" />
            </div>
        </>
    );
};

ReactDOM.render(<App />, document.querySelector("#root"));

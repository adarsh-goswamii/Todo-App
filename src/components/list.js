import Button from "./button";

const List= (props)=> {
    const {id, title, state}= props;
    var btn_text= state=='active'? 'Remove': 'Completed';

    return (
        <div className={`list-item ${state}`} id= {id}>
            <h3>{title}</h3>
            <Button state={state} text={btn_text}/>
        </div>
    );
};

export default List;
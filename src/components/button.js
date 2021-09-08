const Button= (props)=> {
    var {state, text}= props;

    return (
        <div className= {`btn ${state}`}>
            <p>{text}</p>
        </div>
    );
}

export default Button;

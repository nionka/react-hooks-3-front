import PropTypes from 'prop-types';

function LoginForm(props) {
    return (
        <div className="user">
            <div className="user__name">Hello, {props.name}</div>
            <div className="user__img">
                <img src={props.avatar} alt={props.name}></img>
            </div>
            <button type="button" onClick={props.onLogout}>Logout</button>
        </div>
    )
}

LoginForm.propTypes = {
    name: PropTypes.string,
    avatar: PropTypes.string,
    onLogout: PropTypes.func
}

export default LoginForm
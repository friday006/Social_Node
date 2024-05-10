import "./register.css"

export default function Register() {
  return (
    <div className="login">
        <div className="loginWrapper">
            <div className="loginRight">
                <h3 className="loginLogo">LamaSocial</h3>
                <span className="loginDesc">
                    Connect with your friends and world around you with LamaSocial.
                </span>
            </div>
            <div className="loginLeft">
                <div className="loginBox">
                    <input placeholder="User Name" className="loginInput"/>
                    <input placeholder="Email" className="loginInput"/>
                    <input placeholder="Password" className="loginInput"/>
                    <input placeholder="Password Again" className="loginInput"/>
                    <button className="loginButton">Sign Up</button>
                    <button className="loginRegisterButton">Log into Account</button>
                </div>
            </div>
        </div>
    </div>
  )
}

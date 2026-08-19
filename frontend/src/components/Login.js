import "../Login.css";

function Login({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  loginError,
  setLoginError,
  handleLogin,
}) {
  return (
    <div className="login-page-new">

      <div className="login-left">
        <div className="login-brand">
          <h1>Employee Management System</h1>

          <p>
            Manage employees, departments, roles,
            salaries, and status from one dashboard.
          </p>

          <div className="login-features">
            <span>✓ Employee Management</span>
            <span>✓ Department Tracking</span>
            <span>✓ Search & Filtering</span>
            <span>✓ Add, Edit & Delete</span>
          </div>
        </div>
      </div>

      <div className="login-right">

        <div className="login-card-new">

          <div className="login-icon">
            👤
          </div>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to access your dashboard
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >

            <div className="login-field">
              <label>Username</label>

              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setLoginError("");
                }}
              />
            </div>

            <div className="login-field">
              <label>Password</label>

              <div className="password-container-new">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError("");
                  }}
                />

                <button
                  type="button"
                  className="show-password-btn-new"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="login-error-new">
                ⚠ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="login-btn-new"
            >
              Login
            </button>

          </form>

          <p className="login-footer">
            Employee Dashboard System
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;
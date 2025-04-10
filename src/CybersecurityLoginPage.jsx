import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const CybersecurityLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [enteredCaptcha, setEnteredCaptcha] = useState("");

  useEffect(() => {
    generateCaptcha();
    // Auto-fill remembered email if available
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const generateCaptcha = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captcha = "";
    for (let i = 0; i < 6; i++) {
      captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setGeneratedCaptcha(captcha);
  };

  const verifyCaptcha = () => {
    if (enteredCaptcha === generatedCaptcha) {
      setCaptchaVerified(true);
      setError("");
    } else {
      setCaptchaVerified(false);
      setError("CAPTCHA does not match. Please try again.");
      generateCaptcha();
      setEnteredCaptcha("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!captchaVerified) {
      setError("Please verify the CAPTCHA");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      setIsLoading(false);
      console.log("Login attempt with:", { email, password, rememberMe });

      // saving email if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <div className="logo">
            <div className="shield-icon"></div>
          </div>
          <h1>SecureGuard</h1>
        </div>

        <h2>Sign in securely</h2>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Username/Email</label>
            <div className="input-wrapper">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
              />
              <span className="input-icon email-icon"></span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
              <span
                className={`input-icon ${showPassword ? "eye-icon-visible" : "eye-icon"}`}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
                role="button"
              ></span>
            </div>
          </div>

          <div className="remember-forgot">
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <div className="captcha-container">
            <div className="captcha-display">
              <span className="captcha-text">{generatedCaptcha}</span>
              <button type="button" onClick={generateCaptcha} className="refresh-captcha">
                ↻
              </button>
            </div>

            <div className="captcha-input-group">
              <input
                type="text"
                value={enteredCaptcha}
                onChange={(e) => setEnteredCaptcha(e.target.value)}
                placeholder="Enter CAPTCHA"
                required
              />
              <button type="button" onClick={verifyCaptcha} className="verify-captcha-btn">
                Verify
              </button>
            </div>

            {captchaVerified && <span className="captcha-verified">✅ Verified</span>}
          </div>

          <button
            type="submit"
            className={`login-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Login"}
          </button>
        </form>

        <div className="signup-link">
          Don't have an account? <a href="#">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default CybersecurityLoginPage;

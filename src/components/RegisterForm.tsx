import React, { useState } from "react";

interface RegisterFormProps {
  onSubmit: (data: { FullName: string; Email: string; PasswordHash: string }) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ FullName: "", Email: "", PasswordHash: "" });
  const [errors, setErrors] = useState({ FullName: "", Email: "", PasswordHash: "" });

  const validateFullName = (name: string) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/; // ✅ Only letters & spaces, at least 3 characters
    return nameRegex.test(name) ? "" : "Full Name must contain only letters and at least 3 characters.";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ✅ Basic email validation
    return emailRegex.test(email) ? "" : "Enter a valid email address.";
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Password must be at least 8 characters, include uppercase, lowercase, a number, and a special character.";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let errorMessage = "";
    if (name === "FullName") errorMessage = validateFullName(value);
    if (name === "Email") errorMessage = validateEmail(value);
    if (name === "PasswordHash") errorMessage = validatePassword(value);

    setErrors({ ...errors, [name]: errorMessage });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const fullNameError = validateFullName(formData.FullName);
    const emailError = validateEmail(formData.Email);
    const passwordError = validatePassword(formData.PasswordHash);

    if (fullNameError || emailError || passwordError) {
      setErrors({ FullName: fullNameError, Email: emailError, PasswordHash: passwordError });
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          name="FullName" // ✅ Corrected to match `formData` key
          className={`form-control ${errors.FullName ? "is-invalid" : ""}`}
          placeholder="Enter your full name"
          value={formData.FullName}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">{errors.FullName}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="Email" // ✅ Corrected to match `formData` key
          className={`form-control ${errors.Email ? "is-invalid" : ""}`}
          placeholder="Enter your email"
          value={formData.Email}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">{errors.Email}</div>
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="PasswordHash" // ✅ Corrected to match `formData` key
          className={`form-control ${errors.PasswordHash ? "is-invalid" : ""}`}
          placeholder="Enter a strong password"
          value={formData.PasswordHash}
          onChange={handleChange}
          required
        />
        <div className="invalid-feedback">{errors.PasswordHash}</div>
      </div>

      <button type="submit" className="btn btn-success w-100">Register</button>
    </form>
  );
};

export default RegisterForm;

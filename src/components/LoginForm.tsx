import React, { useState } from "react";

interface LoginFormProps {
  onSubmit: (data: { Email: string; Password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ Email: "", Password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="Email"
            className="form-control"
            placeholder="Enter your email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </div>
  
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="Password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
  
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    );
};

export default LoginForm;

import React, { useState } from "react";
import { validateSignUpForm } from "../utils/validators";

const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Field = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div>
    <label className="block text-xs text-gray-400 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-gray-800 border text-gray-200 text-sm rounded px-3 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-600 ${
        error ? "border-red-500" : "border-gray-600"
      }`}
    />
    {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
  </div>
);

const PasswordStrength = ({ password }) => {
  if (!password) return null;
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const labels = ["", "Weak", "Fair", "Good", "Strong", "Very Strong"];
  const colors = [
    "",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-emerald-500",
  ];

  return (
    <div className="mt-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${i <= score ? colors[score] : "bg-gray-700"}`}
          />
        ))}
      </div>
      <p className="text-xs text-gray-500">{labels[score]}</p>
    </div>
  );
};

const SignUpModal = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async () => {
    const errs = validateSignUpForm(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setLoading(true);
    try {
      await onSubmit(form);
      setSuccess(true);
      setTimeout(onClose, 1500);
    } catch (err) {
      if (err.message?.toLowerCase().includes("email")) {
        setErrors({ email: "Email already exists" });
      } else {
        setErrors({ api: err.message || "Something went wrong" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-white font-semibold text-lg">Create Account</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-300 text-sm"
          >
            ✕
          </button>
        </div>

        {success ? (
          <div className="text-center py-8">
            <p className="text-green-400 font-medium">
              User created successfully!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {errors.api && (
              <p className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded px-3 py-2">
                {errors.api}
              </p>
            )}
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                error={errors.firstName}
                placeholder="John"
              />
              <Field
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                error={errors.lastName}
                placeholder="Doe"
              />
            </div>
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="john@example.com"
            />
            <div>
              <Field
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Min 6 chars, 1 uppercase, 1 number"
              />
              <PasswordStrength password={form.password} />
            </div>
            <Field
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              placeholder="Re-enter password"
            />

            <div className="flex gap-3 justify-end pt-2">
              <button
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-sm rounded border border-gray-600 text-gray-300 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors disabled:opacity-50"
              >
                {loading ? "Creating..." : "Sign Up"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpModal;

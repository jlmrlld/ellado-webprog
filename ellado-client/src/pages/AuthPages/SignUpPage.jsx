import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { createUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-[#B0C4DE] focus:bg-white focus:ring-4 focus:ring-[#B0C4DE]/20";

const actionButtonClassName =
  "w-full rounded-xl py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform active:scale-[0.98]";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [type, setType] = useState("viewer");

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  // VALIDATION
  const validate = () => {
    const errors = {};

    if (!firstName || firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters";
    }

    if (!lastName || lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    if (!username || username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (!password || password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    } else {
      if (!/[A-Z]/.test(password)) {
        errors.password = "Must include 1 uppercase letter";
      }
      if (!/[0-9]/.test(password)) {
        errors.password = "Must include 1 number";
      }
    }

    const ageNum = Number(age);
    if (!age || ageNum < 13 || ageNum > 120) {
      errors.age = "Age must be between 13 and 120";
    }

    if (!contactNumber || contactNumber.length < 10) {
      errors.contactNumber = "Contact number is too short";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      if (!validate()) return;

      await createUser({
        username,
        address,
        contactNumber,
        gender,
        age,
        firstName,
        lastName,
        email,
        password,
        type,
      });

      navigate("/auth/signin");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <header>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
          Join Traverse
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Start your journey today. Create an account to share your stories with the world.
        </p>
      </header>

      {error && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">

        <div className="grid gap-5 sm:grid-cols-2">
          <input
            type="text"
            placeholder="First Name"
            className={inputClasses}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          {fieldErrors.firstName && (
            <p className="text-red-500 text-xs">{fieldErrors.firstName}</p>
          )}

          <input
            type="text"
            placeholder="Last Name"
            className={inputClasses}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          {fieldErrors.lastName && (
            <p className="text-red-500 text-xs">{fieldErrors.lastName}</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Username"
          className={inputClasses}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {fieldErrors.username && (
          <p className="text-red-500 text-xs">{fieldErrors.username}</p>
        )}

        <input
          type="email"
          placeholder="Email Address"
          className={inputClasses}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {fieldErrors.email && (
          <p className="text-red-500 text-xs">{fieldErrors.email}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          className={inputClasses}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {fieldErrors.password && (
          <p className="text-red-500 text-xs">{fieldErrors.password}</p>
        )}

        <input
          type="text"
          placeholder="Address"
          className={inputClasses}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Contact Number"
          className={inputClasses}
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          required
        />
        {fieldErrors.contactNumber && (
          <p className="text-red-500 text-xs">{fieldErrors.contactNumber}</p>
        )}

        <select
          className={inputClasses}
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input
          type="number"
          placeholder="Age"
          className={inputClasses}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
        {fieldErrors.age && (
          <p className="text-red-500 text-xs">{fieldErrors.age}</p>
        )}

        <select
          className={inputClasses}
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="viewer">Viewer</option>
          <option value="editor">Editor</option>
        </select>

        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} mt-2 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-200`}
        >
          Create Account
        </Button>

        <div className="mt-10 border-t border-zinc-100 pt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link to="/auth/signin" className="font-bold text-zinc-900 hover:underline">
            Log In
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignUpPage;
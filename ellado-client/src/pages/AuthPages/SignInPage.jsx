import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { loginUser } from "../../services/UserService";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-[#B0C4DE] focus:bg-white focus:ring-4 focus:ring-[#B0C4DE]/20";

const actionButtonClassName =
  "w-full rounded-xl py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform active:scale-[0.98]";

const SignInPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const { data } = await loginUser({
        email,
        password,
      });

      console.log("Login successful:", data);

      // BLOCK VIEWERS
      if (data.type === "viewer") {
        setError("Viewers are not allowed to log in.");
        return;
      }

      // save user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("firstName", data.firstName);
      localStorage.setItem("type", data.type);

      localStorage.setItem("user", JSON.stringify(data));

      navigate("/dashboard");

    } catch (err) {
      console.error(
        "Login failed:",
        err.response?.data?.message || err.message
      );

      setError(
        err.response?.data?.message ||
        "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      <header>
        <h1 className="text-3xl font-black tracking-tight text-zinc-900 sm:text-4xl">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-6 text-zinc-500">
          Enter your details to continue your journey.
        </p>
      </header>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mt-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-10 space-y-5">

        {/* EMAIL */}
        <div>
          <label
            htmlFor="signin-email"
            className="text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            Email Address
          </label>

          <input
            id="signin-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="signin-password"
              className="text-xs font-bold uppercase tracking-wider text-zinc-700"
            >
              Password
            </label>

            <a
              href="#"
              className="text-xs font-medium text-[#7A8DA3] transition hover:text-zinc-900"
            >
              Forgot password?
            </a>
          </div>

          <input
            id="signin-password"
            type="password"
            placeholder="••••••••"
            autoComplete="current-password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {/* LOGIN BUTTON */}
        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} mt-2 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-200`}
        >
          Sign In
        </Button>

        {/* DIVIDER */}
        <div className="relative py-4">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-zinc-200"></div>
          </div>

          <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
            <span className="bg-white px-4 text-zinc-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* SOCIALS */}
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant="secondary"
            className={`${actionButtonClassName} border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 shadow-sm`}
          >
            Google
          </Button>

          <Button
            variant="secondary"
            className={`${actionButtonClassName} border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 shadow-sm`}
          >
            Apple
          </Button>
        </div>
      </form>

      <div className="mt-10 border-t border-zinc-100 pt-8 text-center text-sm text-zinc-500">
        New to Traverse?{" "}
        <Link
          to="/auth/signup"
          className="font-bold text-zinc-900 underline-offset-4 transition hover:underline"
        >
          Create an account
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
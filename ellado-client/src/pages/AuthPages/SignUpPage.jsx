import { Link } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-[#B0C4DE] focus:bg-white focus:ring-4 focus:ring-[#B0C4DE]/20";

const actionButtonClassName =
  "w-full rounded-xl py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-transform active:scale-[0.98]";

const SignUpPage = () => {
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

      <form className="mt-10 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="text-xs font-bold uppercase tracking-wider text-zinc-700"
            >
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="e.g. John"
              autoComplete="given-name"
              className={inputClasses}
            />
          </div>

          <div>
            <label
              htmlFor="last-name"
              className="text-xs font-bold uppercase tracking-wider text-zinc-700"
            >
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="e.g. Doe"
              autoComplete="family-name"
              className={inputClasses}
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="signup-email"
            className="text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            Email Address
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="signup-password"
            className="text-xs font-bold uppercase tracking-wider text-zinc-700"
          >
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            className={inputClasses}
          />
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-400">
            Must include at least 8 characters with a mix of letters and numbers.
          </p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className={`${actionButtonClassName} mt-2 bg-zinc-900 hover:bg-zinc-800 text-white shadow-lg shadow-zinc-200`}
        >
          Create Account
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-zinc-200"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
            <span className="bg-white px-4 text-zinc-400">Or sign up with</span>
          </div>
        </div>

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
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-bold text-zinc-900 underline-offset-4 transition hover:underline"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
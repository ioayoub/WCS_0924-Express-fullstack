import axios from "axios";
import { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function LoginPage() {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const navigate = useNavigate();

  const formSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/auth/login`,
        data,
        // Ajout des credentials ici
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (e) {
      toast.error("Une erreur est survenue.");
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Login
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "L'email n'est pas valide",
                },
              })}
            />
            {errors.email?.message && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.email.message as ReactNode}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              {...register("password", {
                required: "Le mot de passe est obligatoire",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                  message:
                    "Le mot de passe doit contenir entre 8 et 16 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial",
                },
              })}
            />
            {errors.password?.message && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.password.message as ReactNode}
              </p>
            )}
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

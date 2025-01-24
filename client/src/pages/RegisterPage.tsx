import axios from "axios";
import {useForm} from "react-hook-form";
import {ReactNode, useRef} from "react";
import {toast} from "react-toastify";

export default function RegisterPage() {
  const {
    register,
    formState: {errors},
    watch,
    handleSubmit,
  } = useForm();
  
  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");
  
  const formSubmit = async (data) => {
    const {confirmpassword, ...rest} = data;
    
    try {
      
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/v1/auth/register`, rest);
      toast.success(response.data.message);
      
    } catch (e) {
      
      toast.error("Une erreur est survenue");
      
      // Ecriture dans un fichier de log de l'erreur
      
    }
  };
  
  
  // Manipulation de date dans un formulaire
  const today = new Date();
  const dateMinusEighteen = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
  const displayedDate = dateMinusEighteen.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
  const formDefaultDate = dateMinusEighteen.toISOString().split('T')[0];
  
  return (
    <section className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Inscription
        </h2>
        
        <form className="space-y-4" onSubmit={handleSubmit(formSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prénom
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="John"
              {...register("firstname", {
                required: "Le prénom est obligatoire",
                minLength: {
                  value: 2,
                  message: "Le prénom doit contenir au minimum 2 caractères",
                },
              })}
            />
            {errors.firstname && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.firstname?.message as ReactNode}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="Doe"
              {...register("lastname", {
                required: "Le nom est obligatoire",
                minLength: {
                  value: 2,
                  message: "Le nom doit contenir au minimum 2 caractères",
                },
              })}
            />
            {errors.lastname && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.lastname?.message as ReactNode}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="toto@toto.fr"
              {...register("email", {
                required: "L'email est obligatoire",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "L'email n'est pas valide",
                }
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
              Date de naissance
            </label>
            <input
              type="date"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              defaultValue={formDefaultDate}
              {...register("birthdate", {
                required: "La date de naissance est obligatoire" + formDefaultDate,
                min: {
                  value: dateMinusEighteen.toISOString().split('T')[0],
                  message: `La date de naissance doit être supérieure à ${displayedDate}`,
                }
                
              })}
            />
            {errors.birthdate && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.birthdate.message as ReactNode}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mot de passe
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
            
            {errors.password && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.password.message as ReactNode}
              </p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmer le mot de passe
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
              {...register("confirmpassword", {
                required: "La confirmation du mot de passe est obligatoire",
                validate: (value) =>
                  value === passwordRef.current || "Les mots de passe ne correspondent pas",
              })}
            
            />
            {errors.confirmpassword && (
              <p role="alert" className="text-red-500 text-sm mt-2">
                {errors.confirmpassword.message as ReactNode}
              </p>
            )}
          </div>
          
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors"
            type={"submit"}>
            Inscription
          </button>
        </form>
      </div>
    </section>
  );
}

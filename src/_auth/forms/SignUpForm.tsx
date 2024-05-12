import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { useUSerContext } from "@/context/AuthContext"



function SignUpForm() {

  const { toast } = useToast(); 
  const { checkAuthUser, isLoading: isUserLoading } = useUSerContext()
  const navigate = useNavigate()


  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();
  const { mutateAsync: signInAccount, isPending: isSignIn } = useSignInAccount();
  
  // 1. Définition du formulaire en utilisant le hook useForm de react-hook-form.
  // Les conditions de validation de ce formulaire sont dans la fonction SignupFormValidation qui
  // se trouve dans /lib/validation/index.ts.
  // Les valeurs par défauts y sont définies. 
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '', 
      password: '',
    },
  })
 
  // 2. La fonction a appelée lorsque le formulaire est validé
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    
    //Creating the user Account 
    const newUser = await createUserAccount(values);

    if (!newUser) {
      return toast({
        title: "Création de compte échoué. Merci de réessayer.",
        description: "Vendredi, 10 Février, 2024"
      })
    }

    //Login the user 
    // const session = await signInAccount({
    //   email: values.email,
    //   password: values.password
    // })

    // if (!session) {
    //   return toast({ title: "Connexion échoué. Merci de réessayer." })
    // }

    const isLoggedIn = await checkAuthUser();
    
    if (isLoggedIn) {
      form.reset();
      navigate('/')
    }
    else {
      return toast({ title: "Échec de connexion. Merci de réessayer !" });
    }

  }

  
  return (

    <Form {...form}>
      
      <div className="sm:w-420 flex-center flex-col">
        <img
          src="/assets/images/logo.svg"
          alt="logo"
        />
        <h3
          className="h4-bold md:h3-bold pt-5 sm:pt-12">
          Créer un nouveau compte
        </h3>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Pour utiliser Snapgram, vous devez créer un compte
        </p>
      

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom d'utilisateur</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage  className="text-end" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage  className="text-end" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary w-full mt-5">
            {
              isCreatingAccount ? (
                <div className="flex-center gap-2">
                  <Loader /> En cours...
                </div>
                
              ) : (
                <span>Créer un compte</span>
              )
            }
          </Button>

          <p className="text-small-regular">
            Avez-vous déjà un compte ?
            <Link to='/sign-in' className="text-primary-500 text-small-semibold ml-1" >
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </Form>
    
  )
}

export default SignUpForm
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form, FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Loader from "@/components/shared/Loader"
import { Link, useNavigate } from "react-router-dom"
import { SigninValidation } from '@/lib/validation';
import { useToast } from '@/components/ui/use-toast';
import { useUSerContext } from '@/context/AuthContext';
import { useSignInAccount } from '@/lib/react-query/queriesAndMutations';



function SignInForm() {

  const { toast } = useToast()
  const { checkAuthUser, isLoading: isUserLoading } = useUSerContext()
  const navigate = useNavigate()

  const { mutateAsync: signInAccount } = useSignInAccount()

  // 1. Définition du formulaire en utilisant le hook useForm de react-hook-form.
  // Les conditions de validation de ce formulaire sont dans la fonction SignupFormValidation qui
  // se trouve dans /lib/validation/index.ts.
  // Les valeurs par défauts y sont définies. 
  const form = useForm<z.infer<typeof SigninValidation>>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // 2. La fonction a appelée lorsque le formulaire est validé
  async function onSubmit(values: z.infer<typeof SigninValidation>) {

    //Login the user 
    const session = await signInAccount({
      email: values.email,
      password: values.password
    })

    if (!session) {
      return toast({ title: "Connexion échoué. Merci de réessayer." })
    }

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
          Se connecter
        </h3>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Content de vous revoir
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)}>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage className="text-end" />
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
                <FormMessage className="text-end" />
              </FormItem>
            )}
          />

          <Button type="submit" className="shad-button_primary w-full mt-5">
            {
              isUserLoading ? (
                <div className="flex-center gap-2">
                  <Loader /> En cours...
                </div>

              ) : (
                <span>Se connecter</span>
              )
            }
          </Button>

          <p className="text-small-regular">
            Vous n'avez-pas un compte ?
            <Link to='/sign-up' className="text-primary-500 text-small-semibold ml-1" >
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </Form>

  )
}


export default SignInForm
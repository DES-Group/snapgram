import { z } from "zod"



export const SignupValidation = z.object({
    
    name: z.string().min(2, { message: 'Trop court' }),
    username: z.string().min(2, {message: 'Trop court'}).max(50, {message: 'Trop long'}),
    email: z.string().email({message: 'Votre e-mail est invalide'}),
    password: z.string().min(8, {message: 'Le mot de passe doit atteint au moins 8 caractères.'}
    )
})

export const SigninValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, {message: 'Le mot de passe doit atteint au moins 8 caractères.'})

})

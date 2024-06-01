"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FileUploader from "../FileUploader"
import { PostValidation } from "@/lib/validation"
import {Models} from "appwrite"
import { useUSerContext } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"


type PostFormProps = {
    post ?: Models.Document,
}

const PostForm = ({post}: PostFormProps ) => {

  const { mutateAsync: createPost } = useCreatePost()
  const { user }  = useUSerContext() 
  const { toast } = useToast()
  const navigate = useNavigate()

  
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
        caption: post ? post?.post.caption : "",
        file: [],
        location: post ? post?.location : "", 
        tags: post ? post.tags.join(',') : ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostValidation>) {
    
    // const newPost = await createPost({
    //   ...values, 
    //   userId: user.id,
    // })

    // if (!newPost) {
    //   toast({
    //     title: "Svp! Rééssayer encore.", 
    //     description: "Une description."
    //   })
    // }

    // navigate('/')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Publication</FormLabel>
              <FormControl>
                <Textarea className="shad-textarea custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ajouter des photos</FormLabel>
              <FormControl>
                <FileUploader
                    fieldChange={field.onChange}
                    mediaUrl= {post?.imageUrl}     
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />    

        
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ajouter un emplacement</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        /> 

        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Ajouter des balises(séparé par des virgules " , " )</FormLabel>
              <FormControl>
                <Input
                    type="text"
                    className="shad-input" 
                    placeholder="JS, React, Next.js" 
                    {...field}      
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />
        <div className="flex gap-4 items-center justify-end">
            <Button type="button" className="shad-button_dark_4 gap-1">Annuler</Button>
            <Button type="submit" className="shad-button_primary whitespace-nowrap">Publier</Button>
        </div>      
        
      </form>
    </Form>
  )
}

export default PostForm
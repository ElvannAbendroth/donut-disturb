import type { FC } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface NewsletterFormProps {}

const MAILERLITE_FORM = String(import.meta.env.MAILERLITE_FORM)

const NewsletterForm: FC<NewsletterFormProps> = () => {
  return (
    <form
      action={MAILERLITE_FORM}
      data-code="h7z7f4"
      method="post"
      className="flex flex-col gap-8 max-w-[500px] min-w-[50%] border-none"
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <Input
            aria-label="name"
            type="text"
            data-inputmask=""
            name="fields[name]"
            placeholder="Name"
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Input
            aria-label="email"
            aria-required="true"
            type="email"
            data-inputmask=""
            name="fields[email]"
            placeholder="Email"
            autoComplete="email"
          />
        </div>
      </div>
      <input type="hidden" name="ml-submit" value="1" />
      <input type="hidden" name="anticsrf" value="true" />

      <Button type="submit">Subscribe</Button>
    </form>
  )
}

export default NewsletterForm

// import type { FC } from 'react'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { Textarea } from '@/ui/textarea'
// import { useState } from 'react'
// import { useToast } from '@/ui/use-toast'
// import { z } from 'zod'

// interface NewsletterFormProps {}

// const NewsletterForm: FC<NewsletterFormProps> = () => {
//   const [isSubmitted, setIsSubmitted] = useState(false)
//   const { toast } = useToast()
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//   })

//   const handleChange = (e: any) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e: any) => {
//     e.preventDefault()
//     setIsSubmitted(true)
//     try {
//       //formDataValidation.parse(formData)
//       const response = await fetch('https://static.mailerlite.com/webforms/submit/h7z7f4', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           'ml-submit': 1,
//           anticsrf: true,
//           "fields[name]": formData.name,
//           "fields[email]": formData.email

//         }),
//       })

//       toast({
//         variant: 'default',
//         title: 'Success!',
//         description: `Your message was successfully sent!`,
//       })
//       setIsSubmitted(false)
//       setFormData({ name: '', email: '' })
//       console.log('Form submitted:', response)
//     } catch (error) {
//       console.log('Error:', error)
//       let errorMessage = error

//       if (error instanceof z.ZodError) {
//         errorMessage = JSON.stringify(error.issues[0].message).slice(1, -1)
//       }
//       toast({
//         variant: 'destructive',
//         title: 'Error!',
//         description: `Oops! ${errorMessage}`,
//       })
//     }
//   }
//   return (
//     <form
//       action="https://static.mailerlite.com/webforms/submit/h7z7f4"
//       data-code="h7z7f4"
//       method="post"
//       target="_blank"
//       className="flex flex-col gap-8 max-w-[500px] min-w-[50%] border-none"
//     >
//       <div className="flex flex-col gap-6">
//         <div className="flex flex-col gap-4">
//           <Input
//             aria-label="name"
//             type="text"
//             data-inputmask=""
//             //name="fields[name]"
//             name="name"
//             placeholder="Name"
//             autoComplete="name"
//             value={formData.name}
//             onChange={e => handleChange(e)}
//           />
//         </div>
//         <div className="flex flex-col gap-2">
//           <Input
//             aria-label="email"
//             aria-required="true"
//             type="email"
//             data-inputmask=""
//             // name="fields[email]"
//             name="email"
//             placeholder="Email"
//             autoComplete="email"
//             value={formData.email}
//             onChange={e => handleChange(e)}
//           />
//         </div>
//       </div>
//       <input type="hidden" name="ml-submit" value="1" />
//       {/* <Button type="submit">Subscribe</Button> */}
//       <Button className="w-full" type="submit" onClick={handleSubmit}>
//         Send
//       </Button>

//       <input type="hidden" name="anticsrf" value="true" />
//     </form>
//   )
// }

// export default NewsletterForm

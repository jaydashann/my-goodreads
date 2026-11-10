// import { zodResolver } from "@hookform/resolvers/zod";
// import { useMutation } from "@tanstack/react-query";
// import { useForm } from "react-hook-form";
// import { Link, useNavigate } from "react-router-dom";
// import { z } from "zod";
// import { publicInstance } from "../../api/api";
// import PasswordInput from "../../components/password-input";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "../../components/ui/form";
// import { Input } from "../../components/ui/input";
// import { handleErrorWithToastNotification } from "../../lib/toast";
// import type { UserCredentials } from "../../types/users";

// const FormSchema = z.object({
//   email: z.string().min(2, {
//     message: "Email must be atleast 2 characters.",
//   }),
//   password: z.string().min(8, {
//     message: "Password must be atleast 8 characters.",
//   }),
// });

// export default function Login() {
//   const navigate = useNavigate();
//   const form = useForm<z.infer<typeof FormSchema>>({
//     resolver: zodResolver(FormSchema),
//     defaultValues: {
//       email: "",
//       password: "",
//     },
//   });

//   const { mutateAsync: asyncLogin, isPending } = useMutation({
//     mutationFn: async (credentials: UserCredentials) => {
//       const response = await publicInstance.post("/auth/login", credentials);
//       return response;
//     },
//     onError: (error) => {
//       handleErrorWithToastNotification({
//         error,
//       });
//     },
//   });

//   async function onSubmit(data: z.infer<typeof FormSchema>) {
//     try {
//       await asyncLogin({
//         email: data.email.trim(),
//         password: data.password.trim(),
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <main>
//       <div>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <FormField
//               control={form.control}
//               name="email"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Email</FormLabel>
//                   <FormControl>
//                     <Input {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="password"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Password</FormLabel>
//                   <FormControl>
//                     <PasswordInput placeholder="" {...field} />
//                   </FormControl>
//                 </FormItem>
//               )}
//             />
//           </form>
//         </Form>
//       </div>
//     </main>
//   );
// }

export default function Login() {
  return <div>hello</div>;
}

'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { signIn, signUp } from '@/lib/actions/auth.action';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Ensure password is treated as a secure string regardless of display state
      const submissionValues = {
        ...values,
        password: values.password.toString() // Convert to string to ensure consistent handling
      };

      if (type === 'sign-up') {
        const { name, email, password } = submissionValues;

        const userCredentials = await createUserWithEmailAndPassword(auth, email, password)

        const result = await signUp({
          uid: userCredentials.user.uid,
          name: name!,
          email,
          password,
        })
        if (!result?.success) {
          toast.error(result?.message)
          return;
        }
        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in')
      } else {
        const { email, password } = submissionValues;

        const userCredentials = await signInWithEmailAndPassword(auth, email, password)

        const idToken = await userCredentials.user.getIdToken();


        if (!idToken) {
          toast.error('Sign in failed')
          return;
        }

        await signIn({
          email, idToken
        })
        toast.success('Sign in successfully.');
        router.push('/')
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`)
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image
            src="/logo.svg"
            alt="logo"
            height={32}
            width={38}
          />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <div className="relative">
              <FormField
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter Password"
                type={showPassword ? "text" : "password"}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[38px] text-light-100/60 hover:text-light-100 cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>

            <Button className='btn' type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
          </form>
          <p className='text-center'>
            {isSignIn ? 'No account yet?' : 'Already have an account?'}
            <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className='font-bold text-user-primary ml-1'>
              {!isSignIn ? 'Sign in' : 'Sign up'}
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
};

export default AuthForm;

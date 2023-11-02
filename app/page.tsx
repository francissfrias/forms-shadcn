'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm, authSchema } from '@/validators/auth';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { Password } from '@/components/ui/password';

const App = () => {
  const [formStep, setFormStep] = useState(0);
  const form = useForm<AuthForm>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      name: '',
      email: '',
      studentId: '',
      year: '',
      password: '',
      confirmPassword: '',
    },
  });

  console.log(form.watch());

  const onSumbit = (data: AuthForm) => {
    form.handleSubmit(data);
  };

  return (
    <div className='flex justify-center items-center flex-col h-screen gap-6'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle className='text-xl'>Register</CardTitle>
          <CardDescription>Welcome to our platform! 🔥</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSumbit)}>
              <div className='space-y-3'>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel htmlFor='name'>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter your email...' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel htmlFor='name'>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your full name...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        This is your public display name
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='studentId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel htmlFor='name'>Student ID</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Enter your student id...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel htmlFor='name'>Year of Study</FormLabel>
                      <FormControl>
                        <Select>
                          <SelectTrigger id='year'>
                            <SelectValue placeholder='Select a year' />
                          </SelectTrigger>
                          <SelectContent position='popper'>
                            {['10', '11', '12'].map((year) => (
                              <SelectItem key={year} value={year}>
                                Year {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='password'
                  key='password'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5 relative'>
                      <FormLabel htmlFor='password'>Password</FormLabel>
                      <FormControl>
                        <Password
                          placeholder='Enter your password...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5 relative'>
                      <FormLabel htmlFor='confirmPassword'>
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Password
                          placeholder='Confirm your password...'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-start'>
          <Button variant='default' onClick={form.handleSubmit(onSumbit)}>
            Submit
          </Button>
          <Button variant='ghost'>
            Next Step <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default App;

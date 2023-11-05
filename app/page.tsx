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
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthForm, authSchema } from '@/validators/auth';
import { Password } from '@/components/ui/password';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const App = () => {
  const { toast } = useToast();
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

  const onSumbit = (data: AuthForm) => {
    if (data.password !== data.confirmPassword) {
      toast({
        title: 'Password doesnt match!',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Form Submitted Successfully!',
    });

    alert(JSON.stringify(data));
  };

  return (
    <motion.div className='flex justify-center items-center flex-col h-screen gap-6'>
      <Card className='w-[350px]'>
        <CardHeader>
          <CardTitle className='text-xl'>Register</CardTitle>
          <CardDescription>Welcome to our platform! 🔥</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSumbit)}
              className='overflow-hidden'
            >
              <motion.div
                className={cn('space-y-3', {
                  hidden: formStep === 1,
                })}
                animate={{
                  translateX: formStep === 1 ? '-120%' : 0,
                }}
              >
                {/* email */}
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
                {/* name */}
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
                {/* studentId */}
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
                {/* year */}
                <FormField
                  control={form.control}
                  name='year'
                  render={({ field }) => (
                    <FormItem className='flex flex-col space-y-1.5'>
                      <FormLabel htmlFor='year'>Year of Study</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Select a verified email to display' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {[10, 11, 12, 13].map((year) => {
                              return (
                                <SelectItem value={year.toString()} key={year}>
                                  Year {year}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
              <motion.div
                className={cn('space-y-3', {
                  hidden: formStep === 0,
                })}
                animate={{
                  translateX: formStep === 0 ? '120%' : 0,
                }}
              >
                {/* password */}
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
                {/* confirmPassword */}
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
              </motion.div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className='flex justify-start'>
          <div className={cn('', { hidden: formStep === 0 })}>
            <Button variant='default' onClick={form.handleSubmit(onSumbit)}>
              Submit
            </Button>
            <Button variant='ghost' onClick={() => setFormStep(0)}>
              Previous Step <ArrowLeft className='w-4 h-4 ml-2' />
            </Button>
          </div>
          <Button
            variant='ghost'
            className={cn('', { hidden: formStep === 1 })}
            onClick={() => {
              form.trigger(['email', 'name', 'studentId', 'year']);

              const emailState = form.getFieldState('email');
              const nameState = form.getFieldState('name');
              const studentIdState = form.getFieldState('studentId');
              const yearState = form.getFieldState('year');

              if (emailState.invalid || !emailState.isDirty) return;
              if (nameState.invalid || !nameState.isDirty) return;
              if (studentIdState.invalid || !studentIdState.isDirty) return;
              if (yearState.invalid || !yearState.isDirty) return;

              setFormStep(1);
            }}
          >
            Next Step <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default App;

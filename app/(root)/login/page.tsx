// import { useSession, signIn } from 'next-auth/react';
// import { useMutation, useQuery } from '@apollo/client';
// import { GET_USER_BY_EMAIL } from 'graphql/queries';

import { LoginForm } from "@/components/auth/LoginForm";
import Head from "next/head";

// import { Meta } from '@/layout/Meta';
// import { AppConfig } from '@/utils/AppConfig';
// import { LoginForm } from '@/template/auth/LoginForm';
// import { User } from "next-auth";
// import { useEffect, useState } from 'react';
// import router from 'next/router';
// import LoadingBox from '@/template/LoadingBox';
// import { ADD_USERS } from 'graphql/mutations';
// import router from 'next/router';

// interface UserWithProvider extends User {
//   provider?: string;
// }
// type UserData = {
//   id: number;
//   username: string;
//   email: string;
//   password: string;
//   provider: string;
//   created_at: string;
// }

const Login = () => {
  //   const { data: session } = useSession();
  //   const user = session?.user as UserWithProvider;
  //   const [addUsers] = useMutation(ADD_USERS);
  //   console.log("session",session);
  //   console.log("session?.user?.email",user?.email);

  //   const { data: userData, loading: userDataLoading } = useQuery(GET_USER_BY_EMAIL, {
  //     variables: { email: user?.email },
  //     skip: !user?.email,
  //   });

  //   useEffect(() => {
  //     if (session && !userDataLoading) {
  //       // If userData exists, redirect to the homepage
  //       if (userData?.userByEmail) {
  //         window.location.href = '/';
  //         return;
  //       }

  //       // If userData does not exist or userByEmail is undefined, create the user
  //       if (!userData || !userData.userByEmail) {
  //         const createUser = async () => {
  //           const username = user?.name;
  //           const email = user?.email;
  //           const provider = user?.provider || "Auth0";
  //           const created_at = new Date().toISOString();
  //           const password = '';

  //           await addUsers({
  //             variables: {
  //               username: username,
  //               created_at: created_at,
  //               email: email,
  //               provider: provider,
  //               password: password,
  //             },
  //           });

  //           try {
  //             const response = await fetch('https://app.80kview.com/api/sendgrid/welcomeEmail', {
  //               method: 'POST',
  //               headers: {
  //                 'Content-Type': 'application/json'
  //               },
  //               body: JSON.stringify({
  //                 email: `${email}`,
  //                 username: `${user?.name}`
  //               })
  //             });

  //             if (!response.ok) {
  //               throw new Error('Network response was not ok ' + response.statusText);
  //             }
  //           } catch (error) {
  //             console.error('There was a problem with the fetch operation:', error);
  //           }

  //         };
  //         createUser();
  //         router.push('/welcome');
  //       }
  //     }
  //   }, [session, user, addUsers, userData, userDataLoading]);

  //   const handleLogin = async (provider: string) => {
  //     await signIn(provider, {});
  //   };

  //   // define state
  // const [loginFailed, setLoginFailed] = useState(false);

  // const handleEmailLogin = async (email: string, password: string): Promise<void> => {
  //   setLoginFailed(false);
  //   const response = await signIn('credentials', { email, password, redirect: false });
  //   if (response?.error) {
  //     setLoginFailed(true);
  //   }
  // };

  // console.log("login failed?", loginFailed)

  // use userDataLoading to handle loading state
  // if (userDataLoading) return <LoadingBox spinnerClassName='mx-24' containerClassName='m-auto h-screen' />;

  /////// // use userData to show some user information, assuming `GET_USER_BY_EMAIL` query returns user's data directly
  /////// if (userData) return

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <div className="text-gray-900 dark:text-slate-100 antialiased">
        <LoginForm
        // handleLogin={handleLogin} handleEmailLogin={handleEmailLogin} loginFailed={loginFailed}
        />
      </div>
    </>
  );
};

export default Login;

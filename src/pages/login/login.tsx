import type { FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { urls } from '@/constants/urls';
import { fetch } from '@/utils';

import AncLink from '@/components/common/AncLink';
import Button from '@/components/common/Button';
import Checkbox from '@/components/common/Checkbox';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import Typography from '@/components/common/Typography';
import { useAuth } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const onChange = useCallback((event: TextFieldEventType) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    else setPass(value);
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      // used mock API fixed email pass
      const config = {
        url: urls.login,
        data: {
          email: username,
          password: pass,
        },
        method: 'POST',
      };

      setIsLoading(true);

      const { response, error } = await fetch(config, '', true);

      if (error) {
        console.log(error.data.message);
        setError(error.data.message ?? 'Please enter valid email and password');
      }

      setIsLoading(false);
      if (response) return login?.(response.data);
    },
    [login, pass, username]
  );

  useEffect(() => {
    if (username && pass) setIsDisabled(false);
  }, [pass, username]);

  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <AncLink href="/" className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="h-[8rem]" src="/assets/images/ShipmentTrackerLogo.svg" alt="logo" />
        </AncLink>
        <div className="w-full lg:min-w-[32rem] rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Typography variant="h3">Sign in to your account</Typography>
            <Typography className="text-rose-600">{error}</Typography>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                fullWidth
                type="email"
                name="username"
                label="Your email"
                id="email"
                value={username}
                onChange={onChange}
                placeholder="name@company.com"
                required
              />
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                name="pass"
                label="Password"
                id="password"
                placeholder="••••••••"
                onChange={onChange}
                value={pass}
                required
              />
              <div className="flex items-center justify-between mb-3">
                <Checkbox label="Remember me" name="remember" aria-describedby="remember" required />
                <Link
                  to="/forgot-password"
                  className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                >
                  Forgot password?
                </Link>
              </div>
              <Button type="submit" fullWidth disabled={isDisabled || isLoading} isLoading={isLoading} className="mb-3">
                Sign in
              </Button>
              <Typography>
                Don’t have an account yet?{' '}
                <Link
                  to="/signup"
                  className="inline-flex items-center text-base font-medium text-purple-600 hover:text-purple-800 dark:text-purple-500 dark:hover:text-purple-700"
                >
                  Sign up
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

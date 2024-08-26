import type { FC, FormEvent } from 'react';
import { useCallback, useEffect, useState } from 'react';

import { urls } from '@/constants/urls';
import { fetch } from '@/utils';

import { useAuth } from '@/context/AuthProvider';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import Checkbox from '@/components/common/Checkbox';
import Button from '@/components/common/Button';
import Typography from '@/components/common/Typography';
import AncLink from '@/components/common/AncLink';
import SingleSelect from '@/components/common/SingleSelect';
import { roleOptions } from '@/constants/selectOptions';
import { SingleSelectOptionEvent } from '@/components/common/SingleSelect/types';
import { Link } from 'react-router-dom';

const Register: FC = () => {
  const [userInfo, setUserInfo] = useState({
    email:'',
    pass: '',
    conPass: '',
    role: ''
  });

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const onChange = useCallback((event: TextFieldEventType) => {
    const { name, value } = event.target;
    setUserInfo(prev => {
      return ({
      ...prev,
      [name]: value
    })
  })
  }, []);

  const onChangeSelect = useCallback((optionVal: SingleSelectOptionEvent) => {
    const { option } = optionVal;
    setUserInfo(prev => ({
      ...prev,
      role: (option?.value ?? '') as string
    }))
  }, []);

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();
      // used mock API fixed email pass
      const {email, pass, conPass, role} = userInfo;
      if(pass === conPass){
        const config = {
          url: urls.signup,
          data: {
            email,
            password: pass,
            role
          },
          method: 'POST',
        };

        setIsLoading(true);

        const { response, error: responseError } = await fetch(config, '', true);

        if (responseError) {
          setError(responseError.data?.message ?? 'Please enter valid email and password');
        }
        setIsLoading(false);
        if (response) 
          return login?.(response.data);
      }
    },
    [login, userInfo]
  );

  useEffect(() => {
    if (userInfo.role && userInfo.email && userInfo.pass && userInfo.conPass) {
      setIsDisabled(userInfo.pass !== userInfo.conPass);
    }
  }, [userInfo]);

  return (
    <section>
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <AncLink
          href="#"
          className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="mr-2 h-8 w-8"
            src="/assets/logo.svg"
            alt="logo"
          />
          Shipment Tracker
        </AncLink>
        <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <Typography variant="h2">
              Create an account
            </Typography>
            <Typography className="text-rose-600">{error}</Typography>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <SingleSelect value={userInfo.role} onChange={onChangeSelect} label="Role" placeholder='Select role' name='role' options={roleOptions} />          
                <TextField
    variant="outlined"
                  fullWidth
                  type="email"
                  name="email"
                  label="Your email"
                  id="email"
                  value={userInfo.email}
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
                   value={userInfo.pass}
                   required
                />
                <TextField
    variant="outlined"
                  fullWidth
                  type="password"
                  name="conPass"
                  label="Confirm password"
                  id="confirm-password"
                  placeholder="••••••••"
                  onChange={onChange}
                  value={userInfo.conPass}
                  required
                  errorText={(userInfo.pass && userInfo.conPass && userInfo.pass !== userInfo.conPass) ? 'Password did not match' : ''}
                />
              <div className="flex items-start mb-3">
                <div className="flex h-5 items-center">
                  <Checkbox label="I accept the" aria-describedby="terms" required/>
                  <Link
                    to="/terms-and-conditions"
                  className='ml-3 text-sm underline underline-offset-4 text-blue-500 hover:text-blue-800'
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
              <Button
                type="submit"
                fullWidth
                className="mb-3"
                disabled={isDisabled || isLoading}
                isLoading={isLoading}
              >
                Create an account
              </Button>
              <Typography>
                Already have an account?{' '}
                <Link
                  to="/login"
                  className='underline underline-offset-4 text-blue-500 hover:text-blue-800'
                >
                  Login here
                </Link>
              </Typography>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;

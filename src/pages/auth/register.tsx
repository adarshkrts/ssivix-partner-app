import { Button } from '@paljs/ui/Button';
import { InputGroup } from '@paljs/ui/Input';
import { Checkbox } from '@paljs/ui/Checkbox';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, push } from 'gatsby';

import Auth from '../../components/Auth';
import SEO from '../../components/SEO';
import Socials from '../../components/Auth/Socials';
import { CMS_STRAPI_URL } from '../../components/constant/serviceurl';

const Input = styled(InputGroup)`
  margin-bottom: 2rem;
`;

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userpassword, setUserpassword] = useState('');
  const [userType, setUserType] = useState('advertiser');

  const onCheckbox = () => {

    // v will be true or false
  };

  async function signUp() {
    // alert(" Email " + userEmail + " Name " + userName + " Password " + userpassword)
    var re = /\S+@\S+\.\S+/;
    if (re.test(userEmail) && null != userType && userType !== 'select' && null != userName) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userEmail,
          email: userEmail,
          Name: userName,
          userType: userType,
          password: userpassword
        })
      };
      const response = await fetch(CMS_STRAPI_URL + '/auth/local/register', requestOptions);
      const datas = await response.json();
      if (null != datas.jwt && datas.jwt.length > 30) {
        const requestOptions = {
          method: 'POST',
          headers: {
            Authorization:
              'Bearer ' + datas.jwt,
          },
          body: JSON.stringify({
            DISPLAY_NAME: datas.user.Name,
            ACTIVE: false,
            USER_ID: datas.user.id
          })
        };
        // setTimeout(() => {
        //   toast.success("Welcome " + name + LabelConstants.ALERT_CREATED_SUCCESSFULLY);
        // }, 300);
        push(`/login`);
      }
    }
  }
  return (
    <Auth title="Create new account">
      <SEO title="Register" keywords={['OAH', 'application', 'react']} />
      <form>
        <Input fullWidth>
          <input type="text" value={userName} placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
        </Input>
        <Input fullWidth>
          <input type="email" value={userEmail} placeholder="UserEmail " onChange={(e) => setUserEmail(e.target.value)} />
        </Input>
        <Input fullWidth>
          <input type="password" value={userpassword} placeholder="Password" onChange={(e) => setUserpassword(e.target.value)} />
        </Input>
        {/* <Input fullWidth>
          <input type="password" placeholder="Confirm Password" />
        </Input> */}
        <Checkbox onChange={onCheckbox}>
          Agree to <Link to="/">Terms & Conditions</Link>
        </Checkbox>
        <Button status="Success" onClick={signUp} type="button" shape="SemiRound" fullWidth>
          Register
        </Button>
      </form>
      <Socials />
      <p>
        Already have an account? <Link to="/auth/login">Log In</Link>
      </p>
    </Auth>
  );
}

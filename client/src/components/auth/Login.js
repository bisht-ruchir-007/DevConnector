import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
	const [ formData, setformData ] = useState({
		email: '',
		password: ''
	});

	const { email, password } = formData;

	const onChange = (e) => setformData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		console.log('Successful');
	};

	return (
		<Fragment>
			<h1 className='large text-primary'>Login</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Login Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Register</Link>
			</p>
		</Fragment>
	);
};

export default Login;
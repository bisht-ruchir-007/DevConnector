import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
	return (
		<div>
			<div className='dash-buttons'>
				<Link to='/edit-profile' className='btn btn-primary'>
					<i className='fas fa-user-circle text-light' /> Edit Profile
				</Link>
				<Link to='/add-experience' className='btn btn-primary'>
					<i className='fab fa-black-tie text-light' /> Add Experience
				</Link>
				<Link to='/add-education' className='btn btn-primary'>
					<i className='fas fa-graduation-cap text-light' /> Add Education
				</Link>
			</div>
		</div>
	);
};

export default DashboardActions;

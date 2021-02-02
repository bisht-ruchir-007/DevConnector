import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import DashboardActions from '../dashboard/DashboardActions';
import Experience from './Experience';
import Education from './Education';

import { getCurrentUserProfile, deleteAccount } from '../../actions/profile';

const Dashboard = ({ getCurrentUserProfile, deleteAccount, auth: { user }, profile: { profile, loading } }) => {
	useEffect(
		() => {
			getCurrentUserProfile();
		},
		[ getCurrentUserProfile ]
	);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<h1>
				<i className='fas fa-user' /> Welcome <strong>{user && user.name}</strong>
			</h1>
			<p className='lead'>
				Email id : <strong>{user.email && user.email}</strong>
			</p>
			<br />

			{profile != null ? (
				<Fragment>
					<DashboardActions />

					<Experience experience={profile.experience} />
					<Education education={profile.education} />
					<div className='my-2'>
						<button className='btn btn-danger' onClick={() => deleteAccount()}>
							<i className='fas fa-user-minus' />
							Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile , Please create one.</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	);
};

Dashboard.propTypes = {
	getCurrentUserProfile: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile, deleteAccount })(Dashboard);

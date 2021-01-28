import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentUserProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ getCurrentUserProfile, auth: { user }, profile: { profile, loading } }) => {
	useEffect(() => {
		getCurrentUserProfile();
	}, []);

	return loading && profile === null ? (
		<Spinner />
	) : (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome <strong>{user && user.name}</strong>
			</p>

			{profile != null ? (
				<Fragment>
					<div className='dash-buttons'>
						<a href='edit-profile.html' className='btn btn-light'>
							<i className='fas fa-user-circle text-primary' /> Edit Profile
						</a>
						<a href='add-experience.html' className='btn btn-light'>
							<i className='fab fa-black-tie text-primary' /> Add Experience
						</a>
						<a href='add-education.html' className='btn btn-light'>
							<i className='fas fa-graduation-cap text-primary' /> Add Education
						</a>
					</div>

					<h2 className='my-2'>Experience Credentials</h2>
					<table className='table'>
						<thead>
							<tr>
								<th>Company</th>
								<th className='hide-sm'>Title</th>
								<th className='hide-sm'>Years</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Tech Guy Web Solutions</td>
								<td className='hide-sm'>Senior Developer</td>
								<td className='hide-sm'>02-03-2009 - 01-02-2014</td>
								<td>
									<button className='btn btn-danger'>Delete</button>
								</td>
							</tr>
							<tr>
								<td>Traversy Media</td>
								<td className='hide-sm'>Instructor & Developer</td>
								<td className='hide-sm'>02-03-2015 - Now</td>
								<td>
									<button className='btn btn-danger'>Delete</button>
								</td>
							</tr>
						</tbody>
					</table>

					<h2 className='my-2'>Education Credentials</h2>
					<table className='table'>
						<thead>
							<tr>
								<th>School</th>
								<th className='hide-sm'>Degree</th>
								<th className='hide-sm'>Years</th>
								<th />
							</tr>
						</thead>
						<tbody>
							<tr>
								<td>Northern Essex</td>
								<td className='hide-sm'>Associates</td>
								<td className='hide-sm'>02-03-2007 - 01-02-2009</td>
								<td>
									<button className='btn btn-danger'>Delete</button>
								</td>
							</tr>
						</tbody>
					</table>

					<div className='my-2'>
						<button className='btn btn-danger'>
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
	profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
